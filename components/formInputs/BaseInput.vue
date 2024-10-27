<script setup>
const id = useId();
const model = defineModel();

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: "text",
  },
  variant: {
    type: String,
    required: false,
    default: "outlined",
  },
  col: {
    type: String,
    required: false,
    default: "12",
  },
  cols: {
    type: String,
    required: false,
    default: "12",
  },
  placeholder: {
    type: String,
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
  required: {
    type: String,
    required: false,
  },
  disabled: {
    type: String,
    required: false,
  },
  validationRules: {
    type: Object,
    required: false,
  },
  error: {
    required: false,
  },
  inputIsLoading: {
    type: Boolean,
    required: false,
    default: false,
  },
  color: {
    type: String,
    required: false,
    default: "var(--default-text-clr)",
  },

  // ====== Textarea Input Props
  rows: {
    required: false,
    type: String,
    default: "4",
  },
});
</script>

<template>
  <!-- ======== Start:: Input Type text | email | tel | number ======== -->
  <v-col
    :cols="cols"
    :md="col"
    v-if="
      type == 'text' || type == 'number' || type == 'tel' || type == 'email'
    "
  >
    <div class="input_wrapper">
      <label :for="id">
        {{ label }}
      </label>
      <v-text-field
        :id="id"
        v-model="model"
        :type="type"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :rules="validationRules"
        :error-messages="error"
        hide-details="auto"
        :variant="outlined"
        :base-color="'#136FB7'"
    :color="'#136FB7'"
      ></v-text-field>
    </div>
  </v-col>

  <!-- ======== End:: Input Type text | email | tel  ======== -->

  <!-- ======== Start:: Textarea Input ======== -->
  <v-col :cols="cols" :md="col" v-else-if="type == 'textarea'" class="!p-1.5">
    <div class="input_wrapper">
      <v-textarea
        :id="id"
        v-model="model"
        :label="label"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :rules="validationRules"
        :error-messages="error"
        :rows="rows"
        hide-details="auto"
        :variant="variant"
        :base-color="'#136FB7'"
        :color="color"
        clear-icon="mdi-close-circle"
      ></v-textarea>
    </div>
  </v-col>
  <!-- ======== End:: Textarea Input ======== -->
</template>

<style>
label{
  @apply font-regular-ff lg:text-base text-sm text-main-clr mb-2 block capitalize
}
.v-field__input {
  @apply !pb-3 !rounded-lg !overflow-hidden text-start md:placeholder:text-base  bg-opacity-bg target:placeholder:!text-secondary-clr outline-none !text-[v-bind('props.color')] text-sm placeholder:!text-start placeholder:capitalize placeholder:!text-sm border border-secondary-clr border-opacity-50 focus:border-opacity-100
}

.v-field--variant-filled .v-field__overlay {
  @apply !bg-opacity-bg;
}

.v-field--variant-filled .v-field__outline::before {
  @apply hidden;
}

.v-messages__message {
  @apply capitalize !leading-4;
}

.v-field__outline {
  @apply !rounded-lg;
}

.v-label {
  @apply !text-sm capitalize;
}

html[dir="rtl"] input[type="tel"] {
  @apply !text-end placeholder:!text-end;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  @apply appearance-none m-0;
}

.v-field--variant-solo {
  @apply !bg-transparent !border-none !shadow-none;
}

.v-field__outline{
  @apply text-transparent !border-0 !hidden
}
</style>
