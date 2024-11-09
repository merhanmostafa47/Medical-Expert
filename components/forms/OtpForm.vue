<script setup>
const props = defineProps({
  endpoint: {
    type: String,
    required: true,
  },
  resetPasswordPath: {
    type: String,
    required: true,
  },
  resendOtpEndpoint: {
    type: String,
    required: true,
  },
});

// I18n
const { t, locale } = useI18n();
const localePath = useLocalePath();

// Router & Route Composables
const route = useRoute();
const router = useRouter();

// Toast Composables
import { useToast } from "vue-toastification";
const toast = useToast();

// Set authed data in store
import { useAuthStore } from "@/stores/AuthData.js";
const authStore = useAuthStore();

const initialTime = 60;

// Use the timer composable
const { displayTime, timeRemaining, restartTimer } = useTimer(initialTime);

// Form Validation using Yup
import { object, string } from "yup";

// Add the validation to the form
const validationSchema = object({
  otp: string().test(
    "len",
    t("FORMS.Validation.otp"),
    (val) => val?.length == 6
  ),
});

const { handleSubmit, meta, setFieldError, isSubmitting } = useForm({
  validationSchema,
});

const { value: otp, errorMessage: otpError } = useField("otp");

otp.value = "000000";
otpError.value = "";

const submit = handleSubmit(async (values, { resetForm }) => {
  const { data, error } = await useBaseFetch("POST", props.endpoint, locale, {
    email: authStore.getAuthUserData.email,
    otp: values.otp,
  });

  if (!error?.value) {
    toast.success(data?.value?.message);

    // if (route.path.includes("auth")) {
    //   authStore.setAuthedData({
    //     ...authStore.getAuthUserData,
    //     token: data?.value?.token,
    //     id: data?.value?.data?.id,
    //     name: data?.value?.data?.name,
    //     email: data?.value?.data?.email,
    //   });
    // }

    router.replace({
      path:
        route.query.type == "verfiy-email" ? "login" : props.resetPasswordPath,
      query: { otp: route.query.type == "verfiy-email" ? "" : otp.value },
    });
  } else {
    setFieldError("otp", error?.value?.data?.errors?.otp[0]);
    toast.error(error?.value?.data?.message);
  }
});

// Regenerate OTP
const regenerateOtp = async () => {
  const { data, error } = await useBaseFetch("GET", resendOtpEndpoint, locale, {
    email: authStore.getAuthUserData.email,
  });

  if (!error?.value) {
    toast.success(data?.value?.message);
    restartTimer();
    otp.value = "00000";
  } else {
    toast.error(error?.value?.data?.message);
  }
};

const goToResetPassword =()=>{
  router.replace({
      path: 'new-password',
      query: { otp:  otp.value },
    });
}
</script>

<template>
  <form class="flex justify-end flex-col w-full" @submit="submit">
    <base-otp-input v-model="otp" placeholder="0" :error="otpError" />
    <p class="text-sm mt-6 text-center text-default-text-clr font-medium-ff">
      <span class="text-main-clr font-semiBold-ff">{{ displayTime }}</span>
    </p>
    <div class="flex justify-center my-4">
      <span
        class="text-sm lg:text-base xl:text-lg text-center text-secondary-clr font-medium-ff"
      >
        {{ t("TITLES.auth.otpNotSent") }}
      </span>
      <button
        class="text-main-clr font-semiBold-ff hover:text-main-clr text-sm lg:text-base xl:text-lg mx-1 disabled:!text-light-default-text-clr disabled:!cursor-not-allowed capitalize"
        @click="regenerateOtp"
        :disabled="timeRemaining"
      >
        {{ t("BUTTONS.auth.resendOtp") }}
      </button>
    </div>
    <button
      v-if="route.query.type == 'reset-password'"
      @click.prevent="goToResetPassword"
      :disabled="!meta.valid"
      class="disabled:opacity-50 relative flex items-center justify-center px-8 py-3 !text-secondary-text-clr capitalize rounded-lg font-semiBold-ff bg-main-clr text-sm md:text-base transition-all duration-300 ease-in-out hover:!bg-dark-bg w-full mt-0 md:mt-3"
    >
      <Icon
        name="lucide:loader-circle"
        size="20"
        class="animate-spin"
        v-if="isSubmitting"
      />
      {{ t("BUTTONS.auth.continue") }}
    </button>
    <button
      v-else
      type="submit"
      :disabled="!meta.valid"
      class="disabled:opacity-50 relative flex items-center justify-center px-8 py-3 !text-secondary-text-clr capitalize rounded-lg font-semiBold-ff bg-main-clr text-sm md:text-base transition-all duration-300 ease-in-out hover:!bg-dark-bg w-full mt-0 md:mt-3"
    >
      <Icon
        name="lucide:loader-circle"
        size="20"
        class="animate-spin"
        v-if="isSubmitting"
      />
      {{ t("BUTTONS.auth.confirmCode") }}
    </button>
  </form>
</template>
