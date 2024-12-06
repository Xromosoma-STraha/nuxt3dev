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
        createGraph(data.value)
    }    
})

onMounted(() => {   
    if (error.value) {                      
        return;
    }    
    if(data.value){
        createGraph(data.value)
    }
});

function createGraph(trainingPlans: TrainingPlan[]){
    const nodes = new DataSet(trainingPlans.map((plan) => ({
        id: plan.id,
        label: plan.name
      })));
    
      const edges = new DataSet([]); // Пока без связей
    
      const graphData = { nodes, edges };
      const options = {};
    
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