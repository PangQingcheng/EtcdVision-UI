import { defineStore } from 'pinia'

export const keyStore = defineStore({
	id:'keys',
    state: () => {
      return {
		currentSource: '',
		currentKey: '',
		currentValue: '',
		currentKeys: [],
		sources:[]
      }
    },
	getters: {
		keyTree(state) {
			const tree = []
			for(var key of state.currentKeys){
				tree.push({
					id: key,
					label: key,
				})
			}
			return tree
		}
	},
})
