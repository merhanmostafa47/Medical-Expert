export const useAuthStore = defineStore("auth", {
  state: () => ({
    userToken: null,
    userId: null,
    userName: null,
    userEmail: null,
    userPhone: null,
    resendCodeTime: null,
  }),

  getters: {
    getAuthUserData: (state) => {
      return {
        token: state.userToken,
        id: state.userId,
        name: state.userName,
        email: state.userEmail,
        phone: state.userPhone,
        resendCodeTime: state.resendCodeTime,
      };
    },

    userIsLoggedIn: (state) => {
      return !!state.userToken;
    },
  },

  actions: {
    setAuthedData(payload) {
      this.userToken = payload.token;
      this.userId = payload.id;
      this.userName = payload.name;
      this.userEmail = payload.email;
      this.userPhone = payload.phone;
      this.resendCodeTime = payload.resendCodeTime;

      this.saveAuthToCookie();
    },

    saveAuthToCookie() {
      const tokenCookie = useCookie("token");
      const idCookie = useCookie("id");
      const nameCookie = useCookie("name");
      const emailCookie = useCookie("email");
      const phoneCookie = useCookie("phone");
      const resendCodeTimeCookie = useCookie("resendCodeTime");

      tokenCookie.value = this.userToken;
      idCookie.value = this.userId;
      nameCookie.value = this.userName;
      emailCookie.value = this.userEmail;
      phoneCookie.value = this.userPhone;
      resendCodeTimeCookie.value = this.resendCodeTime;
    },

    loadAuthFromCookie() {
      const tokenCookie = useCookie("token");
      const idCookie = useCookie("id");
      const nameCookie = useCookie("name");
      const emailCookie = useCookie("email");
      const phoneCookie = useCookie("phone");
      const resendCodeTimeCookie = useCookie("resendCodeTime");

      this.userToken = tokenCookie.value;
      this.userId = idCookie.value;
      this.userName = nameCookie.value;
      this.userEmail = emailCookie.value;
      this.userPhone = phoneCookie.value;
      this.resendCodeTime = resendCodeTimeCookie.value;
    },

    resetAuthData() {
      // Reset state to null
      this.userToken = null;
      this.userId = null;
      this.userName = null;
      this.userEmail = null;
      this.userPhone = null;
      this.resendCodeTime = null;

      // Clear cookies
      const tokenCookie = useCookie("token");
      const idCookie = useCookie("id");
      const nameCookie = useCookie("name");
      const emailCookie = useCookie("email");
      const phoneCookie = useCookie("phone");
      const resendCodeTimeCookie = useCookie("resendCodeTime");

      tokenCookie.value = null;
      idCookie.value = null;
      nameCookie.value = null;
      emailCookie.value = null;
      phoneCookie.value = null;
      resendCodeTimeCookie.value = null;
    },
  },
});
