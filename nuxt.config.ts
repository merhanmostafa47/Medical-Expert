import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  devtools: { enabled: true },
  // ============ App Configurations ============ //
  app: {
    baseURL: "/",
    head: {
      charset: "utf-8",
    },
  },

  imports: {
    dirs: ["plugins"],
  },

  nitro: {
    preset: "vercel", // Important for Vercel deployment
  },

  // ============ Project Css & Scripts Files ============ //
  css: [
    "@/assets/css/main.pcss",
    "@mdi/font/css/materialdesignicons.min.css",
    "@/assets/css/tailwind.pcss",
  ],

  // ============ Plugins Files Registeration ============ //
  plugins: ["@/plugins/i18n.client.js", "@/plugins/vue-pagination.js"],

  // ============ Modules Registeration ============ //
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "nuxt-icon",
    "@vueuse/nuxt",
    "@vee-validate/nuxt",
    "@nuxtjs/google-fonts",
    [
      '@nuxt/image',
      {
        // Image Quality
        quality: 80,
        format: ['webp', 'png', 'jpeg'],
        // The screen sizes predefined by `@nuxt/image`:
        screens: {
          xs: 320,
          sm: 640,
          md: 768,
          lg: 1024,
          xl: 1280,
          xxl: 1536,
          '2xl': 1536
        },
      }
    ],
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "storeToRefs", "acceptHMRUpdate"],
      },
    ],
  ],

  // ============ Modules Configurations ============ //
  i18n: {
    lazy: true,
    langDir: "locales",
    // to escape html characters in translations
    compilation: {
      strictMessage: false,
      escapeHtml: true,
    },
    locales: [
      {
        name: "English",
        code: "en",
        language: "en-US",
        file: "en.json",
        dir: "ltr",
      },
      {
        name: "العربية",
        code: "ar",
        language: "ar-EG",
        file: "ar.json",
        dir: "rtl",
      },
    ],
    // strategy: "prefix",
    defaultLocale: "en",
    detectBrowserLanguage: {
      useCookie: true,
      // cookieKey: 'i18n_redirected',
      redirectOn: "root",
    },
    vueI18n: "./i18n.config.ts",
  },

  googleFonts: {
    families: {
      Inter: true,
    },
  },
  /* Set Rote Roles To Redirect To Default Locale Prefix If No Locale Prefix Is Exist */
  // routeRules: {
  //   "/": { redirect: "/en" },
  // },

  colorMode: {
    preference: "light",
  },

  image: {
    // dir: 'assets/',
    unsplash: {
      baseURL: "https://images.unsplash.com/",
    },
    presets: {
      default: {
        modifiers: {
          format: "webp",
          fit: "cover",
          quality: "60",
        },
      },
    },
  },

  veeValidate: {
    autoImports: true,
  },

  // ============ Postcss & Tailwind Configurations ============ //
  postcss: {
    plugins: {
      "postcss-nested": {},
    },
  },

  tailwindcss: {
    configPath: "@/tailwind.config.js",
    exposeConfig: false,
  },

  // ============ Vite Configurations ============ //
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    server: {
      allowedHosts: true,
    },
  },

  // ============ Nitro Configurations ============ //
  // nitro: {
  //   preset: "node-server",
  // },

  // ============ General Configurations ============ //
  ssr: true,

  typescript: {
    shim: false,
  },

  components: {
    dirs: [
      {
        path: "~/components",
        pathPrefix: false,
      },
    ],
  },

  build: {
    transpile: ["vuetify", "vue-toastification"],
  },

  devServer: {
    port: 80,
    host:'0.0.0.0'
  },

  compatibilityDate: "2025-01-29",
});
