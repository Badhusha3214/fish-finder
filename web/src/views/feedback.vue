<template>
    <DashboardLayout>
      <div class="min-h-screen">
        <div class="container mx-auto p-6">
          <h1 class="text-3xl font-bold mb-6 text-white">User Feedback</h1>
          <!-- <div class="mb-4 flex justify-between items-center">
            <input v-model="searchTerm" type="text" placeholder="Search..." class="p-2 px-5 border rounded">
            <button @click="showModal = true" class="bg-blue-500 text-white px-5 py-3 rounded-full hover:bg-blue-600 transition">+</button>
          </div> -->
          <div class="overflow-x-auto rounded">
            <table class="w-full bg-white shadow-md rounded">
              <thead>
                <tr class="bg-gray-700 text-white uppercase text-sm leading-normal">
                  <th class="py-3 px-6 text-left">User</th>
                  <th class="py-3 px-6 text-left">Feedback</th>
                  <th class="py-3 px-6 text-center">Rating</th>
                  <th class="py-3 px-6 text-center">Date</th>
                  <th class="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody class="text-white bg-gray-800 text-sm font-light">
                <tr v-for="(feedback, index) in filteredFeedback" :key="index" class="border-b border-gray-900 hover:bg-gray-600">
                  <td class="py-3 px-6 text-left">{{ feedback.user }}</td>
                  <td class="py-3 px-6 text-left">{{ feedback.comment }}</td>
                  <td class="py-3 px-6 text-center">
                    <div class="flex items-center justify-center">
                      <span v-for="n in 5" :key="n" class="text-yellow-500">
                        {{ n <= feedback.rating ? '★' : '☆' }}
                      </span>
                    </div>
                  </td>
                  <td class="py-3 px-6 text-center">{{ feedback.date }}</td>
                  <td class="py-3 px-6 text-center">
                    <div class="flex item-center justify-center">
                      <button @click="editFeedback(index)" class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button @click="deleteFeedback(index)" class="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
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
            <h3 class="text-lg font-bold mb-4 text-blue-800">{{ editIndex === null ? 'Add New Feedback' : 'Edit Feedback' }}</h3>
            <form @submit.prevent="submitForm">
              <div class="mb-4">
                <label class="block text-blue-700 text-sm font-bold mb-2" for="user">
                  User
                </label>
                <input v-model="formData.user" class="shadow appearance-none border rounded w-full py-2 px-3 text-blue-700 leading-tight focus:outline-none focus:shadow-outline" id="user" type="text" placeholder="User name" required>
              </div>
              <div class="mb-4">
                <label class="block text-blue-700 text-sm font-bold mb-2" for="comment">
                  Feedback
                </label>
                <textarea v-model="formData.comment" class="shadow appearance-none border rounded w-full py-2 px-3 text-blue-700 leading-tight focus:outline-none focus:shadow-outline" id="comment" placeholder="User feedback" required></textarea>
              </div>
              <div class="mb-4">
                <label class="block text-blue-700 text-sm font-bold mb-2" for="rating">
                  Rating
                </label>
                <select v-model="formData.rating" class="shadow appearance-none border rounded w-full py-2 px-3 text-blue-700 leading-tight focus:outline-none focus:shadow-outline" id="rating" required>
                  <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
                </select>
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
    name: 'Feedback',
    components: {
      DashboardLayout,
    },
    data() {
      return {
        feedbackList: [
          {
            user: "John Doe",
            comment: "Great service! Very helpful.",
            rating: 5,
            date: "2023-08-29"
          },
          {
            user: "Jane Smith",
            comment: "Good experience overall, but could improve response time.",
            rating: 4,
            date: "2023-08-28"
          },
          {
            user: "Bob Johnson",
            comment: "Average service. Nothing special.",
            rating: 3,
            date: "2023-08-27"
          }
        ],
        showModal: false,
        formData: {
          user: "",
          comment: "",
          rating: 5,
          date: ""
        },
        editIndex: null,
        searchTerm: ""
      };
    },
    computed: {
      filteredFeedback() {
        return this.feedbackList.filter(feedback =>
          feedback.user.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          feedback.comment.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
    },
    methods: {
      closeModal() {
        this.showModal = false;
        this.resetForm();
      },
      resetForm() {
        this.formData = {
          user: "",
          comment: "",
          rating: 5,
          date: ""
        };
        this.editIndex = null;
      },
      submitForm() {
        const currentDate = new Date().toISOString().split('T')[0];
        if (this.editIndex === null) {
          this.feedbackList.push({ ...this.formData, date: currentDate });
        } else {
          this.feedbackList[this.editIndex] = { ...this.formData, date: currentDate };
        }
        this.closeModal();
      },
      editFeedback(index) {
        this.editIndex = index;
        this.formData = { ...this.feedbackList[index] };
        this.showModal = true;
      },
      deleteFeedback(index) {
        if (confirm("Are you sure you want to delete this feedback?")) {
          this.feedbackList.splice(index, 1);
        }
      }
    }
  };
  </script>