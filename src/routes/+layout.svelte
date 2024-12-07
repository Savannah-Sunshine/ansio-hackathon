<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { webVitals } from '$lib/vitals';
	import '../app.css';

	interface DataProps {
		analyticsId?: string;
	}

	let { data, children } = $props<{ data: DataProps }>();

	$effect(() => {
		if (data?.analyticsId) {
			webVitals({
				path: $page.url.pathname,
				params: $page.params,
				analyticsId: data.analyticsId
			});
		}
	});
</script>

 <div class="app">
	<!-- <Header /> -->

	<main>
		{@render children()}
	</main>

	<footer>
		<p>
			BUILT BY SAVANNAH :)
		</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
