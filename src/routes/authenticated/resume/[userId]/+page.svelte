<script lang="ts">
	import Timeline from './timeline.svelte';
	import Grid from './grid.svelte';
	import CodeDisplay from './codeDisplay.svelte';
	import Links from './links.svelte';
	import ContributionGraph from './contributionGraph.svelte';
	import type { Repository, DataSuccess, DataWithError, CodeSnippet, WorkHistory } from './types';


	let { data }: { data: DataSuccess | DataWithError } = $props();

	function didDataSucceed(data: DataSuccess | DataWithError): data is DataSuccess {
		return (data as DataSuccess).repos !== undefined;
	}

	let repos: Repository[] | undefined;
	// let code_snippets: [CodeSnippet] = $state([{ code_snippet: [], comments: [] }]);
	const code_snippets: CodeSnippet[] = [
		{
			title: 'Multi-Armed Bandit Algorithm',
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
					line: 0,
					text: "Algorithm I developed to solve the multi-armed bandit problem. Balanced to exploit trends, while still exploring new options. Won me first place.",
					timestamp: '2021-10-10T12:00:00Z'
				},
				{
					id: 2,
					line: 18,
					text: 'I use code abstraction to make things more readable. Ex: The pullArm function is defined elsewhere, but readers can infer what it does.',
					timestamp: '2021-10-10T12:00:00Z'
				}
			],
			github_url: 'https://github.com/Savannah-Sunshine/MultiArmed-Bandit/tree/main'
		},
		{
			title: 'Hello World',
			code_snippet: ['console.log("Hello, World!")'],
			comments: [
				{
					id: 1,
					line: 0,
					text: 'I am an amazing coder.',
					timestamp: '2021-10-10T12:00:00Z'
				}
			],
			github_url: 'https://github.com'
		}
	];

	const work_history: WorkHistory[] = [
		{
			company: 'Google',
			position: 'Senior Engineer',
			start_date: 'Nov 2020',
			end_date: null,
			length: null,
			description: "Worked on the Google Search team. Developed new features and improved existing ones. Implemented new algorithms to improve search results.",
			location: 'Mountain View, CA'
		},
		{
			company: 'Amazon',
			position: 'Software Engineer',
			start_date: 'Oct 2018',
			end_date: 'Nov 2020',
			length: '2 yrs',
			description: "Worked on the Amazon Recommendations team. Developed new features and improved existing ones. Implemented new algorithms to improve product recommendations.",
			location: 'Seattle, WA'
		},
		{
			company: 'Facebook',
			position: 'Intern',
			start_date: 'Dec 2017',
			end_date: 'Oct 2018',
			length: '10 mos',
			description: "Worked on the Facebook Ads team. Developed new features and improved existing ones. Implemented new algorithms to improve ad targeting.",
			location: 'Menlo Park, CA'
		}
	];
	
	const technologies = [ "amazonec2", "Git", "GitHub", "Terraform", "Vercel"]

	let name: string = $state('');
	let languages: string[] = $state([]);
	// let contribution: any = $state(undefined);

	// Don't render much if data is not DataWithRepos
	$effect(() => {
		if (didDataSucceed(data)) {
			repos = data.repos;
			name = 'Savannah Smith';
			// contribution = data.contributions;
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
	<Links />
	<!-- {#if contribution}
		<ContributionGraph />
	{/if} -->
	{#if work_history && work_history.length > 0}
		<h1 class="sectionTitle">Experience</h1>
		<Timeline items={work_history} />
	{:else}
		<p>No work history found for this user.</p>
	{/if}


	{#if code_snippets && code_snippets.length > 0}
		<h1 class="sectionTitle">Code Samples</h1>
		<ul>
			{#each code_snippets as snippet}
				<CodeDisplay snippet={snippet} />
			{/each}
		</ul>
	{:else}
		<p>No code snippets found for this user.</p>
	{/if}


	{#if languages && languages.length > 0}
		<h1 class="sectionTitle">Skills</h1>
		<Grid symbols={languages} />
	{/if}
	{#if technologies && technologies.length > 0}
		<Grid symbols={technologies} />
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

<style>
	/* body {
		padding: 48px;
	} */
	/* section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	} */

	h1 {
		width: 100%;
		text-align: left;
		margin-top: 50px;
		margin-bottom: 10px;
	}
	.sectionTitle {
		font-size: 1.5rem;
	}
</style>
