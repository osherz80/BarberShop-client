<template>
  <v-app>
    <Navbar />
    <router-view />
    <SocialsFooter />
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import SocialsFooter from "./components/SocialsFooter.vue";
import { mapActions } from "vuex";
import requests from "@/axios/requests";

export default {
  components: {
    Navbar,
    SocialsFooter,
  },
  created() {
    this.checkIfRegistered();
  },
  methods: {
    ...mapActions([
      "ChangeIsRegistered",
      "initTreatmentsList",
      "initPersonInfo",
    ]),
    async checkIfRegistered() {
      if (localStorage.getItem("barberIncUserToken")) {
        const person = (await requests.user.getCurrentUser()).data;
        this.initPersonInfo(person);
        this.ChangeIsRegistered(true);
        this.getTreatmentsList();
      }
    },
    async getTreatmentsList() {
      const list = (await requests.treatment.getAllTreatments()).data;
      this.initTreatmentsList(list);
    },
  },
};
</script>

<style lang="scss">
:root {
  --systemPurple: rgb(142 116 177);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

::-webkit-scrollbar {
  height: 5px;
  width: 4px;
  position: relative;
  bottom: 20px;
}

::-webkit-scrollbar-track {
  background: #d3d3d3;
}

::-webkit-scrollbar-thumb {
  background: #888;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.v-application--wrap {
  justify-content: space-between;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.vc-weeks {
  direction: rtl !important;
}
</style>
