<template>
  <DashboardLayout>
    <div class="min-h-screen bg-white rounded-lg">
      <template v-if="loading">
        <h1 class="text-xl font-bold p-5 text-gray-500">Items are loading</h1>
        <Loader />
      </template>
      <div v-else class="container mx-auto p-4 sm:p-6">
        <div class="mb-4 bg-btn p-5 rounded-lg bg-opacity-10 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <input v-model="searchTerm" type="text" placeholder="Search..." class="p-2 px-4 border border-btn rounded w-full sm:w-auto">
          <button @click="showModal = true" class="bg-btn text-white px-4 py-2 rounded-lg hover:bg-btnh transition w-full sm:w-auto">Add Entry</button>
        </div>
        <div class="overflow-x-auto rounded-lg">
          <table class="w-full bg-white shadow-md rounded">
            <thead class="bg-btn text-white uppercase text-sm leading-normal">
              <tr>
                <th class="py-3 px-4 text-left">Scientific Name</th>
                <th class="py-3 px-4 text-left hidden sm:table-cell">Vernacular Names</th>
                <th class="py-3 px-4 text-center">Images</th>
                <th class="py-3 px-4 text-left hidden md:table-cell">Description</th>
                <th class="py-3 px-4 text-center hidden lg:table-cell">External Link</th>
                <th class="py-3 px-4 text-center">Category</th>
                <th class="py-3 px-4 text-center">Created by</th>
                <th class="py-3 px-4 text-center">Updated by</th>
                <th class="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody class="text-black bg-btn bg-opacity-10 text-sm font-light">
              <tr v-for="(entry, index) in filteredEntries" :key="index" class="odd:bg-white hover:bg-btn hover:bg-opacity-30">
                <td class="py-3 px-4 text-left">
                  <div class="font-medium">{{ entry.scientificName }}</div>
                  <div class="text-xs text-gray-400 sm:hidden">{{ Object.values(entry.vernacularNames)[0] || 'N/A' }}</div>
                </td>
                <td class="py-3 px-4 text-left hidden sm:table-cell">
                  <ul class="list-disc list-inside">
                    <li v-for="(name, place) in entry.vernacularNames" :key="place">
                      {{ place }}: {{ name }}
                    </li>
                  </ul>
                </td>
                <td class="py-3 px-4 text-center">
                  <div class="flex justify-center space-x-2">
                    <img v-for="(img, imgIndex) in entry.images.slice(0, 1)" :key="imgIndex" :src="img" :alt="`${entry.scientificName} ${imgIndex + 1}`" class="w-12 h-12 rounded-full">
                  </div>
                </td>
                <td class="py-3 px-4 text-left hidden md:table-cell">
                  {{ entry.description.slice(0, 50) }}...
                </td>
                <td class="py-3 px-4 text-center hidden lg:table-cell">
                  <a :href="entry.externalLink" target="_blank" class="hover:underline">Link</a>
                </td>
                <td class="py-3 px-4 text-center">
                  {{ entry.category }}
                </td>
                <td class="py-3 px-4 text-center">
                  {{ entry.created_by }}
                </td>
                <td class="py-3 px-4 text-center">
                  {{ entry.updated_by }}
                </td>
                <td class="py-3 px-4 text-center">
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

      <!-- Modal component (not shown for brevity) -->
    </div>
  </DashboardLayout>
</template>

<script>
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import Loader from '@/components/Loader.vue'
import { getitem, additem, deleteitem, edititem } from '@/API/index';

export default {
  name: 'ItemTable',
  components: {
    DashboardLayout,
    Loader,
  },
  data() {
    return {
      entries: [],
      showModal: false,
      loading: true,
      formData: {
        common_name: "",
        scientific_name: "",
        vernacular_names: {},
        images: [{ image: [""], diagram: [""] }],
        description: "",
        more_info: "",
        category: ""
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
        Object.values(entry.vernacularNames).some(name => 
          name.toLowerCase().includes(this.searchTerm.toLowerCase())
        ) ||
        entry.category.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  },
  mounted() {
    this.loading = true;
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      if (!document.cookie.includes('token')) {
        this.$router.push('/login');
      } else {
        this.getitem();
      } 
    },
    async getitem() {
      try {
        const res = await getitem();
        const data = res.data.data.items;
        this.entries = data.map(item => {
          let vernacularNames;
          try {
            vernacularNames = JSON.parse(item.vernacular_names[0]);
          } catch (error) {
            console.error("Error parsing vernacular names:", error);
            vernacularNames = {}; // Set to empty object if parsing fails
          }
          
          return {
            item_id: item.item_id,
            scientificName: item.scientific_name,
            vernacularNames: vernacularNames,
            images: item.images[0].image.length > 0 ? item.images[0].image : ['https://via.placeholder.com/100'],
            description: item.description,
            externalLink: item.more_info || '',
            category: item.category || 'Not specified',
            created_by: item.created_by,
            updated_by: item.updated_by
          };
        });
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        this.loading = false;
      }
    },
    addVernacularName() {
      this.$set(this.formData.vernacular_names, '', '');
    },
    addImageField() {
      this.formData.images[0].image.push("");
    },
    closeModal() {
      this.showModal = false;
      this.resetForm();
    },
    resetForm() {
      this.formData = {
        common_name: "",
        scientific_name: "",
        vernacular_names: {},
        images: [{ image: [""], diagram: [""] }],
        description: "",
        more_info: "",
        category: ""
      };
      this.editIndex = null;
    },
    async submitForm() {
      try {
        if (this.editIndex === null) {
          const res = await additem(this.formData);
          console.log(res);
        } else {
          const entryToUpdate = this.entries[this.editIndex];
          const updatedData = {
            common_name: this.formData.common_name,
            scientific_name: this.formData.scientific_name,
            vernacular_names: [JSON.stringify(this.formData.vernacular_names)],
            images: [{ image: this.formData.images[0].image, diagram: this.formData.images[0].diagram }],
            description: this.formData.description,
            more_info: this.formData.more_info,
            category: this.formData.category,
          };
          const res = await edititem(entryToUpdate.item_id, updatedData);
          console.log(res);
        }
        await this.getitem(); // Refresh the list after adding or updating
        this.closeModal();
      } catch (error) {
        console.error(error);
      }
    },
    editEntry(index) {
      this.editIndex = index;
      const entry = this.entries[index];
      this.formData = {
        common_name: Object.values(entry.vernacularNames)[0] || '',
        scientific_name: entry.scientificName,
        vernacular_names: entry.vernacularNames,
        images: [{ image: entry.images, diagram: [] }],
        description: entry.description,
        more_info: entry.externalLink,
        category: entry.category
      };
      this.showModal = true;
    },
    async deleteEntry(index) {
      if (confirm("Are you sure you want to delete this entry?")) {
        try {
          const entryToDelete = this.entries[index];
          await deleteitem(entryToDelete.item_id);
          await this.getitem(); // Refresh the list after deleting
        } catch (error) {
          console.error("Failed to delete entry:", error);
          alert("Failed to delete entry. Please try again later.");
        }
      }
    }
  }
};
</script>