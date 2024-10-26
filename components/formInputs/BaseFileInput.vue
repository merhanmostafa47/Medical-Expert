<script setup>
const model = defineModel();

const props = defineProps({
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
  multiple: {
    type: Boolean,
    required: false,
    default: false,
  },
  prependIcon: {
    type: String, // Expect An Valid Icon Name From Iconify
    required: false,
    default: "iconamoon:arrow-down-2-duotone",
  },
  appendIcon: {
    type: String, // Expect An Valid Icon Name From Iconify
    required: false,
    default: "iconamoon:arrow-down-2-duotone",
  },
  iconSize: {
    type: String,
    required: false,
    default: "22",
  },
  iconColor: {
    type: String,
    required: false,
    default: "main-clr",
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
    default: "var(--input-text-clr)",
  },
  modelValue: {
    type: [File, Array],
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);
const id = ref(`file-input-${Math.random().toString(36).substring(2, 15)}`);
const files = ref([]);

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      files.value = Array.isArray(newVal) ? newVal : [newVal];
    }
  },
  { immediate: true }
);

const updateFiles = (event) => {
  const selectedFiles = Array.from(event.target.files);
  files.value = props.multiple ? selectedFiles : [selectedFiles[0]];
  emit("update:modelValue", files.value);
};
</script>

<template>
  <!-- ======== Start:: Input Type text | email | tel | number ======== -->
  <v-col :cols="cols" :md="col">
    <div class="input_wrapper">
      <v-file-input
        :id="id"
        v-model="model"
        :label="label"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :rules="validationRules"
        :error-messages="error"
        hide-details="auto"
        :multiple="multiple"
        variant="outlined"
        :base-color="'rgba(226, 169, 55, .9)'"
        :color="color"
        persistent-clear
        show-size
        chips
        @change="updateFiles"
      >
        <template v-slot:prepend-inner v-if="prependIcon">
          <Icon
            :name="prependIcon"
            :size="iconSize"
            :style="{ color: `var(--${iconColor})` }"
          />
        </template>
      </v-file-input>
    </div>
  </v-col>

  <!-- ======== End:: Input Type text | email | tel  ======== -->
</template>

<style>
.v-input--center-affix .v-input__prepend {
  display: none;
}

/* .v-file-input {
  .v-field__input{
    @apply !text-input-text-clr
  }
} */
</style>
