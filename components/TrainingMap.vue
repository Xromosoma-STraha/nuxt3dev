<template>
    <div ref="networkContainer" style="width: 100%; height: 600px;"></div>
    <TrainingPlanDetails :trainingPlan="selectedPlan" />
</template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { DataSet, Network } from 'vis-network/standalone';
  import type { TrainingPlan } from '~/types/models';
  import TrainingPlanDetails from './TrainingPlanDetails.vue';
  import { navigateTo } from '#app'
  const authStore = useAuthStore()
  const networkContainer = ref(null);
  let network: Network | null = null;
  const selectedPlan = ref<TrainingPlan | null>(null);
  
  const { data, error, refresh } = await useFetch('/api/trainingPlans', {
      key: 'training-plans',
      onRequestError: (error) => {
           if(error.response?.status === 401){
              navigateTo('/loginpage')
          }
          console.error('Failed to load training plans', error)
      }
  });
  
  // следим за изменением данных
  watch(data, () => {
      if(data.value){
         const sortedPlans = [...data.value].sort((a, b) => {
             const dateA = new Date(a.date).getTime()
             const dateB = new Date(b.date).getTime()
             return dateA - dateB
          });
          createGraph(sortedPlans)
      }    
  })
  
  onMounted(() => {   
      if (error.value) {                      
          return;
      }    
      if(data.value){
          const sortedPlans = [...data.value].sort((a, b) => {
             const dateA = new Date(a.date).getTime()
             const dateB = new Date(b.date).getTime()
             return dateA - dateB
          });
          createGraph(sortedPlans)
      }
  });
  
  function createGraph(trainingPlans: TrainingPlan[]){
      const today = new Date().toISOString().slice(0, 10);
      const nodes = new DataSet(trainingPlans.map((plan, index) => {
        const isToday = new Date(plan.date).toISOString().slice(0, 10) === today;
         return {
              id: plan.id,
              x: index * 150, // Располагаем ноды слева направо.
              y: 300,
              color: isToday ? 'red' : undefined
            }
      }));
      
      const edges = new DataSet(trainingPlans.slice(1).map((plan,index)=>({
          from: trainingPlans[index].id,
         to: plan.id,
         })));
    
         const graphData = { nodes, edges };
      
           const options = {
                layout:{
                 hierarchical:{
                      enabled:false,
                       sortMethod: "directed"
                 }
             }
           }
      
        if (networkContainer.value) {
          network = new Network(networkContainer.value, graphData, options);
      
          network.on("click", function (params) {            
            const clickedNodeId = params.nodes[0];
            if (clickedNodeId) {
              selectedPlan.value = trainingPlans.find((plan) => plan.id === clickedNodeId) ?? null;            
            } else {
              selectedPlan.value = null;
            }      
          });
        }
  }
  </script>