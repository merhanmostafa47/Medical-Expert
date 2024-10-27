<script setup>
// I18n
const { t } = useI18n();
const localePath = useLocalePath();

const router = useRouter();

// Set Page Meta Data
useSeoMeta({
  title: t("TITLES.auth.login"),
});

const userType = ref('')

const goToLogin = () => {
  router.push({ path: localePath("/auth/login"), query: { type: userType.value } });
}
</script>

<template>
  <main class=" overflow-hidden">
    <!-- ======== Start:: Telegram Form Data Section ======== -->
    <section class="h-[calc(100vh_-_128px)]">
      <v-container>
        <v-row class="gap-y-5 items-center">
          <v-col cols="12" md="7">
            <div class="h-[20rem] lg:h-[25rem] xl:h-[32rem]">
              <NuxtImg presets="defaults" :placeholder="[_, _, 60, 8]" src="media/images/auth/admin.svg" width="350"
                height="350" alt="admin" title="admin" loading="lazy"
                class="w-full  h-full object-contain object-center" />
            </div>

          </v-col>
          <v-col cols="12" md="5">
            <div>
              <p class="font-bold-ff xl:text-2xl lg:text-xl text-lg text-main-clr mb-12">
                Please, Select your user type to continue.
              </p>
              <div class="choose__user__type">
                <button class="type__button" @click=" userType = 'doctor'"
                  :class="{ 'active': userType == 'doctor' }">Doctor</button>
                <button class="type__button" @click=" userType = 'laboratory'"
                  :class="{ 'active': userType == 'laboratory' }">laboratory</button>
                <button class="type__button" @click=" userType = 'pharmacy'"
                  :class="{ 'active': userType == 'pharmacy' }">pharmacy</button>
              </div>
              <div class="flex items-end justify-end mt-16">
                <button class="btn" :disabled="userType == ''" @click="goToLogin">
                  <span>
                    next
                  </span>
                  <Icon name="charm:arrow-right" />
                </button>
              </div>

            </div>
          </v-col>

        </v-row>
      </v-container>
    </section>
    <!-- ======== End:: Telegram Form Data Section ======== -->
  </main>
</template>

<style>
.choose__user__type {
  @apply flex items-center xl:gap-10 gap-8 lg:justify-start justify-center;

  .type__button {
    @apply border border-secondary-clr rounded-2xl px-8 py-4 bg-opacity-bg cursor-pointer text-secondary-clr lg:text-base text-sm font-medium-ff capitalize;

    &.active {
      @apply bg-secondary-clr text-white
    }
  }
}
</style>