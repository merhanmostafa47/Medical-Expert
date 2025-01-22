<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const localePath = useLocalePath();

const emit = defineEmits(["delete"]);
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <v-menu class="action__menu">
    <template v-slot:activator="{ props }">
      <button>
        <Icon
          name="qlementine-icons:menu-dots-16"
          class="text-secondary-clr"
          size="20"
          v-bind="props"
        />
      </button>
    </template>
    <v-list>
      <v-list-item>
        <NuxtLink
          :to="localePath(`/doctor/clinics/${id}`)"
          class="action__btn text-secondary-clr"
        >
          <Icon name="material-symbols:visibility" size="20" />
          {{ t("BUTTONS.view") }}
        </NuxtLink>
      </v-list-item>
      <v-list-item>
        <NuxtLink
          :to="localePath(`/doctor/clinics/edit/${id}`)"
          class="action__btn text-orange-clr"
        >
          <Icon name="material-symbols:edit" size="20" />
          {{ t("BUTTONS.edit") }}
        </NuxtLink>
      </v-list-item>
      <v-list-item>
        <button class="action__btn text-red-clr" @click="emit('delete')">
          <Icon name="material-symbols:delete" size="20" />
          {{ t("BUTTONS.delete") }}
        </button>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
