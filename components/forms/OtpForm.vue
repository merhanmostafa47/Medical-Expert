<script setup>
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

const initialTime = authStore.getAuthUserData?.resendCodeTime ?? 300;

// Use the timer composable
const { displayTime, timeRemaining, restartTimer } = useTimer(initialTime);

// Form Validation using Yup
import { object, string } from "yup";

// Add the validation to the form
const validationSchema = object({
  otp: string().test(
    "len",
    t("FORMS.Validation.otp"),
    (val) => val?.length == 4
  ),
});

const { handleSubmit, meta, setFieldError, isSubmitting } = useForm({
  validationSchema,
});

const { value: otp, errorMessage: otpError } = useField("otp");

otp.value = "0000";
otpError.value = "";

const submit = handleSubmit(async (values, { resetForm }) => {
  const { data, error } = await useBaseFetch(
    "POST",
    route.path.includes("profile") ? "change-phone/confirm" : "phoneotp/verify",
    locale,
    {
      phone: authStore.getAuthUserData.phone,
      otp: values.otp,
    }
  );

  if (!error?.value) {
    toast.success(data?.value?.message);
    resetForm();
    otp.value = "0000";

    if (route.path.includes("auth")) {
      authStore.setAuthedData({
        ...authStore.getAuthUserData,
        token: data?.value?.data?.token,
        id: data?.value?.data?.user?.id,
        name: data?.value?.data?.user?.name,
        phone: data?.value?.data?.user?.phone,
      });
    }

    if (router.currentRoute.value.query?.type === "register") {
      router.replace({
        path: "success-registeration",
      });
    } else if (router.currentRoute.value.path.includes("profile")) {
      router.replace({
        path: localePath("/profile/success-verification"),
      });
    } else {
      router.replace({
        path: localePath("/"),
      });
    }
  } else {
    setFieldError("otp", error?.value?.data?.errors?.otp[0]);
    toast.error(error?.value?.data?.message);
  }
});

// Regenerate OTP
const regenerateOtp = async () => {
  const { data, error } = await useBaseFetch(
    "POST",
    route.path.includes("profile")
      ? "change-phone/regenerate"
      : "phoneotp/generate",
    locale,
    {
      phone: authStore.getAuthUserData.phone,
    }
  );

  if (!error?.value) {
    toast.success(data?.value?.message);
    restartTimer();
    otp.value = "0000";
  } else {
    toast.error(error?.value?.data?.message);
  }
};
</script>

<template>
  <form class="flex justify-end flex-col w-full" @submit="submit">
    <base-otp-input v-model="otp" placeholder="0" :error="otpError" />
    <p class="text-sm my-4 text-center text-default-text-clr font-medium-ff">
      {{ t("TITLES.auth.resendOtpDuration") }}
      <span class="text-main-clr font-semiBold-ff">{{ displayTime }}</span>
    </p>

    <button
      type="submit"
      :disabled="!meta.valid"
      class="disabled:opacity-50 relative flex items-center justify-center px-8 py-3 !text-secondary-text-clr capitalize rounded-lg !font-semiBold-ff bg-main-clr text-sm md:text-base transition-all duration-300 ease-in-out hover:!bg-dark-bg w-full mt-0 md:mt-3"
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

  <div class="flex justify-center mt-6">
    <span class="text-sm text-center text-default-text-clr font-medium-ff">
      {{ t("TITLES.auth.otpNotSent") }}
    </span>
    <button
      class="text-main-clr font-semiBold-ff hover:text-dark-main-clr underline underline-offset-1 text-sm mx-1 disabled:!text-light-default-text-clr disabled:!cursor-not-allowed capitalize"
      @click="regenerateOtp"
      :disabled="timeRemaining"
    >
      {{ t("BUTTONS.auth.resendOtp") }}
    </button>
  </div>
</template>
