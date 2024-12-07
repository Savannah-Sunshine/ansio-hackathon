<script lang="ts">
	import type { Repository, DataSuccess, DataWithError, CodeSnippet, WorkHistory } from './types';
	let { data }: { data: DataSuccess | DataWithError } = $props();

	function didDataSucceed(data: DataSuccess | DataWithError): data is DataSuccess {
		return (data as DataSuccess).repos !== undefined;
	}

	let repos: Repository[] | undefined;
	// let code_snippets: [CodeSnippet] = $state([{ code_snippet: [], comments: [] }]);
	const code_snippets: CodeSnippet[] = [
		{
			code_snippet: [
				'def epsilon_greedy(machine):',
				'    global justexplore',
				'    global epsilon',
				'    global reward_hist, counts',
				'',
				'    # Degrades saved history of rewards',
				'    for i in range(len(reward_hist)):',
				'        reward_hist[i] *= decay_factor',
				'',
				'    # Tells algorithm to explore',
				'    if random.random() < epsilon or justexplore < 10:',
				'      arm_choice = random.randint(0,2)',
				'      justexplore += 1',
				'',
				'    else:',
				'      # Chooses action based its knowledge of best reward',
				'      bestVal = max(reward_hist)',
				'      arm_choice = reward_hist.index(bestVal)',
				'',
				'    counts[arm_choice] += 1',
				'    reward = pullArm(machine, armChoice)',
				'    reward_hist[arm_choice] += reward'
			],
			comments: [
				{
					id: 1,
					line: 1,
					text: "Algorithm I developed to solve the multi-armed bandit problem. Balanced to exploit trends, while still exploring new options. Won me first place.",
					timestamp: '2021-10-10T12:00:00Z'
				},
				{
					id: 2,
					line: 10,
					text: 'I use code abstraction to make things more readable. The pullArm function is defined elsewhere, but obvious what it does.',
					timestamp: '2021-10-10T12:00:00Z'
				}
			],
			github_url: 'https://github.com/Savannah-Sunshine/MultiArmed-Bandit/tree/main'
		},
		{
			code_snippet: ['console.log("Hello, World!")'],
			comments: [
				{
					id: 1,
					line: 1,
					text: 'Simple hello world program in JS.',
					timestamp: '2021-10-10T12:00:00Z'
				}
			],
			github_url: 'https://github.com'
		}
	];

	const work_history: WorkHistory[] = [
		{
			company: 'Google',
			position: 'Software Engineer',
			start_date: '2020-10-10',
			end_date: '2021-10-10',
			description: "Worked on the Google Search team. Developed new features and improved existing ones. Implemented new algorithms to improve search results.",
			location: 'Mountain View, CA'
		},
		{
			company: 'Facebook',
			position: 'Software Engineer',
			start_date: '2017-10-10',
			end_date: '2018-10-10',
			description: "Worked on the Facebook Ads team. Developed new features and improved existing ones. Implemented new algorithms to improve ad targeting.",
			location: 'Menlo Park, CA'
		},
		{
			company: 'Amazon',
			position: 'Software Engineer',
			start_date: '2018-10-10',
			end_date: '2020-10-10',
			description: "Worked on the Amazon Recommendations team. Developed new features and improved existing ones. Implemented new algorithms to improve product recommendations.",
			location: 'Seattle, WA'
		}
	];

	const technologies = [ "amazonec2", "Git", "GitHub", "Terraform", "Vercel"]

	let name: string = $state('');
	let languages: string[] = $state([]);

	// Don't render much if data is not DataWithRepos
	$effect(() => {
		if (didDataSucceed(data)) {
			repos = data.repos;
			name = 'Savannah Smith';
			// code_snippets = data.code_snippets;
		} else {
			repos = undefined;
			name = 'Unknown'; // Reset to default if data is not DataWithRepos
			// code_snippets = [{ code_snippet: [], comments: [] }];
		}
	});

	// Get list of languages from repos, no duplicates and no null values
	// TODO: Currently saves also language for icon languages, HTML = HTMX bc HTML doesn't have an icon
	// Reactive, will update when repos change
	$effect(() => {
		if (repos && repos.length > 0) {
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
			{#each technologies as technology}
				<img
					height="32"
					width="32"
					src={`https://unpkg.com/simple-icons@v13/icons/${technology.toLowerCase()}.svg`}
					alt=""
				/>
				<p>{technology}</p>
			{/each}
		</ul>
	{:else}
		<p>No repositories found for this user.</p>
	{/if}
	{#if code_snippets && code_snippets.length > 0}
		<ul>
			{#each code_snippets as snippet}
				{#each snippet.code_snippet as code}
					<pre>{code}</pre>
				{/each}
			{/each}
		</ul>
	{:else}
		<p>No code snippets found for this user.</p>
	{/if}
	{#if work_history && work_history.length > 0}
		<ul>
			{#each work_history as job}
				<li>
					<img
						height="32"
						width="32"
						src={`https://unpkg.com/simple-icons@v13/icons/${job.company.toLowerCase().replace(' ', '')}.svg`}
						alt=""
					/>
					<h2>{job.company}</h2>
					<p>{job.position}</p>
					<p>{job.start_date} - {job.end_date}</p>
					<p>{job.description}</p>
					<p>{job.location}</p>
				</li>
			{/each}
		</ul>
	{:else}
		<p>No work history found for this user.</p>
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
