<script setup>
import { object, string } from "yup";

import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
const localePath = useLocalePath();

import { useRouter } from "vue-router";
const router = useRouter();

import { useToast } from "vue-toastification";
const toast = useToast();

const { data: specialties } = await useBaseFetch("GET", "specialties");

// Define the schema for form validation
const validationSchema = object({
  name: string()
    .required(t("FORMS.Validation.name.required"))
    .min(5, t("FORMS.Validation.name.min"))
    .max(30, t("FORMS.Validation.name.max")),

  email: string()
    .email(t("FORMS.Validation.email.notValid"))
    .required(t("FORMS.Validation.email.required")),

  phone_number: string()
    .required(t("FORMS.Validation.phone.required"))
    .matches(/^0\d{10}$/, t("FORMS.Validation.clinicPhone.length")),

  specialty: string().required(t("FORMS.Validation.specialty")),

  address: string().required(t("FORMS.Validation.address")),

  working_hours_from: string(),
  working_hours_to: string(),
});

// Form setuplength
const { handleSubmit, isSubmitting, values, resetForm  } = useForm({
  validationSchema,

});

async function onSuccess() {
  const formData = new FormData();

  Object.keys(values).forEach(key => {
    if (values[key] instanceof Date) {
      formData.append(key, values[key].toISOString());
    } else if (values[key] instanceof File || values[key] instanceof Blob) {
      formData.append(key, values[key]);
    } else {
      formData.append(key, String(values[key]));
    }
  });
  
  try {
    const res = await useClientFetch("POST", 'clinics/add', locale.value, formData);
    toast.success(res?.message);
    router.push(localePath("/doctor/clinics"));
  } catch(error) {
    toast.error(error?.data?.message);
    resetForm();
  }
}
const onSubmit = handleSubmit(onSuccess);
</script>

<template>
  <v-form lazy-validation @submit.prevent="onSubmit">
    <v-row>
      <CustomBaseInput
        name="name"
        type="text"
        :label="t('FORMS.Labels.clinics.name')"
        :placeholder="t('FORMS.Placeholders.clinics.name')"
        col="6"
      />
      <CustomBaseInput
        name="phone_number"
        :label="t('FORMS.Labels.clinics.phone')"
        :placeholder="t('FORMS.Placeholders.clinics.phone')"
        type="number"
        col="6"
      />
      <CustomBaseInput
        name="email"
        type="email"
        :label="t('FORMS.Labels.clinics.email')"
        :placeholder="t('FORMS.Placeholders.clinics.email')"
        col="6"
      />
      <CustomSelectInput
        name="specialty"
        :label="t('FORMS.Labels.clinics.speciality')"
        :placeholder="t('FORMS.Placeholders.clinics.speciality')"
        static
        :staticItems="specialties.data"
        :noDataText="$t('FORMS.Messages.noData')"
        col="6"
      />

      <CustomBaseInput
        name="address"
        :label="t('FORMS.Labels.clinics.address')"
        :placeholder="t('FORMS.Placeholders.clinics.address')"
        type="text"
        col="6"
      />
      <CustomBaseInput
        name="working_hours_from"
        :label="t('FORMS.Labels.clinics.workingHours.from')"
        type="time"
        col="3"
      />
      <CustomBaseInput
        name="working_hours_to"
        :label="t('FORMS.Labels.clinics.workingHours.to')"
        type="time"
        col="3"
      />
    </v-row>
    <v-row class="justify-end gap-3 p-5">
      <button
        type="submit"
        :disabled="isSubmitting"
        class="disabled:opacity-50 relative lg:min-w-32 flex items-center justify-center px-4 md:px-6 py-3 !text-secondary-text-clr capitalize rounded-lg font-semiBold-ff bg-main-clr text-sm md:text-base transition-all duration-300 ease-in-out hover:!bg-dark-bg"
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
        @click.prevent="resetForm"
        class="disabled:opacity-50 relative lg:min-w-32 flex items-center justify-center px-4 md:px-6 py-3 !text-main-clr capitalize rounded-lg font-bold border border-main-clr text-sm md:text-base transition-all duration-300 ease-in-out hover:!bg-dark-bg"
      >
        {{ t("BUTTONS.cancel") }}
      </button>
    </v-row>
  </v-form>
</template>
