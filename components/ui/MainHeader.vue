<template>
  <h2 class="text-main-clr font-bold capitalize mb-4">
    <span>{{ title }}</span>
    <slot></slot>
  </h2>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
    default: ""
  }
})
</script>