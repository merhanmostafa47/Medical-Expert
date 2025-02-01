<template>
  <article>
    <MainHeader :title="$t('TITLES.Patients.vital.statistics')" />
    <transition name="fadeIn">
      <v-row class="m-0" v-if="!openEditForm">
          <infoCard
            v-for="(value, key) in patientVitals"
            :key="key"
            lg="3"
            md="4"
            sm="6"
            cols="12"
            :title="$t(`TITLES.Patients.vital.${key}`)" 
            :desc="value || '-'"
          />
      </v-row>
      <VitalStatisticsEdit @close="$emit('close')" v-else />
    </transition>
  </article>
</template>

<script setup>
defineEmits(['close'])
defineProps({
  openEditForm: {
    type: Boolean,
    required: false
  }
});

const patientsStore = usePatientsStore();
const { patientVitals } = storeToRefs(patientsStore);
</script>

<style lang="postcss" scoped>

</style>