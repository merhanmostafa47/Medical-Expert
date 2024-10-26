<script setup>
const id = useId();
const model = defineModel();

const props = defineProps({
  col: {
    type: String,
    required: false,
    default: "12",
  },
  cols:{
    type: String,
    required: false,
    default: "12",
  },
  autocomplete: {
    type: Boolean,
    required: false,
    default: false, // autocomplete or select
  },
  items: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
  },
  text: {
    type: String,
    required: false,
    default: "name",
  },
  value: {
    type: String,
    required: false,
    default: "id",
  },
  label: {
    type: String,
    required: false,
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
    default: "default-text-clr",
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
  color: {
    type: String,
    required: false,
    default: "var(--input-text-clr)",
  },
});
</script>

<template>
  <!-- ======== Start:: Autocomplete Select Input  ======== -->
  <v-col :cols="cols" :md="col" v-if="autocomplete">
    <div class="autocomplete_select_input_wrapper">
      <v-autocomplete
        v-model="model"
        :id="id"
        :label="label"
        :placeholder="placeholder"
        :items="items"
        :item-value="value"
        :item-text="text"
        base-color="rgba(226, 169, 55, .9)"
        item-color="#fff"
        :color="color"
        variant="outlined"
        :error-messages="error"
        :disabled="disabled"
        :required="required"
        :rules="validationRules"
      >
        <template v-slot:append-inner v-if="appendIcon">
          <Icon
            :name="appendIcon"
            :size="iconSize"
            :style="{ color: `var(--${iconColor})` }"
          />
        </template>
      </v-autocomplete>
    </div>
  </v-col>
  <!-- ======== End:: Autocomplete Select Input   ======== -->

  <!-- ======== Start:: Select Input  ======== -->
  <v-col :cols="cols" :md="col" v-else>
    <div class="select_input_wrapper">
      <v-select
        v-model="model"
        :id="id"
        :label="label"
        :placeholder="placeholder"
        :items="items"
        :item-value="value"
        :item-text="text"
        base-color="rgba(226, 169, 55, .9)"
        item-color="#fff"
        :color="color"
        variant="outlined"
        :error-messages="error"
        :disabled="disabled"
        :required="required"
        :rules="validationRules"
      >
        <!-- <template v-slot:append-inner v-if="appendIcon">
          <Icon
            :name="appendIcon"
            :size="iconSize"
            :style="{ color: `var(--${iconColor})` }"
          />
        </template> -->
        <template v-slot:prepend-inner v-if="prependIcon">
          <Icon
            :name="prependIcon"
            :size="iconSize"
            :style="{ color: `var(--${iconColor})` }"
          />
        </template>
      </v-select>
    </div>
  </v-col>
  <!-- ======== End:: Autocomplete Select Input   ======== -->
</template>

<style>
.v-autocomplete__content,
.v-select__content {
  .v-list-item__content {
    @apply !justify-start capitalize;
  }

  .v-list-item--variant-text .v-list-item__overlay {
    @apply !bg-main-clr;
  }

  .v-list-item--variant-text,
  .v-list-item-title {
    @apply hover:text-default-text-clr z-10 capitalize;
  }
}

i.v-icon {
  @apply !hidden;
}

.v-select .v-field .v-field__input {
  @apply !flex !items-center !justify-center;
}

/* .v-autocomplete .v-autocomplete__selection-text {
  @apply text-input-text-clr;
} */
</style>
