<template>
  <div>
    <!-- Mobile toggle button -->
    <button @click="toggleSidebar" class="fixed top-3 left-4 z-50 p-2 rounded-md bg-white md:hidden"
      aria-label="Toggle Sidebar">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <!-- Sidebar -->
    <aside :class="{ 'translate-x-0': isOpen, '-translate-x-full': !isOpen }"
      class="fixed top-0 left-0 z-40 w-60 h-screen pt-5 transition-transform bg-btn border-r border-gray-200 md:translate-x-0 "
      aria-label="Sidenav" id="drawer-navigation">
      <div class="flex justify-center items-center w-full md:w-auto">
          <a href="/" class="flex items-center ml-auto md:ml-0">
            <img src="../../public/assets/white_logo.png" class="lg:h-24 h-10 " alt="Inovus Labs Logo">
          </a>
        </div>
      <div class="flex flex-col justify-between overflow-y-auto py-5 px-3 h-full bg-btn">
        
        <ul class="space-y-2">
          <template v-for="item in navItems">
            <template v-if="item.children">
              <li>
                <button type="button"
                  class="flex items-center p-2 w-full text-base font-medium rounded transition duration-75 group text-white hover:bg-btn hover:bg-opacity-30"
                  @click="openNav(item)">
                  <span v-html="item.icon"></span>
                  <span class="flex-1 ml-3 text-left whitespace-nowrap">{{ item.name }}</span>
                  <svg aria-hidden="true" :class="{ 'rotate-180': item.open }" class="w-6 h-6" fill="currentColor"
                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"></path>
                  </svg>
                </button>
                <ul v-if="item.open" class="space-y-1 my-2">
                  <template v-for="child in item.children">
                    <li>
                      <a :href="child.link"
                        class="flex items-center px-2 py-1.5 pl-11 w-full text-base font-medium text-gray-500 rounded group hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        :class="{ 'bg-gray-100 dark:bg-gray-700': currentRoute === child.link }">
                        <span class="flex-1 ml-3 text-left whitespace-nowrap">{{ child.name }}</span>
                      </a>
                    </li>
                  </template>
                </ul>
              </li>
            </template>
            <template v-else>
              <li>
                <template v-if="item.active">
                  <a :href="item.link"
                    class="flex items-center p-2 text-base font-medium rounded text-white hover:bg-btn hover:bg-opacity-30 group"
                    :class="{ 'bg-gray-100 dark:bg-gray-700': currentRoute === item.link }">
                    <span v-html="item.icon"></span>
                    <span class="ml-3">{{ item.name }}</span>
                  </a>
                </template>
                <template v-else>
                  <button
                    class="w-full flex items-center p-2 text-base font-medium cursor-not-allowed text-gray-400 rounded dark:text-gray-500 group">
                    <span v-html="item.icon"></span>
                    <span class="ml-3">{{ item.name }}</span>
                  </button>
                </template>
              </li>
            </template>
          </template>
        </ul>

        <!-- Logout button -->
        <div class="mt-auto">
          <button @click="logout"
            class="flex py-2 px-2 items-center mb-10 lg:mb-24 w-full text-base font-medium rounded transition duration-75 group text-white hover:bg-red">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span class="ml-3">Logout</span>
          </button>
        </div>
      </div>
    </aside>

    <!-- Overlay for mobile -->
    <div v-if="isOpen" @click="toggleSidebar" class="fixed inset-0 bg-gray-900 bg-opacity-50 z-30 md:hidden"></div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      isOpen: false,
      openedItem: null,
      currentRoute: null,
      navItems: [
        // {
        //   name: 'Overview',
        //   icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path d="M15.5 2A1.5 1.5 0 0 0 14 3.5v13a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 16.5 2h-1ZM9.5 6A1.5 1.5 0 0 0 8 7.5v9A1.5 1.5 0 0 0 9.5 18h1a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 10.5 6h-1ZM3.5 10A1.5 1.5 0 0 0 2 11.5v5A1.5 1.5 0 0 0 3.5 18h1A1.5 1.5 0 0 0 6 16.5v-5A1.5 1.5 0 0 0 4.5 10h-1Z" /></svg>`,
        //   link: '/',
        //   active: true,
        // },
        {
          name: 'Add Fish',
          icon: `<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm4.026 2.879C5.356 7.65 5.72 7.5 6 7.5s.643.15.974.629a.75.75 0 0 0 1.234-.854C7.66 6.484 6.873 6 6 6c-.873 0-1.66.484-2.208 1.275C3.25 8.059 3 9.048 3 10c0 .952.25 1.941.792 2.725C4.34 13.516 5.127 14 6 14c.873 0 1.66-.484 2.208-1.275a.75.75 0 0 0 .133-.427V10a.75.75 0 0 0-.75-.75H6.25a.75.75 0 0 0 0 1.5h.591v1.295c-.293.342-.6.455-.841.455-.279 0-.643-.15-.974-.629C4.69 11.386 4.5 10.711 4.5 10c0-.711.19-1.386.526-1.871ZM10.75 6a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-1.5 0v-6.5a.75.75 0 0 1 .75-.75Zm3 0h2.5a.75.75 0 0 1 0 1.5H14.5v1.75h.75a.75.75 0 0 1 0 1.5h-.75v2.5a.75.75 0 0 1-1.5 0v-6.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" /></svg>`,
          link: '/',
          active: true,
        },
        {
          name: 'Contacts',
          icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.66667 12.4444C2.66667 10.6667 6.22222 9.68889 8 9.68889C9.77778 9.68889 13.3333 10.6667 13.3333 12.4444V13.3333H2.66667M10.6667 5.33333C10.6667 6.04058 10.3857 6.71885 9.88562 7.21895C9.38552 7.71905 8.70724 8 8 8C7.29276 8 6.61448 7.71905 6.11438 7.21895C5.61428 6.71885 5.33333 6.04058 5.33333 5.33333C5.33333 4.62609 5.61428 3.94781 6.11438 3.44772C6.61448 2.94762 7.29276 2.66667 8 2.66667C8.70724 2.66667 9.38552 2.94762 9.88562 3.44772C10.3857 3.94781 10.6667 4.62609 10.6667 5.33333ZM0 1.77778V14.2222C0 14.6937 0.187301 15.1459 0.520699 15.4793C0.854097 15.8127 1.30628 16 1.77778 16H14.2222C14.6937 16 15.1459 15.8127 15.4793 15.4793C15.8127 15.1459 16 14.6937 16 14.2222V1.77778C16 1.30628 15.8127 0.854097 15.4793 0.520699C15.1459 0.187301 14.6937 0 14.2222 0H1.77778C1.30628 0 0.854097 0.187301 0.520699 0.520699C0.187301 0.854097 0 1.30628 0 1.77778Z" fill="white"/>
</svg>
`,
          link: '/contact',
          active: true,
        },
        {
          name: 'Feedbacks',
          icon: `<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z" clip-rule="evenodd" /></svg>`,
          link: '/feedback',
          active: true,
        },
      ],
    }
  },
  methods: {
    openNav(item) {
      if (this.openedItem && this.openedItem !== item) {
        this.openedItem.open = false;
      }
      item.open = !item.open;
      this.openedItem = item;
    },
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
    logout() {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/login";
    },
  },
  mounted() {
    this.$router.afterEach(() => {
      this.isOpen = false;
    });
  },
};
</script>