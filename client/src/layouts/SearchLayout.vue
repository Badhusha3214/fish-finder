
<template>

    <div class="flex flex-col relative gap-6 w-full h-full">

        
        <div class="p-5">

            <div class="flex items-center justify-between w-full">
                <button class="flex items-center text-primary rounded-full cursor-pointer" @click="openSidebar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M2.7936 1.87518C1.29404 1.87518 1.29404 4.12452 2.7936 4.12452H21.2135C22.7145 4.12452 22.7145 1.87518 21.2135 1.87518H2.7936ZM21.2447 10.8754H2.79218C1.23309 10.8144 1.23309 13.214 2.79218 13.1247H21.2121C22.7428 13.1842 22.7726 10.8754 21.2433 10.8754H21.2447ZM2.79218 19.8755C1.29262 19.8755 1.29262 22.1249 2.79218 22.1249H21.2121C22.713 22.1249 22.713 19.8755 21.2121 19.8755H2.79218Z" fill="currentColor"/>
                    </svg>
                </button>
        
                <img src="/img/logo.png" class="w-8 h-8" alt="logo">
            </div>
    
            <slot />

        </div>

    </div>

    <div
        class="
            fixed top-0 left-0 w-full h-full
            bg-white bg-opacity-20 backdrop-filter backdrop-blur-md
            transition-opacity duration-300
        "
        :class="{ 'opacity-100 z-40': isOpen, 'opacity-0 -z-10': !isOpen }"
        @click="closeSidebar"
    >
        <Sidebar :isOpen="isOpen" />
    </div>

</template>


<script>
import Sidebar from '@/components/Sidebar.vue';
export default {
    name: "HomeLayout",
    components: {
        Sidebar
    },
    data() {
        return {
            isOpen: false
        };
    },
    methods: {
        // toggleSidebar() {
        //     this.isOpen = !this.isOpen;
        // }

        openSidebar() {
            this.isOpen = true;
        },
        closeSidebar() {
            this.isOpen = false;
        },
    }
};
</script>