import "@/assets/vuetify/settings.scss";
import { createVuetify } from "vuetify";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      themes: {
        light: {
          // dark: false,
          colors: {
            // Theme Color Scheme
            "main-clr": "#136FB7",
            "secondary-clr": "#0B4E94",
            "green-clr": "#2BA167",

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
  });
  app.vueApp.use(vuetify);
});
