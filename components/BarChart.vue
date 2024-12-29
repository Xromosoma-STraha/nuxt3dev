<template>
    <Bar
        :options="chartOptions"
        :data="chartData"
    />
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, } from 'chart.js'
import { computed } from 'vue';
ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement)
const props = defineProps({
    chartData:{
        type: Object,
        required: true
    },
})
const chartOptions = computed(() => {
  return {
        responsive: true,
          maintainAspectRatio: false,
        scales: {
              x: {
                grid: {
                  display: false,
                },
                  ticks:{
                    font:{
                      size: 14
                  },
                  color:"white"
                  }
            },
               y:{
              beginAtZero: true,
           }
      },
      plugins: {
         legend: {
           display: false,
        },
     },
   }
})
</script>