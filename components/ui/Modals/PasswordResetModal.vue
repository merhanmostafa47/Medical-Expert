<script setup>

const { t } = useI18n();

const props = defineProps({
    openModal: {
        type: Boolean,
        default: false
    },
})

const emits = defineEmits(['close', 'goToLogin'])
</script>

<template>
    <BaseModal :isOpen="openModal" @close="emit('close')">
        <div class="modal__content">
            <div class="modal__img">
                <img src="/media/icons/mark.svg" alt="mark" />
            </div>

            <p class="modal__copy">
                {{ t('MODALS.auth.passwordReset') }}
            </p>

            <button class="btn" @click="emit('goToLogin')">
                {{ t('BUTTONS.auth.login') }}
            </button>
        </div>
    </BaseModal>
</template>

<style scoped>
.modal__content{
    @apply lg:py-24 lg:px-20 py-14 px-6 flex items-center justify-center flex-col lg:gap-10 gap-6 
}

.modal__img{
    @apply size-48 p-6 rounded-full bg-opacity-bg flex justify-center items-center;
    img{
        @apply size-full object-contain;
    }
}

.modal__copy{
    @apply text-center text-main-clr font-bold-ff text-lg lg:text-xl; 
}
</style>