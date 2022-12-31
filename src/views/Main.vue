<template>
  <v-main>
    <v-card class="about-card" elevation="10" outlined shaped>
      <v-chip class="ma-2" color="pink" label text-color="white">
        Barber Inc. קצת על
        <v-icon right> mdi-label </v-icon>
      </v-chip>
      <v-card-text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum dolores
        totam explicabo autem, nesciunt maxime accusamus, eveniet dolor nisi
        cupiditate neque earum omnis. Nesciunt tempore vel quas, dolorum, atque
        similique nam praesentium deleniti earum provident consequuntur quis,
        vero tenetur officia at necessitatibus autem. Fugit inventore dolores
        consequatur, repellendus doloribus voluptatem quidem sit voluptatum
        porro, expedita magnam cupiditate excepturi, vitae officia hic. Beatae
        praesentium nemo, eum libero non quas omnis obcaecati similique quisquam
        delectus. Magni voluptatem dolorum minima perspiciatis, beatae aliquam
        neque nostrum voluptatibus laudantium consequatur quas omnis molestias
        vitae atque velit aut error earum officia sunt, repellat enim facere.
        Quaerat.
      </v-card-text>
    </v-card>
    <v-row class="d-flex align-center justify-center">
      <v-col>
        <v-btn
          class="order-btn"
          color="pink"
          elevation="10"
          :disabled="!userConnected"
          href="/reservation"
        >
          הזמן תור
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="d-flex align-center justify-center">
      <v-col class="mb-12">
        <small v-if="!userConnected"
          >יש
          <a @click="openRegister">להרשם/להתחבר</a>
          לפני שתוכלו להזמין תור
        </small>
      </v-col>
    </v-row>
    <v-row class="bottom-section">
      <PicsShow />
      <AppointmentsInfo />
    </v-row>
  </v-main>
</template>

<script>
import PicsShow from "@/components/picsShow.vue";
import AppointmentsInfo from "@/components/AppointmentsInfo.vue";
import { eventBus } from "../main";
import { mapState } from "vuex";

export default {
  name: "main-view",
  data: () => ({}),
  components: {
    PicsShow,
    AppointmentsInfo,
  },
  computed: {
    ...mapState(["isRegistered"]),
    userConnected() {
      return this.isRegistered;
    },
  },
  watch: {
    userConnected(newValue /*, oldValue*/) {
      this.userConnected = newValue;
    },
  },
  methods: {
    openRegister() {
      eventBus.$emit("customOpenRegister");
    },
  },
};
</script>

<style scoped>
.v-main {
  margin-top: 15vh;
}
.about-card {
  width: 66vw;
  min-height: 200px;
  margin: 10vh auto;
}

.order-btn {
  color: white;
}

.bottom-section {
  width: 100vw;
  margin-bottom: 5%;
  height: 600px;
  align-items: center;
  justify-content: space-evenly;
}
</style>