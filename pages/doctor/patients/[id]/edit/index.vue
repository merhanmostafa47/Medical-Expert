<template>
  <v-container>
    <BaseBreadcrumb :breadcrumbItems="breadcrumbItems" />
    <section class="bg-white border-secondary-clr border-2 border-md rounded-xl p-4">
      <MainHeader :title="$t('TITLES.Patients.info')" />
      <EditPatientForm />
    </section>
  </v-container>
</template>

<script setup>
const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();

const breadcrumbItems = computed(() => [
  {
    title: t("TITLES.Patients.title"),
    disabled: false,
    to: localePath("/doctor/patients"),
  },
  {
    title: t("TITLES.Patients.view"),
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
