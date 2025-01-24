<script setup>
// Handel Loading State
const nuxtApp = useNuxtApp();
const isLoading = ref(false);
nuxtApp.hook('page:start', () => isLoading.value = true);
nuxtApp.hook('page:finish', () => isLoading.value = false);
</script>

<template>
  <div v-if="isLoading" class="main_loader_wrapper fixed inset-0 bg-white flex items-center justify-center min-h-screen max-h-screen z-[1005]">
    <img
      src="/media/gifs/loader.gif" 
      width="260"
      height="260"
      alt="loader"
      title="loader"
      loading="lazy"
    />
    <!-- <Icon name="svg-spinners:3-dots-bounce" size="150" class="text-red-500"/> -->
  </div>
</template>

<style scoped>

@keyframes puls {
  0% {
    transform: scale(0.8);
  }

  100% {
    transform: scale(1.2);
  }
}
</style>