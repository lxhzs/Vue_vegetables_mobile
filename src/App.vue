<template>
    <div id="app">
        <!-- <img src="./assets/logo.png"> -->
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'app',
    mounted () {
    	if(!document.getElementById('loading')) return;
    	document.getElementById('loading').style.display = 'none'
    }
}
</script>
<style lang="less">
	@import './assets/common.less';
</style>