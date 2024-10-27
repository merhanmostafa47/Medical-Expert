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

// Add the validation to the form
const { handleSubmit, meta, isSubmitting } = useForm();

const submit = handleSubmit(async (values) => {

  const { data, error } = await useBaseFetch(
    "POST",
    route.path.includes("login") ? "login" : "register",
    locale,
    {
      phone: values.phone,
    }
  );

  if (!error?.value) {
    toast.success(data?.value?.message);
    // save phone in store
    authStore.setAuthedData({
      ...authStore.getAuthUserData,
      phone: fullPhoneNumber,
      resendCodeTime: data?.value?.data?.timer?.in_sec,
    });

    phone.value = "";

    router.push({
      path: "verification-code",
      query: { type: route.path.includes("login") ? "login" : "register" },
    });
  } else {
    toast.error(error?.value?.data?.message);
    phoneError.value = error?.value?.data?.errors?.phone[0];
  }
});
</script>

<template>
  <form class="flex justify-end flex-col w-full" @submit="submit">
    <v-row class="flex w-full !py-0 !m-0">
      <base-input
        v-model="phone"
        :label="t('FORMS.Labels.phone')"
        type="tel"
        class="!px-0"
        :error="phoneError"
      />
    </v-row>
    <button
      type="submit"
      :disabled="!meta.valid || phone == '' || phoneError != null"
      class="disabled:opacity-50 relative flex items-center justify-center px-8 py-3 !text-secondary-text-clr capitalize rounded-lg !font-semiBold-ff bg-main-clr text-sm md:text-base transition-all duration-300 ease-in-out hover:!bg-dark-bg w-full mt-0 md:mt-3"
    >
      <Icon
        name="lucide:loader-circle"
        size="20"
        class="animate-spin"
        v-if="isSubmitting"
      />
      {{
        route.path.includes("login")
          ? t("BUTTONS.auth.login")
          : t("BUTTONS.auth.register")
      }}
    </button>

    <div class="flex items-center justify-center mt-6 md:mt-8">
      <div v-if="route.path.includes('login')" class="text-sm md:text-base">
        <span>{{ t("TITLES.auth.notHaveAccount") }}</span>
        <NuxtLink
          :to="localePath('/auth/register')"
          class="text-main-clr font-semibold-ff hover:!text-dark-main-clr underline underline-offset-4 transition-all duration-300 mx-1"
        >
          {{ t("TITLES.auth.createAccount") }}
        </NuxtLink>
      </div>

      <div v-if="route.path.includes('register')" class="text-sm md:text-base">
        <span>{{ t("TITLES.auth.haveAccount") }}</span>
        <NuxtLink
          :to="localePath('/auth/login')"
          class="text-main-clr font-semibold-ff hover:!text-dark-main-clr underline underline-offset-4 ease-in-out transition-all duration-300 mx-1"
        >
          {{ t("TITLES.auth.loginNow") }}
        </NuxtLink>
      </div>
    </div>
  </form>
</template>
