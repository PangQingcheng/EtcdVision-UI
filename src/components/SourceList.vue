
<template>
  <div class="common-layout">
	<el-container>
	  <el-header>
		<el-button :icon="Refresh" circle />
		<el-button type="primary" :icon="Plus" circle />
	  </el-header>
	  <el-main>
		  <div v-for="item in list" :key="item" class="text item">
			{{ item.name }}
			<el-button type="primary" text @click="connect(item.name)">连接</el-button>
		  </div>
	  </el-main>
	</el-container>
  </div>
</template>


<script setup>
	import { ref, onMounted } from 'vue'
	import {Refresh, Plus} from '@element-plus/icons-vue'
	import axios from 'axios'
	import { keyStore } from '../store/keys'
	
	const list = ref([]);
	const fetchData = () => {
		axios.get('/api/v1/etcds').then(response => {
			// 将接口返回的数据赋值给列表
			list.value = response.data.data;
        }).catch(error => {
          console.error('接口请求失败', error);
        });
	}
	// 生命周期钩子
	onMounted(fetchData)
	
	const store = keyStore()
	
	const connect = (name) => {
		store.currentSource = name
		axios.post('/api/v1/etcds/' + name + '/connect').then(response => {
			console.log(name)
			// 将接口返回的数据赋值给列表
			if (response.data.code == 200){
				alert(name + "已连接！")
				// list keys
				axios.get('/api/v1/etcds/' + name + '/keys', {
					params: {
					  prefix: ''
					}
				}).then(response => {
					store.keys = response.data.data
				})
			}
		}).catch(error => {
		  console.error('接口请求失败', error);
		});
	}
</script>

<style>
</style>