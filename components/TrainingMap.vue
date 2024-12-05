<template>
    <div ref="networkContainer" style="width: 100%; height: 600px;"></div>
    <TrainingPlanDetails :trainingPlan="selectedPlan" />
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { DataSet, Network } from 'vis-network/standalone';
  import type { TrainingPlan } from '~/types/models';
  import { trainingPlansData } from '~/types/data';
  import TrainingPlanDetails from './TrainingPlanDetails.vue'
  
  const networkContainer = ref(null);
  let network: Network | null = null;
  const selectedPlan = ref<TrainingPlan | null>(null);
  
  onMounted(() => {
    const nodes = new DataSet(trainingPlansData.map((plan) => ({
      id: plan.id,
      label: plan.name
    })));
  
    const edges = new DataSet([]); // Пока без связей
  
    const data = { nodes, edges };
    const options = {
         // Добавьте опции для настройки внешнего вида графа здесь
    };
  
    if (networkContainer.value) {
      network = new Network(networkContainer.value, data, options);
  
      network.on("click", function (params) {
        
        const clickedNodeId = params.nodes[0];
        if (clickedNodeId) {
          const clickedPlan = trainingPlansData.find((plan) => plan.id === clickedNodeId);
          selectedPlan.value = trainingPlansData.find((plan) => plan.id === clickedNodeId) ?? null;        
        } else {
          selectedPlan.value = null;
        }      
      });
    }
  });
  </script>