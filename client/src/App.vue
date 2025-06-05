<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import Navbar from '@/components/Navbar.vue'

const authStore = useAuthStore()
</script>

<template>
  <div class="h-screen flex flex-col">
    <!-- Show navbar only if authenticated -->
    <Navbar v-if="authStore.user" :user="authStore.user" />
    <!-- Main content: router-view handles HomeView or LoginView -->
    <div class="flex-1 relative mt-[60px]">
      <router-view />
    </div>
  </div>
</template>
