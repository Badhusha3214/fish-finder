<template>
    <div class="about-page-container">
        <div class="about-page-content">
            <div class="flex flex-col gap-6 p-5  w-full">
                <div class="flex items-center justify-between w-full">
                    <button @click="this.$router.go(-1)"
                        class="flex items-center text-primary rounded-full cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                        <span class="text-xl text-primary uppercase font-bold">About Us</span>
                    </button>
                </div>

                <div class="flex flex-col py-6 items-center justify-center">
                    <img src="/img/logo.png" class="w-40 h-40" alt="logo">
                </div>

                <p>
                    Fish Finder is an intuitive Android application designed to help users identify and learn about
                    various fish
                    species using their vernacular names. Whether you're a fishing enthusiast, marine biologist, or
                    simply
                    curious about aquatic life, Fish Finder offers a comprehensive and easy-to-use platform for
                    exploring the
                    vast diversity of fish species.
                </p>
                <p>
                    With Fish Finder, you can search for fish by their local names, access detailed information about
                    each
                    species, including habitat, behavior, and distinguishing features, and view high-quality images to
                    aid in
                    identification. The app is designed to support multiple languages, ensuring that users from
                    different
                    regions can easily find and identify fish using the names they are most familiar with.
                </p>
                <p>
                    Whether you're on a fishing trip or simply exploring your local waters, Fish Finder is your go-to
                    resource
                    for discovering the rich world of fish species, making fish identification easy and accessible for
                    everyone.
                </p>

                <h2 class="text-xl text-primary uppercase font-bold">Team Members</h2>

                <div class="grid gap-8 grid-cols-3">
                    <div class="text-center text-gray-500 dark:text-gray-400">
                        <div class="mx-auto mb-4 w-24 h-24 rounded-full overflow-hidden">
                            <img class="w-full h-full object-cover" src="/img/test1.jpg" alt="Steve Avatar">
                        </div>
                        <h3 class="mb-1 text-2xl text-xl text-primary uppercase font-bold">
                            <a href="#">STEVE JOSE</a>
                        </h3>
                    </div>
                    <div class="text-center text-gray-500 dark:text-gray-400">
                        <div class="mx-auto mb-4 w-24 h-24 rounded-full overflow-hidden">
                            <img class="w-full h-full object-cover" src="/img/test2.jpg" alt="Joseph Avatar">
                        </div>
                        <h3 class="mb-1 text-2xl text-xl text-primary uppercase font-bold">
                            <a href="#">JOSEPH SABU</a>
                        </h3>
                    </div>
                    <div class="text-center text-gray-500 dark:text-gray-400">
                        <div class="mx-auto mb-4 w-24 h-24 rounded-full overflow-hidden">
                            <img class="w-full h-full object-cover" src="/img/test3.jpg" alt="Fredy Avatar">
                        </div>
                        <h3 class="mb-1 text-2xl text-xl text-primary uppercase font-bold">
                            <a href="#">FREDY JHONSON</a>
                        </h3>
                    </div>
                </div>

                <h2 class="text-xl text-primary uppercase font-bold">Development Team</h2>
                <h3 class="text-lg text-primary uppercase font-black">Team DevMorphix,</h3>
                <p>Bringing dreams to life with precision and expertise in every delivery.</p>

                <div class="flex space-x-4">
                    <a href="https://www.linkedin.com/company/devmorphix/" target="_blank" rel="noopener noreferrer"
                        class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        <span class="sr-only">LinkedIn page</span>
                    </a>
                    <a href="https://x.com/DevMorphix" target="_blank" rel="noopener noreferrer"
                        class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                                d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                        </svg>
                        <span class="sr-only">X (Twitter) page</span>
                    </a>
                    <a href="https://devmorphix.com/" target="_blank" rel="noopener noreferrer"
                        class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                clip-rule="evenodd" />
                        </svg>
                        <span class="sr-only">Website</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "About",
};
</script>

<style scoped>
.about-page-container {
    height: 100vh;
    overflow-y: auto;
}

.about-page-content {
    max-width: 800px;
    margin: 0 auto;
    /* padding: 2rem; */
}
</style>