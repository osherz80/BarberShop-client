<template>
  <v-card class="pics-card" elevation="10" shaped>
    <v-carousel
      reverse-transition="fade-transition"
      transition="fade-transition"
      cycle
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="(pic, i) in pics"
        :key="i"
        :src="pic.src"
      ></v-carousel-item>
    </v-carousel>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      pics: [
        {
          src: "https://cdn.pixabay.com/photo/2015/09/11/05/07/barber-935324_960_720.jpg",
        },
        {
          src: "https://cdn.pixabay.com/photo/2018/02/22/17/09/barber-shop-3173422_960_720.jpg",
        },
        {
          src: "https://cdn.pixabay.com/photo/2020/05/24/01/55/barber-shop-in-iran-5212053_960_720.jpg",
        },
        {
          src: "https://cdn.pixabay.com/photo/2020/08/18/05/46/barber-5497152_960_720.jpg",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.pics-card {
  width: 45%;
  height: fit-content;
}
</style>