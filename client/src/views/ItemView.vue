
<template>

    <template v-if="loading">
        <Loader />
    </template>

    <template v-else>
        <div class="flex flex-col gap-6 p-5 w-full h-full">
    
            <div class="flex items-center justify-between w-full">
                <button @click="this.$router.go(-1)" class="flex items-center text-primary rounded-full cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
    
                <img src="/img/logo.png" class="w-8 h-8" alt="logo">
            </div>
    
            <h1 class="text-2xl text-primary uppercase font-bold text-center">{{ item?.scientific_name }}</h1>
    
            <div class="w-auto h-auto">
                <swiper
                    :slides-per-view="1"
                    :loop="true"
                >
                    <template v-for="(value, key) in item?.images">
                        <swiper-slide>
                            <img :src="value" class="w-full max-h-48 h-auto rounded-xl object-cover" :alt="item?.common_name">
                        </swiper-slide>
                    </template>
                </swiper>
            </div>
    
            <p class="text-sm text-secondary">{{ item?.description }}</p>
    
            <table>
                <thead>
                    <tr class="border border-primary w-full text-base">
                        <th class="border-r border-primary w-1/2 py-2">District</th>
                        <th class="w-1/2 py-2">Name</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(value, key) in item?.vernacular_names">
                        <tr class="border-b border-x border-primary w-full text-sm">
                            <td class="border-r border-primary w-1/2 px-3 py-2">{{ value.place }}</td>
                            <td class="w-1/2 px-3 py-2">{{ value.name }}</td>
                        </tr>
    
                    </template>
                </tbody>
            </table>
    
            <template v-if="item?.more_info">
                <div class="flex items-center gap-2 text-sm text-primary font-bold">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.6 4.2H5.4V3H6.6M6.6 9H5.4V5.4H6.6M6 0C5.21207 0 4.43185 0.155195 3.7039 0.456723C2.97595 0.758251 2.31451 1.20021 1.75736 1.75736C0.632141 2.88258 0 4.4087 0 6C0 7.5913 0.632141 9.11742 1.75736 10.2426C2.31451 10.7998 2.97595 11.2417 3.7039 11.5433C4.43185 11.8448 5.21207 12 6 12C7.5913 12 9.11742 11.3679 10.2426 10.2426C11.3679 9.11742 12 7.5913 12 6C12 5.21207 11.8448 4.43185 11.5433 3.7039C11.2417 2.97595 10.7998 2.31451 10.2426 1.75736C9.68549 1.20021 9.02405 0.758251 8.2961 0.456723C7.56815 0.155195 6.78793 0 6 0Z" fill="#011235"/>
                    </svg>
                    <span>For more information click here</span>
                </div>
            </template>

            
    
        </div>
    </template>


</template>


<script>
import { getSingleItem } from '@/API/index.js'
import Loader from '@/components/Loader.vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';


export default {
    name: "ItemView",
    components: {
        Swiper,
        SwiperSlide,
        Loader,
    },
    data() {
        return {
            id: null,
            item: null,
            loading: true,
        }
    },
    async mounted() {
        this.loading = true;
        this.id = this.$route.params.id;
        await this.getSingleItemData()
    },
    methods: {
        async getSingleItemData() {
            try {
                const res = await getSingleItem(this.id)
                this.item = res.data;
            } catch (err) {
                console.log(err)
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
