<template>
  <v-container fluid>
    <v-toolbar class="mb-2" color="indigo darken-5" dark flat>
      <v-toolbar-title class="ml-auto">שעות פתיחה</v-toolbar-title>
    </v-toolbar>

    <v-row class="days-row">
      <v-col
        v-for="(day, index) in days"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <DayProfile :day="day" :index="index" />
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
import { mapState } from "vuex";
import DayProfile from "@/components/AdminComponents/DayProfile.vue";
// import { eventBus } from "@/main";
export default {
  name: "changeHours-comp",
  data: () => ({
    isAllOpen: true,
  }),
  components: {
    DayProfile,
  },
  computed: {
    ...mapState(["workingHours"]),
    days() {
      return this.workingHours;
    },
  },
  methodes: {
    // changeDaysState() {
    //   this.isAllOpen = !this.isAllOpen;
    //   eventBus.$emit("changeAll", this.isAllOpen);
    // },
  },
};
</script>

<style lang="scss" scoped>
.v-icon__svg {
  color: white;
}
.menu-header {
  color: black;
}

.days-row {
  flex-direction: row-reverse;
}
</style>