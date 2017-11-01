<template>
	<div v-html="data" class="col-sm-8">
		<!-- {{data}} -->
	</div>
</template>
<script>
	export default{
		props:["data"]
	}
</script>