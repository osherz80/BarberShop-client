<template>
  <v-card>
    <v-card-title>
      <h4>{{ day.name }}</h4>
    </v-card-title>
    <div class="btns-div">
      <v-switch
        :input-value="day.isOpen"
        :label="day.isOpen ? 'פתוח' : 'סגור'"
        class="pl-4 mt-0"
        @change="closeWorkingDay(index)"
      />
      <v-btn color="primary" v-if="isChanged" @click="saveChanges">שמור</v-btn>
    </div>
    <v-divider></v-divider>
    <v-list v-if="day.isOpen" dense>
      <v-list-item>
        <v-list-item-content>
          <v-text-field
            v-model="openHour"
            label="פתיחה"
            :placeholder="day.open.toString()"
            outlined
            :rules="changeRules"
            @input="openSave"
          ></v-text-field>
          <v-text-field
            v-model="closeHour"
            label="סגירה"
            :placeholder="day.close.toString()"
            outlined
            :rules="changeRules"
            @input="openSave"
          ></v-text-field>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
// import { eventBus } from "@/main";
import { mapActions } from "vuex";
export default {
  name: "day-profile",
  data: () => ({
    isChanged: false,
    openHour: 0,
    closeHour: 0,
    openBeforeChange: 0,
    closeBeforeChange: 0,
    changeRules: [
      (v) => {
        if (v > 24) {
          return "הכנס 24 או פחות";
        }
        return true;
      },
      (v) => {
        if (v <= 0) {
          return "הכנס 1 או יותר";
        }
        return true;
      },
      (v) => /^\d*$/.test(v) || "מספרים בלבד",
    ],
  }),
  props: ["day", "index"],
  created() {
    this.openHour = this.day.open;
    this.closeHour = this.day.close;
    this.openBeforeChange = this.day.open;
    this.closeBeforeChange = this.day.close;
  },
  methods: {
    ...mapActions(["openDay", "closeDay", "changeDayHours"]),
    closeWorkingDay(index) {
      this.day.isOpen ? this.closeDay(index) : this.openDay(index);
    },
    openSave() {
      if (
        this.openHour > 24 ||
        this.closeHour > 24 ||
        this.openHour <= 0 ||
        this.closeHour <= 0 ||
        !/^\d*$/.test(this.openHour) ||
        !/^\d*$/.test(this.closeHour)
      ) {
        this.isChanged = false;
      } else {
        if (
          this.openHour != this.openBeforeChange ||
          this.closeHour != this.closeBeforeChange
        ) {
          this.openHour = parseInt(this.openHour);
          this.closeHour = parseInt(this.closeHour);
          this.isChanged = true;
        }
      }
    },
    saveChanges() {
      this.changeDayHours({
        index: this.index,
        open: this.openHour,
        close: this.closeHour,
      });
      // this.day.open = this.openHour;
      // this.day.close = this.closeHour;
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card__title {
  flex-direction: row-reverse;
}
.btns-div {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  // padding-right: 15px;
  padding: 0 15px;
}
</style>