<template>
  <div class="app-nav">
    <div class="nav-container">
      <v-row no-gutters style="color: white" class="p-4">
        <v-col>
          <div class="d-flex align-center ml-8">
            <v-toolbar-title v-if="userConnected"
              >hi {{ userName }}
              <v-icon large>mdi-content-cut</v-icon>
            </v-toolbar-title>
            <v-toolbar-title v-else>
              Barber Inc.
              <v-icon large>mdi-hair-dryer-outline</v-icon>
            </v-toolbar-title>
          </div>
        </v-col>
        <v-spacer></v-spacer>
        <v-col>
          <div class="d-flex align-center justify-end">
            <v-btn
              @click="navLogut"
              dark
              style="background: var(--systemPurple)"
              v-if="userConnected"
            >
              <span class="mr-2">התנתק</span>
              <v-icon>mdi-logout</v-icon>
            </v-btn>

            <v-btn
              dark
              @click="openRegister"
              style="background: var(--systemPurple)"
              v-else
            >
              <span class="mr-2">הרשם/התחבר</span>
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row class="d-flex align-center justify-center">
        <v-col v-if="showIcon">
          <img src="../assets/barber.jpg" />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="nav-links-col">
          <div class="card links-card">
            <footer class="card-footer">
              <v-tab href="/map" class="card-footer-item">מפה</v-tab>
              <a href="/" class="card-footer-item">דף הבית</a>
              <a href="/hours" class="card-footer-item">שעות פתיחה</a>
            </footer>
          </div>
        </v-col>
      </v-row>
    </div>

    <v-overlay :z-index="overlayZIndex" :value="isRegisterOpen">
      <Register></Register>
      <div class="d-flex align-center justify-center login-container">
        <small> ?כבר יש לך חשבון </small>
        <v-btn class="mt-2" @click="openLogIn">התחבר</v-btn>
      </div>
    </v-overlay>
    <v-overlay
      :z-index="overlayZIndex"
      :value="isLoginOpen"
      @click.self="closeLogin"
    >
      <Login></Login>
    </v-overlay>
  </div>
</template>

<script>
import { eventBus } from "../main";
import Register from "../components/Register.vue";
import Login from "../components/Login.vue";
import { mapActions, mapState } from "vuex";
import store from "../store";

export default {
  name: "Navbar-comp",
  data: () => ({
    isRegisterOpen: false,
    isLoginOpen: false,
    overlayZIndex: 2,
  }),
  components: {
    Register,
    Login,
  },
  computed: {
    ...mapState(["isRegistered", "PersonInfo", "showNavIocn"]),
    userConnected() {
      return this.isRegistered;
    },
    userName() {
      return this.PersonInfo.firstName;
    },
    showIcon() {
      return this.showNavIocn;
    },
  },
  created() {
    eventBus.$on("customClose", () => {
      this.closeRegister();
    });
    eventBus.$on("customOpenRegister", () => {
      this.openRegister();
    });
    eventBus.$on("customLoginClose", () => {
      this.closeLogin();
    });
  },
  methods: {
    ...mapActions(["ChangeIsRegistered"]),
    openRegister() {
      this.isRegisterOpen = true;
    },
    closeRegister() {
      this.isRegisterOpen = false;
    },
    openLogIn() {
      this.closeRegister();
      this.isLoginOpen = true;
    },
    closeLogin() {
      this.isLoginOpen = false;
    },
    navLogut() {
      store.dispatch("ChangeIsRegistered", false);
      localStorage.removeItem("barberIncUserToken");
    },
  },
};
</script>

<style scoped>
.app-nav {
  min-height: 30vh;
  height: fit-content;
  /* background-color: var(--systemPurple); */
  background-image: url("https://cdn.pixabay.com/photo/2020/05/24/02/00/barber-shop-5212059_960_720.jpg");
  background-position: center;
  background-size: cover;
}

.nav-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.nav-links-col {
  background: white;
}

.links-card {
  border-bottom-right-radius: 30%;
  border-bottom-left-radius: 30%;
}

.login-container {
  margin-top: 2vh;
  flex-direction: column;
}
</style>