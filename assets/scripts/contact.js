const { createApp } = Vue;

createApp({
  data() {
    return {
      showMenu: false,
    };
  },
  created() {},
  methods: {
    changeMenu() {
      this.showMenu = !this.showMenu;
    },
  },
}).mount("#app");
