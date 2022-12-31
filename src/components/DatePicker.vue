<template>
  <v-container>
    <v-row>
      <v-col>
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              :label="dateLabel"
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            locale="he-IL"
            :first-day-of-week="1"
            v-model="date"
            @input="setDate"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { eventBus } from "@/main";
export default {
  name: "DatePicker",
  data: () => ({
    date: "",
    menu2: false,
  }),
  props: ["id", "defaultDate", "dateLabel"],
  created() {
    this.date = this.formatDateString(this.defaultDate || new Date());
    eventBus.$emit(`setDate${this.id}`, new Date(this.date), false);
  },
  methods: {
    formatDateString(date) {
      return new Date(date - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10);
    },
    setDate() {
      this.menu2 = false;
      console.log(new Date(this.date));
      eventBus.$emit(`setDate${this.id}`, new Date(this.date), true);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>