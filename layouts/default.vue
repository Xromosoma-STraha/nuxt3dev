<template>
    <Header/>
    <section class="grid" style="min-height: 100vh;">
        <Sidebar/>
        <div>            
            <slot/>           
        </div>
    </section>    
    <Footer class="fixed-bottom"/>
</template>

<script setup lang="ts">
    import Header from '~/components/Header.vue';
    import Footer from '~/components/Footer.vue';
    import Sidebar from '~/components/Sidebar.vue';
</script>

<style scoped>
    .fixed-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    }
    .grid{
        display: grid;
        grid-template-columns: 1fr 6fr;
    }

</style>