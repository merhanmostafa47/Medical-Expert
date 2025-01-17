<script setup>
// I18n
const { t } = useI18n();

const localePath = useLocalePath();

const route = useRoute();

// Set Page Meta Data
useSeoMeta({
  title: t("TITLES.auth.newPassword"),
});
</script>

<template>
  <main class="h-[calc(100vh_-_128px)]">
    <section>
      <v-container>
        <v-row class="items-center justify-between gap-y-5">
          <v-col cols="12" md="6" class="hidden lg:block">
            <div class="h-[20rem] lg:h-[25rem] xl:h-[32rem]">
              <NuxtImg
                presets="defaults"
                :placeholder="[_, _, 60, 8]"
                src="media/images/auth/doctor.svg"
                width="350"
                height="350"
                alt="admin"
                title="admin"
                loading="lazy"
                class="object-contain object-center w-full h-full"
              />
            </div>
          </v-col>
          <v-col cols="12" md="5">
            <div class="auth__form__wrapper">
              <div class="form__header">
                <h1 class="auth__title">
                  {{ t("TITLES.auth.new") }}
                </h1>

                <div class="auth__copy">
                  <span>
                    {{ t("TITLES.auth.setPassword") }}
                  </span>
                </div>
              </div>

              <NewPasswordForm
                endpoint="admin/password/reset"
                loginPath="login"
              />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </main>
</template>
