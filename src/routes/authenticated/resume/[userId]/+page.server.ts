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
    console.log(userId);

    // Call api to get user's repos
    const repos = await actions.getRepos();

    // const calendar = await actions.getGithubContributions(); // TODO: Uncomment this line when ready to use the GitHub API, too much work rn

    // Print out auth information
    // console.log(session)

    // Todo, return only the repos that belong to the user? ... maybe?

    // Take data from data/data.json
    const file_path = path.resolve('src/lib/data/data.json');
    // Parse the data from the file
    const data = await JSON.parse(await fs.readFile(file_path, 'utf-8'));
    // Check for failure
    const code_snippets : [CodeSnippet] = [{code_snippet: [], comments: [], github_url: ''}];
    for (let i = 0; i < data.length; i++) {
        code_snippets.push({comments: data[i].comments, code_snippet: data[i].code_snippet, github_url: data[i].github_url});

        // TODO: Only get code snippets that belong to the user
        // if (data[i].userId === userId) {
        //     console.log(data[i].comments);
        //     code_snippets.push({comments: data[i].comments, code_snippet: data[i].code_snippet});
        // }
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