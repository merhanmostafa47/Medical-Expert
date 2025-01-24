<script setup>
const props = defineProps({
  endpoint: {
    type: String,
    required: true,
  },
  forgetPasswordPath: {
    type: String,
    required: true
  },
  redirectPage: {
    type: String,
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
  email: string()
    .email(t("FORMS.Validation.email.notValid"))
    .required(t("FORMS.Validation.email.required")),

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

const { value: email, errorMessage: emailError } = useField("email");
const { value: password, errorMessage: passwordError } = useField("password");

// const remember=ref(false)
const submit = handleSubmit(async (values, { resetForm }) => {

  const { data, error } = await useBaseFetch("POST", props.endpoint, locale, {
    email: values.email,
    password: values.password,
    // remember: remember.value 
  });

  // Set fields error with the server error
  setFieldError("email", error?.value?.data?.errors?.email);
  setFieldError("password", error?.value?.data?.errors?.password);

  if (!error.value) {
    toast.success(data?.value?.message);
    resetForm();

    authStore.setAuthedData({
      ...authStore.getAuthUserData,
      name: data?.value?.data?.name,
      email: data?.value?.data?.email,
      token: data?.value?.token,
    });

    router.push({
      path: c ?? localePath("/dashbord"),
    });

  } else {
    toast.error(error.value?.data?.message);
  }
});

</script>

<template>
  <form class="flex flex-col justify-end w-full" @submit="submit">

    <base-input v-model="email" :label="t('FORMS.Labels.email')" :placeholder="t('FORMS.Placeholders.email')"
      type="email" class="!px-0" :error="emailError" />

    <base-input v-model="password" :label="t('FORMS.Labels.password')" :placeholder="t('FORMS.Labels.password')"
      type="password" class="!px-0" :error="passwordError" />

      <div class="flex items-center justify-between">
        <!-- <div class="flex items-center gap-1">
          <input type="checkbox" id="rememberMe" class="w-4 h-4" v-model="remember"/>
          <label for="rememberMe" class="mb-0 text-sm text-secondary-clr font-regular-ff">
            {{ t("FORMS.Labels.rememberMe") }}
          </label>
        </div> -->

        <NuxtLink v-if="forgetPasswordPath" :to="forgetPasswordPath" class="mb-0 text-sm text-secondary-clr font-regular-ff hover:text-main-clr">
          {{ t("FORMS.Labels.forgotPassword") }}
        </NuxtLink>
      </div>
    <button type="submit" :disabled="!meta.valid"
      class="disabled:opacity-50 relative flex items-center justify-center px-8 py-3 !text-secondary-text-clr capitalize rounded-lg bg-main-clr font-semiBold-ff text-sm md:text-base transition-all duration-300 ease-in-out hover:!bg-dark-bg w-full mt-6 md:mt-10">
      <Icon name="lucide:loader-circle" size="20" class="animate-spin" v-if="isSubmitting" />
      {{
        t("BUTTONS.auth.login")
      }}
    </button>
  </form>
</template>
