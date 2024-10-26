<script>
// I18n
const localePath = useLocalePath();
</script>

<template>
  <div class="logo_wrapper">
    <NuxtLink :to="localePath('/')" class="block h-7 lg:h-8 xl:h-10 w-fit">
      <NuxtImg
        :placeholder="[_, _, 60, 8]"
        presets="default"
        src="/media/logo/logo.svg"
        width="438"
        height="64"
        alt="logo"
        title="logo"
        loading="lazy"
        class="w-full h-full object-contain"
      />
    </NuxtLink>
  </div>
</template>
