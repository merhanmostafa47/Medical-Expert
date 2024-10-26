<script setup>
defineProps({
  customDesign: {
    type: Boolean,
    required: false,
    default: false,
  },
  text: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    required: false,
    default: "main-clr",
  },
  variant: {
    type: String,
    required: false,
    default: "flat",
  },
  prependIcon: {
    type: String, // Expect An Valid Icon Name From Iconify
    required: false,
  },
  appendIcon: {
    type: String, // Expect An Valid Icon Name From Iconify
    required: false,
  },
  iconSize: {
    type: String,
    required: false,
    default: "25",
  },
  iconColor: {
    type: String,
    required: false,
    default: "main-clr",
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});

defineEmits(["@click"]);
</script>

<template>
  <v-btn
    v-if="!customDesign"
    v-bind="$attrs"
    height="40"
    rounded="8"
    :color="color"
    :variant="variant"
    :loading="loading"
    :disabled="disabled"
    @click="$emit('@click')"
  >
    <template v-slot:prepend v-if="prependIcon">
      <Icon
        :name="prependIcon"
        :size="iconSize"
        :style="{ color: `var(--${iconColor})` }"
      />
    </template>

    <template v-if="text">
      {{ text }}
    </template>

    <template v-slot:append v-if="appendIcon">
      <Icon
        :name="appendIcon"
        :size="iconSize"
        :style="{ color: `var(--${iconColor})` }"
      />
    </template>

    <template v-slot:loader>
      <Icon name="svg-spinners:gooey-balls-1" size="35" />
    </template>
  </v-btn>

  <button v-else @click="$emit('@click')" :disabled="disabled">
    <Icon v-if="loading" name="svg-spinners:gooey-balls-1" size="35" />
    <template v-else>
      <slot name="btn_icon"></slot>
      {{ text }}
    </template>
  </button>
</template>

<style>
.v-btn {
  .v-btn__prepend,
  .v-btn__append {
    @apply !m-0;
  }
}
</style>
