<template>
  <div class="h-screen flex flex-col md:flex-row">
    <!-- Side Section -->
    <div
      class="bg-btn text-white md:w-1/3 md:flex-1 flex items-center justify-center"
    >
      <div>
        <h2 class="pt-5 text-3xl md:text-4xl font-bold mb-4 text-center">
          Welcome
        </h2>
        <p class="pb-5 text-lg md:text-xl text-center">
          Login before you go inside!
        </p>
      </div>
    </div>

    <!-- Content Section -->
    <div class="mt-10 flex justify-center items-center md:w-1/3 md:flex-1">
      <div class="w-full max-w-md px-4">
        <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
        <form
          @submit.prevent="handleLogin"
          class="shadow-md rounded px-4 pt-6 pb-8"
        >
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="email">
              Email Address
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email address"
              v-model="email"
              required
            />
          </div>
          <div class="mb-4 relative">
            <label class="block text-gray-700 font-bold mb-2" for="password">
              Password
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              placeholder="Enter your password"
              v-model="password"
              required
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 mt-8 mr-4 text-gray-500 hover:text-gray-700 focus:outline-none"
              @click="togglePasswordVisibility"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  v-if="showPassword"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  v-else
                  d="M13.42 12.943a6.5 6.5 0 111.414-1.414L20 18l-2.362 2.362A10.5 10.5 0 012 12a10.5 10.5 0 0116.162-8.948l1.82-1.82a2 2 0 012.828 2.828l-1.82 1.82A10.5 10.5 0 0122 12a10.5 10.5 0 01-8.58 10.293L13.42 12.943z"
                />
              </svg>
            </button>
          </div>
          <p v-if="wrongPassword" class="text-center text-red-500 text-sm">
            The password is wrong
          </p>
          <p v-if="HaveID" class="text-center text-red-500 text-sm">
            There is something wrong in your input!
          </p>
          <div class="flex items-center justify-between">
            <button
              @click="userLog"
              class="bg-btn hover:bg-primary2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
              :disabled="isLoading"
            >
              <span v-if="!isLoading">Login</span>
              <span v-else class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { userLogin } from "@/API/index.js";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      HaveID: false,
      wrongPassword: false,
      isLoading: false,
    };
  },
  methods: {
    handleLogin() {
      // Handle login logic here
      console.log("Email:", this.email);
      console.log("Password:", this.password);
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
      const passwordInput = document.getElementById("password");
      passwordInput.type = this.showPassword ? "text" : "password";
    },
    signupPage() {
      this.$router.push({
        path: "/signup",
      });
    },
    async userLog() {
      this.isLoading = true;
      let user = {
        email: this.email,
        password: this.password,
      };

      try {
        let response = await userLogin(user);
        console.log(response);

        if (response.status == 200) {
          // Set expiration date to 24 hours from now
          let expiryDate = new Date();
          expiryDate.setTime(expiryDate.getTime() + 24 * 60 * 60 * 1000);

          // Set the cookie with expiration
          document.cookie = `token=${
            response.token
          }; expires=${expiryDate.toUTCString()}; path=/`;

          window.location.href = "/";
        } else if (response.response.status === 401) {
          this.wrongPassword = true;
          console.log("401 - wrong pass");
        } else {
          console.log("error");
          this.HaveID = true;
        }
      } catch (error) {
        console.error("Login error:", error);
        // Handle any network or unexpected errors here
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  .flex-col {
    flex-direction: column;
    padding-top: 200px;
  }
}
</style>