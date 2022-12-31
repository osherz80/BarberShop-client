<template>
  <v-card class="appointments-card" elevation="10" outlined>
    <v-card-title class="title">:הפגישות הקרובות</v-card-title>
    <v-divider style="margin: 0"></v-divider>
    <v-card-text v-if="registered">
      <v-container v-if="appointments.length">
        <SingleAppointment :appointment="appointments[0]" :divide="false" />
        <v-card-actions v-show="appointments.length > 1">
          <v-btn
            class="more-btn"
            color="var(--systemPurple)"
            text
            outlined
            @click="show = !show"
          >
            <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
            <span>לכל הפגישות</span>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div style="padding-top: 20px" v-show="show">
            <v-row v-for="(ap, i) in appointments" :key="ap.date">
              <SingleAppointment
                v-if="i > 0"
                :appointment="appointments[i]"
                :divide="true"
              />
            </v-row>
          </div>
        </v-expand-transition>
      </v-container>
      <v-row v-else>
        <v-col>
          <a href="/reservation">הזמן תור</a>
        </v-col>
        <v-col>אין תורים קרובים</v-col>
      </v-row>
    </v-card-text>
    <v-card-text v-else>
      <v-row>
        <v-col>
          <a @click="openRegister">הרשם/התחבר</a>
        </v-col>
        <v-col>הרשם/התחבר כדי לקבוע תור</v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import requests from "@/axios/requests";
import SingleAppointment from "./SingleAppointment.vue";
import { eventBus } from "@/main";

export default {
  name: "AppointmentsInfo",
  data: () => ({
    appointments: [],
    show: false,
  }),
  components: {
    SingleAppointment,
  },
  computed: {
    ...mapState(["isRegistered"]),
    registered() {
      return this.isRegistered;
    },
  },
  async created() {
    if (this.registered) {
      this.getAppointments();
    }
    eventBus.$on("getAppointmentsOnLogin", () => {
      this.getAppointments();
    });
    eventBus.$on("removeAppointmentFromList", (id) => {
      const index = this.appointments.findIndex(
        (appointment) => appointment.id === id
      );
      this.appointments.splice(index, 1);
      console.log(this.appointments);
    });
  },
  methods: {
    async getAppointments() {
      this.appointments = (
        await requests.appointment.getPersonAppointmentsByToken(
          localStorage.getItem("barberIncUserToken")
        )
      ).data;
      console.log("this.appointments", this.appointments);
    },
    openRegister() {
      eventBus.$emit("customOpenRegister");
    },
  },
};
</script>

<style lang="scss" scoped>
.appointments-card {
  width: 25%;
  max-height: 100%;
  overflow: auto;
}

.v-card__title {
  justify-content: center;
  margin: 0;
}

.container {
  padding-bottom: 0;
}

// .v-card__text {
//   padding-bottom: 0;
// }

.more-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
}
</style>