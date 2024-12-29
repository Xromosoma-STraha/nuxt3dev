<template>
    <div>
      <h2>Аналитика тренировок</h2>
      <div class="date-range">
        <label for="startDate">Дата начала:</label>
        <input type="date" id="startDate" v-model="startDate" class="text-black" />
        <label for="endDate">Дата конца:</label>
        <input type="date" id="endDate" v-model="endDate" class="text-black" />
        <button @click="loadAnalytics">Загрузить</button>
      </div>
        <div v-if="analyticsData">
             <div class="chart-container">
           <BarChart :chart-data="chartData"/>
            </div>
           <p>Средний тренировочный объём в неделю: {{ averageVolumePerWeek }}кг</p>
          <p>Количество тренировок: {{ analyticsData.trainingCount }}</p>
          <p>Суммарный тренировочный объём: {{ analyticsData.totalVolume }} кг</p>
          <p>Количество подходов: {{ analyticsData.totalSets }}</p>
        </div>
           <div v-if="errorMessage" style="color: red;">{{ errorMessage }}</div>
    </div>
  </template>
  
  <script setup lang="ts">
  definePageMeta({
      layout: 'custom',
      middleware:'auth'
  })
  import { ref, computed } from 'vue';
  import { useAuthStore } from '~/stores/auth';
  import  BarChart  from '~/components/BarChart.vue';
  const authStore = useAuthStore()
  const startDate = ref('');
  const endDate = ref('');
  const analyticsData = ref<any>(null);
  const errorMessage = ref<string | null>(null)
  const scaleMarks = ref([
      { value: 5000, label: 'Слабак' },
      { value: 10000, label: 'Подснежник' },
      { value: 15000, label: 'Арчо Морис' },
      { value: 20000, label: 'Молодец' },
       { value: 25000, label: 'Мастер' },
  ]);
  
  
  const loadAnalytics = async () => {
      errorMessage.value = null;
    try {
      const response = await $fetch('/api/analytics', {
        method: 'GET',
        query: {
          startDate: startDate.value,
          endDate: endDate.value,
          userId: authStore.userId,
        },
      });
        analyticsData.value = response;
    } catch (error: any) {
       console.error("не удалось получить аналитику", error)
       errorMessage.value = "Не удалось получить аналитику"
    }
  };
  
  const averageVolumePerWeek = computed(()=> {
   if (!analyticsData.value) return 0
      const start = new Date(startDate.value)
        const end = new Date(endDate.value)
        const diffTime = Math.abs(end.getTime() - start.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffWeeks = diffDays / 7;
      return  analyticsData.value.totalVolume / diffWeeks
  })
  
  const chartData = computed(() => {
      if(!analyticsData.value) return null
      const start = new Date(startDate.value)
        const end = new Date(endDate.value)
          const diffTime = Math.abs(end.getTime() - start.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffWeeks = Math.ceil(diffDays / 7);
     return {
            labels: Array.from({ length: diffWeeks }, (_, i) => `неделя ${i + 1}`),
              datasets: [
                  {
                      label: 'Тренировочный объём',
                      data: analyticsData.value.weeklyData.map((weekData: { week: number, volume: number }) => weekData.volume) as number[],
                      backgroundColor: 'blue',
                      borderColor: 'blue',
                      borderWidth: 1,
                  }
          ],
          };
  })
  </script>
  <style scoped>
  .chart-container {
      width: 100%;
      height: 300px;
  }
  input.text-black {
      color: black;
  }
  </style>