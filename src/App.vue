<template>
  <n-layout style="height: 100vh">
    <n-layout-header style="height: 64px; padding: 24px" bordered>
		<n-gradient-text type="info">
		  EtcdVision
		</n-gradient-text>
    </n-layout-header>
    <n-layout position="absolute" style="top: 64px; bottom: 64px" has-sider>
      <n-layout-sider
        content-style="padding: 24px;"
        :native-scrollbar="false"
        bordered
		collapse-mode="width"
		:collapsed-width="20"
		:width="285"
		show-trigger="arrow-circle"
      >
			<SourceList></SourceList>
      </n-layout-sider>
      <n-layout content-style="padding: 24px;" :native-scrollbar="false" has-sider>
		<n-layout-sider content-style="padding: 24px;" bordered>
			<KeyList></KeyList>
		</n-layout-sider>
	   <n-layout>
		   <Value></Value>
	   </n-layout>
      </n-layout>
    </n-layout>
  </n-layout>

</template>

<script setup>
	
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
  
}

.header-btn{
	float: right;
}
.el-main{
	padding-top: 0px;
}

.n-gradient-text {
  font-size: 30px;
}
</style>
