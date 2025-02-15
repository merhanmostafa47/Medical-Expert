<template>
  <!-- <div> -->
    <!-- Textarea Input -->
    <div class="input_wrapper" v-if="type == 'textarea'">
      <v-textarea
        v-model="vModelValue"
        :label="label"
        :placeholder="placeholder"
        @input="$emit('input', $event)"
        @focus="setErrors(null)"
        :readonly="readonly"
        :autofocus="autofocus"
        :error="computedError"
        hide-details="auto"
        :error-messages="computedErrorMessages"
        @blur="setErrors(null)"
        :disabled="disabled"
        :required="required"
        :rows="rows"
      ></v-textarea>
    </div>

    <!-- Password Input -->
    <div class="input_wrapper" v-else-if="type == 'password'">
      <v-text-field
        v-model="vModelValue"
        :type="passwordIsVisible ? 'text' : 'password'"
        :label="label"
        hide-details="auto"
        :placeholder="placeholder"
        :error="computedError"
        :readonly="readonly"
        :error-messages="computedErrorMessages"
        @blur="setErrors(null)"
        @focus="setErrors(null)"
        @input="$emit('input', $event)"
        :required="required"
        :disabled="disabled"
        :prepend-inner-icon="icon"
        :autofocus="autofocus"
      >
      </v-text-field>
    </div>

    <!-- Text || Number || Tel || Email Input -->
      <v-col
      :cols="cols"
      :md="col"
      v-if="
        type == 'text' || type == 'number' || type == 'tel' || type == 'email' || type == 'time'
      "
      class="!p-4"
    >
      <div class="input_wrapper">
        <label :for="id">
          {{ label }}
        </label>
        <v-text-field
          :id="id"
          v-model="vModelValue"
          :type="type"
          :placeholder="placeholder"
          :error="computedError"
          :error-messages="computedErrorMessages"
          @blur="setErrors(null)"
          @focus="setErrors(null)"
          hide-details="auto"
          :required="required"
          :disabled="disabled"
          :variant="variant"
          :autofocus="autofocus"
          :base-color="'#136FB7'"
          :color="'#136FB7'"
        ></v-text-field>
      </div>
    </v-col>
  <!-- </div> -->
</template>

<script setup>
const id = useId();

const props = defineProps({
  // ====== General Inputs Props
  name: {
    type: String,
    required: false,
  },
  type: {
    required: true,
    type: String,
  },
  modelValue: {
    required: false,
  },
  placeholder: {
    required: false,
    type: String,
  },
  label: {
    required: false,
    type: String,
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
  disabled: {
    required: false,
    type: Boolean,
    default: false,
  },
  readonly: {
    required: false,
    type: Boolean,
    default: false,
  },
  required: {
    required: false,
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    required: false,
    default: "outlined",
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  inputIsLoading: {
    type: Boolean,
    required: false,
    default: false,
  },
  icon: {
    required: false,
    type: String,
  },
  iconSrc: {
    required: false,
    type: String,
  },
  appendIcon: {
    required: false,
    type: String,
  },
  appendIconSrc: {
    required: false,
    type: String,
  },

  // ====== Textarea Input Props
  rows: {
    type: [String, Number],
    required: false,
    default: "4",
  },
});
const emits = defineEmits(["update:modelValue", "input"]);
const passwordIsVisible = ref(false);

// const { value, errorMessage, setErrors } = useField(props.name);

let field;
if (props.name) {
  field = useField(props.name);
}

const vModelValue = computed({
  get() {
    return props.name ? field.value.value : props.modelValue;
  },
  set(val) {
    if (props.name) {
      field.value.value = val;
    } else {
      emits("update:modelValue", val);
    }
  },
});

const computedError = computed(() => {
  return props.name && field.errorMessage.value ? true : false;
});

const computedErrorMessages = computed(() => {
  return props.name ? field.errorMessage.value : "";
});

const setErrors = (message) => {
  if (field && field.setErrors) {
    field.setErrors(message);
  }
};
</script>