const { createApp } = Vue;
const url = "https://mindhub-xj03.onrender.com/api/amazing";

const queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
console.log(id);

createApp({
  data() {
    return {
      event: undefined,
      showMenu: false,
      loading: true,
    };
  },
  created() {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        this.event = data.events.find((event) => event._id == id);
        this.loading = false;
      })
      .catch((error) => console.log(error));
  },
  methods: {
    changeMenu() {
      this.showMenu = !this.showMenu;
    },
  },
}).mount("#app");
