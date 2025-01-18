<script setup>
definePageMeta({
  layout:'auth-layout'
})

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
  
    <section>
      <v-container>
        <v-row class="items-center gap-y-5">
          <v-col cols="12" md="7">
            <h2 class="mb-8 text-lg capitalize font-bold-ff">
              {{ t("TITLES.auth.enterOtp") }}
            </h2>
            <div
              class="p-5 lg:p-10 rounded-lg shadow-[0_1px_8px_0_rgba(0,0,0,0.16)]"
              data-aos="zoom-in-up"
              data-aos-delay="300"
            >
              <p
                class="w-full text-base leading-loose font-medium-ff text-light-default-text-clr md:w-5/6"
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
              class="object-contain object-center w-full md:h-72 h-60"
            />
          </v-col>
        </v-row>
      </v-container>
    </section>
  
  </main>
</template>
