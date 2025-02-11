<template>
  <v-container>
    <!-- <BaseBreadcrumb
      :breadcrumbItems="breadcrumbItems"
    /> -->
    <section class="bg-white border-secondary-clr border-2 border-md rounded-xl p-4">
      <MainHeader class="flex justify-between items-center" :title="$t('TITLES.Patients.prescription.add')" />
      <AddPrescription />
    </section>
  </v-container>
</template>

<script setup>
</script>

<style lang="postcss" scoped>

</style>