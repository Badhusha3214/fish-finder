<!-- App.vue -->
<template>
  <DashboardLayout>
        <div class=" min-h-screen">
      <div class="container mx-auto p-6">

        <div class="mb-4 flex justify-between items-center">
          <input v-model="searchTerm" type="text" placeholder="Search..." class="p-2 px-5 border rounded">
          <button @click="showModal = true" class="bg-blue-500 text-white px-5 py-3 rounded-full hover:bg-blue-600 transition">+</button>
        </div>
        <div class="overflow-x-auto rounded">
          <table class="w-full bg-white shadow-md rounded">
            <thead>
              <tr class="bg-gray-700 text-white uppercase text-sm leading-normal">
                <th class="py-3 px-6 text-left">Scientific Name</th>
                <th class="py-3 px-6 text-left">Vernacular Names</th>
                <th class="py-3 px-6 text-center">Image</th>
                <th class="py-3 px-6 text-left">Description</th>
                <th class="py-3 px-6 text-center">External Link</th>
                <th class="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody class="text-white bg-gray-800 text-sm font-light">
              <tr v-for="(entry, index) in filteredEntries" :key="index" class="border-b border-gray-900 hover:bg-gray-600">
                <td class="py-3 px-6 text-left whitespace-nowrap">{{ entry.scientificName }}</td>
                <td class="py-3 px-6 text-left">
                  <ul>
                    <li v-for="(name, num) in entry.vernacularNames" :key="num">
                      {{ num }}: {{ name.district }} - {{ name.name }}
                    </li>
                  </ul>
                </td>
                <td class="py-3 px-6 text-center">
                  <img :src="entry.image" :alt="entry.scientificName" class="w-16 h-16 rounded-full mx-auto">
                </td>
                <td class="py-3 px-6 text-left">{{ entry.description }}</td>
                <td class="py-3 px-6 text-center">
                  <a :href="entry.externalLink" target="_blank" class=" hover:underline">Link</a>
                </td>
                <td class="py-3 px-6 text-center">
                  <div class="flex item-center justify-center">
                    <button @click="editEntry(index)" class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button @click="deleteEntry(index)" class="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- Modal -->
      <div v-if="showModal" class="fixed inset-0 bg-blue-600 bg-opacity-50 overflow-y-auto h-full w-full">
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <h3 class="text-lg font-bold mb-4 text-blue-800">{{ editIndex === null ? 'Add New Entry' : 'Edit Entry' }}</h3>
          <form @submit.prevent="submitForm">
            <div class="mb-4">
              <label class="block text-blue-700 text-sm font-bold mb-2" for="scientificName">
                Scientific Name
              </label>
              <input v-model="formData.scientificName" class="shadow appearance-none border rounded w-full py-2 px-3 text-blue-700 leading-tight focus:outline-none focus:shadow-outline" id="scientificName" type="text" placeholder="Scientific Name" required>
            </div>
            <div class="mb-4">
              <label class="block text-blue-700 text-sm font-bold mb-2">
                Vernacular Names
              </label>
              <div v-for="(name, index) in formData.vernacularNames" :key="index" class="flex mb-2">
                <input v-model="name.district" class="shadow appearance-none border rounded w-1/2 py-2 px-3 text-blue-700 leading-tight focus:outline-none focus:shadow-outline mr-2" type="text" placeholder="District" required>
                <input v-model="name.name" class="shadow appearance-none border rounded w-1/2 py-2 px-3 text-blue-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Name" required>
              </div>
              <button type="button" @click="addVernacularName" class="bg-blue-500 text-white px-2 py-1 rounded text-sm mb-4">+ Add Name</button>
            </div>
            <div class="mb-4">
              <label class="block text-blue-700 text-sm font-bold mb-2" for="image">
                Image URL
              </label>
              <input v-model="formData.image" class="shadow appearance-none border rounded w-full py-2 px-3 text-blue-700 leading-tight focus:outline-none focus:shadow-outline" id="image" type="url" placeholder="https://example.com/image.jpg" required>
            </div>
            <div class="mb-4">
              <label class="block text-blue-700 text-sm font-bold mb-2" for="description">
                Description
              </label>
              <textarea v-model="formData.description" class="shadow appearance-none border rounded w-full py-2 px-3 text-blue-700 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Description" required></textarea>
            </div>
            <div class="mb-4">
              <label class="block text-blue-700 text-sm font-bold mb-2" for="externalLink">
                External Link
              </label>
              <input v-model="formData.externalLink" class="shadow appearance-none border rounded w-full py-2 px-3 text-blue-700 leading-tight focus:outline-none focus:shadow-outline" id="externalLink" type="url" placeholder="https://example.com" required>
            </div>
            <div class="flex items-center justify-between">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                {{ editIndex === null ? 'Submit' : 'Update' }}
              </button>
              <button @click="closeModal" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </DashboardLayout>

  </template>
  
  <script>
    import DashboardLayout from '@/layouts/DashboardLayout.vue'
  export default {
    name: 'table',
    components: {
      DashboardLayout,
    },
    data() {
      return {
        entries: [
          {
            scientificName: "Abies alba",
            vernacularNames: [
              { district: "District A", name: "Silver Fir" },
              { district: "District B", name: "European Silver Fir" }
            ],
            image: "https://via.placeholder.com/100",
            description: "A coniferous tree native to the mountains of Europe.",
            externalLink: "https://en.wikipedia.org/wiki/Abies_alba"
          },
          {
            scientificName: "Okiri Abhi",
            vernacularNames: [
              { district: "District A", name: "Silver Fir" },
              { district: "District B", name: "European Silver Fir" }
            ],
            image: "https://via.placeholder.com/100",
            description: "A coniferous tree native to the mountains of Europe.",
            externalLink: "https://en.wikipedia.org/wiki/Abies_alba"
          },
          {
            scientificName: "Josh Doe",
            vernacularNames: [
              { district: "District A", name: "Silver Fir" },
              { district: "District B", name: "European Silver Fir" }
            ],
            image: "https://via.placeholder.com/100",
            description: "A coniferous tree native to the mountains of Europe.",
            externalLink: "https://en.wikipedia.org/wiki/Abies_alba"
          }
        ],
        showModal: false,
        formData: {
          scientificName: "",
          vernacularNames: [{ district: "", name: "" }],
          image: "",
          description: "",
          externalLink: ""
        },
        editIndex: null,
        searchTerm: ""
      };
    },
    computed: {
      filteredEntries() {
        return this.entries.filter(entry =>
          entry.scientificName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          entry.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          entry.vernacularNames.some(vn => 
            vn.district.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            vn.name.toLowerCase().includes(this.searchTerm.toLowerCase())
          )
        );
      }
    },
    methods: {
      addVernacularName() {
        this.formData.vernacularNames.push({ district: "", name: "" });
      },
      closeModal() {
        this.showModal = false;
        this.resetForm();
      },
      resetForm() {
        this.formData = {
          scientificName: "",
          vernacularNames: [{ district: "", name: "" }],
          image: "",
          description: "",
          externalLink: ""
        };
        this.editIndex = null;
      },
      submitForm() {
        if (this.editIndex === null) {
          this.entries.push({ ...this.formData });
        } else {
          this.entries[this.editIndex] = { ...this.formData };
        }
        this.closeModal();
      },
      editEntry(index) {
        this.editIndex = index;
        this.formData = { ...this.entries[index] };
        this.showModal = true;
      },
      deleteEntry(index) {
        if (confirm("Are you sure you want to delete this entry?")) {
          this.entries.splice(index, 1);
        }
      }
    }
  };
  </script>
  
