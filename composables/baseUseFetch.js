export const useBaseFetch = (
  request_method,
  request_end_point,
  request_locale,
  request_body,
  request_params
) => {
  // I18n Locale
  // const { locale } = useI18n();

  const token = useCookie("token");

  const OPTIONS = ref({
    baseURL: `https://barqyat-api.spider-te8.com/api/`,
    method: request_method,
    headers: {
      "cache-control": "cache-control",
      Accept: "application/json",
      lang: request_locale,
      "Accept-Language": request_locale,
      Authorization: token.value ? `Bearer ${token.value}` : "",
    },
    body: request_body || null,
    params: request_params || null,
    immediate: true,
    onRequest({ request, options }) {
      // Set the request headers
      // console.log("REQUEST OPTIONS =>", options);
    },
    onRequestError({ request, options, error }) {
      // Handle the request errors
    },
    onResponse({ request, response, options }) {
      // Process the response data
    },
    onResponseError({ request, response, options }) {
      // Handle the response errors
    },
  });

  return useFetch(request_end_point, OPTIONS.value);
};
