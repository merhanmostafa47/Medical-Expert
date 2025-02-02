<template>
  <v-container>
    <BaseBreadcrumb
      :breadcrumbItems="breadcrumbItems"
    />
    <section class="bg-white border-secondary-clr border-2 border-md rounded-xl p-4">
      <PatientProfile @editForm="toggleVitalForm" @close="toggleVitalForm" :openEditForm="openEditForm" :title="$t('TITLES.Patients.vital.profile')" />
      <VitalStatistics @close="toggleVitalForm" :openEditForm="openEditForm"  />
    </section>
  </v-container>
</template>

<script setup> 
const { t, locale } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const id = route?.params?.id;

const patientsStore = usePatientsStore();
const { patientInfo } = storeToRefs(patientsStore);

const openEditForm = ref(false);
const toggleVitalForm = () => {
  openEditForm.value = !openEditForm.value
}

const { data, error } = await useBaseFetch(
  "GET",
  `patients/${id}/vital-profile`,
  locale.value
);
if(!error.value) {
  patientsStore.setPatientVitals(data.value?.data);
};

const breadcrumbItems = computed(() => [
  {
    title: t("TITLES.Patients.title"),
    disabled: false,
    to: localePath("/doctor/patients"),
  },
  {
    title: patientInfo?.value?.name,
    disabled: false,
    to: localePath(`/doctor/patients/${id}`),
  },
  {
    title: openEditForm.value ? t("TITLES.Patients.vital.edit") : t("TITLES.Patients.vital.profile"),
    disabled: true,
    to: localePath(`/doctor/patients/${id}/vital`),
  },
]);
</script>

<style lang="postcss" scoped>
  .action-btns {
    @apply flex flex-wrap justify-center gap-3;
    @apply flex flex-wrap gap-3;
    a {
      @apply bg-white border-2 text-center border-secondary-clr px-4 py-3 !leading-none rounded-xl content-center hover:text-white hover:bg-secondary-clr transition duration-300
    }
  }
</style>