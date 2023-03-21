const { createApp } = Vue;
const url = "https://mindhub-xj03.onrender.com/api/amazing";

createApp({
  data() {
    return {
      greaterAttendance: { name: "", percentage: 0 },
      lowerAttendance: { name: "", percentage: 0 },
      largerCapacity: { name: "", percentage: 0 },
      pastEvents: [],
      upcomingEvents: [],
      categories: [],
      currentDate: undefined,
      loading: true,
      showMenu: false,
    };
  },
  created() {
    fetch(url)
      .then((resp) => resp.json())
      .then(({ currentDate, events }) => {
        this.currentDate = new Date(currentDate).getTime();
        events.forEach((event) => {
          let attendancePercentage = (event.assistance * 100) / event.capacity;
          if (attendancePercentage) {
            if (this.greaterAttendance.percentage == 0 || this.greaterAttendance.percentage < attendancePercentage) {
              this.greaterAttendance = { name: event.name, percentage: attendancePercentage };
            } else if (this.lowerAttendance.percentage == 0 || this.lowerAttendance.percentage > attendancePercentage) {
              this.lowerAttendance = { name: event.name, percentage: attendancePercentage };
            }
          }
          if (this.largerCapacity.percentage < event.capacity) {
            this.largerCapacity = { name: event.name, percentage: event.capacity };
          }
          const eventDate = new Date(event.date).getTime();
          if (this.currentDate > eventDate) {
            this.pastEvents = [...this.pastEvents, event];
          } else {
            this.upcomingEvents = [...this.upcomingEvents, event];
          }
          if (!this.categories.includes(event.category)) this.categories = [...this.categories, event.category];
        });
        this.loading = false;
      })
      .catch((error) => console.log(error));
  },
  methods: {
    isDecimal(value) {
      return value % 1 == 0 ? value : value.toFixed(2);
    },
    valuesPerCategory(category, type) {
      let reveneus = 0;
      let attendance = 0;
      if (type === "upcoming") {
        let categoryEvents = this.upcomingEvents.filter((event) => event.category === category);
        categoryEvents.forEach((value) => {
          reveneus += value.price * (value.assistance || value.estimate);
          attendance += (((value.assistance || value.estimate) / value.capacity) * 100) / categoryEvents.length;
        });
      } else {
        let categoryEvents = this.pastEvents.filter((event) => event.category === category);
        categoryEvents.forEach((value) => {
          reveneus += value.price * (value.assistance || value.estimate);
          attendance += (((value.assistance || value.estimate) / value.capacity) * 100) / categoryEvents.length;
        });
      }

      return { category, reveneus, attendance };
    },
    changeMenu() {
      this.showMenu = !this.showMenu;
    },
  },
}).mount("#app");
