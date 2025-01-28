<script setup>
const props = defineProps({
  placeholder: { type: String },
});

const emit = defineEmits(["search"]);

const model = ref(null);
</script>

<template>
  <div class="search__wrapper">
    <Icon name="ri:search-line" size="20" class="text-secondary-clr" />
    <input
      v-model="model"
      :placeholder="placeholder"
      @change="emit('search', model)"
    />
  </div>
</template>
<style>
.search__wrapper {
  @apply bg-white w-full md:w-[70%] lg:w-[50%] xl:w-[40%] shrink-0  px-4 py-2 border-secondary-clr  border flex items-center gap-1.5  rounded-2xl;

  input {
    @apply size-full text-sm font-semiBold-ff text-secondary-clr placeholder:text-secondary-clr bg-transparent h-9;
  }
}
</style>
