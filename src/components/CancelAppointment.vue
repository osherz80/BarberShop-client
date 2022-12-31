<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col> ?האם אתה בטוח שברצונך לבטל פגישה זו </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn color="green accent-4" @click="cancelAppointment">
            <v-icon>mdi-check</v-icon>
            כן
          </v-btn>
        </v-col>
        <v-col>
          <v-btn color="red darken-4" @click="closeCancel">
            <v-icon>mdi-close</v-icon>
            לא
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import requests from "@/axios/requests";
import { eventBus } from "@/main";

export default {
  name: "CancelAppointment",
  data: () => ({}),
  props: ["id"],
  methods: {
    async cancelAppointment() {
      await requests.appointment.cancelAppointment(this.id);
      eventBus.$emit("removeAppointmentFromList", this.id);
      this.closeCancel();
    },
    closeCancel() {
      eventBus.$emit("customCloseAllCancel");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>