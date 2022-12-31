<template>
  <v-list-item @click="saveValue">
    <v-list-item-content>
      <v-list-item-title>
        {{ item.title }}
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { eventBus } from "@/main";

export default {
  name: "DropdownItem",
  data: () => ({}),
  props: ["item"],
  methods: {
    saveValue() {
      eventBus.$emit("setDropdownTitle", this.item.title);
      eventBus.$emit("setDropdownValue", this.item.value);
      eventBus.$emit("setDropdownIcon");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>