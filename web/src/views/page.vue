<template>
    <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <!-- Hero Section -->
        <header class="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <nav class="container mx-auto px-4 py-4">
                <div class="flex justify-between items-center">
                    <img src="../../public/assets/mmlogo.png" alt="" class="h-16 w-auto">
                    <a href="/login"
                        class="bg-white text-blue-800 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition-colors">
                        Login
                    </a>
                </div>
            </nav>
            <div class="container mx-auto px-4 py-16 md:py-24">
                <div class="max-w-4xl mx-auto text-center">
                    <h1 class="text-4xl md:text-6xl font-bold mb-4">
                        Meenmozhi
                    </h1>
                    <h2 class="text-3xl md:text-4xl font-semibold mb-6">
                        Kerala Fish Species Identification
                    </h2>
                    <p class="text-xl md:text-2xl mb-8 text-blue-100">
                        Streamline fish species identification across Kerala with our comprehensive database
                        of vernacular, common, and scientific names.
                    </p>
                    <div class="flex justify-center gap-4">
                        <a href="">
                            <button
                                class="bg-white text-blue-800 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
                                Download App
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </header>

        <!-- Features Section -->
        <section class="py-16 md:py-24">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">Features and Benefits</h2>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div v-for="(feature, index) in features" :key="index"
                        class="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <component :is="feature.icon" class="w-12 h-12 text-blue-600 mb-4" />
                        <h3 class="text-xl font-semibold mb-3">{{ feature.title }}</h3>
                        <p class="text-gray-600">{{ feature.description }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Data Sources Section -->
        <section class="bg-blue-50 py-16">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold text-center mb-8">Data Sources</h2>
                <div class="max-w-3xl mx-auto">
                    <p class="text-gray-700 text-center mb-6">
                        Our data is collected from multiple reliable sources including:
                    </p>
                    <ul class="grid md:grid-cols-2 gap-4">
                        <li v-for="source in dataSources" :key="source"
                            class="flex items-center bg-white p-4 rounded-lg shadow">
                            <CheckCircleIcon class="w-5 h-5 text-green-500 mr-3" />
                            <span>{{ source }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- Privacy Policy Section -->
        <section class="py-16">
      <div class="container mx-auto px-4 text-center">
        <router-link to="/privacy" 
          class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <div class="flex items-center gap-2">
            <ShieldIcon class="w-6 h-6" />
            <span>Privacy Policy</span>
          </div>
        </router-link>
      </div>
    </section>

        <!-- Contact Section -->
        <footer class="bg-blue-900 text-white py-12">
            <div class="container mx-auto px-4">
                <div class="max-w-xl mx-auto text-center">
                    <h2 class="text-3xl font-bold mb-6">Contact Us</h2>
                    <div class="space-y-4">
                        <div class="flex items-center justify-center gap-2">
                            <PhoneIcon class="w-5 h-5" />
                            <a href="tel:8281571028" class="hover:text-blue-200 transition-colors">
                                8281571028
                            </a>
                        </div>
                        <div class="flex items-center justify-center gap-2">
                            <MailIcon class="w-5 h-5" />
                            <a href="mailto:meenmozhiofficial@gmail.com" class="hover:text-blue-200 transition-colors">
                                meenmozhiofficial@gmail.com
                            </a>
                        </div>
                    </div>
                    <div class="mt-8 text-blue-200">
                        <p>Version 1.0.0 – Initial release</p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
import {
    DatabaseIcon,
    SearchIcon,
    ImageIcon,
    GraduationCapIcon,
    ShieldIcon,
    CheckCircleIcon,
    PhoneIcon,
    MailIcon
} from 'lucide-vue-next'

const features = [
    {
        icon: DatabaseIcon,
        title: 'Extensive Database',
        description: 'Wide collection of fish species with vernacular names across Kerala districts, common names, and scientific names.'
    },
    {
        icon: SearchIcon,
        title: 'Easy Search',
        description: 'Find fish by scientific, common, or vernacular names quickly and efficiently.'
    },
    {
        icon: ImageIcon,
        title: 'Photos & Descriptions',
        description: 'Each species comes with high-quality images and detailed descriptions for reference.'
    },
    {
        icon: GraduationCapIcon,
        title: 'Educational Tool',
        description: 'A valuable resource for research and learning in Fisheries Science.'
    },
    {
        icon: ShieldIcon,
        title: 'Admin-Managed Data',
        description: 'Ensures the accuracy and reliability of all information provided.'
    }
]

const dataSources = [
    'Field Research',
    'Fisheries Experts',
    'Scientific Databases',
    'Local Fishermen',
    'Wikipedia',
    'FishBase'
]
</script>

<style>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

section {
    animation: fadeIn 0.8s ease-out;
}

.cls-1 {
    fill: #d2e3fc;
}

.cls-2 {
    fill: #9fbaee;
}

.cls-3 {
    fill: #03266f;
}

.cls-4 {
    fill: #fff;
}
</style>