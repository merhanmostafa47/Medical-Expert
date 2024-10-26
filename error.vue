<script setup>
// Error Prop
const props = defineProps({
  error: {
    type: Object,
  }
});

// Router & Handling Redirect
const router = useRouter();
const clearErrorAndRedirect = () => clearError(router.back());
</script>

<template>
  <div 
    v-if="error"
    class="flex flex-col items-center justify-center min-h-screen gap-y-6 bg-main-bg min-w-screen bg-[url('/media/shapes/error_page.svg')]"
  >
    <h5 class="text-4xl text-center capitalize text-secondary-color"> oops! </h5>

    <h2 class="!text-9xl font-extraBold-ff [-webkit-text-fill-color:transparent] bg-clip-text bg-gradient-to-r from-soft-main-clr to-secondary-clr"> 
      {{ error.statusCode }}
    </h2>

    <div class="mt-5 text-3xl text-center capitalize">
      <h4 class="text-3xl text-center capitalize" v-if="error.statusMessage"> {{error.statusMessage}} </h4>
      <button @click="clearErrorAndRedirect" class="px-5 py-3 mt-4 text-2xl border-b border-white border-solid ca-pitalize"> go back </button>
    </div>
  </div>
</template>