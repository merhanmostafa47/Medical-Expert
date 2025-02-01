<template>
  <v-container>
    <BaseBreadcrumb :breadcrumbItems="breadcrumbItems" />
    <ViewPatient />
  </v-container>
</template>

<script setup>
const { t, locale } = useI18n();
const localePath = useLocalePath();

const route = useRoute();
const id = route?.params?.id;

const patientsStore = usePatientsStore();
const { patientData } = storeToRefs(patientsStore);

const { data, error } = await useBaseFetch(
  "GET",
  `patients/${id}`,
  locale.value
);
if (!error.value) {
  patientsStore.setPatientData(data.value?.data)
}

const breadcrumbItems = computed(() => [
  {
    title: t("TITLES.Patients.title"),
    disabled: false,
    to: localePath("/doctor/patients"),
  },
  {
    title: patientData.value?.info?.name || t("TITLES.Patients.view"),
    disabled: true,
    to: localePath(`/doctor/patients/${id}`),
  },
]);
</script>

