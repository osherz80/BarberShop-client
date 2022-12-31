<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          width="50%"
          v-bind="attrs"
          v-on="on"
          @click="changeDropdownIcon"
        >
          <v-icon v-if="isClosed"> mdi-chevron-down </v-icon>
          <v-icon v-else> mdi-chevron-up </v-icon>
          {{ searchParameter }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item-group color="var(--systemPurple)">
          <DropdownItem v-for="(item, i) in items" :key="i" :item="item" />
        </v-list-item-group>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { eventBus } from "@/main";
import DropdownItem from "@/components/DropdownItem.vue";

export default {
  name: "DropDown",
  data: () => ({
    searchParameter: "שם פרטי",
    isClosed: true,
  }),
  props: ["items"],
  components: {
    DropdownItem,
  },
  created() {
    eventBus.$on("setDropdownTitle", (title) => {
      this.searchParameter = title;
    });
    eventBus.$on("setDropdownIcon", () => {
      this.changeDropdownIcon();
    });
  },
  methods: {
    changeDropdownIcon() {
      this.isClosed = !this.isClosed;
    },
  },
};
</script>

<style lang="scss" scoped>
.v-icon {
  margin-right: auto;
}

.v-btn__content {
  padding-right: 10%;
}
</style>