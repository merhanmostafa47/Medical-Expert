<template>
  <NuxtImg
      ref="imageRef"
      :src="src || '/media/icons/main_placeholder.webp'"
      :alt="alt"
      :loading="loadingState"
      :width="width"
      :height="height"
      :format="format"
      :fit="fit"
      v-bind="{ placeholder: hasPlaceholder || undefined }"
      @error="handleImageError"
    />
</template>

<script setup>
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
    default: "",
  },
  loadingState: {
    type: String,
    default: "lazy",
  },
  errorSrc: {
    type: String,
  },
  width: {
    type: [String, Number],
    default: null,
  },
  height: {
    type: [String, Number],
    default: null,
  },
  format: {
    type: String,
    default: "webp",
  },
  fit: {
    type: String,
    default: "cover",
  },
  hasPlaceholder: {
    type: Boolean,
    default: true,
  },
});

const imageRef = ref(null);

const handleImageError = async (event) => {
  await nextTick();
  if (imageRef.value?.$el) {
    imageRef.value.$el.onerror = null;
    imageRef.value.$el.src = props.errorSrc || '/media/icons/user-placeholder.png';
  }
};
</script>

<style></style>
