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

  <div v-if="showModal" class="fixed inset-0 bg-gray-700 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
      <h3 class="text-lg font-bold mb-4 text-black">{{ editIndex === null ? 'Add New Entry' : 'Edit Entry' }}</h3>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label class="block text-black text-sm font-bold mb-2" for="commonName">Common Name</label>
          <input v-model="formData.common_name" class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" id="commonName" type="text" placeholder="Common Name" required>
        </div>
        <div>
          <label class="block text-black text-sm font-bold mb-2" for="scientificName">Scientific Name</label>
          <input v-model="formData.scientific_name" class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" id="scientificName" type="text" placeholder="Scientific Name" required>
        </div>
        <div>
          <label class="block text-black text-sm font-bold mb-2" for="description">Description</label>
          <textarea v-model="formData.description" class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Description" required></textarea>
        </div>
        <div>
          <label class="block text-black text-sm font-bold mb-2" for="category">Category</label>
          <select v-model="formData.category" class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" id="category" required>
            <option value="">Select category</option>
            <option value="brackish">Brackish</option>
            <option value="freshwater">Freshwater</option>
            <option value="marine">Marine</option>
          </select>
        </div>
        <div>
            <label class="block text-black text-sm font-bold mb-2">Vernacular Names</label>
            <div v-for="(name, index) in vernacularNames" :key="index" class="flex space-x-2 mb-2">
              <input
                v-model="name.place"
                class="shadow appearance-none border rounded w-1/2 py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Place"
                required
              >
              <input
                v-model="name.name"
                class="shadow appearance-none border rounded w-1/2 py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Name"
                required
              >
              <button
                @click="removeVernacularName(index)"
                type="button"
                class="bg-red-500 text-white px-2 rounded hover:bg-red-600"
              >
                ×
              </button>
            </div>
            <button
              @click="addVernacularName"
              type="button"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            >
              Add Vernacular Name
            </button>
          </div>
          
        <div>
          <label class="block text-black text-sm font-bold mb-2" for="moreInfo">More Info</label>
          <input v-model="formData.more_info" class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" id="moreInfo" type="url" placeholder="https://example.com" required>
        </div>
        <div>
          <label class="block text-black text-sm font-bold mb-2" for="image">Image</label>
          <input @change="handleFileUpload($event, 'image')" class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" id="image" type="file" accept="image/*" required>
        </div>
        <div>
          <label class="block text-black text-sm font-bold mb-2" for="diagram">Diagram</label>
          <input @change="handleFileUpload($event, 'diagram')" class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" id="diagram" type="file" accept="image/*" required>
        </div>
        <div class="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <button @click="closeModal" class="bg-gray-200 hover:bg-red hover:text-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto" type="button">
            Cancel
          </button>
          <button class="bg-btn hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto" type="submit">
            {{ editIndex === null ? 'Submit' : 'Update' }}
          </button>
        </div>
      </form>
    </div>
  </div>
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
      vernacularNames: [{ place: '', name: '' }],
      formData: {
        common_name: "",
        scientific_name: "",
        description: "",
        category: "",
        more_info: "",
        images: [{ image: null, diagram: null }]
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
        Object.entries(entry.vernacularNames).some(([place, name]) => 
          place.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
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
          let vernacularNames = {};
          
          console.log("Raw vernacular names:", item.vernacular_names[0]);

          try {
            const cleanedJsonString = item.vernacular_names[0].replace(/,\s*$/, "");
            vernacularNames = JSON.parse(cleanedJsonString);
          } catch (error) {
            console.error("Error parsing vernacular names:", error);
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
      this.vernacularNames.push({ place: '', name: '' });
    },
    removeVernacularName(index) {
      if (this.vernacularNames.length > 1) {
        this.vernacularNames.splice(index, 1);
      }
    },
    closeModal() {
      this.showModal = false;
      this.resetForm();
    },
    resetForm() {
      this.formData = {
        common_name: "",
        scientific_name: "",
        description: "",
        category: "",
        more_info: "",
        images: [{ image: null, diagram: null }]
      };
      this.vernacularNames = [{ place: '', name: '' }];
      this.editIndex = null;
    },
    handleFileUpload(event, type) {
      const file = event.target.files[0];
      this.formData.images[0][type] = file;
    },
    async submitForm() {
      try {
        const formData = new FormData();
        
        // Add regular form fields
        for (const key in this.formData) {
          if (key === 'images') {
            if (this.formData.images[0].image) {
              formData.append('image', this.formData.images[0].image);
            }
            if (this.formData.images[0].diagram) {
              formData.append('diagram', this.formData.images[0].diagram);
            }
          } else {
            formData.append(key, this.formData[key]);
          }
        }
        
        // Handle vernacular names
        const vernacularNamesObject = {};
        this.vernacularNames.forEach(({ place, name }) => {
          if (place && name) {
            vernacularNamesObject[place] = name;
          }
        });
        formData.append('vernacular_names', JSON.stringify(vernacularNamesObject));

        if (this.editIndex === null) {
          await additem(formData);
        } else {
          const entryToUpdate = this.entries[this.editIndex];
          await edititem(entryToUpdate.item_id, formData);
        }
        await this.getitem(); // Refresh the list after adding or updating
        this.closeModal();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    editEntry(index) {
      this.editIndex = index;
      const entry = this.entries[index];
      this.formData = {
        common_name: entry.commonName,
        scientific_name: entry.scientificName,
        description: entry.description,
        more_info: entry.externalLink,
        category: entry.category,
        images: [{ image: null, diagram: null }]
      };
      
      // Convert vernacular names object to array of place-name pairs
      this.vernacularNames = Object.entries(entry.vernacularNames).map(([place, name]) => ({
        place,
        name
      }));
      
      // Ensure there's at least one empty vernacular name field
      if (this.vernacularNames.length === 0) {
        this.vernacularNames.push({ place: '', name: '' });
      }
      
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