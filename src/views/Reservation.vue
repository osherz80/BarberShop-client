<template>
  <v-card class="d-flex align-center justify-center p-5 calendar-card">
    <main>
      <v-card height="250" tile>
        <v-card-title class="treatments-title">בחר תור</v-card-title>
        <div class="treatment-list">
          <v-list shaped>
            <v-list-item-group color="var(--systemPurple)">
              <v-list-item
                v-for="(treatment, i) in treatments"
                :key="i"
                @click="chooseTreatment(treatment.id)"
              >
                <v-list-item-content>
                  <v-list-item-title
                    >{{ treatment.name }} -
                    {{ treatment.price }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </div>
      </v-card>
      <vc-calendar
        locale="he-IL"
        :first-day-of-week="1"
        :attributes="attributes"
        :min-date="new Date()"
        @dayclick="onDayClick"
      />
    </main>
    <footer>
      <div class="">
        <v-btn
          class="white--text"
          color="var(--systemPurple)"
          :disabled="!selectedDate"
          @click="saveOrder"
        >
          סיימתי לבחור
        </v-btn>
      </div>
    </footer>
    <HoursOverlay />
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import { eventBus } from "@/main";
import { swalError, swalSuccess } from "@/sweetAlert";
import requests from "@/axios/requests";
import HoursOverlay from "@/components/HoursOverlay.vue";

export default {
  name: "reservation-View",
  data: () => ({
    openOverlay: false,
    attributes: [
      {
        key: "today",
        dot: "purple",
        dates: new Date(),
      },
    ],
    selectedDate: new Date(),
    selectedTreatmentId: 0,
    appointmentsForDay: [],
    timeList: [],
  }),
  components: {
    HoursOverlay,
  },
  computed: {
    ...mapState(["treatmentsList"]),
    treatments() {
      return this.treatmentsList;
    },
  },
  created() {
    this.isRegistered();
    eventBus.$on("customSaveTime", (hour, minutes, isTaken) => {
      if (isTaken || !this.selectedDate) {
        return;
      }
      this.selectedDate.setHours(hour, minutes, 0);
    });
  },
  methods: {
    async onDayClick(day) {
      if (this.isAfterToday(day)) {
        eventBus.$emit("setChoosenDate", day.date);
        this.selectedDate = day.date;
        this.openHours();
      }
    },
    chooseTreatment(id) {
      this.selectedTreatmentId = id;
    },
    async saveOrder() {
      if (this.selectedTreatmentId === 0) {
        swalError("לא נבחר טיפול");
      } else {
        try {
          await requests.appointment.addAppointment(
            this.selectedTreatmentId,
            this.selectedDate
          );
          swalSuccess("ההזמה הושלמה", this.goToMainPage);
          window.location.replace("/");
        } catch (err) {
          console.log(err);
          swalError(
            "מצטערים היה בעיה וההזמנה לא הושלמה אנא נסו שוב מאוחר יותר"
          );
        }
      }
    },
    isAfterToday(dateToCheck) {
      return (
        new Date(dateToCheck.date).getTime() >= new Date().setHours(0, 0, 0, 0)
      );
    },
    openHours() {
      eventBus.$emit("openHoursOverlay");
    },
    isRegistered() {
      if (!localStorage.getItem("barberIncUserToken")) {
        this.goToMainPage();
      }
    },
    goToMainPage() {
      window.location.replace("/");
    },
  },
};
</script>

<style scoped>
.calendar-card {
  margin: 10vh auto;
  width: 66vw;
  height: fit-content;
  min-height: 650px;
  flex-direction: column;
}

main {
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  height: 90%;
  width: 100%;
  padding-top: 5%;
}

.treatments-title {
  height: 20%;
}

.treatment-list {
  overflow-y: auto;
  height: 80%;
}

footer {
  height: 10%;
}
</style>