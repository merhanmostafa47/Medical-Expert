<script setup>
const props = defineProps({
  endpoint: {
    type: String,
    required: true,
  },
  OtpPagePath:{
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

// Toast Composables
import { useToast } from "vue-toastification";
const toast = useToast();

// Form Validation using Yup
import { object, string } from "yup";

const validationSchema = object({
  email: string()
    .email(t("FORMS.Validation.email.notValid"))
    .required(t("FORMS.Validation.email.required")),
});

// Add the validation to the form
const { handleSubmit, meta, setFieldError, isSubmitting } = useForm({
  validationSchema,
});

const { value: email, errorMessage: emailError } = useField("email");

const submit = handleSubmit(async (values, { resetForm }) => {
  const { data, error } = await useBaseFetch("POST", props.endpoint, locale, {
    email: values.email,
  });

  // Set fields error with the server error
  setFieldError("email", error?.value?.data?.errors?.email);

  if (!error.value) {
    toast.success(data?.value?.message);
    resetForm();

    router.push({
      path: 'verification-code',
      query: {
        type: 'reset-password',
      }
    });
    
  } else {
    toast.error(error?.value?.data?.error);
  }
});

</script>

<template>
  <form class="flex justify-end flex-col w-full" @submit="submit">

    <base-input v-model="email" :label="t('FORMS.Labels.email')" :placeholder="t('FORMS.Placeholders.email')"
      type="email" class="!px-0" :error="emailError" />

    <button type="submit" :disabled="!meta.valid"
      class="disabled:opacity-50 relative flex items-center justify-center px-8 py-3 !text-secondary-text-clr capitalize rounded-lg font-semiBold-ff bg-main-clr text-sm md:text-base transition-all duration-300 ease-in-out hover:!bg-dark-bg w-full mt-6 md:mt-10">
      <Icon name="lucide:loader-circle" size="20" class="animate-spin" v-if="isSubmitting" />
      {{
        t("BUTTONS.auth.send")
      }}
    </button>
  </form>
</template>
