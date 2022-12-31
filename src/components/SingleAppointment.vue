<template>
  <v-container>
    <v-divider v-if="divide" class="appointments-divider"></v-divider>
    <v-row>
      <v-btn
        class="cancel-btn"
        color="var(--systemPurple)"
        text
        outlined
        @click="openCancelFunc"
      >
        <v-icon>mdi-close</v-icon>
        <span>בטל</span>
      </v-btn>

      <v-col>
        <v-card-title class="treatment-date">
          {{ appointment.day }}
        </v-card-title>
        <v-card-title class="treatment-date">
          {{ appointment.time }}
        </v-card-title>
      </v-col>

      <v-card-title class="treatment-name">
        {{ appointment.name }}
      </v-card-title>
    </v-row>
    <v-overlay :absolute="true" :value="openCancel">
      <cancelAppointment :id="appointment.id" />
    </v-overlay>
  </v-container>
</template>

<script>
import { eventBus } from "@/main";
import CancelAppointment from "./CancelAppointment.vue";

export default {
  name: "AppointmentComp",
  data: () => ({
    openCancel: false,
  }),
  props: ["appointment", "divide"],
  components: {
    CancelAppointment,
  },
  created() {
    eventBus.$on("customCloseOtherCancel", (id) => {
      if (this.appointment.id !== id) {
        this.openCancel = false;
      }
    });
    eventBus.$on("customCloseAllCancel", () => {
      this.openCancel = false;
    });
  },
  methods: {
    openCancelFunc() {
      this.closeAllOtherCancel();
      this.openCancel = true;
    },
    closeAllOtherCancel() {
      eventBus.$emit("customCloseOtherCancel", this.appointment.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.appointments-divider {
  margin: 0 !important;
}

.treatment-name {
  word-break: break-word;
  color: black;
}

.treatment-date {
  word-break: break-word;
  color: black;
  justify-content: center;
}

.cancel-btn {
  margin: auto 0;
}

.row {
  margin-bottom: 15px;
}
</style>