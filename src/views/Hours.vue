<template>
  <v-card class="hours-card" width="66vw">
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th><div class="info-slot">יום</div></th>
            <th><div class="info-slot">פתיחה</div></th>
            <th><div class="info-slot">סגירה</div></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="day in days" :key="day.name">
            <td>
              <div class="info-slot">{{ day.name }}</div>
            </td>
            <td>
              <div class="info-slot">{{ day.open }}</div>
            </td>
            <td>
              <div class="info-slot">{{ day.close }}</div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "hours-view",
  data: () => ({}),
  computed: {
    ...mapState(["workingHours"]),
    days() {
      return this.workingHours;
    },
  },
  watch: {
    days(newValue, oldValue) {
      console.log("oldValue", oldValue);
      console.log("newValue", newValue);
      this.days = newValue;
    },
  },
};
</script>

<style scoped>
.info-slot {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hours-card {
  margin: 10vh auto;
  direction: rtl;
}
</style>