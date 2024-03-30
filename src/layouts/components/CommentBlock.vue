<template>
	<div class="comments" id="comments">
		<Giscus
			repo="Woorg/igorlov-comments"
			repo-id="R_kgDOK7XIpw"
			category="Announcements"
			category-id="DIC_kwDOK7XIp84Cb64F"
			mapping="pathname"
			strict="0"
			reactions-enabled="1"
			emit-metadata="0"
			input-position="bottom"
			lang="ru"
			theme="preferred_color_scheme"
		></Giscus>
	</div>
</template>

<script setup>
import Giscus from '@giscus/vue';
</script>

<style scoped>
.comments {
	@apply m-auto mt-5 max-w-2xl text-dark dark:text-dark;
}
.giscus-frame {
	@apply w-full bg-box text-dark dark:bg-box-dark;
}
</style>
