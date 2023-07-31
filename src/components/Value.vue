<template>
	 <codemirror
		v-model="store.currentValue"
		placeholder="Code gose here..."
		:style="{ height: '400px' }"
		:autofocus="true"
		:indent-with-tab="true"
		:tabSize="2"
		:extensions="extensions"
		@ready="log('ready', $event)"
		@change="log('change', $event)"
		@focus="log('focus', $event)"
		@blur="log('blur', $event)"
	  />
	<br />
	<el-button @click="setValue">提交</el-button>
</template>

<script setup>
	import { Codemirror } from "vue-codemirror";
	import { json } from "@codemirror/lang-json";
	import { oneDark } from "@codemirror/theme-one-dark";

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
	
	const extensions = [json(), oneDark];
	const log = console.log
</script>

<style>
</style>