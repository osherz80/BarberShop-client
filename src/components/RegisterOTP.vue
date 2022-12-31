<template>
  <v-container class="otp-container">
    <v-row class="justify-center">
      <v-col cols="12" md="6" class="">
        <v-otp-input v-model="code" @finish="checkIfValid"></v-otp-input>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { eventBus } from "@/main";
export default {
  name: "registerOTP",
  data: () => ({
    code: "",
  }),
  methods: {
    async checkIfValid() {
      eventBus.$emit("setOTPCode", this.code);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>