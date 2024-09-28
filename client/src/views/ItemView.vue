<template>

    <template v-if="loading">
        <Loader />
    </template>

    <template v-else>
        <div class="flex flex-col gap-4 p-5 w-full h-full">

            <div class="flex items-center justify-between w-full">
                <button @click="this.$router.go(-1)" class="flex items-center text-primary rounded-full cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>

                <img src="/img/logo.png" class="w-8 h-8" alt="logo">
            </div>

            <h1 class="text-2xl text-primary uppercase font-bold text-center">{{ item?.scientific_name }}</h1>

            <div class="w-auto h-auto relative">
                <swiper :slides-per-view="1" :loop="false" :pagination="{ clickable: true }" :modules="modules">
                    <template v-for="(value, key) in item?.images">
                        <swiper-slide>
                            <img :src="value" class="w-full max-h-48 h-auto rounded-xl object-cover"
                                :alt="item?.common_name">
                        </swiper-slide>
                    </template>
                    <div class="swiper-pagination"></div>
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

            <template v-if="item">
                <div class="flex items-center gap-2 text-sm text-primary font-bold">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.6 4.2H5.4V3H6.6M6.6 9H5.4V5.4H6.6M6 0C5.21207 0 4.43185 0.155195 3.7039 0.456723C2.97595 0.758251 2.31451 1.20021 1.75736 1.75736C0.632141 2.88258 0 4.4087 0 6C0 7.5913 0.632141 9.11742 1.75736 10.2426C2.31451 10.7998 2.97595 11.2417 3.7039 11.5433C4.43185 11.8448 5.21207 12 6 12C7.5913 12 9.11742 11.3679 10.2426 10.2426C11.3679 9.11742 12 7.5913 12 6C12 5.21207 11.8448 4.43185 11.5433 3.7039C11.2417 2.97595 10.7998 2.31451 10.2426 1.75736C9.68549 1.20021 9.02405 0.758251 8.2961 0.456723C7.56815 0.155195 6.78793 0 6 0Z"
                            fill="#011235" />
                    </svg>
                    <span>For more information <a :href="item?.more_info"> click here</a></span>
                </div>
            </template>

            <!-- togglemodal -->
            <div class="flex w-full justify-start">
                <button @click="toggleModal" class="flex items-center text-primary rounded-md hover:bg-gray-100 ">
                    <svg class="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                        height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28" />
                    </svg>
                    <span>Suggestions</span>
                </button>
            </div>

            <!-- Modal -->
            <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                    <h3 class="text-lg font-semibold">Suggest Improvement</h3>
                    <p class="mb-4">Help us grow better with your feedback!</p>
                    <form @submit.prevent="submitSuggestion" class="space-y-4">
                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" id="name" v-model="name" required
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
                        </div>
                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email" v-model="email" required
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
                        </div>
                        <div>
                            <label for="suggestion" class="block text-sm font-medium text-gray-700">Suggestion</label>
                            <textarea id="suggestion" v-model="suggestion" required rows="4"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"></textarea>
                        </div>
                        <div class="flex justify-end space-x-2">
                            <button type="button" @click="toggleModal"
                                class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                                Cancel
                            </button>
                            <button type="submit" @click="sendSuggession"
                                class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>


        </div>
    </template>


</template>


<script>
import { getSingleItem, sendSuggession } from '@/API/index.js'
import Loader from '@/components/Loader.vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default {
    name: "ItemView",
    components: {
        Swiper,
        SwiperSlide,
        Loader,
    },
    setup() {
    return {
      modules: [Pagination],
    };
  },
    data() {
        return {
            id: null,
            item: null,
            loading: true,
            showModal: false,
            email: '',
            suggestion: '',
            name: ''
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
        toggleModal() {
            this.showModal = !this.showModal;
            if (!this.showModal) {
                this.email = '';
                this.suggestion = '';
            }
        },
        async sendSuggession() {
            // Here you would typically send the suggestion to your backend
            console.log('Suggestion submitted:', { email: this.email, suggestion: this.suggestion });

            const data = {
                author: this.name,
                item_id: this.id,
                email: this.email,
                message: this.suggestion,
            }

            let res = await sendSuggession(data)
            console.log(res);

            this.toggleModal();
            // Optionally, show a success message to the user
        },
    },
};
</script>
<<<<<<< HEAD
<style>
=======
<style scoped>
>>>>>>> ce22d58c4209ce3f32d32e982426a281264b49c9
.swiper-pagination {
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
}

.swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    border: 1px solid #000000;
    background-color: #ffffff;
    opacity: 1;
    margin: 0 8px;
    border-radius: 50%;
    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    overflow: hidden;
}

.swiper-pagination-bullet::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, #ff0000 60%, #ff0000 60%);
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.5s ease-out;
}

.swiper-pagination-bullet-active {
    transform: scale(1.2);
    border: 1px solid #000000;
    border-radius: 100%;
    background-color: #ffffff;
    width: 12px;
    height: 12px;
}

.swiper-pagination-bullet-active::before {
    animation: liquidIndicator 2s infinite ease-in-out;
}

/* @keyframes liquidIndicator {
    0% {
        transform: translate(-50%, -50%) scale(0.1) rotate(0deg);
    }

    50% {
        transform: translate(-50%, -50%) scale(1) rotate(180deg);
    }

    100% {
        transform: translate(-50%, -50%) scale(0.1) rotate(360deg);
    }
} */

/* Optional: Add a glow effect to the active bullet */
.swiper-pagination-bullet-active::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    filter: blur(3px);
    transform: translate(-50%, -50%) scale(1.5);
    animation: glowPulse 2s infinite ease-in-out;
}
/* 
@keyframes glowPulse {

    0%,
    100% {
        opacity: 0.5;
    }

    50% {
        opacity: 1;
    }
} */
</style>