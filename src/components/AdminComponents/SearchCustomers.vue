<template>
  <v-card>
    <v-system-bar></v-system-bar>
    <v-row class="search-row">
      <v-col cols="12" md="3">
        <Dropdown :items="parametersList" />
      </v-col>
      <v-col cols="12" md="8" class="pb-0 pt-5">
        <v-text-field
          v-model="searchValue"
          outlined
          clearable
          @input="filterCustomersList"
        ></v-text-field>
      </v-col>
      <v-col></v-col>
      <v-col></v-col>
    </v-row>
    <v-card-text class="grey lighten-4">
      <v-sheet v-if="filteredList.length == 0" class="not-found-sheet">
        <div class="not-found">
          <v-icon class="not-found-icon">mdi-calendar-remove-outline</v-icon>
          <p style="font-size: large">לא מצאנו מה שחיפשת</p>
        </div>
      </v-sheet>
      <v-sheet v-else class="records-container">
        <CustomersList :customers-list="filteredList" />
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
// import DatePicker from "@/components/DatePicker.vue";
import { eventBus } from "@/main";
import requests from "@/axios/requests";
import Dropdown from "@/components/Dropdown.vue";
import CustomersList from "@/components/AdminComponents/CustomersList.vue";

export default {
  name: "SearchAppointments",
  data: () => ({
    searchValue: "",
    searchParameter: "firstName",
    startDateId: Math.random(),
    endDateId: Math.random(),
    endDate: new Date(),
    startDate: new Date(),
    appointments: [],
    originalCustomerList: [],
    filteredList: [],
    parametersList: [
      { title: "שם פרטי", value: "firstName" },
      { title: "שם משפחה", value: "lastName" },
      { title: "פלאפון", value: "phoneNum" },
      { title: "אימייל", value: "email" },
    ],
  }),
  components: {
    // DatePicker,
    Dropdown,
    CustomersList,
  },
  created() {
    this.getAllCustomers();
    eventBus.$on(`setDropdownValue`, (dropdownValue) => {
      this.searchParameter = dropdownValue;
      console.log("this.searchParameter", this.searchParameter);
    });
  },
  methods: {
    async getAllCustomers() {
      this.originalCustomerList = (await requests.user.getAllCustomers()).data;
      this.filteredList = this.originalCustomerList;
      console.log(this.filteredList);
    },
    filterCustomersList() {
      console.log("this.searchValue", this.searchValue);
      if (!this.searchValue) {
        this.filteredList = this.originalCustomerList;
        return;
      }
      this.filteredList = this.originalCustomerList.filter((person) => {
        console.log(
          "person[this.searchParameter]",
          person[this.searchParameter]
        );
        console.log(
          "person[this.searchParameter].includes(this.searchValue)",
          person[this.searchParameter].includes(this.searchValue)
        );
        if (person[this.searchParameter].includes(this.searchValue)) {
          return person;
        }
      });
      console.log("this.filteredList", this.filteredList);
    },
  },
};
</script>

    
<style lang="scss" scoped>
.data-panels-container {
  direction: rtl;
}

.search-row {
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-around;
  margin: 0 !important;
  padding: 10px;
}

.records-container {
  min-height: 250;
  max-height: 40vh;
  overflow: auto;
}

.not-found-sheet {
  margin-right: auto !important;
  margin-left: auto !important;
  height: 300px;
  max-width: 800px;
  display: grid;
  align-items: center;
}

.not-found-icon {
  font-size: 1300%;
}
</style>