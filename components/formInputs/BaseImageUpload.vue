<template>
  <v-col :cols="cols" :md="col" class="!p-1">
    <div class="image_upload_wrapper">
      <v-file-upload
        :accept="accept"
        @update:model-value="handleFileChange"
        :error="!!errorMessage"
        :error-messages="errorMessage"
        v-model="value"
        clearable
        :title="''"
        density="compact"
        variant="compact"
      >
        <template #icon>
          <Icon :name="iconSrc" color="var(--main-clr)"></Icon>
        </template>
        <template #title>
          <div class="content-center">
            <template v-if="fileData">
              <p class="text-secondary-clr mb-1">{{ fileData.name }}</p>
            </template>
            <template v-else>
              <p class="text-secondary-clr mb-1">Image</p>
              <p class="text-main-clr font-bold mb-1">Uploade Image</p>
              <p class="text-secondary-clr text-sm">
                Preferred image aspect ratio: 2.75:1
              </p>
            </template>
          </div>
          <div></div>
        </template>
      </v-file-upload>
      <span v-if="errorMessage" class="text-error text-[12px] px-4">{{errorMessage}}</span>
    </div>
  </v-col>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "Upload Image",
  },
  placeholder: {
    type: String,
    default: "",
  },
  accept: {
    type: String,
    default: "image/png, image/jpeg, image/jpg, image/svg+xml, image/gif",
  },
  required: {
    type: Boolean,
    default: false,
  },
  iconSrc: {
    type: String,
    default: "material-symbols:add-2",
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
});

const { value, errorMessage, setErrors } = useField(props.name);
const preview = ref(null);
const fileData = ref(null);

const handleFileChange = (file) => {
  console.log(file);
  setErrors(null);
  if (file) {
    const allowedFormats = props.accept.split(",").map((type) => type.trim());
    if (!allowedFormats.includes(file.type)) {
      setErrors("Invalid file format.");
      fileData.value = null;
      // fileData.value = "";
      return;
    }
    fileData.value = file;
    // Generate image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    fileData.value = null;
    preview.value = null;
  }
};
</script>

<style lang="postcss">
.image_upload_wrapper {
  .v-sheet {
    @apply py-0 !bg-transparent border-none min-[576px]:justify-start max-[576px]:flex-col;
    .v-file-upload-icon {
      @apply w-24 min-h-[6rem] content-center text-center rounded-lg border-2 border-dashed border-main-clr;
    }
    .v-file-upload-title {
      @apply w-64 text-base font-normal max-[576px]:text-center;
    }
  }
}
</style>
