
<template>
  <div class="source-list">
	<el-container>
	  <el-header>
		<div class="header-btn">
			<el-button type="primary"  @click="connect(item.name)">数据源管理</el-button>
		</div>
	  </el-header>
	  <el-main>
		<div v-for="item in list" :key="item" class="source-list-item" :class="{'active':item.active}">
			<strong> {{ item.name }} </strong>
			<div v-for="endpoint in item.endpoints" :key="endpoint" class="source-list-item-body">
			  {{ endpoint }}
			</div>
			<span>
				<el-button color="#626aef" round @click="connect(item.name)">连接</el-button>
			</span>
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
			// 将接口返回的数据赋值给列表
			if (response.data.code == 200){
				//alert(name + "已连接！")
				for (var i = 0; i < list.value.length; i++) {
				  if (list.value[i].name == name){
					  list.value[i].active = true
				  }
				}
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

<style  scoped>
	.header-btn{
		padding-block: 1.5em;
		text-align: right;
	}
	
	.source-list{
		border: 1px solid #464853 ;
		width: 230px;
		min-height: 500px;
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