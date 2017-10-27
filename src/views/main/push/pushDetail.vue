<template>
	<div v-html="data">
		<!-- {{data}} -->
	</div>
</template>
<script>
	export default{
		props:["data"]
	}
</script>