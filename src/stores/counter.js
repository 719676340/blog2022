import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  state: () => ({
    user:localStorage.getItem('user') || '',
    token:localStorage.getItem('token') || null
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment() {
      this.counter++
    }
  }
})
