<script setup>
const props = defineProps({
  model: { type: String },
  placeholder: { type: String },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="search__wrapper">
    <Icon name="ri:search-line" size="20" class="text-secondary-clr" />
    <input
      :value="model"
      :placeholder="placeholder"
      @change="emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
<style>
.search__wrapper {
  @apply bg-white w-[40%] p-4 border-secondary-clr  border flex items-center gap-1.5  rounded-2xl;

  input {
    @apply size-full text-sm font-semiBold-ff text-secondary-clr placeholder:text-secondary-clr;
  }
}
</style>
