import { defineStore } from 'pinia'
import { ConfiguredFelhasznlApi } from '@/api-client/configured-api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    apiKey: sessionStorage.getItem('apikulcs') || null,
    user: null as any
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        // Use temporary unconfigured API for login
        const tempApi = new ConfiguredFelhasznlApi() 
        const response = await tempApi.loginUser({
          loginUserRequest: { email, jelszo: password }
        })
        
        if (response.apikulcs) {
          this.apiKey = response.apikulcs
          sessionStorage.setItem('apikulcs', this.apiKey)
          await this.fetchUser()
          return true
        }
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },
    
    async fetchUser() {
      if (!this.apiKey) return
      
      try {
        // Use configured API with stored key
        const api = new ConfiguredFelhasznlApi()
        this.user = await api.getCurrentUser()
        const response = await api.getCurrentUser()
        console.log('Fetched user response:', response)
      } catch (error) {
        this.logout()
      }
    },
    
    logout() {
      sessionStorage.removeItem('apikulcs')
      this.apiKey = null
      this.user = null
    }
  }
})
