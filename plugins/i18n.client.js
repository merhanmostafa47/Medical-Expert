export default defineNuxtPlugin(nuxtApp => {
  // console.log("nuxtApp =>", nuxtApp);

  // Change Lang & Dir Attribute When The Locale Is Switched
  const DOCUMENT_ELEMET = document.documentElement;
  DOCUMENT_ELEMET.setAttribute("lang", nuxtApp.$i18n.localeProperties.value.iso);
  DOCUMENT_ELEMET.setAttribute("dir", nuxtApp.$i18n.localeProperties.value.dir);

  // Navigate To The New Locale And Reload The Page To Get Api Data After With The New Locale
  nuxtApp.hook('i18n:localeSwitched', async ({_, newLocale}) => {
    // await nuxtApp.$router.push(`/${newLocale}`);
    // DOCUMENT_ELEMET.setAttribute("lang", newLocale == 'ar' ? 'ar-EG' : 'en-US');
    // DOCUMENT_ELEMET.setAttribute("dir", newLocale == 'ar' ? 'rtl' : 'ltr');
    // nuxtApp.$router.go();
    
    nuxtApp.$router.afterEach(() => {
      nuxtApp.$router.go();
    });
  });
});