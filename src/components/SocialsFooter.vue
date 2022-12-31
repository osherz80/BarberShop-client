<template>
  <v-footer dark padless>
    <v-card flat tile class="white--text text-center">
      <v-card-text>
        <v-btn
          v-for="app in socials"
          :key="app.name"
          @click="goTo(app.link)"
          class="m-4 white--text"
          color="var(--systemPurple)"
        >
          <v-icon size="24px">
            {{ app.icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
        Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
        accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a
        sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
        lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus
        iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor
        vel ut orci. Orci varius natoque penatibus et magnis dis parturient
        montes, nascetur ridiculus mus.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} —
        <strong class="white--text">barber Inc.</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "app-footer",
  data: () => ({
    socials: [
      {
        name: "reddit",
        icon: "mdi-reddit",
        link: "ttps://www.reddit.com/",
      },
      {
        name: "instagram",
        icon: "mdi-instagram",
        link: "https://www.instagram.com/",
      },
      {
        name: "facebook",
        icon: "mdi-facebook",
        link: "https://he-il.facebook.com/",
      },
      {
        name: "twitter",
        icon: "mdi-twitter",
        link: "https://twitter.com",
      },
    ],
  }),
  methods: {
    goTo(link) {
      window.location.replace(link);
    },
  },
};
</script>

<style scoped>
.footer {
  background-color: black;
  height: fit-content;
  max-height: 25vh;
  margin-top: auto;
}
</style>