export const useAuthStore = defineStore("auth", {
  state: () => ({
    userToken: null,
    userId: null,
    userName: null,
    userAvatar: null,
    userEmail: null,
    userPhone: null,
    userRole: null,
    resendCodeTime: null,
  }),

  getters: {
    getAuthUserData: (state) => {
      return {
        token: state.userToken,
        id: state.userId,
        name: state.userName,
        avatar: state.userAvatar,
        email: state.userEmail,
        phone: state.userPhone,
        role: state.userRole,
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
      this.userAvatar = payload.avatar;
      this.userEmail = payload.email;
      this.userPhone = payload.phone;
      this.userRole = payload.role;
      this.resendCodeTime = payload.resendCodeTime;

      this.saveAuthToCookie();
    },

    saveAuthToCookie() {
      const tokenCookie = useCookie("token");
      const idCookie = useCookie("id");
      const nameCookie = useCookie("name");
      const avatarCookie = useCookie("avatar");
      const emailCookie = useCookie("email");
      const phoneCookie = useCookie("phone");
      const roleCookie = useCookie("role");
      const resendCodeTimeCookie = useCookie("resendCodeTime");

      tokenCookie.value = this.userToken;
      idCookie.value = this.userId;
      nameCookie.value = this.userName;
      avatarCookie.value = this.userAvatar;
      emailCookie.value = this.userEmail;
      phoneCookie.value = this.userPhone;
      roleCookie.value = this.userRole;
      resendCodeTimeCookie.value = this.resendCodeTime;
    },

    loadAuthFromCookie() {
      const tokenCookie = useCookie("token");
      const idCookie = useCookie("id");
      const nameCookie = useCookie("name");
      const avatarCookie = useCookie("avatar");
      const emailCookie = useCookie("email");
      const phoneCookie = useCookie("phone");
      const roleCookie = useCookie("role");
      const resendCodeTimeCookie = useCookie("resendCodeTime");

      this.userToken = tokenCookie.value;
      this.userId = idCookie.value;
      this.userName = nameCookie.value;
      this.userAvatar = avatarCookie.value;
      this.userEmail = emailCookie.value;
      this.userPhone = phoneCookie.value;
      this.userRole = roleCookie.value;
      this.resendCodeTime = resendCodeTimeCookie.value;
    },

    resetAuthData() {
      // Reset state to null
      this.userToken = null;
      this.userId = null;
      this.userName = null;
      this.userAvatar = null;
      this.userEmail = null;
      this.userPhone = null;
      this.userRole = null;
      this.resendCodeTime = null;

      // Clear cookies
      const tokenCookie = useCookie("token");
      const idCookie = useCookie("id");
      const nameCookie = useCookie("name");
      const avatarCookie = useCookie("avatar");
      const emailCookie = useCookie("email");
      const phoneCookie = useCookie("phone");
      const roleCookie = useCookie("role");
      const resendCodeTimeCookie = useCookie("resendCodeTime");

      tokenCookie.value = null;
      idCookie.value = null;
      nameCookie.value = null;
      avatarCookie.value = null;
      emailCookie.value = null;
      phoneCookie.value = null;
      roleCookie.value = null;
      resendCodeTimeCookie.value = null;
    },
  },
});
