import { defineStore } from "pinia";

export const usePatientsStore = defineStore("patients", () => {
  const { locale } = useI18n();
  const route = useRoute();

  // State
  const patients = ref({});
  const seletedPatientData =ref({});
  const patientInfo = ref({});

  const patientHistory = ref({});
  const patientVitals = ref({});
  const initialHistory = ref({});

  const isLoading = ref(false);
  const error = ref(null);

  // Getters
  const allPatients = computed(() => patients.value.data || []);
  const pagination = computed(() => ({
    current_page: patients.value.current_page || 1,
    last_page: patients.value.last_page || 1,
    per_page: patients.value.per_page || 10,
  }));

  const patientData = computed(() => {
    const { image, phone, ...info } = seletedPatientData.value;
    return { image, info };
  });

  // Actions
  const setAllPatientsData = (payload) => {
    patients.value = payload;
  };
  const setPatientData = (payload) => {
    seletedPatientData.value = payload;
  };
  const setPatientHistory = (payload) => {
    const {
      patient,
      history: { id, ...history },
    } = payload;
  
    patientInfo.value = patient;
    initialHistory.value = JSON.parse(JSON.stringify(history));
    patientHistory.value = {...history};
  };
  const setPatientVitals = (payload) => {
    const {
      patient,
      vitals: { id, ...vitals },
    } = payload;
  
    patientInfo.value = patient;
    patientVitals.value = { ...vitals };
  };
  const setInitialHistory = () => {
    patientHistory.value = JSON.parse(JSON.stringify(initialHistory.value));
  }

  const updatePatientHistory = async () => {
    try {
      isLoading.value = true;
      const response = await useClientFetch(
        "POST",
        `patients/${route?.params?.id}/edit-health-history`,
        locale.value,
        { ...patientHistory.value }
      );
      patientHistory.value = JSON.parse(JSON.stringify(initialHistory.value));
      return response;
    } catch (err) {
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    // State
    isLoading,
    error,
    patients,
    patientHistory,
    patientData,
    patientInfo,
    patientVitals,

    // Getters
    allPatients,
    pagination,

    // Actions
    setAllPatientsData,
    setPatientData,
    setPatientVitals,
    setPatientHistory,
    setInitialHistory,
    updatePatientHistory,
  };
});
