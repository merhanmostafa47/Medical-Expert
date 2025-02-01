<template>
  <v-row>
    <v-col
      v-for="(item, index) in allPatients"
      :key="index"
      cols="12" sm="6" md="4" lg="3"
      class="patient-card"
    >
      <v-card
        :prepend-avatar="item.image_url || '/media/icons/user-placeholder.png'"
        :title="item.name"
        :subtitle="item.user_id"
        class="!rounded-[1rem] !shadow-lg"
      >
        <v-card-text>
          <div class="mb-3"><p class="text-secondary-clr">Age</p><p class="text-main-clr font-bold">{{ item.dob }}</p></div>
          <div class="mb-3"><p class="text-secondary-clr">Gender</p><p class="text-main-clr font-bold">{{ item.gender }}</p></div>
          <div class="mb-3"><p class="text-secondary-clr">Phone</p><p class="text-main-clr font-bold">{{ item.phone }}</p></div>
        </v-card-text>
        <v-card-actions>
          <NuxtLink class="p-4 text-center bg-opacity-bg text-main-clr w-full !rounded-xl hover:!bg-main-clr hover:!text-white transition duration-300" :to="localePath(`/doctor/patients/${item.user_id}`)">View Details</NuxtLink>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
const patientsStore = usePatientsStore();
const  { allPatients, pagination } = storeToRefs(patientsStore);
</script>

<style lang="postcss">
  .patient-card .v-card {
    &-title {
      @apply text-main-clr;
    }
    &-subtitle {
      @apply text-secondary-clr;
    }
  }
</style>