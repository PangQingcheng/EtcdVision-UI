<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div >
    <el-container class="">
      <el-header>EtcdVision</el-header>
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
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
	import SourceList from './components/SourceList.vue'
	import KeyList from './components/KeyList.vue'
	import Value from './components/Value.vue'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;

}
</style>
