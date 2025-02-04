<template>
  <article>
    <!-- Histroy Data -->
    <div
      class="history-section !m-0 !mb-3 pb-3 border-b last:border-0 border-secondary-clr"
      v-for="(_, key, index) in patientHistory"
      :key="key"
    >
      <MainHeader :title="`${index + 1}. ${$t(`TITLES.Patients.history.${key}`)}`" />
      <v-row class="!m-0">
        <!-- History Data For A key -->
        <template v-if="patientHistory[key].length">
          <InfoCard
            v-for="(item, chipIndex) in patientHistory[key]"
            :key="chipIndex"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            :desc="item"
            bordered
          >
            <template v-if="openEditForm" #disc-icon>
              <Icon
                @click="removeItem(key, chipIndex)"
                name="mdi:minus-circle"
                class="text-xl text-red-500 cursor-pointer"
              ></Icon>
            </template>
          </InfoCard>
        </template>

        <!-- Key Doesn't Has Values -->
        <v-col v-else-if="!openEditForm" cols="12" sm="6" md="4" lg="3">
          <p class="px-3 border rounded-lg text-main-clr border-main-clr w-fit">N/A</p>
        </v-col>

        <!-- Add Data For Custom History Key -->
        <v-col
          v-if="openEditForm"
          class="flex items-center gap-3"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <Icon
            v-if="!showInput[key]"
            @click="toggleInputField(key)"
            name="material-symbols:add-circle"
            class="text-2xl cursor-pointer text-main-clr"
          ></Icon>
          <input
            v-if="showInput[key]"
            v-model="newEntry[key]"
            @keyup.enter="addItem(key)"
            :placeholder="`New ${$t(`TITLES.Patients.history.${key}`)}`"
            class="w-full h-full px-3 py-3 border rounded-lg border-secondary-clr"
            autofocus
          />
        </v-col>
      </v-row>
    </div>

    <!-- Histroy Action Buttons -->
    <v-row v-if="openEditForm" class="history-actions !m-0 gap-3 justify-end">
      <button
        @click="onSubmit"
        class="bg-main-clr !text-secondary-text-clr hover:!bg-dark-bg"
      >
        <Icon
          name="lucide:loader-circle"
          size="20"
          class="animate-spin"
          v-if="patientsStore.isLoading"
        />
        {{ $t("BUTTONS.submit") }}
      </button>
      <button
        type="reset"
        @click="resetEdit"
        class="!text-main-clr border border-main-clr hover:!bg-dark-bg"
      >
        {{ $t("BUTTONS.cancel") }}
      </button>
    </v-row>
  </article>
</template>

<script setup>
const emit = defineEmits(["close"]);
defineProps({
  openEditForm: {
    type: Boolean,
    required: false,
  },
});

const { $toast } = useNuxtApp();

const patientsStore = usePatientsStore();
const { patientHistory } = storeToRefs(patientsStore);

const newEntry = reactive({});
const showInput = reactive({});

const removeItem = (key, chipIndex) => {
  patientHistory.value[key].splice(chipIndex, 1);
  patientHistory.value[key] = [...patientHistory.value[key]];
};

const resetEdit = () => {
  emit("close");
  patientsStore.setInitialHistory();
};

const toggleInputField = (key) => {
  Object.keys(showInput).forEach((k) => {
    if (k !== key) showInput[k] = false;
  });

  showInput[key] = !showInput[key];
  newEntry[key] = "";
};

const addItem = (key) => {
  if (newEntry[key].trim() !== "") {
    patientHistory.value[key].push(newEntry[key].trim());
  }
  showInput[key] = false;
};

const onSubmit = async () => {
  try {
    const res = await patientsStore.updatePatientHistory();
    emit("close");
    $toast.success(res?.message);
  } catch (error) {
    $toast.error(error?.data?.message);
  }
}
</script>

<style lang="postcss">
.history-actions {
  button {
    @apply disabled:opacity-50 relative flex items-center justify-center px-4 md:px-6 py-3  capitalize rounded-lg font-semiBold-ff text-sm md:text-base transition-all duration-300 ease-in-out;
  }
}
</style>
