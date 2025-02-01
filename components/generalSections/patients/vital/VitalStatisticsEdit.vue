<template>
  <v-form lazy-validation @submit.prevent="onSubmit">
    <v-row class="m-0">
      <CustomBaseInput
        col="4"
        v-for="(value, key) in patientVitals"
        :key="key"
        :name="key"
        type="text"
        :label="$t(`TITLES.Patients.vital.${key}`)"
        :placeholder="$t(`TITLES.Patients.vital.${key}`)"
      />
    </v-row>
    <v-row class="vital-form-actions !m-0 gap-3 justify-end">
      <button
        type="submit"
        :disabled="isSubmitting"
        class="bg-main-clr !text-secondary-text-clr hover:!bg-dark-bg"
      >
        <Icon
          name="lucide:loader-circle"
          size="20"
          class="animate-spin"
          v-if="isSubmitting"
        />
        {{ t("BUTTONS.add") }}
      </button>
      <button
        type="reset"
        @click.prevent="$emit('close')"
        class="!text-main-clr border border-main-clr hover:!bg-dark-bg"
      >
        {{ t("BUTTONS.cancel") }}
      </button>
    </v-row>
  </v-form>
</template>

<script setup>
import { object, string } from "yup";

defineEmits(['close']);

const patientsStore = usePatientsStore();
const { patientVitals } = storeToRefs(patientsStore);

const { t, locale } = useI18n();
const { $toast } = useNuxtApp();
const route = useRoute();

const validationSchema = object(
  Object.keys(patientVitals.value).reduce((schema, key) => {
    schema[key] = string()
      .required(t(`FORMS.Validation.${key}.required`))
      .min(1, t(`FORMS.Validation.${key}.min`));
    return schema;
  }, {})
);

const { handleSubmit, isSubmitting, values } = useForm({
  validationSchema,
  initialValues: {
    ...patientVitals.value
  }
});

async function onSuccess() {
  try {
    const res = await useClientFetch("POST", `patients/${route?.params?.id}/edit-vital-profile`, locale.value, {...values});
    $toast.success(res?.message);
  } catch(error) {
    $toast.error(error?.data?.message);
  }
}
const onSubmit = handleSubmit(onSuccess);
</script>

<style lang="postcss" scoped>
.vital-form-actions{
  button {
    @apply disabled:opacity-50 relative flex items-center justify-center px-4 md:px-6 py-3  capitalize rounded-lg font-semiBold-ff text-sm md:text-base transition-all duration-300 ease-in-out 
  }
}
</style>