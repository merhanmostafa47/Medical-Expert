<template>
 <v-col
      :cols="cols"
      :md="col"
      class="!p-1"
    >
    <!-- Date Picker Input -->
    <div class="input_wrapper picker" v-if="type == 'date' || type == 'time'">
      <label :for="id">
        {{ label }}
      </label>
      <v-text-field
        v-model="dateFormated"
        :placeholder="placeholder"
        :error="!!errorMessage"
        :error-messages="errorMessage"
        @blur="setErrors(null)"
        @focus="setErrors(null)"
        @click="isPickerVisible = true"
        :required="required"
        :disabled="disabled"
      >
      </v-text-field>
      <div v-if="isPickerVisible" @click="isPickerVisible = false" class="date_picker_wrapper">
        <div @click.stop>
          <v-date-picker v-model="value" hide-header @change="isPickerVisible = false" />
        </div>
      </div>
    </div>
  </v-col>
</template>

<script setup>
import {useDate} from "vuetify"
const id = useId();
const props = defineProps({
  // ====== General Inputs Props
  name: {
    type: String,
    required: true,
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
  cols: {
    required: false,
    type: String,
    default: "12"
  },
  col: {
    required: false,
    type: String,
    default: "12"
  },
  readonly: {
    required: false,
    type: Boolean,
    default: false,
  },
  disabled: {
    required: false,
    type: Boolean,
    default: false,
  },
  required: {
    required: false,
    type: Boolean,
    default: false,
  },
  autofocus: {
    type: Boolean,
    default: false
  },
  inputIsLoading: {
    type: Boolean,
    required: false,
    default: false
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
    required: false,
    type: String,
    default: "4",
  },
});


defineEmits(['update:modelValue', "input"]);
const { value, errorMessage, setErrors } = useField(props.name);

const isPickerVisible = ref(false);
const date = useDate()

const dateFormated = computed(() => value.value ? date.format(value.value, 'keyboardDate') : '');

function openDatePicker() {
  console.log(isPickerVisible.value)
  if (!isPickerVisible.value) {
    isPickerVisible.value = true;
  }
}

watch(value, (newValue) => {
  if(newValue) {
    isPickerVisible.value = false;
  }
});
</script>

<style lang="postcss"scoped>
.input_wrapper {
  .date_picker_wrapper {
    background-color: #00000060;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99999;
    :deep(.v-date-picker) {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .v-date-picker {
        &-controls {
          &__month-btn {
            @apply text-white bg-main-clr;
          }
        }
        &-month {
          &__day {
            .v-btn--variant-outlined {
              @apply border border-main-clr text-main-clr;
            }
            &--selected {
              .v-btn {
                @apply bg-main-clr text-white;
              }
              
            }
          }
        }
      }
    }
  }

}
</style>