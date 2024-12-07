<script lang="ts">
	import type { Repository, DataWithRepos, DataWithError } from './types';
	// onMount(async () => {
	// 	let { data }: { data: DataWithRepos | DataWithError } = $props();
	// });
	let { data }: { data: DataWithRepos | DataWithError } = $props();
	
	function isDataWithRepos(data: DataWithRepos | DataWithError): data is DataWithRepos {
		return (data as DataWithRepos).repos !== undefined;
	}

	let repos: Repository[] | undefined;
	let name: string = $state('');
	let languages: string[] = $state([]);

	// Don't render much if data is not DataWithRepos
	$effect(() => {
		if (isDataWithRepos(data)) {
			repos = data.repos;
			name = 'Savannah Smith';
		} else {
			repos = undefined;
			name = 'Unknown'; // Reset to default if data is not DataWithRepos
		}
	});

	// Get list of languages from repos, no duplicates and no null values
	// Save also offical title of the language, HTML = HTMLX
	// Reactive, will update when repos change
	$effect(() => {
		if (repos && repos.length > 0) {
			console.log(repos);
			const newLanguages = repos
				.map((repo) => {
					if (repo.repo_language === 'HTML') {
						return 'htmx';
					}
					return repo.repo_language;
				})
				.filter((language, index, self) => language && self.indexOf(language) === index);

			// Only update languages if it has changed
			// Otherwise, it will cause infinite loop
			if (JSON.stringify(newLanguages) !== JSON.stringify(languages)) {
				languages = newLanguages;
				console.log(languages);
			}
		} else {
			languages = [];
		}
	});
</script>

<div>
	<h1>{name}</h1>
	{#if languages && languages.length > 0}
		<ul>
			{#each languages as language}
				<!-- Use https://unpkg.com/simple-icons@v13/icons/.svg -->
				<!-- Replace .svg with the name of the icon -->
				<!-- For example, for Svelte, use svelte.svg -->
				<!-- You can also use the icon directly from the website -->
				<!-- https://simpleicons.org/ -->
				<img
					height="32"
					width="32"
					src={`https://unpkg.com/simple-icons@v13/icons/${language.toLowerCase()}.svg`}
					alt=""
				/>
				<p>{language}</p>
			{/each}
		</ul>
	{:else}
		<p>No repositories found for this user.</p>
	{/if}
	<!-- {#if repos && repos.length > 0}
        <ul>
            {#each repos as repo}
                <li>
					<a href={repo.repo_url} target="_blank">
						{repo.repo_name}
					</a>
					<p>Language: {repo.repo_language}</p>
					<p>Size: {repo.repo_size} KB</p>
					<p>Updated: {repo.updated_at}</p>
					<p>Watchers: {repo.watchers_count}</p>
					<p>Forks: {repo.forks_count}</p>
					<p>Stars: {repo.stargazers_count}</p>
				</li>
            {/each}
        </ul>
    {:else}
        <p>No repositories found for this user.</p>
    {/if} -->
</div>

<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->

<!-- <style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	} 
</style>-->
