<script setup>
const id = useId();
const model = defineModel();

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: "number",
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
    default: "#136FB7",
  },
});
</script>

<template>
  <!-- ======== Start::OTP Input Type ======== -->
  <div class="otp_input_wrapper" dir="ltr">
    <v-otp-input
      length="6"
      height="72"
      v-model="model"
      :id="id"
      :label="label"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :rules="validationRules"
      :error="error"
      :variant="variant"
      bg-color="#136FB7"
      base-color="#136FB7"
      :color="color"
    ></v-otp-input>
    <span class="otp_error" v-if="error"> {{ error }} </span>
  </div>
  <!-- ======== End::OTP Input Type  ======== -->
</template>

<style>
.otp_error {
  @apply text-red-700 text-center text-sm w-full inline-block;
}

.v-otp-input__field{
@apply !text-main-clr !text-base
}

.v-otp-input__content{
 @apply !max-w-[370px]
}

.v-otp-input .v-field{
  @apply !rounded-lg !overflow-hidden
}
</style>
