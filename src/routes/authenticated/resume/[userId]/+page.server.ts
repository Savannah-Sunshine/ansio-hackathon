// import type { Load } from './$types';
import fs from 'fs/promises';
import path from 'path';
import { env } from '$env/dynamic/private';
import type { Repository, CodeSnippet } from './types';
const apiKey = env.GITHUB_TOKEN;
const query = `
  query {
    user(login: "Savannah-Sunshine") {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

export async function load(event: { params: { userId: string } }) {
    // Todo: Fetch specific user's repos from GitHub API
    const userId = event.params.userId;
    console.log('userId', userId);

    // Call api to get user's repos
    const repos = await actions.getRepos();

    // const contributions = await actions.getGithubContributions(); // TODO: Uncomment this line when ready to use the GitHub API, too much work rn
    // console.log(contributions.totalContributions);
    // Print out auth information
    // console.log(session)

    // Todo, return only the repos that belong to the user? ... maybe?

    // Take data from data/data.json
    // const file_path = path.resolve('src/lib/data/data.json');
    // // Parse the data from the file
    // const data = await JSON.parse(await fs.readFile(file_path, 'utf-8'));
    // Check for failure
    const data = [
        {
            code_snippet: [
                "def epsilon_greedy(machine):",
            "    global justexplore",
            "    global epsilon",
            "    global reward_hist, counts",
            "",
            "    # Degrades saved history of rewards",
            "    for i in range(len(reward_hist)):",
            "        reward_hist[i] *= decay_factor",
            "",
            "    # Tells algorithm to explore",
            "    if random.random() < epsilon or justexplore < 10:",
            "      arm_choice = random.randint(0,2)",
            "      justexplore += 1",
            "",
            "    else:",
            "      # Chooses action based its knowledge of best reward",
            "      bestVal = max(reward_hist)",
            "      arm_choice = reward_hist.index(bestVal)",
            "",
            "    counts[arm_choice] += 1",
            "    reward = pullArm(machine, armChoice)",
            "    reward_hist[arm_choice] += reward"
            ],
            github_url: "https://github.com",
            comments: [{
                id: 1,
                line: 0,
                text: "Algorithm I developed to solve the multi-armed bandit problem. Balanced to exploit trends, while still exploring new options. Won me first place.",
                timestamp: "2021-01-01T23:28:56.782Z"
            },
            {
                id: 2,
                line: 18,
                text: "This is a comment",
                timestamp: "2021-01-01T23:28:56.782Z"
            }]
        }
    ];

    const code_snippets = [];
    for (let i = 0; i < data.length; i++) {
        code_snippets.push({
            comments: data[i].comments,
            code_snippet: data[i].code_snippet,
            github_url: data[i].github_url
        });
    }
        

    return { repos, code_snippets};
}

export const actions = {
    getRepos: async function () {
        // Call api to get user's repos
        const response = await fetch(`https://api.github.com/user/repos`, {
            headers: {
                Authorization: `token ${apiKey}`
            }
        }).then(res => res.json());

        if (response.message) {
            return {
                status: 404,
                error: new Error(response.message)
            };
        }

        // Return name, updated_at, language, size, git_url, watchers_count, forks_count, stargazers_count
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const repos: Repository[] = response.map((repo: any) => ({
            repo_name: repo.name,
            updated_at: repo.updated_at,
            repo_language: repo.language,
            repo_size: repo.size,
            repo_url: repo.html_url,
            watchers_count: repo.watchers_count,
            forks_count: repo.forks_count,
            stargazers_count: repo.stargazers_count
        }));
        return repos;
    },
    getGithubContributions: async function () {
        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        const data = await response.json();

        if (data.errors) {
            return {
                status: 404,
                error: new Error(data.errors[0].message)
            };
        }
        return data.data.user.contributionsCollection.contributionCalendar;
    },
    getGitHubUser: async function () {
        const userResponse = await fetch('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        });

        const userData = await userResponse.json();
        if (userData.error) {
            throw new Error('Failed to fetch user information');
        }

        return {
            username: userData.login, // GitHub username
            id: userData.id,          // GitHub user ID
            avatar: userData.avatar_url, // GitHub avatar URL
            name: userData.name       // Full name, if available
        };
    }
};