<template>
  <v-card
    class="d-flex align-center justify-center pb-4 login-card"
    color="grey darken-4"
    style="width: 66vw"
    height="400px"
  >
    <v-system-bar
      color="grey darken-4"
      dark
      tile
      style="height: 15%; width: 100%"
      class="v-stepper__header d-flex align-center justify-center"
    >
      <v-toolbar-title>הזן פרטי התחברות</v-toolbar-title>
    </v-system-bar>
    <v-card
      class="d-flex justify-center px-5 login-info-card"
      height="200px"
      style="width: 66%"
    >
      <v-container class="input-container">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="email"
              label="אימייל"
              required
              outlined
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="phoneNum"
              label="פלאפון"
              :counter="10"
              required
              outlined
              clearable
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <div
      class="d-flex align-center justify-center"
      style="justify-content: space-around !important; width: 100%"
    >
      <v-btn @click="closeLoginComp">
        <v-icon class="mr-2"> mdi-backspace </v-icon>
        חזור
      </v-btn>

      <v-btn @click="logInAndEnter">
        התחבר
        <v-icon class="ml-2"> mdi-backspace-reverse </v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import store from "@/store";
import requests from "@/axios/requests";
import { mapActions } from "vuex";
import swal from "sweetalert";
import { eventBus } from "@/main";

export default {
  name: "login-comp",
  data: () => ({
    email: "",
    phoneNum: "",
  }),
  methods: {
    ...mapActions([
      "initPersonInfo",
      "ChangeIsRegistered",
      "initTreatmentsList",
    ]),
    async logInAndEnter() {
      try {
        const personId = await this.getAndSetPersonInfo();
        await this.getAndSetToken(personId);
        eventBus.$emit("getAppointmentsOnLogin");
        store.dispatch("ChangeIsRegistered", true);
        this.closeLoginComp();
        swal({
          title: "!הידד",
          text: "התחברת בהצלחה",
          icon: "success",
          button: "אוקיי",
        });
      } catch (err) {
        swal({
          title: "!שגיאה",
          text: "המשתמש שהזנת שגוי/לא קיים במערכת",
          icon: "error",
          button: "אוקיי",
        });
      }
    },
    async getTreatmentsList() {
      const list = (await requests.treatment.getAllTreatments()).data;
      this.initTreatmentsList(list);
    },
    closeLoginComp() {
      eventBus.$emit("customLoginClose");
    },
    async getAndSetPersonInfo() {
      const person = (await requests.user.logIn(this.email, this.phoneNum))
        .data;
      this.setPersonInfo(person);
      return person.id;
    },
    setPersonInfo(person) {
      store.dispatch("initPersonInfo", {
        firstName: person.firstName,
        lastName: person.lastName,
        email: person.email,
        phoneNum: person.phoneNum,
      });
    },
    async getAndSetToken(personId) {
      const token = (await requests.user.getLoginTokin(personId)).data;
      localStorage.setItem("barberIncUserToken", token);
    },
  },
};
</script>

<style scoped>
.login-card {
  flex-direction: column;
  justify-content: space-between !important;
}

.login-info-card {
  flex-direction: column !important;
}

.input-container {
  display: grid;
  align-items: center;
}
</style>