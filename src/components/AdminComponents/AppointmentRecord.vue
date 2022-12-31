<template>
  <v-expansion-panel class="mb-1">
    <v-expansion-panel-header>
      <div class="text-center">
        <b
          >{{ appointment.customer.firstName }}
          {{ appointment.customer.lastName }}
        </b>
      </div>
      <div class="text-center">
        <b>{{ appointment.treatment.name }}</b>
      </div>
      <div class="text-center">
        <b>{{ createAppointmentDateString(appointment.date) }}</b>
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-container>
        <v-row>
          <v-col>
            <span class="contanct-info">
              פלאפון: {{ appointment.customer.phoneNum }}</span
            >
          </v-col>
          <v-col>
            <span class="contanct-info">
              אימייל: {{ appointment.customer.email }}</span
            >
          </v-col>
          <v-col>
            <div class="btns-contaier">
              <v-btn color="red darken-2" @click="cancelAppointment">
                בטל
                <v-icon class="mr-1">mdi-calendar-remove</v-icon>
              </v-btn>
              <v-btn color="green accent-3" @click="moveAppointment">
                הזז
                <v-icon class="mr-1">mdi-calendar-sync</v-icon>
              </v-btn>
            </div>
            <div v-if="openMove" class="mt-3 px-7">
              <DatePicker :id="datePickerId" :date-label="'תאריך להזזה'" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-expansion-panel-content>
    <HoursOverlay />
  </v-expansion-panel>
</template>

<script>
import requests from "@/axios/requests";
import { eventBus } from "@/main";
import DatePicker from "@/components/DatePicker.vue";
import HoursOverlay from "@/components/HoursOverlay.vue";

export default {
  name: "AppointmentRecord",
  data: () => ({
    openMove: false,
    datePickerId: Math.random(),
    newDay: "",
  }),
  props: ["appointment", "index"],
  components: {
    DatePicker,
    HoursOverlay,
  },
  created() {
    eventBus.$on(`setDate${this.datePickerId}`, (date, openHours) => {
      this.newDay = date;
      if (openHours) {
        eventBus.$emit("openHoursOverlay");
      }
    });
  },
  methods: {
    formatDateString(date) {
      return new Date(date - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10);
    },
    createAppointmentDateString(date) {
      const hours = new Date(date).getHours().toString();
      const minutes = new Date(date).getMinutes().toString();
      const timeString = `${hours}:${minutes < 10 ? 0 : ""}${minutes}`;
      const dayString = `${new Date(date).getDate()}/${new Date(
        date
      ).getMonth()}`;
      return timeString + " " + dayString;
    },
    async cancelAppointment() {
      const req = await requests.appointment.cancelAppointment(
        this.appointment.appointmentId
      );
      eventBus.$emit("removeRecord", this.index);
      console.log(req);
    },
    async moveAppointment() {
      this.openMove = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.contanct-info {
  font-size: large;
}

.btns-contaier {
  display: flex;
  justify-content: space-evenly;
}
</style>