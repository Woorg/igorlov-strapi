<template>
	<button class="theme-toggle" @click="toggleTheme">
		<template v-if="theme === 'light'">
			<svg
				data-v-f6279e27=""
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
			</svg>
		</template>
		<template v-else>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-sun lucide-icon"
			>
				<circle cx="12" cy="12" r="4"></circle>
				<path d="M12 2v2"></path>
				<path d="M12 20v2"></path>
				<path d="m4.93 4.93 1.41 1.41"></path>
				<path d="m17.66 17.66 1.41 1.41"></path>
				<path d="M2 12h2"></path>
				<path d="M20 12h2"></path>
				<path d="m6.34 17.66-1.41 1.41"></path>
				<path d="m19.07 4.93-1.41 1.41"></path>
			</svg>
		</template>
	</button>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Define a reactive variable for the theme
const theme = ref(getInitialTheme());

// Function to get the initial theme from localStorage or from the browser's preference
function getInitialTheme() {
	if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
		return localStorage.getItem('theme');
	}
	if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
		return 'dark';
	}
	return 'light';
}

// Function to toggle the theme
function toggleTheme() {
	const newTheme = theme.value === 'light' ? 'dark' : 'light';
	applyTheme(newTheme);
}

// Function to apply the theme
function applyTheme(newTheme) {
	theme.value = newTheme;
	localStorage.setItem('theme', newTheme);
	document.documentElement.classList.toggle('dark', newTheme === 'dark');
}

// Apply the theme when the component is mounted
onMounted(() => {
	applyTheme(theme.value);
});
</script>

<style scoped>
.theme-toggle {
	@apply size-5;
}
</style>
