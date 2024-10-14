<template>
    <aside class="px-5 py-8 bg-sidebar h-full relative w-full">
        <NuxtLink to="/index.vue" class="mb-10 block">
            <NuxtImg src="/logo.jpg" alt="" width="100px" class="mx-auto"/>
        </NuxtLink>

        <button class="absolute top-2 right-3 transition-colors hover:text-primary">
            <Icon name="solar:logout-2-outline" size="20px"/>
        </button>
        <Menu/>
    </aside>
    
</template>

<script setup lang="ts">
   
    
</script>