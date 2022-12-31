<template>
  <v-btn
    class="chip m-2 d-flex align-center justify-center"
    :class="{ disabled: isTaken, clicked: highlight }"
    :outlined="isTaken"
    :disabled="isTaken"
    @click="saveTime"
  >
    <p>{{ hour }}:</p>
    <p v-show="minutes < 10">0</p>
    <p>{{ minutes }}</p>
  </v-btn>
</template>

<script>
import { eventBus } from "@/main";

export default {
  name: "hourChip-comp",
  data: () => ({
    isTaken: false,
    highlight: false,
  }),
  props: ["isAdmin", "hour", "minutes", "appointmentsForDay"],
  created() {
    this.checkIfTaken();
    eventBus.$on("closeAllHighlights", () => {
      this.highlight = false;
    });
  },
  methods: {
    checkIfTaken() {
      this.appointmentsForDay.forEach((appointment) => {
        if (
          appointment.hour === this.hour &&
          appointment.minutes === this.minutes
        ) {
          this.isTaken = true;
        }
      });
    },
    saveTime() {
      eventBus.$emit("customSaveTime", this.hour, this.minutes, this.isTaken);
      this.toggleHighlight();
    },
    toggleHighlight() {
      eventBus.$emit("closeAllHighlights");
      this.highlight = true;
    },
  },
};
</script>

<style scoped>
p {
  margin: 0;
}
.chip {
  width: 20%;
  direction: ltr;
}

.disabled {
  text-decoration: line-through;
}

.clicked {
  background: var(--systemPurple) !important;
}
</style>