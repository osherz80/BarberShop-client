<template>
  <v-stepper class="pb-5" style="width: 66vw" v-model="stage">
    <v-stepper-header>
      <v-stepper-step
        :complete="stage > 1"
        step="1"
        color="var(--systemPurple)"
      >
        הכנס פרטים
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="2" color="var(--systemPurple)">
        אימות
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="mb-12" height="200px">
          <person-form />
        </v-card>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-12 pt-5" height="200px">
          <RegisterOTP />
        </v-card>
        <v-badge bordered color="error" overlap :content="countDown">
          <v-btn
            class="white--text"
            color="error"
            depressed
            :disabled="isDisabled"
            @click="codeNotSent"
          >
            לא קיבלתי קוד, שלח לי חדש
          </v-btn>
        </v-badge>
      </v-stepper-content>
    </v-stepper-items>

    <div
      class="d-flex align-center justify-center"
      style="justify-content: space-around !important; width: 100%"
    >
      <v-btn @click="returnStage">
        <v-icon class="mr-2"> mdi-backspace </v-icon>
        {{ stage === 1 ? "צא" : "חזור" }}
      </v-btn>

      <v-btn @click="next">
        {{ stage < maxStage ? "הבא" : "סיום" }}
        <v-icon class="ml-2"> mdi-backspace-reverse </v-icon>
      </v-btn>
    </div>
    <v-overlay absolute :value="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-overlay>
  </v-stepper>
</template>


<script>
import { eventBus } from "../main";
import { mapActions } from "vuex";
import swal from "sweetalert";
import requests from "../axios/requests";
import store from "../store";
import PersonForm from "./PersonForm.vue";
import RegisterOTP from "./RegisterOTP.vue";

export default {
  name: "Register-comp",
  data() {
    return {
      loading: false,
      code: "",
      isDisabled: true,
      stage: 1,
      maxStage: 2,
      countDown: 60,
      personInfo: {},
    };
  },
  components: {
    PersonForm,
    RegisterOTP,
  },
  created() {
    eventBus.$on("setOTPCode", (code) => {
      this.checkIfValid(code);
    });
  },
  methods: {
    ...mapActions(["initPersonInfo", "ChangeIsRegistered"]),
    next() {
      switch (this.stage) {
        case 1:
          eventBus.$emit("getInfo");
          this.personInfo = JSON.parse(sessionStorage.getItem("personInfo"));
          console.log("got info", this.personInfo);
          sessionStorage.removeItem("personInfo");
          this.nextWithCode();
          break;
        case 2:
          if (!this.checkIfValid()) {
            this.close();
          }
          break;
      }
    },
    nextWithCode() {
      this.sendCode();
      this.countDownTimer();
      this.stage += 1;
    },
    returnStage() {
      this.stage -= 1;
      if (this.stage <= 0) {
        this.stage = 1;
        this.close();
      }
    },
    close() {
      eventBus.$emit("customClose");
    },
    sendCode() {
      requests.register.getSmsCode(this.personInfo.phoneNum);
    },
    async authCode(phoneNum, code) {
      const res = (await requests.register.authSmsCode(phoneNum, code)).data;
      return res;
    },
    codeNotSent() {
      this.countDown = 60;
      this.isDisabled = true;
      this.sendCode();
      this.countDownTimer();
    },
    async register() {
      try {
        const res = await this.addPerson(this.personInfo);
        store.dispatch("initPersonInfo", this.personInfo);
        store.dispatch("ChangeIsRegistered", true);
        localStorage.setItem("barberIncUserToken", res);
        swal({
          title: "!הידד",
          text: "נרשמת בהצלחה",
          icon: "success",
          button: "אוקיי",
        });
      } catch (err) {
        swal({
          title: "!שגיאה",
          text: "משהו השתבש אנא נסה מאוחר יותר",
          icon: "error",
          button: "אוקיי",
        });
      }
    },
    async addPerson(personInfo) {
      return (await requests.register.addPerson(personInfo)).data;
    },
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      } else {
        this.isDisabled = false;
      }
    },
    async checkIfValid(code) {
      if (/^\d{6}$/.test(code)) {
        const codeCheck = await this.authCode(this.personInfo.phoneNum, code);
        if (codeCheck.valid) {
          this.loading = true;
          await this.register();
          this.loading = false;
          this.close();
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.input-card {
  background: gainsboro;
}
.info-input {
  background-color: white;
  color: black;
}
.otp-container {
  height: 100%;
  width: 100%;
}
div.otp-container * {
  height: 100% !important;
  width: 100% !important;
}
</style>