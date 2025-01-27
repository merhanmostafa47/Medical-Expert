<script setup>
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
const localePath = useLocalePath();

// Toast Composables
import { useToast } from "vue-toastification";
const toast = useToast();

const clinicsData = ref(null);
const openModal = ref(false);
const isFilterSidebarOpen = ref(false);
const selectedClinicId = ref(null);
const selectedClinicName = ref(null);
const search = ref(null);
const page = ref(1);
const pagination = ref(null);

const toggleModal = () => {
  openModal.value = !openModal.value;
};

const resetData = () => {
  openModal.value = false;
  selectedClinicId.value = null;
  selectedClinicName.value = null;
};

const openDeleteModal = (id, name) => {
  if (id) {
    selectedClinicId.value = id;
    console.log(selectedClinicId.value);
  }

  if (name) {
    selectedClinicName.value = name;
    console.log(selectedClinicName.value);
  }

  toggleModal();
};

const toggleFilterSidebar = () => {
  isFilterSidebarOpen.value = !isFilterSidebarOpen.value;
};

const { data } = await useBaseFetch("GET", "clinics", undefined, {
  search: search.value,
  page: page.value,
});

clinicsData.value = data.value;
// pagination.value = data.value.pagination;

console.log(clinicsData.value);
console.log(pagination.value);

const deleteClinic = async () => {
  try {
    const { data } = await useBaseFetch(
      "POST",
      `clinics/delete/${selectedClinicId.value}`,
      locale
    );
    toast.success(data?.value?.message);

    const { data: updatedData } = await useBaseFetch("GET", "clinics");
    clinicsData.value = updatedData.value;

    resetData();
  } catch (error) {
    toast.error(error?.data?.message);
  }
};

watch(search.value, async (newValue) => {
  if (newValue) {
    const { data } = await useBaseFetch("GET", "clinics", { search: newValue });
    clinicsData.value = data.value;
  }
});

watch(page.value, async (newValue) => {
  if (newValue) {
    const { data } = await useBaseFetch("GET", "clinics", { page: newValue });
    clinicsData.value = data.value;
  }
});
</script>
<template>
  <div class="px-5 content__wrapper">
    <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
      <BaseSearchInput
        placeholder="Search by clinic name and Doctor name"
        @search="search = $event"
      />

      {{ search }}

      <NuxtLink class="btn main-btn" :to="localePath('/doctor/clinics/add')">
        add a new clinic
        <Icon name="material-symbols:add" size="20" />
      </NuxtLink>
    </div>
    <div class="table__wrapper">
      <table>
        <thead>
          <tr>
            <th id="clinic-name">Clinic name</th>
            <th id="doctor-name">Doctor name</th>
            <th id="phone-number">Clinic phone number</th>
            <th id="working-hours">Working hours</th>
            <th id="speciality">Clinic speciality</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Clinic name</td>
            <td>Doctor name</td>
            <td>Clinic phone number</td>
            <td>Working hours</td>
            <td>Clinic speciality</td>
            <td>
              <ClinicActionBtn @delete="openDeleteModal(1, 'clinic name')" />
            </td>
          </tr>

          <!-- <tr v-for="clinic in clinicsData.data" :key="clinic.id">
            <td>{{ clinic.name }}</td>
            <td>{{ clinic.doctor_name }}</td>
            <td>{{ clinic.phone_number }}</td>
            <td>{{ clinic.working_hours }}</td>
            <td>{{ clinic.speciality }}</td>
            <td>
              <ClinicActionBtn
                :id="clinic.id"
                @delete="openDeleteModal(clinic.id, clinic.name)"
              />
            </td>
          </tr> -->
        </tbody>
      </table>
    </div>

    <div class="pagination__wrapper">
      <v-pagination v-model="page" :length="5" rounded="0">
        <template #next>
          <button
            type="button"
            aria-label="Previous page"
            aria-disabled="true"
            @click="page++"
          >
            <Icon name="material-symbols:keyboard-arrow-right" size="16" />
          </button>
        </template>
      </v-pagination>
    </div>

    <button
      class="fixed px-4 py-2 text-xs capitalize bg-white border top-1/4 end-0 border-main-clr text-main-clr rounded-ss-lg rounded-es-lg"
      @click="toggleFilterSidebar()"
    >
      filter
    </button>

    <DeleteModal
      :openModal="openModal"
      @close="toggleModal"
      @delete="deleteClinic()"
      :name="selectedClinicName"
    />

    <BaseSidebar :isOpen="isFilterSidebarOpen">
      <div class="relative">
        <div class="flex items-center justify-between mb-8">
          <h3
            class="text-base font-bold capitalize lg:text-lg xl:text-xl text-main-clr"
          >
            filter by
          </h3>
          <button @click.stop="toggleFilterSidebar">
            <Icon name="carbon:close-outline" size="20" class="text-gray-clr" />
          </button>
        </div>
        <h3
          class="mb-5 font-semibold capitalize text-smlg:text-base xl:text-lg text-secondary-clr"
        >
          Specialty
        </h3>
        <div class="flex flex-col items-start gap-4 text-gray-clr">
          <div class="flex items-center gap-2 ">
            <input type="checkbox" id="cardiology" name="cardiology" />
            <label for="cardiology">Cardiology</label>
          </div>
          <div class="flex items-center gap-2">
            <input type="checkbox" id="neurology" name="neurology" />
            <label for="neurology">Neurology</label>
          </div>
          <div class="flex items-center gap-2">
            <input type="checkbox" id="oncology" name="oncology" />
            <label for="oncology">Oncology</label>
          </div>
          <div class="flex items-center gap-2">
            <input type="checkbox" id="pediatrics" name="pediatrics" />
            <label for="pediatrics">Pediatrics</label>
          </div>
        </div>
        <div class="absolute inset-0 bottom-0 p-5 bg-opacity-bg">
          <button
            class="w-full btn bordered-btn"
          >
            reset filter
          </button>
        </div>
      </div>
    </BaseSidebar>

    <!-- <DeleteModal openModal @close="toggleModal" @delete="deleteClinic()" :name="'clinic name'"/> -->
  </div>
</template>
