<template>
  <v-container>
    <BaseBreadcrumb
      :breadcrumbItems="breadcrumbItems"
     
    />
    <section class="p-4 bg-white border border-secondary-clr rounded-xl">
      <PatientProfile @editForm="toggleHistoryEdit" @close="toggleHistoryEdit" :openEditForm="openEditForm" :title="$t('TITLES.Patients.vital.profile')" />
      <HistoryStatistics @close="toggleHistoryEdit" :openEditForm="openEditForm" />
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
const toggleHistoryEdit = () => {
  openEditForm.value = !openEditForm.value
}

const { data, error } = await useBaseFetch(
  "GET",
  `patients/${id}/health-history`,
  locale.value
);
if(!error.value) {
  patientsStore.setPatientHistory(data.value?.data);
};

const breadcrumbItems = computed(() => [
  {
    title: t("TITLES.Patients.title"),
    disabled: false,
    to: localePath("/doctor/patients"),
  },
  {
    title: patientInfo?.value?.name || t("TITLES.Patients.view"),
    disabled: false,
    to: localePath(`/doctor/patients/${id}`),
  },
  {
    title: openEditForm.value ? t("TITLES.Patients.history.edit") : t("TITLES.Patients.history.profile"),
    disabled: true,
    to: localePath(`/doctor/patients/${id}/history`),
  },
]);
</script>