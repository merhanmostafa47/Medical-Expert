<script setup>
const props = defineProps({
  endpoint: {
    type: String,
    required: true,
  },
  loginPath: {
    type: String,
    required: true
  }
})

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
import { object, string } from "yup";

const validationSchema = object({
  password: string()
    .required(t("FORMS.Validation.password.required"))
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
      t("FORMS.Validation.password.validation")
    ),
});

// Add the validation to the form
const { handleSubmit, meta, setFieldError, isSubmitting } = useForm({
  validationSchema,
});

const { value: password, errorMessage: passwordError } = useField("password");

const submit = handleSubmit(async (values, { resetForm }) => {
  console.log(values)
  const { data, error } = await useBaseFetch("POST", props.endpoint, locale, {
    email: authStore.getAuthUserData.email,
    otp: route.query.otp,
    password: values.password,
  });

  // Set fields error with the server error
  setFieldError("password", error?.value?.data?.errors?.password);

  if (!error.value) {
    toast.success(data?.value?.message);
    resetForm();

    // save phone in store
    authStore.setAuthedData({
      ...authStore.getAuthUserData,
      name: data?.value?.data?.name,
      email: data?.value?.data?.email,
      token: data?.value?.token,
    });

    toggleModal();

  } else {
    toast.error(error.value?.data?.message);
  }
});

const openModal = ref(false);

const toggleModal = () => {
  openModal.value = !openModal.value;
};

const loginAgain = () => {
  router.push({
    path: props.loginPath,
  });

  toggleModal();
}
</script>

<template>
  <form class="flex justify-end flex-col w-full" @submit="submit">

    <base-input v-model="password" :label="t('FORMS.Labels.NewPassword')"
      :placeholder="t('FORMS.placeholders.newPassword')" type="password" class="!px-0" :error="passwordError" />

    <button type="submit" :disabled="!meta.valid"
      class="disabled:opacity-50 relative flex items-center justify-center px-8 py-3 !text-secondary-text-clr capitalize rounded-lg bg-main-clr font-semiBold-ff text-sm md:text-base transition-all duration-300 ease-in-out hover:!bg-dark-bg w-full mt-6 md:mt-10">
      <Icon name="lucide:loader-circle" size="20" class="animate-spin" v-if="isSubmitting" />
      {{
        t("BUTTONS.auth.save")
      }}
    </button>
    <PasswordResetModal :openModal="openModal" @close="toggleModal" @goToLogin="loginAgain" />
  </form>
</template>
