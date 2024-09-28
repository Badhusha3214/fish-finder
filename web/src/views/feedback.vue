<template>
  <DashboardLayout>
    <div class="min-h-screen">
      <div class="container mx-auto p-4 sm:p-6">
        <h1 class="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-btn">User Feedback</h1>
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert">
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline"> {{ error }}</span>
        </div>
        <!-- <div class="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <input v-model="searchTerm" type="text" placeholder="Search..." class="p-2 px-4 border rounded mb-2 sm:mb-0 w-full sm:w-auto">
          <button @click="showModal = true" class="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition w-full sm:w-auto">Add Feedback</button>
        </div> -->
        <div v-if="isLoading" class="text-white text-center">Loading...</div>
        <div v-else-if="feedbackList.length === 0" class="text-btn text-center">No feedback available.</div>
        <div v-else class="overflow-x-auto rounded">
          <table class="w-full bg-white shadow-md rounded">
            <thead>
              <tr class="bg-btn text-white uppercase text-sm leading-normal">
                <th class="py-3 px-4 text-left">User</th>
                <th class="py-3 px-4 text-left">Email</th>
                <th class="py-3 px-4 text-left hidden sm:table-cell">Feedback</th>
                <th class="py-3 px-4 text-center">Status</th>
                <th class="py-3 px-4 text-center hidden sm:table-cell">Date</th>
                <th class="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody class="text-black bg-btn bg-opacity-10 text-sm font-light">
              <tr v-for="(feedback, index) in filteredFeedback" :key="feedback.suggestion_id"
                class="border-b border-gray-900 hover:bg-btn hover:bg-opacity-30">
                <td class="py-3 px-4 text-left">{{ feedback.author }}</td>
                <td class="py-3 px-4 text-left">{{ feedback.email }}</td>
                <td class="py-3 px-4 text-left hidden sm:table-cell">{{ feedback.message }}</td>
                <td class="py-3 px-4 text-center">{{ feedback.status }}</td>
                <td class="py-3 px-4 text-center hidden sm:table-cell">{{ formatDate(feedback.created_at) }}</td>
                <td class="py-3 px-4 text-center">
                <td class="py-3 px-4 text-center">
                  <div class="flex item-center justify-center">
                    <button @click="markAsRead(feedback.suggestion_id)" class="w-4 mr-2 transform hover:scale-110"
                      :disabled="feedback.status === 'done'">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        :class="{ 'text-green-500': feedback.status === 'done', 'hover:text-blue-500': feedback.status !== 'done' }">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    <button @click="deleteFeedback(feedback.suggestion_id)"
                      class="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal for adding feedback -->
      <div v-if="showModal" class="fixed inset-0 bg-blue-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div class="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
          <h3 class="text-lg font-bold mb-4 text-blue-800">Add New Feedback</h3>
          <form @submit.prevent="submitForm">
            <div class="mb-4">
              <label class="block text-blue-700 text-sm font-bold mb-2" for="author">
                User
              </label>
              <input v-model="formData.author"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-blue-700 leading-tight focus:outline-none focus:shadow-outline"
                id="author" type="text" placeholder="User name" required>
            </div>
            <div class="mb-4">
              <label class="block text-blue-700 text-sm font-bold mb-2" for="message">
                Feedback
              </label>
              <textarea v-model="formData.message"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-blue-700 leading-tight focus:outline-none focus:shadow-outline"
                id="message" placeholder="User feedback" required></textarea>
            </div>
            <div class="flex flex-col sm:flex-row items-center justify-between">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto mb-2 sm:mb-0"
                type="submit">
                Submit
              </button>
              <button @click="closeModal"
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
                type="button">
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
import { getsuggestions, marksuggestions, deletesuggestions } from '@/API/index'

export default {
  name: 'Feedback',
  components: {
    DashboardLayout,
  },
  data() {
    return {
      feedbackList: [],
      showModal: false,
      formData: {
        author: "",
        message: "",
        status: "",
        created_at: ""
      },
      searchTerm: "",
      meta: {},
      error: null,
      isLoading: true
    };
  },
  computed: {
    filteredFeedback() {
      return this.feedbackList.filter(feedback =>
        feedback.author.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        feedback.message.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  },
  mounted() {
    this.checkAuth();
  },  
  methods: {
    checkAuth() {
      if (!document.cookie.includes('token')) {
        this.$router.push('/');
      } else {
        this.fetchSuggestions();
      }
    },
    async fetchSuggestions() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await getsuggestions();
        console.log('API Response:', response);

        if (response.status === 200 && response.data && response.data.data && Array.isArray(response.data.data.suggestions)) {
          this.feedbackList = response.data.data.suggestions;
          this.meta = response.data.meta || {};
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        this.error = 'Failed to fetch feedback. Please try again later.';
        this.feedbackList = [];
      } finally {
        this.isLoading = false;
      }
    },
    closeModal() {
      this.showModal = false;
      this.resetForm();
    },
    resetForm() {
      this.formData = {
        author: "",
        message: "",
        status: "pending",
        created_at: ""
      };
    },
    async submitForm() {
      // In a real application, you would make an API call to add the feedback
      // For now, we'll just add it to the local list
      const currentDate = new Date().toISOString();
      this.feedbackList.push({ ...this.formData, created_at: currentDate, _id: Date.now().toString() });
      this.closeModal();
    },
    async markAsRead(suggestionId) {
      try {
        // console.log('Marking suggestion as read:', suggestionId);
        const status = "done"
        const response = await marksuggestions({ suggestionId, status });
        console.log('Mark as read response:', response);

        if (response && response.status === 200) {
          // Update the local state  
          const index = this.feedbackList.findIndex(f => f._id === suggestionId);
          if (index !== -1) {
            this.feedbackList[index].status = "done";
          }
          console.log('Suggestion marked as read successfully');
        } else {
          throw new Error('Unexpected response from server');
        }
      } catch (error) {
        console.error('Error marking suggestion as read:', error);
        this.error = `Failed to mark suggestion as read: ${error.message}`;
      }
    },
    async deleteFeedback(suggestionId) {
      if (confirm("Are you sure you want to delete this feedback?")) {
        try {
          console.log('Deleting suggestion:', suggestionId);
          const response = await deletesuggestions({ suggestionId });
          console.log('Delete suggestion response:', response);

          if (response && response.status === 200) {
            // Remove the feedback from the local state
            this.feedbackList = this.feedbackList.filter(f => f._id !== suggestionId);
            console.log('Suggestion deleted successfully');
            await this.getsuggestions
          } else {
            throw new Error('Unexpected response from server');
          }
        } catch (error) {
          console.error('Error deleting suggestion:', error);
          this.error = `Failed to delete feedback: ${error.message}`;
        }
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
  }
};
</script>