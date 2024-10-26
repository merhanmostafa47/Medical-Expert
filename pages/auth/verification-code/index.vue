<script setup>
// I18n
const { t } = useI18n();

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
      <v-container>
        <v-row class="gap-y-5 items-center">
          <v-col cols="12" md="7">
            <h2 class="text-lg font-bold-ff mb-8 capitalize">
              {{ t("TITLES.auth.enterOtp") }}
            </h2>
            <div
              class="p-5 lg:p-10 rounded-lg shadow-[0_1px_8px_0_rgba(0,0,0,0.16)]"
              data-aos="zoom-in-up"
              data-aos-delay="300"
            >
              <p
                class="font-medium-ff text-base text-light-default-text-clr w-full leading-loose md:w-5/6"
              >
                {{ t("TITLES.auth.sendOtp") }}
              </p>
              <OtpForm />
            </div>
          </v-col>
          <v-col cols="12" md="5">
            <NuxtImg
              presets="defaults"
              :placeholder="[_, _, 60, 8]"
              src="media/images/auth/otp.svg"
              width="350"
              height="350"
              alt="otp img"
              title="otp img"
              loading="lazy"
              class="w-full md:h-72 h-60 object-contain object-center"
            />
          </v-col>
        </v-row>
      </v-container>
    </section>
    <!-- ======== End:: Telegram Form Data Section ======== -->
  </main>
</template>
