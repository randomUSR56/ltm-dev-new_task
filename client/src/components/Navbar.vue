<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const router = useRouter()

// Define navigation items
const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  // Add more items as needed
]

// Emits for nav-item-selected (keep your existing emit if needed)
const emit = defineEmits(['nav-item-selected'])

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <nav class="fixed top-0 w-full bg-white p-4 shadow-md z-50 flex items-center">
    <div class="font-bold mr-8">GeoApp</div>
    <div class="flex gap-4">
      <button 
        v-for="item in navItems" 
        :key="item.id"
        @click="emit('nav-item-selected', item.id)"
        class="px-4 py-2 bg-transparent border-none cursor-pointer hover:bg-gray-100 rounded-md transition-colors"
      >
        {{ item.label }}
      </button>
    </div>
    <div class="ml-auto font-semibold flex items-center" v-if="user && user.nev">
      Üdv, {{ user.nev }}!
      <button
        @click="handleLogout"
        class="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  </nav>
</template>
