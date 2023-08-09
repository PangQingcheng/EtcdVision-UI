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
    },
	getters: {
		keyTree(state) {
			const tree = []
			for(var key of state.keys){
				tree.push({
					id: key,
					label: key,
				})
			}
			return tree
		}
	}
})
