<template>
  <div class="fluid">
    <v-card class="sidebar-card">
      <v-navigation-drawer width="100%" permanent>
        <v-list>
          <v-list-item v-for="([icon, text, menu], i) in items" :key="i" link>
            <v-list-item @click="openMenu(menu)">
              <v-list-item-icon>
                <v-icon>{{ icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
    <div class="menues-container">
      <ChangeHours v-if="menues.hours" />
      <SearchAppointments v-if="menues.appointments" />
      <SearchCustomers v-if="menues.customers" />
    </div>
  </div>
</template>


<script>
import ChangeHours from "@/components/AdminComponents/ChangeHours.vue";
import SearchAppointments from "@/components/AdminComponents/SearchAppointments.vue";
import SearchCustomers from "@/components/AdminComponents/SearchCustomers.vue";

export default {
  name: "admin-vue",
  data: () => ({
    items: [
      ["mdi-clock", "שעות פתיחה", "hours"],
      ["mdi-calendar", "חיפוש תורים", "appointments"],
      ["mdi-account-box", "חיפוש לקוחות", "customers"],
    ],
    menues: {
      hours: false,
      appointments: false,
      customers: true,
    },
  }),
  components: {
    ChangeHours,
    SearchAppointments,
    SearchCustomers,
  },
  methods: {
    openMenu(menueKey) {
      this.closeAll();
      this.menues[menueKey] = true;
    },
    closeAll() {
      for (const menu in this.menues) {
        this.menues[menu] = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.fluid {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
  margin: 50px 0;
}
.sidebar-card {
  height: 100%;
  width: 15vw;
}
.menues-container {
  width: 66vw;
  margin: 0 auto;
}
</style>