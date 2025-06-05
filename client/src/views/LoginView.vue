<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label>Email:</label>
        <input
          v-model="email"
          type="email"
          required
          autocomplete="username"
        />
      </div>
      
      <div class="form-group">
        <label>Password:</label>
        <input
          v-model="password"
          type="password"
          required
          autocomplete="current-password"
        />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>
      
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const handleLogin = async () => {
  try {
    loading.value = true
    error.value = ''
    
    if (await authStore.login(email.value, password.value)) {
      router.push('/')
    }
  } catch (err) {
    error.value = 'Invalid email or password'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error-message {
  color: #dc3545;
  margin-top: 1rem;
}
</style>
