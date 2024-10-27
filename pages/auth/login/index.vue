<script setup>
// I18n
const { t } = useI18n();

// Set Page Meta Data
useSeoMeta({
  title: t("TITLES.auth.login"),
});
</script>

<template>
  <main class="h-[calc(100vh_-_128px)] overflow-hidden">
    <!-- ======== Start:: Telegram Form Data Section ======== -->
    <section>
      <v-container>
        <v-row class="gap-y-5 items-center justify-between">
          <v-col cols="12" md="6">
            <div class="h-[20rem] lg:h-[25rem] xl:h-[32rem]">
              <NuxtImg presets="defaults" :placeholder="[_, _, 60, 8]" src="media/images/auth/admin.svg" width="350"
                height="350" alt="admin" title="admin" loading="lazy"
                class="w-full  h-full object-contain object-center" />
            </div>
          </v-col>
          <v-col cols="12" md="5">
            <LoginForm />
          </v-col>

        </v-row>
      </v-container>
    </section>
    <!-- ======== End:: Telegram Form Data Section ======== -->
  </main>
</template>
