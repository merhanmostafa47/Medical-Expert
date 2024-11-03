<script setup>
const props = defineProps({
  endpoint: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  verifyEmail: {
    type: String,
  }
});

// I18n
const { t, locale } = useI18n();
const localePath = useLocalePath();

// Router & Route Composables
const route = useRoute();
const router = useRouter();

// Set authed data in store
import { useAuthStore } from "@/stores/AuthData.js";
const authStore = useAuthStore();

// Toast Composables
import { useToast } from "vue-toastification";
const toast = useToast();

// Form Validation using Yup
import { object, string, ref as yupRef } from "yup";

const validationSchema = object({
  name: string()
    .required(t("FORMS.Validation.name.required"))
    .min(5, t("FORMS.Validation.name.min"))
    .max(30, t("FORMS.Validation.name.max")),

  email: string()
    .email(t("FORMS.Validation.email.notValid"))
    .required(t("FORMS.Validation.email.required")),

  nationalId: props.userType == "patient" ? string()
    .required(t("FORMS.Validation.nationalId"))
    .matches(/^\d{14}$/, t("FORMS.Validation.nationalIdLength")) : string(),

  pharmacyId: props.userType == "pharmacy" ? string().required(t("FORMS.Validation.pharmacyId")) : string(),

  syndicateId: props.userType == "doctor" ? string().required(t("FORMS.Validation.syndicateId")) : string(),

  labId: props.userType == "lab" ? string().required(t("FORMS.Validation.labId")): string(),

  password: string()
    .required(t("FORMS.Validation.password.required"))
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
      t("FORMS.Validation.password.validation")
    ),

  confirmPassword: string()
    .required(t("FORMS.Validation.confirmPassword.required"))
    .oneOf(
      [yupRef("password")],
      t("FORMS.Validation.confirmPassword.validation")
    ),
});

// Add the validation to the form
const { handleSubmit, meta, setFieldError, isSubmitting } = useForm({
  validationSchema,
});

const { value: name, errorMessage: nameError } = useField("name");
const { value: email, errorMessage: emailError } = useField("email");
const { value: nationalId, errorMessage: nationalIdError } =
  useField("nationalId");
const { value: pharmacyId, errorMessage: pharmacyIdError } =
  useField("pharmacyId");
const { value: syndicateId, errorMessage: syndicateIdError } =
  useField("syndicateId");
const { value: labId, errorMessage: labIdError } = useField("labId");
const { value: password, errorMessage: passwordError } = useField("password");
const { value: confirmPassword, errorMessage: confirmPasswordError } =
  useField("confirmPassword");

const submit = handleSubmit(async (values, { resetForm }) => {
 const { data, error } = await useBaseFetch("POST", props.endpoint, locale, {
    name: values.name,
    email: values.email,
    SSN: values?.nationalId || values?.syndicateId,
    pharmacy_id: values?.pharmacyId,
    lab_id: values?.labId,
    password: values.password,
    password_confirmation: values.confirmPassword,
  });

  // Set fields error with the server error
  setFieldError("name", error?.value?.data?.errors?.name);
  setFieldError("email", error?.value?.data?.errors?.email);
  setFieldError("nationalId", error?.value?.data?.errors?.SSN);
  setFieldError("pharmacyId", error?.value?.data?.errors?.pharmacy_id);
  setFieldError("syndicateId", error?.value?.data?.errors?.SSN);
  setFieldError("labId", error?.value?.data?.errors?.lab_id);
  setFieldError("password", error?.value?.data?.errors?.password);

  if (!error.value) {
    toast.success(data?.value?.message);
    resetForm();

    // save phone in store
    authStore.setAuthedData({
      ...authStore.getAuthUserData,
      email: values.email,
    });

    router.push({
      path: props.verifyEmail,
    query: {
      type:'verfiy-email'
    }
    });
    
  } else {
    toast.error(error?.value?.data?.message);
  }
});
</script>

<template>
  <form class="flex justify-end flex-col w-full" @submit.prevent="submit">
    <base-input
     v-model="name"
      :label="t('FORMS.Labels.name')"
      :placeholder="t('FORMS.Placeholders.name')"
      type="text"
      class="!px-0"
      :error="nameError"
    />

    <base-input
     v-model="email"
      :label="t('FORMS.Labels.email')"
      :placeholder="t('FORMS.Placeholders.email')"
      type="email"
      class="!px-0"
      :error="emailError"
    />
    <base-input
     v-model="nationalId"
      :label="t('FORMS.Labels.nationalId')"
      :placeholder="t('FORMS.Placeholders.nationalId')"
      type="number"
      class="!px-0"
      :error="nationalIdError"
      v-if="router.currentRoute.value.path.includes('patient')"
    />

    <base-input
     v-model="pharmacyId"
      :label="t('FORMS.Labels.pharmacyId')"
      :placeholder="t('FORMS.Placeholders.pharmacyId')"
      type="number"
      class="!px-0"
      :error="pharmacyIdError"
      v-if="userType == 'pharmacy' || router.currentRoute.value.path.includes('pharmacy')"
    />

    <base-input
     v-model="syndicateId"
      :label="t('FORMS.Labels.syndicateId')"
      :placeholder="t('FORMS.Placeholders.syndicateId')"
      type="number"
      class="!px-0"
      :error="syndicateIdError"
      v-if="userType == 'doctor' || router.currentRoute.value.path.includes('doctor')"
    />

    <base-input
     v-model="labId"
      :label="t('FORMS.Labels.labId')"
      :placeholder="t('FORMS.Placeholders.labId')"
      type="number"
      class="!px-0"
      :error="labIdError"
      v-if="userType == 'lab' || router.currentRoute.value.path.includes('lab')"
    />

    <base-input
     v-model="password"
      :label="t('FORMS.Labels.password')"
      :placeholder="t('FORMS.Labels.password')"
      type="password"
      class="!px-0"
      :error="passwordError"
    />

    <base-input
     v-model="confirmPassword"
      :label="t('FORMS.Labels.confirmPassword')"
      :placeholder="t('FORMS.Labels.password')"
      type="password"
      class="!px-0"
      :error="confirmPasswordError"
    />
  
    <button
     type="submit" 
     :disabled="!meta.valid"
      class="disabled:opacity-50 relative flex items-center justify-center px-8 py-3 !text-secondary-text-clr capitalize rounded-lg font-semiBold-ff bg-main-clr text-sm md:text-base transition-all duration-300 ease-in-out hover:!bg-dark-bg w-full mt-6 md:mt-10"
    >
      <Icon
        name="lucide:loader-circle"
        size="20"
        class="animate-spin"
        v-if="isSubmitting"
      />
      {{ t("BUTTONS.auth.login") }}
    </button>
  </form>
</template>
