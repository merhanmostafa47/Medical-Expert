<script setup>
const { t } = useI18n();

const props = defineProps({
  openModal: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(["close", "delete"]);
</script>

<template>
  <BaseModal :isOpen="openModal" @close="emit('close')">
    <div class="modal__content">
      <div class="modal__img">
        <img src="/media/icons/trash.svg" alt="mark" />
      </div>

      <p class="modal__copy">
        {{ t("MODALS.delete.message", { name: name }) }}
      </p>

      <div class="btns__wrapper">
        <button class="btn btn--danger" @click="emit('delete')">
          {{ t("BUTTONS.delete") }}
        </button>
        <button class="btn btn--gray" @click.stop="emit('close')">
          {{ t("BUTTONS.cancel") }}
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<style scoped>
.modal__content {
  @apply lg:py-24 lg:px-20 py-14 px-6 flex items-center justify-center flex-col  gap-6;
}

.modal__img {
  @apply size-28 lg:size-32   flex justify-center items-center;
  img {
    @apply size-full object-contain;
  }
}

.modal__copy {
  @apply text-center text-main-clr font-bold-ff text-lg lg:text-xl;
}

.btns__wrapper {
  @apply flex items-center justify-center gap-4 flex-wrap;

  button {
    @apply min-w-[150px];
  }
}
</style>
