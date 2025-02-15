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
    .matches(/^\d{8,11}$/, t("FORMS.Validation.phone.length")),

  specialty: string().required(t("FORMS.Validation.specialty")),

  address: string().required(t("FORMS.Validation.address")),

  working_hours_from: string(),
  working_hours_to: string(),
});

// Form setup
const { handleSubmit, meta, setFieldError, isSubmitting, resetForm } = useForm({
  validationSchema,
});

const { value: name, errorMessage: nameError } = useField("name");
const { value: email, errorMessage: emailError } = useField("email");
const { value: phone_number, errorMessage: phoneError } =
  useField("phone_number");
const { value: speciality, errorMessage: specialityError } =
  useField("specialty");
const { value: address, errorMessage: addressError } = useField("address");
const { value: working_hours_from, errorMessage: workingHoursFromError } =
  useField("working_hours_from");
const { value: working_hours_to, errorMessage: workingHoursTOError } =
  useField("working_hours_to");

const submit = handleSubmit(async (values, { resetForm }) => {
  const { data, error } = await useBaseFetch(
    "POST",
    "clinics/add",
    locale.value,
    {
      name: values.name,
      email: values.email,
      phone_number: values.phone_number,
      speciality: values.speciality,
      address: values.address,
      working_hours_from: values.working_hours_from,
      working_hours_to: values.working_hours_to,
    }
  );

  // Set fields error with the server error
  setFieldError("name", error?.value?.data?.errors?.name);
  setFieldError("email", error?.value?.data?.errors?.email);
  setFieldError("phone_number", error?.value?.data?.errors?.phone_number);
  setFieldError("speciality", error?.value?.data?.errors?.speciality);
  setFieldError("address", error?.value?.data?.errors?.address);

  if (!error.value) {
    toast.success(data?.value?.message);
    resetForm();

    router.push({
      path: localePath("/doctor/clinics"),
    });
  } else {
    toast.error(error.value?.data?.message);
  }
});
</script>

<template>
  <form @submit="submit">
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
        class="!p-4"
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
        :disabled="!meta.valid"
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
  </form>
</template>
