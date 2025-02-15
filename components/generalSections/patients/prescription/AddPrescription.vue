<script setup>
const { $toast } = useNuxtApp();
const { t, locale } = useI18n();
const router = useRouter();
const route = useRoute();

const isSubmitting = ref(false);

const medicineCategories = ref([]);
const selectedCategories = ref([]);

const activeIngredients = ref([]);
const selectedActiveIngredients = ref([]);

const medicines = ref([]);
const selectedMedicines = ref([]);

const selectedClinic = ref(null);
const clinics = ref([]);

// Fetch categories
const { data, error } = await useBaseFetch(
  "GET",
  `prescriptions/categories`,
  locale.value
);
if (!error.value) {
  medicineCategories.value = data.value?.data;
}

// Fetch active ingredients based on selected categories
const fetchActiveIngredients = async () => {
  if (!selectedCategories.value?.length) return;
  try {
    const res = await useClientFetch(
      "GET",
      "prescriptions/active-ingredients",
      locale.value,
    );
    activeIngredients.value = res?.data;
  } catch (error) {
    console.error(error);
  }
};

// Fetch medicines based on selected categories and active ingredients
const fetchMedicines = async () => {
  if (!selectedCategories.value.length || !selectedActiveIngredients.value.length) return;
  try {
    const res = await useClientFetch(
      "GET",
      "prescriptions/fetch-medicines",
      locale.value,
      null,
      {
        category: selectedCategories.value.map((category) => category.id),
        active_ingredient: selectedActiveIngredients.value.map(
          (ingredient) => ingredient.id
        ),
      }
    );
    medicines.value = res?.data;
  } catch (error) {
    console.error(error);
  }
};

// Watch categories to fetch active ingredients
watch(
  selectedCategories,
  async () => {
    selectedActiveIngredients.value = [];
    activeIngredients.value = [];
    await fetchActiveIngredients();
  },
  { deep: true }
);

// Watch categories and active ingredients to fetch mediciness
watch(
  [selectedCategories, selectedActiveIngredients],
  async () => await fetchMedicines(),
  { deep: true }
);

async function onSubmit() {
  try {
    isSubmitting.value = true;
    const res = await useClientFetch("POST", 'prescriptions/make-rescription', locale.value, {
      patient_id: route.params.id,
      clinic_id: selectedClinic.value?.id,
      medicines: selectedMedicines.value.map(med => med.id)
    });
    router.push(`/doctor/patients/${route.params.id}/prescription/${res?.data?.id}`)
  } catch(error) {
    $toast.error(error?.data?.message);
    console.error(error);
  } finally {
    isSubmitting.value = false;
  }
}

// Fetch clincs on component mount
onMounted(async () => {
  try {
    const res = await useClientFetch("GET", "clinics", locale.value);
    clinics.value = res?.data;
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <v-form @submit.prevent="onSubmit">
    <!-- Medicine Category -->
    <v-autocomplete
      v-model="selectedCategories"
      :items="medicineCategories"
      :label="$t('TITLES.Patients.prescription.category') + '*'"
      item-title="name"
      item-value="id"
      return-object
      multiple
      clearable
      chips
      closable-chips
      open-on-clear

    />

    <!-- Active Ingredient -->
    <v-autocomplete
      v-model="selectedActiveIngredients"
      :items="activeIngredients"
      :label="$t('TITLES.Patients.prescription.activeIngredients') + '*'"
      item-title="name"
      item-value="id"
      return-object
      multiple
      clearable
      chips
      closable-chips
      open-on-clear
      :disabled="!selectedCategories.length"
    />

    <!-- Medicines -->
    <v-autocomplete
      v-model="selectedMedicines"
      :items="medicines"
      :label="$t('TITLES.Patients.prescription.medicines') + '*'"
      item-title="name"
      item-value="id"
      return-object
      multiple
      clearable
      chips
      closable-chips
      open-on-clear
      :disabled="!selectedCategories.length || !selectedActiveIngredients.length"
    />

    <!-- Clinics -->
    <v-autocomplete
      v-model="selectedClinic"
      :items="clinics"
      :label="$t('TITLES.doctor.clinics') + '*'"
      item-title="name"
      item-value="id"
      return-object
      clearable
      chips
      closable-chips
      open-on-clear
      clear-on-select
      :disabled="!selectedMedicines.length"
    />

    <v-row class="!m-0 gap-3 justify-end">
      <button
        type="submit"
        :disabled="!selectedClinic"
        class="disabled:opacity-50 relative flex items-center justify-center px-4 md:px-6 py-3 !text-secondary-text-clr capitalize rounded-lg font-semiBold-ff bg-main-clr text-sm md:text-base transition-all duration-300 ease-in-out hover:!bg-dark-bg"
      >
        <Icon
          name="lucide:loader-circle"
          size="20"
          class="animate-spin"
          v-if="isSubmitting"
        />
        {{ t("BUTTONS.save") }}
      </button>
      <button
        @click="router.push(`/doctor/patients/${route.params.id}`)"
        class="relative flex items-center justify-center px-4 md:px-6 py-3 !text-main-clr capitalize rounded-lg font-bold border border-main-clr text-sm md:text-base transition-all duration-300 ease-in-out hover:!bg-dark-bg"
      >
        {{ t("BUTTONS.cancel") }}
      </button>
    </v-row>
  </v-form>
</template>

<style lang="postcss">
.v-autocomplete {
  &__content {
    .v-list-item {
      &__overlay {
        @apply bg-opacity-bg;
      }
      &__content {
        @apply z-0;
      }
      &-title {
        @apply text-main-clr capitalize !z-0;
      }
      .v-selection-control {
        &__input {
          &::before {
            @apply bg-transparent;
          }
          .v-icon {
            @apply text-main-clr;
          }
        }
      }
    }
    [aria-selected="true"] {
      .v-list-item {
        &__overlay {
          @apply bg-transparent;
        }
        &-title {
          @apply text-main-clr capitalize;
        }
      }
    }
  }
  &__selection-text {
    @apply text-main-clr;
  }
  .v-icon {
    @apply text-main-clr;
  }
  .v-chip {
    @apply border border-main-clr;
    &__underlay {
      @apply !bg-transparent;
    }
    &__content {
      @apply text-main-clr;
    }
  }
}
</style>
