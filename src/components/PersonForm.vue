<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="firstName"
          :rules="nameRules"
          label="שם פרטי"
          required
          outlined
          clearable
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="lastName"
          :rules="nameRules"
          label="שם משפחה"
          required
          outlined
          clearable
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="אימייל"
          required
          outlined
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="phoneNum"
          :rules="phoneNumRules"
          label="פלאפון"
          :counter="10"
          required
          outlined
          clearable
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { eventBus } from "../main";

export default {
  name: "PersonForm",
  data: () => ({
    valid: false,
    firstName: "test4",
    lastName: "junior",
    nameRules: [(v) => !!v || "שדה זה הוא חובה"],
    email: "testjunior4@gmail.com",
    emailRules: [
      (v) => !!v || "שדה זה הוא חובה",
      (v) => /^[\w\d]*@[\w]*.[\w]*/.test(v) || "E-mail must be valid",
    ],
    phoneNum: "0584006013",
    phoneNumRules: [
      (v) => !!v || "שדה זה הוא חובה",
      (v) => /^(05)\d{8}$/.test(v) || "phone must be a real number",
    ],
  }),
  created() {
    eventBus.$on("getInfo", () => {
      sessionStorage.setItem(
        "personInfo",
        JSON.stringify({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phoneNum: this.phoneNum,
        })
      );
    });
  },
};
</script>

<style lang="scss" scoped>
</style>