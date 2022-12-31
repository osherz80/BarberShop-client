<template>
  <v-list>
    <v-list-item v-for="(person, i) in customersList" :key="i">
      <v-list-item-content>
        <v-row>
          <v-col>
            <div class="field-info">
              <span class="info-text"
                >{{ person.firstName }} {{ person.lastName }}</span
              >
              <v-chip class="ma-2" color="green" outlined>
                <bdi>שם:</bdi>
              </v-chip>
            </div>
          </v-col>
          <v-col>
            <div class="field-info">
              <span class="info-text">{{ person.phoneNum }}</span>
              <v-chip class="ma-2" color="green" outlined>
                <bdi>פלאפון:</bdi>
              </v-chip>
            </div>
          </v-col>
          <v-col>
            <div class="field-info">
              <span class="info-text">{{ person.email }}</span>
              <v-chip class="ma-2" color="green" outlined>
                <bdi>אימייל:</bdi>
              </v-chip>
            </div>
          </v-col>

          <v-col>
            <div class="field-info">
              <span class="info-text">{{
                formatDateString(person.joinDate)
              }}</span>
              <v-chip class="ma-2" color="green" outlined>
                <bdi>תאריך הרשמה:</bdi>
              </v-chip>
            </div>
          </v-col>
        </v-row>
        <div v-if="i < customersList.length - 1" class="record-divider"></div>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "CustomersList",
  data: () => ({}),
  props: ["customersList"],
  methods: {
    formatDateString(date) {
      if (date) {
        date = new Date(date);
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
      } else {
        return "None";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.row {
  flex-direction: row-reverse;
}
.field-info {
  display: flex;
  align-items: center;
  justify-content: center;
}

.record-divider {
  height: 1px;
  width: 80%;
  background: gainsboro;
}
</style>