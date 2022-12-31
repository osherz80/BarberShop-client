<template>
  <v-card>
    <v-system-bar></v-system-bar>
    <v-row class="search-row">
      <div>
        <DatePicker :id="startDateId" :date-label="'תאריך התחלה'" />
      </div>
      <div>
        <DatePicker
          :id="endDateId"
          :default-date="weekFromNow"
          :date-label="'תאריך סיום'"
        />
      </div>
      <v-btn @click="searchAppointments">search</v-btn>
    </v-row>
    <v-card-text class="grey lighten-4">
      <v-sheet v-if="appointments.length == 0" class="not-found-sheet">
        <div class="not-found">
          <v-icon class="not-found-icon">mdi-calendar-remove-outline</v-icon>
          <p style="font-size: large">לא מצאנו מה שחיפשת</p>
        </div>
      </v-sheet>
      <v-sheet v-else class="records-container">
        <v-expansion-panels class="data-panels-container">
          <AppointmentRecord
            v-for="(appointment, i) in appointments"
            :key="i"
            :appointment="appointment"
          />
        </v-expansion-panels>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
import DatePicker from "@/components/DatePicker.vue";
import AppointmentRecord from "@/components/AdminComponents/AppointmentRecord.vue";
import { eventBus } from "@/main";
import requests from "@/axios/requests";

export default {
  name: "SearchAppointments",
  data: () => ({
    startDateId: Math.random(),
    endDateId: Math.random(),
    endDate: new Date(),
    startDate: new Date(),
    appointments: [],
  }),
  components: {
    DatePicker,
    AppointmentRecord,
  },
  computed: {
    weekFromNow() {
      return new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 7
      );
    },
  },
  created() {
    eventBus.$on(`setDate${this.startDateId}`, (date) => {
      console.log(this.startDateId, date);
      this.startDate = date;
    });
    eventBus.$on(`setDate${this.endDateId}`, (date) => {
      console.log(this.endDateId, date);
      this.endDate = date;
    });
    eventBus.$on(`removeRecord`, (index) => {
      console.log("before", this.appointments);
      this.appointments.splice(index, 1);
      console.log("after", this.appointments);
    });
  },
  methods: {
    async searchAppointments() {
      this.appointments = (
        await requests.appointment.getAppointmentsInRange(
          this.startDate,
          this.endDate
        )
      ).data;
      console.log(this.appointments);
    },
  },
};
</script>

    
<style lang="scss" scoped>
.data-panels-container {
  direction: rtl;
}

.search-row {
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-around;
  margin: 0 !important;
  padding: 10px;
}

.records-container {
  min-height: 250;
  max-height: 40vh;
  overflow: auto;
}

.not-found-sheet {
  margin-right: auto !important;
  margin-left: auto !important;
  height: 300px;
  max-width: 800px;
  display: grid;
  align-items: center;
}

.not-found-icon {
  font-size: 1300%;
}
</style>