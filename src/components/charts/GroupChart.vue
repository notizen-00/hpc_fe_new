<template>
  <apexchart
    type="line"
    v-show="renderKey === 100"
    :key="renderKey"
    width="100%"
    height="100%"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>

<script setup>
import { onMounted, ref } from "vue";
import VueApexCharts from "vue3-apexcharts";
const renderKey = ref(0);
// Sample data representing group names
const seriesData = {
  monthDataSeries1: {
    groups: [
      { name: "Group A", value: 8500 },
      { name: "Group B", value: 8600 },
      { name: "Group C", value: 8400 },
      { name: "Group D", value: 8700 },
      { name: "Group E", value: 8800 },
      { name: "Group F", value: 8200 },
      { name: "Group G", value: 9000 },
      { name: "Group H", value: 9100 },
      { name: "Group I", value: 9300 },
      { name: "Group J", value: 9200 },
      { name: "Group K", value: 9500 },
      { name: "Group L", value: 9600 },
      { name: "Group M", value: 9700 },
      { name: "Group N", value: 9500 },
      { name: "Group O", value: 9400 },
      { name: "Group P", value: 9300 },
      { name: "Group Q", value: 9100 },
      { name: "Group R", value: 9000 },
      { name: "Group S", value: 8800 },
      { name: "Group T", value: 8700 },
    ],
    dates: [
      "01 Nov 2017",
      "02 Nov 2017",
      "03 Nov 2017",
      "04 Nov 2017",
      "05 Nov 2017",
      "06 Nov 2017",
      "07 Nov 2017",
      "08 Nov 2017",
      "09 Nov 2017",
      "10 Nov 2017",
      "11 Nov 2017",
      "12 Nov 2017",
      "13 Nov 2017",
      "14 Nov 2017",
      "15 Nov 2017",
      "16 Nov 2017",
      "17 Nov 2017",
      "18 Nov 2017",
      "19 Nov 2017",
      "20 Nov 2017",
    ],
  },
};

const series = ref([
  {
    name: seriesData.monthDataSeries1.groups.map((group) => group.name),
    data: seriesData.monthDataSeries1.groups.map((group) => group.value),
  },
]);

const chartOptions = ref({
  chart: {
    type: "line",
    id: "areachart-2",
    height: 900,
    width: 100,
    foreColor: "#999",
  },
  grid: {
    row: {
      colors: ["#F44336", "#E91E63", "#9C27B0"],
    },
    column: {
      colors: ["#F44336", "#E91E63", "#9C27B0"],
    },
  },

  annotations: {
    yaxis: [
      {
        y: 8200,
        borderColor: "#00E396",
        label: {
          borderColor: "#00E396",
          style: {
            color: "#fff",
            background: "#00E396",
          },
          text: "Support",
        },
      },
      {
        y: 8600,
        y2: 9000,
        borderColor: "#000",
        fillColor: "#FEB019",
        opacity: 0.2,
        label: {
          borderColor: "#333",
          style: {
            fontSize: "10px",
            color: "#333",
            background: "#FEB019",
          },
          text: "Y-axis range",
        },
      },
    ],
    xaxis: [
      {
        x: new Date("23 Nov 2017").getTime(),
        strokeDashArray: 0,
        borderColor: "#775DD0",
        label: {
          borderColor: "#775DD0",
          style: {
            color: "#fff",
            background: "#775DD0",
          },
          text: "Anno Test",
        },
      },
      {
        x: new Date("26 Nov 2017").getTime(),
        x2: new Date("28 Nov 2017").getTime(),
        fillColor: "#B3F7CA",
        opacity: 0.4,
        label: {
          borderColor: "#B3F7CA",
          style: {
            fontSize: "10px",
            color: "#fff",
            background: "#00E396",
          },
          offsetY: -10,
          text: "X-axis range",
        },
      },
    ],
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  grid: {
    padding: {
      right: 30,
      left: 20,
    },
  },
  title: {
    text: "Group Values Over Time",
    align: "left",
  },
  labels: seriesData.monthDataSeries1.dates.map((date) =>
    new Date(date).getTime()
  ),
  xaxis: {
    type: "datetime",
  },
});

onMounted(() => {
  setTimeout(() => {
    renderKey.value = 100;
  }, 100);
});
</script>

<style>
/* Add any custom styles here */
</style>
