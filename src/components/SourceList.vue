
<template>
  <div class="source-list">
	<n-button class="newbtn"  @click="newSourceDialog = true" dashed>
		+ 添加数据源
	</n-button>

	<n-list hoverable clickable>
		<n-list-item v-for="item in store.sources" 
			:class="{'source-list-item':true}" >
			<n-tooltip placement="right-center" trigger="hover">
				<template #trigger>
					<n-thing content-style="margin-top: 10px;" >
						<template #header>{{ item.name }}</template>
						<!-- 图标 -->
						<template #avatar>
							<n-icon v-if="item.active" size="30" color="#0e7a0d" :component="DatabaseTwotone" />
							<n-icon v-else size="30" :component="DatabaseOutlined" />
						</template>
						<!-- 连接状态 -->
						<template #header-extra>
							<n-tag v-if="item.active" round :bordered="false" type="success" size='small'>
							  <template  #icon>
								<n-icon :component="CheckmarkCircle" />已连接
							  </template>
							</n-tag>
						</template>
						<!-- 操作按钮 -->
						<n-space size="small" style="margin-top: 4px">
							<n-button 
								type="primary" 
								@click="connect(item.name)" 
								:disabled="item.active"
								size='small' secondary >
								连接
							</n-button>
							<n-popconfirm @positive-click="remove(item.name)" positive-text="确认" negative-text="取消">
								<template #trigger>
									<n-button type="error" size='small' secondary >删除</n-button>
								</template>
								确认删除数据源{{ item.name }}？
							</n-popconfirm>
						</n-space>
						
					</n-thing>
				</template>
				地址：
				<div v-for="endpoint in item.endpoints" :key="endpoint">
				  {{ endpoint }}
				</div>
			</n-tooltip>
		</n-list-item>
	</n-list>
  </div>
  
	<n-drawer v-model:show="newSourceDialog" :width="502" placement="left">
		<n-drawer-content title="添加ETCD数据源">
			<n-form :model="newSourceForm" 
					:rules="rules"
					label-placement="left"
					label-width="auto"
					require-mark-placement="right-hanging">
				<n-form-item label="名称" path="name">
					<n-input v-model:value="newSourceForm.name" placeholder="请输入..." />
				</n-form-item>
				<n-form-item label="地址" path="endpoints">
					<n-dynamic-input
					    v-model:value="newSourceForm.endpoints"
					    placeholder="http://127.0.0.1:2379" :min="1"/>
				</n-form-item>
				<div style="display: flex; justify-content: flex-end">
					<n-button round type="primary" @click="newSource();newSourceDialog = false;">
						添加
					</n-button>
				</div>
			</n-form>
		</n-drawer-content>
	</n-drawer>
</template>


<script setup>
	import { DatabaseTwotone, DatabaseOutlined } from '@vicons/antd'
	import { CheckmarkCircle } from '@vicons/ionicons5'
	
	import { ref, reactive, onMounted } from 'vue'
	import axios from 'axios'
	import { keyStore } from '@/store/keys'
	
	import { CREATE_DATASOURCE, DATASOURCE_LIST, ETCD_CONNECT, ETCD_KEYS_LIST, REMOVE_DATASOURCE } from '@/api/etcd-backend.js'
	
	const store = keyStore()
	//const list = ref([]);
	const  fetchData = async () => {
		store.sources = await DATASOURCE_LIST()
		//list.value = await DATASOURCE_LIST()
	}
	// 生命周期钩子
	onMounted(fetchData)
	
	const connect = (name) => {
		store.currentSource = name
		ETCD_CONNECT(name).then(async ()=>{
			store.currentKeys = await ETCD_KEYS_LIST(name)
			for(var item of store.sources){
				if (item.name == name){
					item.active = true
				}else{
					item.active = false
				}
			}
		})
	}
	
	const remove = async (name) => {
		await REMOVE_DATASOURCE(name)
		store.removeSource(name)
	}
	
	const newSourceDialog = ref(false)
	const newSourceForm = reactive({
		name: '',
		endpoints: [""],
	})
	const rules = reactive({
		name: [
			{
				required: true,
			},
		]
	})
	const newSource = async ()=>{
		await CREATE_DATASOURCE(newSourceForm.name, newSourceForm.endpoints)
		const store = keyStore()
		if (store.sources == null){
			store.sources = []
		}
		store.sources.push({
			name: newSourceForm.name,
			endpoints: newSourceForm.endpoints
		})
		newSourceForm.name = ''
		newSourceForm.endpoints = ['']
	}
</script>

<style  scoped>
	
	.source-list{
		border: 1px solid var(--el-border-color);
		width: 210px;
		min-height: 600px;
		padding: 10px;
		
	}
	
	.newbtn{
		  padding: 1.5em;
		  width: 100%;
	}
	
	.source-list-item{
		overflow: hidden;
		margin-top: 10px;
	}
	
	.active{
		background: #cceada
	}
	.active:hover{
		background: #bee5d0 !important
	}
	
</style>