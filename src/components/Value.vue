<template>
	<textarea  v-model="store.currentValue"></textarea>
	<el-button @click="setValue">提交</el-button>
</template>

<script setup>
	import axios from 'axios'
	import { keyStore } from '../store/keys'
	const store = keyStore()
	
	function setValue(){
		axios.post('/api/v1/etcds/' + store.currentSource + '/value', {
			key: store.currentKey,
			value: store.currentValue
		}).then(response => {
			store.currentValue = response.data.data.value
		})
	}
</script>

<style>
</style>