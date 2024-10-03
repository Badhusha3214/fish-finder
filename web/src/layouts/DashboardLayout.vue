
<template>
    <section class="min-h-screen bg-btn bg-opacity-10 ">

        <!-- <Navbar /> -->

        <Sidebar />

        <main class="p-4 md:ml-60 h-auto">

            <slot />

        </main>

    </section>
</template>

<script>
    import Navbar from '@/components/Navbar.vue';
    import Sidebar from '@/components/Sidebar.vue';

    export default {
        name: 'DashboardLayout',
        components: { 
            Navbar,
            Sidebar
        },
    }
</script>

<style>
    ::-webkit-scrollbar {
        display: none;
    }
</style>