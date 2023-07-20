<template>
	<div v-for="key in store.keys" :key="key" class="text item">
		<a @click="getValue(store.currentSource,key)">{{ key }}</a>
	</div>
</template>

<script setup>
	import axios from 'axios'
	import { keyStore } from '../store/keys'
	const store = keyStore()
	
	function getValue(name,key){
		store.currentKey = key
		axios.get('/api/v1/etcds/' + name + '/value', {
			params: {
			  key: key
			}
		}).then(response => {
			store.currentValue = response.data.data
		})
	}
</script>

<style>
</style>