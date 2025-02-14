<template>
  <v-container>
    <section
      class="bg-white border-secondary-clr border-2 border-md rounded-xl p-4"
    >
      <MainHeader
        class="flex justify-between items-center"
        :title="$t('TITLES.Patients.prescription.show')"
      >
        <!-- Print Button (Hidden During Printing) -->
        <div class="text-center mt-6 print-hidden">
          <button
            class="flex items-center justify-center px-4 md:px-6 py-3 !text-secondary-text-clr capitalize rounded-lg font-semiBold-ff bg-main-clr text-sm md:text-base transition-all duration-300 ease-in-out hover:!bg-dark-bg"
            @click="handlePrint"
          >
            {{ $t("TITLES.Patients.prescription.export") }}
          </button>
        </div></MainHeader
      >

      <!-- Prescription Component (Print Area) -->
      <div ref="printableArea" class="print-area">
        <ShowPrescription />
      </div>
    </section>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const printableArea = ref(null);

const handlePrint = () => {
  if (printableArea.value) {
    const printContent = printableArea.value.innerHTML;
    const originalContent = document.body.innerHTML;

    // Replace body content with the printable section
    document.body.innerHTML = printContent;
    window.print();

    // Restore original content after printing
    document.body.innerHTML = originalContent;
    window.location.reload(); // Refresh Vue state
  }
};
</script>

<style lang="postcss" scoped>
/* A4 Print Styling */
@media print {
  @page {
    size: A4 portrait; /* A4 Page */
    margin: 1cm; /* Proper Margin */
  }

  /* Hide Print Button */
  .print-hidden {
    display: none !important;
  }

  /* Ensure A4 Dimensions */
  .print-area {
    width: 21cm;
    height: 29.7cm;
    background: white;
    padding: 1cm;
    box-shadow: none;
    font-size: 12pt;
  }

  /* Force Desktop (md:6) Layout */
  .v-row {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important; /* 2 equal columns */
    gap: 1rem;
  }

  .v-col {
    width: auto !important;
  }

  /* Prevent Page Break Inside Elements */
  .print-area * {
    page-break-inside: avoid;
  }

  /* Ensure Each Section Starts on a New Page if Needed */
  section {
    page-break-before: auto;
    page-break-after: auto;
  }
}
</style>
