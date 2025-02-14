<template>
  <v-container>
    <BaseBreadcrumb :breadcrumbItems="breadcrumbItems" />
    <section class="p-4 bg-white border border-secondary-clr rounded-xl">
      <MainHeader :title="$t('TITLES.Patients.info')" />
      <EditPatientForm />
    </section>
  </v-container>
</template>

<script setup>
const { t, locale } = useI18n();
const localePath = useLocalePath();
const route = useRoute();

const patientsStore = usePatientsStore();
const { patientData } = storeToRefs(patientsStore);

const { data, error } = await useBaseFetch(
  "GET",
  `patients/${route?.params?.id}`,
  locale.value
);
if (!error.value) {
  patientsStore.setPatientData(data.value?.data);
}

const breadcrumbItems = computed(() => [
  {
    title: t("TITLES.Patients.title"),
    disabled: false,
    to: localePath("/doctor/patients"),
  },
  {
    title: patientData?.value.info.name || t("TITLES.Patients.view"),
    disabled: false,
    to: localePath(`/doctor/patients/${route?.params?.id}`),
  },
  {
    title: t("TITLES.Patients.edit"),
    disabled: true,
    to: localePath(`/doctor/patients/${route?.params?.id}/edit`),
  },
]);
</script>
