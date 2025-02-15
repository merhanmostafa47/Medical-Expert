<template>
    <v-container>
      <BaseBreadcrumb
          :breadcrumbItems="breadcrumbItems"
         
        />
      <section class="p-4 bg-white border border-secondary-clr rounded-xl">
        <MainHeader :title="$t('TITLES.clinics.info')" />
        <AddClinicForm />
      </section>
    </v-container>
  </template>
  
  <script setup>
  const { t } = useI18n();
  const localePath = useLocalePath();
  const breadcrumbItems = computed(() => [
    {
      title: t("TITLES.clinics.title"),
      disabled: false,
      to: localePath("/doctor/clinics"),
    },
    {
      title: t("TITLES.clinics.add"),
      disabled: true,
      to: localePath("/doctor/clinics/add"),
    },
  ]);
  </script>
  