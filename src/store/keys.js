import { defineStore } from 'pinia'

export const keyStore = defineStore({
	id:'keys',
    state: () => {
      return {
		currentSource: '',
		currentKey: '',
		currentValue: '',
		keys: []
      }
    }
})
