// import "@/assets/vuetify/settings.scss";
import { createVuetify } from "vuetify";
import { VFileUpload } from "vuetify/labs/VFileUpload";


export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      themes: {
        light: {
          // dark: false,
          colors: {
            white: "#fff",

            // Theme Color Scheme
            "main-clr": "#0B4E94",
            "secondary-clr": "#136FB7",
            "green-clr": "#2BA167",
            "orange-clr": "#D79479",
            "red-clr": "#FF0000",
            "gray-clr": "#808080",

            // Backgrounds
            "opacity-bg": "#E4EFF8",

            // Texts
            "default-text-clr": "#000",

            // Customs
            "border-clr": "#136FB7",
          },
        },
      },
    },
    defaults: {
      global: {
        $utilities: false,
      },
    },
    components: {
      VFileUpload,
    },
  });
  app.vueApp.use(vuetify);
});
