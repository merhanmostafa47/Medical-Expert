<template>
  <div class="breadcrumb_wrapper">
    <v-breadcrumbs :items="breadcrumbItems" :divider="divider"></v-breadcrumbs>
  </div>
</template>

<script setup>
defineProps({
  breadcrumbItems: {
    type: Array,
    required: true,
  },
  divider: {
    type: String,
    default: '/',
  },
});
</script>

<style lang="postcss">
.breadcrumb_wrapper {
    @apply pb-4;
  .v-breadcrumbs {
    @apply flex flex-wrap p-0;
    .v-breadcrumbs-item {
      @apply text-gray-clr;
      opacity: .5;
      &:hover {
        opacity: 1;
      }
      &--disabled {
        opacity: 1;
      }
      &--active {
      @apply text-main-clr;
      }
      &--link {
        &:hover {
          text-decoration: none;
        }
      }
    }
    .v-breadcrumbs-divider {
      @apply text-gray-clr;
      opacity: .5;
    }
  }
}
</style>
