<script setup>
import { useI18n } from "vue-i18n";
const { t , locale } = useI18n();
const localePath = useLocalePath();

// Toast Composables
import { useToast } from "vue-toastification";
const toast = useToast();

const clinicsData = ref(null);
const openModal = ref(false);
const selectedClinicId = ref(null);
const selectedClinicName = ref(null);

const toggleModal = () => {
  openModal.value = !openModal.value;
  console.log(openModal.value);
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


const { data } = await useBaseFetch("GET", "clinics");
clinicsData.value = data.value;

const deleteClinic = async () => {
  const { data ,error } = await useBaseFetch(
    "POST",
    `clinics/delete/${selectedClinicId.value}`,
    locale
  );
  if (!error.value) {
    toast.success(data?.value?.message);
    const { data } = await useBaseFetch("GET", "clinics");
    clinicsData.value = data.value;
  } else {
    toast.error(error.value?.data?.message);
  }
};


</script>
<template>
  <div class="px-5 content__wrapper">
    <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
      <BaseSearchInput placeholder="Search by clinic name and Doctor name " />
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
          <!-- <tr>
            <td>Clinic name</td>
            <td>Doctor name</td>
            <td>Clinic phone number</td>
            <td>Working hours</td>
            <td>Clinic speciality</td>
            <td><ClinicActionBtn @delete="openDeleteModal(1, 'clinic name')"/></td>
          </tr> -->

          <tr v-for="clinic in clinicsData.data" :key="clinic.id">
            <td>{{ clinic.name }}</td>
            <td>{{ clinic.doctor_name }}</td>
            <td>{{ clinic.phone_number }}</td>
            <td>{{ clinic.working_hours }}</td>
            <td>{{ clinic.speciality }}</td>
            <td>
              <ClinicActionBtn :id="clinic.id" @delete="openDeleteModal(clinic.id, clinic.name)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <DeleteModal :openModal="openModal" @close="toggleModal" @delete="deleteClinic()"
      :name="selectedClinicName" />
    <!-- <DeleteModal openModal @close="toggleModal" @delete="deleteClinic()" :name="'clinic name'"/> -->
  </div>
</template>
