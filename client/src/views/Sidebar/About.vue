<template>

    <div class="flex flex-col gap-6 p-5 w-full h-full">

        <div class="flex items-center justify-between w-full">
            <button @click="this.$router.go(-1)" class="flex items-center text-primary rounded-full cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                <P class="text-xl text-primary uppercase font-bold ">About Us</P>
            </button>
        </div>

        <div class="flex flex-col py-6 items-center justify-center">
            <img src="/img/logo.png" class="w-40 h-40" alt="logo">
        </div>

        <p>
            Fish Finder is an intuitive Android application designed to help users identify and learn about various fish
            species using their vernacular names. Whether you're a fishing enthusiast, marine biologist, or simply
            curious about aquatic life, Fish Finder offers a comprehensive and easy-to-use platform for exploring the
            vast diversity of fish species.
        </p>
        <p>
            With Fish Finder, you can search for fish by their local names, access detailed information about each
            species, including habitat, behavior, and distinguishing features, and view high-quality images to aid in
            identification. The app is designed to support multiple languages, ensuring that users from different
            regions can easily find and identify fish using the names they are most familiar with.
        </p>
        <p>
            Whether you're on a fishing trip or simply exploring your local waters, Fish Finder is your go-to resource
            for discovering the rich world of fish species, making fish identification easy and accessible for everyone.
        </p>

        <P class="text-xl text-primary uppercase font-bold ">Team Members</P>

        <div class="grid gap-8 grid-cols-3 ">
            <div class="text-center text-gray-500 dark:text-gray-400">
                <div class="mx-auto mb-4 w-24 h-24 rounded-full overflow-hidden">
                    <img class="w-full h-full object-cover" src="/img/test1.jpg" alt="Bonnie Avatar">
                </div>
                <h3 class="mb-1 text-2xl text-xl text-primary uppercase font-bold">
                    <a href="#">STEVE JOSE</a>
                </h3>
            </div>
            <div class="text-center text-gray-500 dark:text-gray-400">
                <div class="mx-auto mb-4 w-24 h-24 rounded-full overflow-hidden">
                    <img class="w-full h-full object-cover" src="/img/test2.jpg" alt="Bonnie Avatar">
                </div>
                <h3 class="mb-1 text-2xl text-xl text-primary uppercase font-bold">
                    <a href="#">joseph sabu</a>
                </h3>
            </div>
            <div class="text-center text-gray-500 dark:text-gray-400">
                <div class="mx-auto mb-4 w-24 h-24 rounded-full overflow-hidden">
                    <img class="w-full h-full object-cover" src="/img/test3.jpg" alt="Bonnie Avatar">
                </div>
                <h3 class="mb-1 text-2xl text-xl text-primary uppercase font-bold">
                    <a href="#">Fredy Jhonson</a>
                </h3>
            </div>
        </div>
    </div>

    <div class="flex flex-col p-5 w-full h-full">
        <P class="text-xl text-primary uppercase font-bold ">Development Team</P>
        <P class="text-lg text-primary uppercase font-black ">Team DevMorphix,</P>
        <p class="">Bringing dreams to life with precision and expertise in every delivery.</p>


        <div>
            <!-- LinkedIn -->
            <a href="https://www.linkedin.com/company/devmorphix/" data-tooltip-target="tooltip-linkedin"
                class="inline-flex justify-center pr-2 py-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span class="sr-only">LinkedIn</span>
            </a>
            <div id="tooltip-linkedin" role="tooltip"
                class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                Connect with us on LinkedIn
                <div class="tooltip-arrow" data-popper-arrow></div>
            </div>

            <!-- X (Twitter) -->
            <a href="https://x.com/DevMorphix" data-tooltip-target="tooltip-x"
                class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                        d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
                <span class="sr-only">X (Twitter)</span>
            </a>
            <div id="tooltip-x" role="tooltip"
                class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                Follow us on X
                <div class="tooltip-arrow" data-popper-arrow></div>
            </div>

            <!-- Website -->
            <a href="https://devmorphix.com/" data-tooltip-target="tooltip-website"
                class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                        d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm1 16.057v-3.05c2.837.183 5.227 1.472 6.516 3.22-1.443 1.937-3.65 3.297-6.168 3.72 1.168-1.287 1.902-2.98 1.902-4.89h-3.25v-1h1zm0-13.057c4.418 0 8 3.582 8 8 0 .362-.043.711-.096 1.058a8.004 8.004 0 0 0-4.306-3.519c.21-.623.402-1.263.402-1.939 0-.78-.242-1.497-.642-2.099-.9-1.36-2.332-2.501-4.08-2.501-2.12 0-3.833 1.696-3.833 3.833 0 1.378.657 2.601 1.668 3.377-.862.33-1.655.796-2.351 1.374C6.964 10.515 6 9.356 6 8c0-4.418 3.582-8 8-8zm0 5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5z" />
                </svg>
                <span class="sr-only">Website</span>
            </a>
            <div id="tooltip-website" role="tooltip"
                class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                Visit our website
                <div class="tooltip-arrow" data-popper-arrow></div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: "About",
};
</script>