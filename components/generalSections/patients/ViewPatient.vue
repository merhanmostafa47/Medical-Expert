<template>
  <section class="p-4 bg-white border border-secondary-clr rounded-xl">
    <MainHeader
      class="flex items-center justify-between"
      :title="$t('TITLES.Patients.info')"
    >
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon variant="text" v-bind="props">
            <Icon
              name="qlementine-icons:menu-dots-16"
              class="text-secondary-clr"
              size="20"
            />
          </v-btn>
        </template>
        <v-list class="px-2 py-0">
          <v-list-item class="px-2">
            <NuxtLink
              class="text-orange-clr"
              :to="localePath(`/doctor/patients/${id}/edit`)"
            >
              <v-list-item-title>
                <Icon name="material-symbols:edit-outline-sharp" size="20" />
                {{ $t("BUTTONS.edit") }}
              </v-list-item-title>
            </NuxtLink>
          </v-list-item>
        </v-list>
      </v-menu>
    </MainHeader>

    <!-- Patient Image and Actions -->
    <article
      class="flex flex-wrap items-center justify-center gap-4 mb-6 md:justify-between"
    >
      <BaseImage
        class="w-24 h-24 rounded-md"
        :src="patientData.image"
        :alt="patientData.info.name"
      />
      <div class="action-btns">
        <NuxtLink :to="localePath(`/doctor/patients/${id}/vital`)">
          {{ $t("TITLES.Patients.vital.profile") }}
        </NuxtLink>
        <NuxtLink :to="localePath(`/doctor/patients/${id}/history`)">{{
          $t("TITLES.Patients.history.profile")
        }}</NuxtLink>
        <!-- <NuxtLink :to="localePath(`/doctor/patients/${id}/prescription`)">{{
          $t("TITLES.Patients.prescription")
        }}</NuxtLink> -->
      </div>
    </article>

    <!-- Patient Information -->
    <article>
      <v-row class="m-0">
        <infoCard
          v-for="(value, key) in patientData.info"
          :key="key"
          lg="4"
          md="6"
          cols="12"
          :title="$t(`TITLES.Patients.${key}`)"
          :icon="getIconForKey(key)"
          :desc="value"
        />
      </v-row>
    </article>
  </section>
</template>

<script setup>
const route = useRoute();
const id = route?.params?.id;

const patientsStore = usePatientsStore();
const { patientData } = storeToRefs(patientsStore);

function getIconForKey(key) {
  const iconMap = {
    name: "streamline:interface-edit-write-1-edit-edition-form-pen-text-write",
    phone_number: "material-symbols:phone-enabled-sharp",
    email: "material-symbols:mail-rounded",
    national_id: "material-symbols:person-pin-sharp",
    dob: "uis:calender",
    gender: "ph:gender-intersex-light",
  };

  return iconMap[key];
};
</script>

<style lang="postcss" scoped>
.action-btns {
  @apply flex flex-wrap justify-center gap-3;
  @apply flex flex-wrap gap-3;
  a {
    @apply bg-white text-main-clr border-2 text-center border-secondary-clr px-4 py-3 !leading-none rounded-xl content-center hover:text-white hover:bg-secondary-clr transition duration-300;
  }
}
</style>
