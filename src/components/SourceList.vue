
<template>
  <div class="source-list">
	<div v-for="item in list" :key="item" class="source-list-item" :class="{'active':item.active}">
		<strong> {{ item.name }} </strong>
		<div v-for="endpoint in item.endpoints" :key="endpoint" class="source-list-item-body">
		  {{ endpoint }}
		</div>
		<span>
			<el-button color="#626aef" round @click="connect(item.name)">连接</el-button>
		</span>
	  </div>
  </div>
</template>


<script setup>
	import { ref, onMounted } from 'vue'
	import {Refresh, Plus} from '@element-plus/icons-vue'
	import axios from 'axios'
	import { keyStore } from '@/store/keys'
	
	import { DATASOURCE_LIST, ETCD_CONNECT, ETCD_KEYS_LIST } from '@/api/etcd-backend.js'
	
	const list = ref([]);
	const  fetchData = async () => {
		list.value = await DATASOURCE_LIST()
	}
	// 生命周期钩子
	onMounted(fetchData)
	
	const store = keyStore()
	
	const connect = (name) => {
		store.currentSource = name
		ETCD_CONNECT(name).then(async ()=>{
			store.keys = await ETCD_KEYS_LIST(name)
			for(var item of list.value){
				if (item.name == name){
					item.active = true
				}else{
					item.active = false
				}
			}
		})
	}
</script>

<style  scoped>
	.header-btn{
		padding-block: 1.5em;
		text-align: right;
	}
	
	.source-list{
		border: 1px solid #464853 ;
		width: 210px;
		min-height: 600px;
		padding: 10px;
	}
	
	.source-list-item{
		  --bg: #f7f7f8;
		  --hover-bg: #00b0ff;
		  --hover-text: #E50087;
		  padding: 1.5em;
		  background: var(--bg);
		  border-radius: 5px;
		  position: relative;
		  overflow: hidden;
	}
	
	.source-list-item-body {
	  color: #464853;
	  line-height: 1.5em;
	  font-size: 1em;
	}
	
	.source-list-item > :not(span) {
	  transition: .3s cubic-bezier(.6,.4,0,1);
	}
	
	.source-list-item > strong {
	  display: block;
	  font-size: 1.4rem;
	  letter-spacing: -.035em;
	}
	
	.source-list-item span {
	  position: absolute;
	  inset: 0;
	  width: 100%;
	  height: 100%;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  color: var(--hover-text);
	  border-radius: 5px;
	  font-weight: bold;
	  top: 100%;
	  transition: all .3s cubic-bezier(.6,.4,0,1);
	}
	
	.source-list-item:hover span {
	  top: 0;
	  font-size: 1.2em;
	}
	
	.source-list-item:hover {
	  background: var(--hover-bg);
	}
	
	.source-list-item:hover>div,.source-list-item:hover>strong {
	  opacity: 0.3;
	}
	
	.active{
		background: #009b3a
	}
	
</style>