<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div >
    <el-container class="">
      <el-header>
		  EtcdVision
		  <div class="header-btn">
			<el-button type="primary"  @click="newSourceDialog = true">数据源管理</el-button>
		  </div>
	  </el-header>
      <el-container>
        <el-aside width="250px">
			<SourceList></SourceList>
		</el-aside>
        <el-container>
          <el-main>
			    <div class="common-layout">
			      <el-container>
			        <el-aside width="500px">
						<KeyList></KeyList>
					</el-aside>
			        <el-main>
						<Value></Value>
					</el-main>
			      </el-container>
			    </div>
		  </el-main>
          <el-footer></el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
  
    <el-dialog v-model="newSourceDialog" title="添加ETCD数据源" width="30%" center>
		<el-form :model="newSourceForm" label-width="120px">
			<el-form-item label="名称">
				<el-input v-model="newSourceForm.name" />
			</el-form-item>
			<el-form-item label="Endpoints">
				<el-input v-for="(endpoint,index) in newSourceForm.endpoints" v-model="newSourceForm.endpoints[index]">
					<template #append>
						<el-button @click="newSourceForm.endpoints.splice(index, 1);" :icon="CloseBold" />
					</template>
				</el-input>
				<el-button @click="newSourceForm.endpoints.push('')">+</el-button>
			</el-form-item>
		</el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="newSourceDialog = false">取消</el-button>
          <el-button type="primary" @click="newSource();newSourceDialog = false;">
            创建
          </el-button>
        </span>
      </template>
    </el-dialog>
</template>

<script>
	import { CloseBold } from '@element-plus/icons-vue'
	
	import SourceList from './components/SourceList.vue'
	import KeyList from './components/KeyList.vue'
	import Value from './components/Value.vue'
	
	import { ref } from 'vue'
	import { reactive } from 'vue'
	
	import { CREATE_DATASOURCE } from '@/api/etcd-backend.js'
	
	import { keyStore } from '@/store/keys'
	
	
	const newSourceDialog = ref(false)
	const newSourceForm = reactive({
		name: '',
		endpoints: ["1","2"],
	})
	const newSource = async ()=>{
		await CREATE_DATASOURCE(newSourceForm.name, newSourceForm.endpoints)
		const store = keyStore()
		store.sources.push({
			name: newSourceForm.name,
			endpoints: newSourceForm.endpoints
		})
	}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.header-btn{
	float: right;
}
.el-main{
	padding-top: 0px;
}
</style>
