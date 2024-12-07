// import type { Load } from './$types';
import { env } from '$env/dynamic/private';
import type { Repository } from './types';
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

    // Call api to get user's repos
    const repos = await actions.getRepos();

    const calendar = await actions.getGithubContributions();


    // Todo, return only the repos that belong to the user? ... maybe?

    return { repos, calendar };
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
    }
};