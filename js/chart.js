var ctx = document.getElementById("miGrafico").getContext("2d");
var data = {
  labels: ["IP 1", "IP 2", "IP 3", "IP 4"],
  datasets: [
    {
      data: [12, 20, 8, 5],
      backgroundColor: ["#ff9999", "#66b3ff", "#99ff99", "#ffcc99"],
    },
  ],
};

var options = {
  cutoutPercentage: 50,
  title: {
    display: true,
    text: "Porcentaje de IPs usadas",
  },
};

var myPieChart = new Chart(ctx, {
  type: "pie",
  data: data,
  options: options,
});
