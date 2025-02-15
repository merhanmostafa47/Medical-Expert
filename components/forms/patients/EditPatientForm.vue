<template>
  <v-form lazy-validation @submit.prevent="onSubmit">
    <v-row class="!m-0">
      <BaseImageUpload name="image" accept="image/png, image/jpeg, image/jpg" col="6" />

      <v-col md="6"
        ><BaseImage
          class="w-24 h-24 rounded-md"
          :src="patientImage"
          :alt="patientData.info.name"
      /></v-col>
      <CustomBaseInput
        name="name"
        type="text"
        :label="t('FORMS.Labels.name')"
        :placeholder="t('FORMS.Placeholders.name')"
        col="6"
      />

      <CustomBaseInput
        name="email"
        type="email"
        :label="t('FORMS.Labels.email')"
        :placeholder="t('FORMS.Placeholders.email')"
        col="6"
      />
      <CustomBaseInput
        name="national_id"
        :label="t('FORMS.Labels.nationalId')"
        :placeholder="t('FORMS.Placeholders.nationalId')"
        type="number"
        col="6"
      />
      <CustomBaseInput
        name="phone_number"
        :label="t('FORMS.Labels.phone')"
        :placeholder="t('FORMS.Placeholders.phone')"
        type="number"
        col="6"
      />
      <CustomSelectInput
        name="gender"
        :label="$t('FORMS.Labels.gender')"
        :placeholder="$t('FORMS.Placeholders.gender')"
        static
        :staticItems="[
          { title: $t('TITLES.Gender.male'), value: 'male' },
          { title: $t('TITLES.Gender.female'), value: 'female' },
        ]"
        :noDataText="$t('FORMS.Messages.noData')"
        col="6"
      />
      <BasePickerInput
        name="date_of_birth"
        type="date"
        :label="$t('FORMS.Labels.birthDate')"
        placeholder="dd/mm/yyyy"
        col="6"
      />
    </v-row>
    <v-row class="!m-0 gap-3 justify-end">
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

<script setup>
import { object, string, date, mixed } from "yup";

const { t, locale } = useI18n();
const { $toast } = useNuxtApp();

const route = useRoute();
const id = route?.params?.id;

const patientsStore = usePatientsStore();
const { patientData } = storeToRefs(patientsStore);

const patientImage = ref(patientData.value?.image || null);

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

  national_id: string()
    .required(t("FORMS.Validation.nationalId"))
    .matches(/^\d{14}$/, t("FORMS.Validation.nationalIdLength")),
  gender: string().required(t("FORMS.Validation.gender")),
  date_of_birth: date().required(t("FORMS.Validation.birthDate")),
  image: mixed().test("fileType", t("FORMS.Validation.image.invalid"), (value) => {
    if (!value) return true;
    const allowedFormats = ["image/png", "image/jpeg", "image/jpg"];
    return allowedFormats.includes(value.type);
  }),
});

// Form setup
const { handleSubmit, isSubmitting, values, resetForm } = useForm({
  validationSchema,
  initialValues: {
    name: patientData?.value.info.name,
    phone_number: patientData?.value.info.phone_number,
    email: patientData.value?.info.email,
    national_id: patientData.value?.info.national_id,
    gender: patientData.value?.info.gender,
    date_of_birth: new Date(patientData.value?.info.dob),
  },
});

async function onSuccess() {
  const formData = new FormData();

  Object.keys(values).forEach((key) => {
    if (values[key] instanceof Date) {
      formData.append(key, values[key].toISOString());
    } else if (values[key] instanceof File || values[key] instanceof Blob) {
      formData.append(key, values[key]);
    } else {
      if (values[key]) formData.append(key, String(values[key]));
    }
  });
  formData.append("_method", "PATCH");

  try {
    const res = await useClientFetch(
      "POST",
      `patients/${id}/update`,
      locale.value,
      formData
    );
    const { message, data } = res;
    $toast.success(message);
    resetForm({
      values: {
        name: data.name,
        phone_number: data.phone_number,
        email: data.email,
        national_id: data.national_id,
        gender: data.gender,
        date_of_birth: new Date(data.dob),
      },
    });
    patientImage.value = data.image;
  } catch (error) {
    $toast.error(error?.data?.message);
  }
}
const onSubmit = handleSubmit(onSuccess);
</script>

<style lang="scss" scoped></style>
