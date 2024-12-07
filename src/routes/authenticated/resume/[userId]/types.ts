export interface Repository {
    repo_name: string;
    updated_at: string;
    repo_language: string;
    repo_size: number;
    repo_url: string;
    watchers_count: number;
    forks_count: number;
    stargazers_count: number;
}

export interface DataWithRepos {
    repos: Repository[];
}

export interface DataWithError {
    status: number;
    error: Error;
}