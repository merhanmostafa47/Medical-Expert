<script setup>
// import { useMediaQuery } from "@vueuse/core";
const drawer = ref(true);
const rail = ref(false);

import { useI18n } from "vue-i18n";
const { t } = useI18n();
const localePath = useLocalePath();

import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const isLargeScreen = useMediaQuery("(max-width: 1024px)");
watch(
  () => isLargeScreen,
  () => console.log(isLargeScreen.value)
);

if (isLargeScreen) {
  rail.value = true;
}

import { useAuthStore } from "@/stores/AuthData.js";
const authStore = useAuthStore();

const logout = () => {
  authStore.resetAuthData();
  router.push(localePath("/"));
};
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
    <button @click.stop="logout" class="logout__btn">
      <v-list-item
        class="px-2"
        :title="t('TITLES.logout')"
      >
        <template v-slot:prepend>
          <Icon
            name="material-symbols:logout"
            size="20"
            class="text-white rotate-180"
          />
        </template>
      </v-list-item>
    </button>
  </v-navigation-drawer>
</template>
