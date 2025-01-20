<script setup lang="ts">

// I18n Localization Function
const { t } = useI18n();

// Set App Title Template
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${t('APP_NAME')}` : t('APP_NAME');
  },
});
</script>

<template>
  <BaseLoader />
  
  <NuxtLayout> <!-- Render layout -->
    <NuxtPage /> <!-- Render page content -->
  </NuxtLayout>
</template>