<template>
	  <el-input
	    v-model="query"
	    placeholder="Please enter keyword"
	    @input="onQueryChanged"
	  />
	  <el-tree-v2
	    ref="treeRef"
	    :data="store.keyTree"
	    :props="props"
	    :filter-method="filterMethod"
	    :height="208"
		@node-click="getValue"
	  />
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import axios from 'axios'
	import { keyStore } from '@/store/keys'
	import { ElTreeV2 } from 'element-plus'
	import type { TreeNode } from 'element-plus/es/components/tree-v2/src/types'
	
	import { READ_ETCD_VALUE } from '@/api/etcd-backend.js'
	
	const query = ref('')
	const treeRef = ref<InstanceType<typeof ElTreeV2>>()
	const store = keyStore()
	const props = {
	  value: 'id',
	  label: 'label',
	  children: 'children',
	}
	
	
	const getValue = async(data) => {
		store.currentKey = data.id
		const name = store.currentSource
		store.currentValue = await READ_ETCD_VALUE(name, data.id)
	}
	
	const onQueryChanged = (query: string) => {
	  // TODO: fix typing when refactor tree-v2
	  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
	  // @ts-expect-error
	  treeRef.value!.filter(query)
	}
	
	const filterMethod = (query: string, node: TreeNode) => {
	  return node.label!.includes(query)
	}
</script>

<style>
	.key-div{
		
	}
</style>