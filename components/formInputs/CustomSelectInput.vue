<template>
  <v-col :cols="cols" :md="col" class="!p-4">
    <div class="input_wrapper">
      <label :for="id">
        {{ label }}
      </label>
      <v-autocomplete
        v-model="vModelValue"
        :chips="chips"
        :deletable-chips="multiple"
        :small-chips="multiple"
        :multiple="multiple"
        :items="isStatic ? _staticItems : items"
        item-value="value"
        item-title="title"
        :error="computedError"
        :error-messages="computedErrorMessages"
        closable-chips
        :no-data-text="noDataText"
        :return-object="returnObject"
        hide-details="auto"
        :placeholder="placeholder"
        @focus="setErrors(null)"
        @blur="setErrors(null)"
        :required="required"
        :disabled="disabled"
        flat
      >
      </v-autocomplete>
    </div>
  </v-col>
</template>

<script setup>
const id = useId();
const props = defineProps({
  loading: { type: Boolean, default: false },
  staticItems: { type: Array, required: false },
  returnObject: { type: Boolean, default: false },
  static: { type: Boolean, default: false },
  getUrl: { type: String, required: false },
  value: { required: false },
  label: { type: String, required: true },
  placeholder: { type: String },
  col: { type: String, required: false, default: "12" },
  cols: { type: String, required: false, default: "12" },
  required: { type: Boolean, default: false },
  noDataText: { type: String },
  multiple: { type: Boolean, default: false },
  chips: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  name: { type: String, required: false },
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
});

const emit = defineEmits(["input", "clearServerSideErrorMessage"]);
const { $axiosRequest } = useNuxtApp();

const items = ref([]);
const _staticItems = computed(() => props.staticItems || []);
const isStatic = computed(() => props.static);

const { value: fieldValue, errorMessage, setErrors } = useField(props.name);

// Two-way binding with validation support
const vModelValue = computed({
  get() {
    return fieldValue.value;
  },
  set(val) {
    fieldValue.value = val;
    emit("input", val);
  },
});

// Computed error state
const computedError = computed(() => !!errorMessage.value);

// Computed error messages
const computedErrorMessages = computed(() => errorMessage.value || "");

// Fetch select items
const getSelectItems = async () => {
  if (isStatic.value) {
    items.value = [..._staticItems.value];
    return;
  }

  try {
    const response = await $axiosRequest.get(props.getUrl);
    items.value = response.data.data;
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
  }
};

// Fetch items on component mount
onMounted(() => {
  getSelectItems();
});
</script>

<style lang="postcss">
.v-autocomplete {
  &__content {
    .v-list-item {
      &__overlay {
        @apply bg-opacity-bg;
      }
      &__content {
        @apply z-0;
      }
      &-title {
        @apply text-main-clr capitalize;
      }
    }
    [aria-selected="true"] {
      .v-list-item {
        &__overlay {
          @apply bg-secondary-clr;
        }
        &-title {
          @apply text-main-clr capitalize;
          @apply text-white;
        }
      }
    }
  }
  &__selection-text {
    @apply text-main-clr;
  }
  .v-icon {
    @apply text-main-clr; 
  }
}
</style>
