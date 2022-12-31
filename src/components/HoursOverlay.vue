<template>
  <v-overlay :absolute="true" :opacity="0.9" :value="openOverlay">
    <v-card class="mx-auto my-12" max-width="374">
      <v-card-title v-model="selectedDate"
        >בחר שעה
        <v-btn class="overlay-esc-btn" @click="closeHours">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-chip-group column>
          <HourChip
            v-for="(time, i) in timeList"
            :key="i"
            :hour="time.hour"
            :minutes="time.minutes"
            :appointmentsForDay="appointmentsForDay"
          />
        </v-chip-group>
      </v-card-text>
    </v-card>

    <v-btn
      class="white--text mb-8"
      color="var(--systemPurple)"
      @click="closeHours"
    >
      בחרתי, אפשר להמשיך
    </v-btn>
  </v-overlay>
</template>

<script>
import { mapState } from "vuex";
import { eventBus } from "@/main";
import requests from "@/axios/requests";
import HourChip from "@/components/HourChip.vue";

const ISRAEL_TIMEZONE_ADDITION = 2;
export default {
  name: "HoursOverlay",
  data: () => ({
    openOverlay: false,
    selectedDate: new Date(),
    appointmentsForDay: [],
    timeList: [],
  }),
  components: {
    HourChip,
  },
  props: ["isAdmin"],
  computed: {
    ...mapState(["workingHours", "miutesBetweenAppointments"]),
  },
  created() {
    this.initAppointmentsTimeList();
    eventBus.$on("setChoosenDate", (date) => {
      this.selectedDate = date;
      this.initAppointmentsTimeList();
      this.getDayAppointments();
    });
    eventBus.$on("openHoursOverlay", () => {
      this.openHours();
    });
    eventBus.$on("closeHoursOverlay", () => {
      this.closeHours();
    });
  },
  methods: {
    initAppointmentsTimeList() {
      let hour = this.workingHours[this.selectedDate.getDay()].open;
      let closeHour = this.workingHours[this.selectedDate.getDay()].close;
      let minutes = 0;
      this.timeList = [];

      while (hour <= closeHour) {
        this.timeList.push({
          hour,
          minutes,
          isTaken: false,
        });
        minutes += this.miutesBetweenAppointments;

        if (minutes >= 60) {
          minutes -= 60;
          hour++;

          if (hour >= closeHour) {
            return;
          }
        }
      }
    },
    async getDayAppointments() {
      this.appointmentsForDay = (
        await requests.appointment.getAppointmentsTimeDTOsByDate(
          this.selectedDate
        )
      ).data;
      this.fixAppointmentsTimzone();
    },
    fixAppointmentsTimzone() {
      this.appointmentsForDay.forEach(
        (time) => (time.hour += ISRAEL_TIMEZONE_ADDITION)
      );
    },
    openHours() {
      this.openOverlay = true;
    },
    closeHours() {
      this.openOverlay = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.v-overlay__content {
  width: 100% !important;
  height: 100% !important;
  z-index: 10;
}

.v-card__title {
  padding-right: 8%;
  justify-content: flex-end;
}

.overlay-esc-btn {
  border-radius: 50px;
  margin-left: 18%;
}
</style>