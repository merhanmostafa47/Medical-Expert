<script setup>
// import { useMediaQuery } from "@vueuse/core";
const drawer = ref(true);
const rail = ref(false);

import { useI18n } from "vue-i18n";
const { t } = useI18n();
const localePath = useLocalePath();

import { useRoute } from "vue-router";
const route = useRoute();

const isLargeScreen = useMediaQuery("(max-width: 1024px)");
watch(
  () => isLargeScreen,
  () => console.log(isLargeScreen.value)
);

if (isLargeScreen) {
  rail.value = true;
}
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    disable-resize-watcher
    permanent
    width="235"
    @click="rail = !rail"
  >
    <v-list-item prepend-avatar="/media/logo/favicon.svg" nav>
      <template v-slot:append>
        <button @click.stop="rail = !rail" class="p-0 bg-none">
          <Icon name="material-symbols:menu" size="16" class="text-white" />
        </button>
      </template>
      <template v-slot:title>
        <NuxtImg
          presets="default"
          src="/media/logo/logo-white.svg"
          width="100"
          height="100"
        />
      </template>
    </v-list-item>

    <v-list density="compact" nav class="nav__routes">
      <NuxtLink :to="localePath('/doctor/clinics')">
        <v-list-item
          :title="t('TITLES.doctor.clinics')"
          :class="{
            'v-list-item--active': route.path.includes('doctor/clinics'),
          }"
        >
          <template v-slot:prepend>
            <NuxtImg src="/media/icons/clinic.svg" class="size-5" />
          </template>
        </v-list-item>
      </NuxtLink>
      <NuxtLink :to="localePath('/patients')">
        <v-list-item
          :title="t('TITLES.doctor.patients')"
          :class="{
            'v-list-item--active': route.path.includes('doctor/patients'),
          }"
        >
          <template v-slot:prepend>
            <NuxtImg src="/media/icons/patient.svg" class="size-5" />
          </template>
        </v-list-item>
      </NuxtLink>
    </v-list>
  </v-navigation-drawer>
</template>
