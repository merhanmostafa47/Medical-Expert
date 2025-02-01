export const useClientFetch = (
  request_method,
  request_end_point,
  request_locale,
  request_body,
  request_params
) => {
  const token = useCookie("token");

  // Build the base URL and headers
  const baseURL = "https://admin.medicalexpertise.net/api/";
  const headers = {
    "cache-control": "cache-control",
    Accept: "application/json",
    lang: request_locale,
    "Accept-Language": request_locale,
    Authorization: token.value ? `Bearer ${token.value}` : "",
  };

  // Prepare the request options
  const options = {
    method: request_method,
    headers,
    body: request_body,
    params: request_params,
  };

  // Send the request using `$fetch`
  return $fetch(request_end_point, {
    baseURL,
    ...options,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
