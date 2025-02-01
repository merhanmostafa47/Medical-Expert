<template>
  <article class="mb-[2rem]">
    <MainHeader class="flex justify-between items-center" :title="title">
      <v-menu v-if="!openEditForm">
        <template v-slot:activator="{ props }">
          <v-btn icon variant="text" v-bind="props">
            <Icon
              name="qlementine-icons:menu-dots-16"
              class="text-secondary-clr"
              size="20"
            />
          </v-btn>
        </template>

        <v-list class="py-0 px-2">
          <v-list-item class="px-2">
              <v-list-item-title @click="$emit('editForm')" class="text-orange-clr cursor-pointer">
                <Icon name="material-symbols:edit-outline-sharp" size="20" />
                {{ $t("BUTTONS.edit") }}
              </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <div v-else class="cursor-pointer hover:bg-opacity-bg rounded-full w-12 h-12 transi duration-300 flex justify-center items-center" @click="$emit('close')">
        <Icon name="material-symbols:close-small-outline" class="text-secondary-clr w-6 h-6 cursor-pointer"></Icon>
      </div>
    </MainHeader>

    <BaseImage
      class="mb-6 w-24 h-24 rounded-md"
      :src="patientInfo?.image_url"
      :alt="patientInfo?.name"
    />

    <v-row class="m-0">
      <infoCard
        md="4"
        sm="6"
        cols="12"
        :title="$t(`TITLES.Patients.name`)"
        icon="streamline:interface-edit-write-1-edit-edition-form-pen-text-write"
        :desc="patientInfo.name || 'N/A'"
      />
      <infoCard
        md="4"
        sm="6"
        cols="12"
        :title="$t(`TITLES.Patients.age`)"
        icon="fa6-solid:people-group"
        :desc="patientInfo.age || 'N/A'"
      />
      <infoCard
        md="4"
        sm="6"
        cols="12"
        :title="$t(`TITLES.Patients.gender`)"
        icon="ph:gender-intersex-light"
        :desc="patientInfo.gender || 'N/A'"
      />
    </v-row>
  </article>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: false
  },
  openEditForm: {
    type: Boolean,
    required: true
  }
});
defineEmits(['editForm', 'close']);

const patientsStore = usePatientsStore();
const { patientInfo } = storeToRefs(patientsStore);

</script>

<style lang="scss" scoped>

</style>