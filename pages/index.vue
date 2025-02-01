<script setup>
// I18n
const { t } = useI18n();
const localePath = useLocalePath();

const router = useRouter();
const route = useRoute();

// Set Page Meta Data
useSeoMeta({
  title: t("TITLES.auth.login"),
});

definePageMeta({
  layout:'auth-layout'
})

const url = useRequestURL();

const userType = ref("");

const goToLogin = () => {
  console.log(userType.value);
  if (userType.value == "doctor") {
    router.push({
      path: localePath("/auth/doctor/login"),
      query: { type: userType.value },
    });
  } else if (userType.value == "lab") {
    router.push({
      path: localePath("/auth/lab/login"),
      query: { type: userType.value },
    });
  } else if (userType.value == "pharmacy") {
    router.push({
      path: localePath("/auth/pharmacy/login"),
      query: { type: userType.value },
    });
  }
};

const isOpen = ref(false)

</script>

<template>
  <main>
    <section class="h-[calc(100vh_-_128px)]">
      <v-container>
        <v-row class="items-center justify-between gap-y-5" v-if="url.href.includes('admin')">
          <v-col cols="12" md="6" class="hidden lg:block">
            <div class="h-[20rem] lg:h-[25rem] xl:h-[32rem]">
              <NuxtImg presets="defaults" :placeholder="[_, _, 60, 8]" src="media/images/auth/admin.svg" width="350"
                height="350" alt="admin" title="admin" loading="lazy"
                class="object-contain object-center w-full h-full" />
            </div>
          </v-col>
          <v-col cols="12" md="5">
            <div class="auth__form__wrapper">
              <div class="form__header">
                <h1 class="auth__title">
                  {{ t("TITLES.auth.login") }}
                </h1>
              </div>

              <LoginForm endpoint="admin/login" forgetPasswordPath="forget-password" />
            </div>
          </v-col>
        </v-row>

        <v-row class="items-center justify-between gap-y-5" v-else-if="url.href.includes('patient')">
          <v-col cols="12" md="6" class="hidden lg:block">
            <div class="h-[20rem] lg:h-[25rem] xl:h-[32rem]">
              <NuxtImg presets="defaults" :placeholder="[_, _, 60, 8]" src="media/images/auth/patient.svg" width="350"
                height="350" alt="admin" title="admin" loading="lazy"
                class="object-contain object-center w-full h-full" />
            </div>
          </v-col>
          <v-col cols="12" md="5">
            <div class="auth__form__wrapper">
              <div class="form__header">
                <h1 class="auth__title">
                  {{ t("TITLES.auth.login") }}
                </h1>
              </div>

              <LoginForm endpoint="patient/login" forgetPasswordPath="forget-password" />
            </div>
          </v-col>
        </v-row>

        <v-row class="items-center gap-y-5" v-else>
          <v-col cols="12" md="7" class="hidden lg:block">
            <div class="h-[20rem] lg:h-[25rem] xl:h-[32rem]">
              <NuxtImg presets="defaults" :placeholder="[_, _, 60, 8]" src="media/images/auth/admin.svg" width="350"
                height="350" alt="admin" title="admin" loading="lazy"
                class="object-contain object-center w-full h-full" />
            </div>
          </v-col>
          <v-col cols="12" md="5">
            <div>
              <p class="mb-12 text-lg font-bold-ff xl:text-2xl lg:text-xl text-main-clr">
                Please, Select your user type to continue.
              </p>
              <div class="choose__user__type">
                <button class="type__button" @click="userType = 'doctor'" :class="{ active: userType == 'doctor' }">
                  Doctor
                </button>
                <button class="type__button" @click="userType = 'lab'" :class="{ active: userType == 'lab' }">
                  laboratory
                </button>
                <button class="type__button" @click="userType = 'pharmacy'" :class="{ active: userType == 'pharmacy' }">
                  pharmacy
                </button>
              </div>
              <div class="flex items-end justify-end mt-16">
                <button class="btn" :disabled="!userType" @click="goToLogin()">
                  <span> next </span>
                  <Icon name="charm:arrow-right" />
                </button>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </main>
</template>

<style>
.choose__user__type {
  @apply flex items-center xl:gap-8 gap-6 lg:justify-start justify-center flex-wrap;

  .type__button {
    @apply border border-secondary-clr rounded-2xl px-8 py-4 bg-opacity-bg cursor-pointer text-secondary-clr lg:text-base text-sm font-medium-ff capitalize;

    &.active {
      @apply bg-secondary-clr text-white;
    }
  }
}
</style>
