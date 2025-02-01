<template>
  <v-col>
    <div :class="['bg-opacity-bg p-3 rounded-lg', { 'border border-secondary-clr': bordered }]">
      <h3 v-if="title" class="text-sm mb-2 flex items-center gap-2 text-secondary-clr font-blod">
        <Icon v-if="icon" :name="icon" size="1.25rem"></Icon> <span>{{title}}</span>
      </h3>
      <p class="text-main-clr flex justify-between items-center"><span>{{ desc }}</span> <slot name="disc-icon"></slot></p>
    </div>
  </v-col>
</template>

<script setup>
  defineProps({
    title: {
      type: String,
      required: false,
    },
    desc: {
      type: [String, Number],
      required: true
    },
    icon: {
      type: String,
      required: false
    },
    bordered: {
      type: Boolean,
      required: false,
      default: false
    }
  })
</script>

<style lang="scss" scoped>

</style>