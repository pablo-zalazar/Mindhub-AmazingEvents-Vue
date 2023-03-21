const { createApp } = Vue;
const url = "https://mindhub-xj03.onrender.com/api/amazing";

createApp({
  data() {
    return {
      currentDate: undefined,
      allEvents: [],
      filteredEvents: undefined,
      categories: [],
      checkeds: [],
      searchValue: "",
      slidePosition: 1,
      loading: true,
      showMenu: false,
    };
  },
  created() {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        this.currentDate = new Date(data.currentDate).getTime();
        this.allEvents = data.events.filter((event) => this.currentDate > new Date(event.date).getTime());
        this.filteredEvents = this.allEvents;
        this.categories = [...new Set(data.events.map((event) => event.category))];
        this.slidePosition = 1;
        this.loading = false;
      })
      .catch((error) => console.log(error));
  },
  methods: {
    plusSlides(n) {
      let position = this.slidePosition + n;
      if (position > 3) position = 1;
      else if (position < 1) position = 3;
      this.slidePosition = position;
    },
    resetSearch() {
      this.searchValue = "";
    },
    changeMenu() {
      this.showMenu = !this.showMenu;
    },
  },
  computed: {
    filter() {
      this.filteredEvents = this.allEvents.filter(
        (event) =>
          (this.checkeds.includes(event.category) || this.checkeds.length < 1) &&
          event.name.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    },
  },
}).mount("#app");
