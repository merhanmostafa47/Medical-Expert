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
const specialty = ref(null);
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

const { data: clinics } = await useBaseFetch("GET", "clinics", locale, null, {
  search: search.value,
  specialty: specialty.value,
});

clinicsData.value = clinics.value;
pagination.value = clinics.value.pagination;

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

const { data: specialties } = await useBaseFetch("GET", "specialties");

const selectedSpecialties = ref([]);
const updateSelectedSpecialties = (event, specialty) => {
  if (event.target.checked) {
    selectedSpecialties.value.push(specialty);
  } else {
    const index = selectedSpecialties.value.indexOf(specialty);
    if (index > -1) {
      selectedSpecialties.value.splice(index, 1);
    }
  }
};

const resetSpecialtiesFilter = async () => {
  selectedSpecialties.value = [];
  const inputs = document.querySelectorAll("input[type=checkbox]");
  inputs.forEach((input) => (input.checked = false));
};

const toggleFilterSidebar = () => {
  isFilterSidebarOpen.value = !isFilterSidebarOpen.value;
};

const submitSpecialtiesFilter = async () => {
  toggleFilterSidebar();

  const { data } = await useBaseFetch("GET", "clinics", locale, null, {
    search: search.value,
    specialty: selectedSpecialties.value,
  });
  clinicsData.value = data.value;

  resetSpecialtiesFilter();
};

watch(search, async (newSearch) => {
  const { data } = await useBaseFetch("GET", "clinics", locale, null, {
    search: newSearch,
    specialty: specialty.value,
  });
  clinicsData.value = data.value;
});
</script>
<template>
  <div class="lg:px-5 content__wrapper">
    <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
      <BaseSearchInput
        placeholder="Search by clinic name and Doctor name"
        @search="search = $event"
      />

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
          <tr
            v-for="clinic in clinicsData.data"
            :key="clinic.id"
            v-if="clinicsData?.data?.length > 0"
          >
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
          </tr>
          <tr v-else>
            <td colspan="6" class="text-center !rounded-xl">
              {{ $t("TITLES.noData") }}
            </td> 
          </tr>
        </tbody>
      </table>
    </div>

    <v-pagination
      v-model="page"
      :length="pagination.last_page"
      v-if="pagination.last_page > 1"
    >
    </v-pagination>

    <button
      class="fixed px-4 py-2 text-xs capitalize bg-white border top-1/4 end-0 border-main-clr text-main-clr rounded-ss-lg rounded-es-lg"
      @click="toggleFilterSidebar()"
    >
      {{ $t("BUTTONS.filter") }}
    </button>

    <DeleteModal
      :openModal="openModal"
      @close="toggleModal"
      @delete="deleteClinic()"
      :name="selectedClinicName"
    />

    <BaseSidebar :isOpen="isFilterSidebarOpen">
      <div class="relative h-full">
        <div class="p-5">
          <div class="flex items-center justify-between mb-8">
            <h3
              class="text-base font-bold capitalize lg:text-lg xl:text-xl text-main-clr"
            >
              filter by
            </h3>
            <button @click.stop="toggleFilterSidebar">
              <Icon
                name="carbon:close-outline"
                size="20"
                class="text-gray-clr"
              />
            </button>
          </div>
          <h3
            class="mb-5 font-semibold capitalize text-smlg:text-base xl:text-lg text-secondary-clr"
          >
            Specialty
          </h3>
          <ul
            class="flex flex-col items-start gap-4 overflow-auto text-gray-clr h-[250px]"
          >
            <li
              class="flex items-center gap-2"
              v-for="specialty in specialties.data"
              :key="specialty"
            >
              <input
                type="checkbox"
                :id="specialty"
                :name="specialty"
                @change="updateSelectedSpecialties($event, specialty)"
              />
              <label :for="specialty" class="mb-0">{{ specialty }}</label>
            </li>
          </ul>
        </div>
        <div
          class="absolute inset-x-0 bottom-0 p-5 bg-opacity-bg h-[160px] flex flex-col gap-4"
        >
          <button
            class="w-full !text-sm btn bordered-btn"
            @click="resetSpecialtiesFilter()"
          >
            {{ $t("BUTTONS.reset") }}
          </button>
          <button
            class="w-full !text-sm btn main-btn"
            @click="submitSpecialtiesFilter()"
          >
            {{ $t("BUTTONS.submit") }}
          </button>
        </div>
      </div>
    </BaseSidebar>

    <!-- <DeleteModal openModal @close="toggleModal" @delete="deleteClinic()" :name="'clinic name'"/> -->
  </div>
</template>
