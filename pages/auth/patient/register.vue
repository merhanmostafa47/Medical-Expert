<script setup>
// I18n
const { t } = useI18n();
const localePath = useLocalePath();

// Router & Route Composables
const route = useRoute();

// Set Page Meta Data
useSeoMeta({
  title: t("TITLES.auth.register"),
});
</script>

<template>
  <main class="mt-0">
    <section>
      <v-container>
        <v-row class="gap-y-5 items-center justify-between">
          <v-col cols="12" md="6" class="hidden lg:block">
            <div class="h-[20rem] lg:h-[25rem] xl:h-[32rem]">
              <NuxtImg presets="defaults" :placeholder="[_, _, 60, 8]" src="media/images/auth/patient.svg" width="350"
                height="350" alt="admin" title="admin" loading="lazy"
                class="w-full  h-full object-contain object-center" />
            </div>
          </v-col>
          <v-col cols="12" md="5">
            <div class="auth__form__wrapper">
              <div class="form__header">
                <h1 class="auth__title">
                  {{ t("TITLES.auth.register") }}
                </h1>

                <div class="auth__copy">
                  <span>
                    {{ t("TITLES.auth.haveAccount") }}
                  </span>
                  <NuxtLink class="auth__link" :to="{path: localePath('/auth/patient/login'), query: { type: route.query.type }}">
                    {{ t("BUTTONS.auth.login") }}
                  </NuxtLink>
                </div>
              </div>
              <SignupForm :userType="route.query.type" endpoint="patient/register" 
              verifyEmail="localPath('/auth/patient/verification-code')"/>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </main>
</template>
