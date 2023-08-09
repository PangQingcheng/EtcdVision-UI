<template>
	<el-text class="mx-1" size="large">{{store.currentKey}}</el-text>
	<br />
	 <codemirror
		v-model="store.currentValue"
		placeholder="Code gose here..."
		:style="{ height: '600px' }"
		:autofocus="true"
		:indent-with-tab="true"
		:tabSize="2"
		:extensions="extensions"
	  />
	<br />
	<el-button @click="setValue">提交</el-button>
</template>

<script setup>
	import { Codemirror } from "vue-codemirror"
	import { json } from "@codemirror/lang-json"
	import { oneDark } from "@codemirror/theme-one-dark"
	import axios from 'axios'
	import { keyStore } from '@/store/keys'
	import { WRITE_ETCD_VALUE } from '@/api/etcd-backend.js'
	
	const store = keyStore()
	
	const setValue = async() => {
		const cdata = await WRITE_ETCD_VALUE(store.currentSource, store.currentKey, store.currentValue)
		store.currentValue = cdata.value
	}
	
	const extensions = [json(), oneDark];
	const log = console.log
</script>

<style>
</style>