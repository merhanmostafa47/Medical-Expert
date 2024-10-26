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
    <!-- ======== Start:: Telegram Form Data Section ======== -->
    <section>
      <v-container class="items-center justify-center">
        <div
          class="p-5 lg:p-10 rounded-lg shadow-[0_1px_8px_0_rgba(0,0,0,0.16)] lg:w-1/2 md:w-3/4 w-full mx-auto"
          data-aos="zoom-in-up"
          data-aos-delay="300"
        >
          <NuxtImg
            presets="defaults"
            :placeholder="[_, _, 60, 8]"
            src="/media/images/gif/Check.gif"
            width="450"
            height="350"
            alt="check gif"
            title="you pay success"
            loading="lazy"
            class="w-full h-[13rem] object-contain"
          />
          <p
            class="font-medium-ff text-light-default-text-clr lg:text-lg !leading-loose text-center text-base w-full md:w-3/4 mx-auto"
          >
            {{ t("TITLES.auth.accountCreated") }}
          </p>
          <NuxtLink
            :to="{ path: localePath('/') }"
            class="main-btn w-full mt-6"
          >
            {{ $t("BUTTONS.auth.goToHome") }}
          </NuxtLink>
        </div>
      </v-container>
    </section>
    <!-- ======== End:: Telegram Form Data Section ======== -->
  </main>
</template>
