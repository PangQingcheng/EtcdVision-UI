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
	actions:{
		removeSource(name){
			for (var index in this.sources){
				if(this.sources[index].name == name){
					this.sources.splice(index,1)
					break
				}
			}
			if (this.currentSource == name) {
				this.currentSource= ""
				this.currentKey = ""
				this.currentValue = ''
				this.currentKeys = []
			}
		}
	}
})
