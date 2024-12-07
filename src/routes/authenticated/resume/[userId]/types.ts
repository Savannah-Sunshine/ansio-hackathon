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

export interface DataSuccess {
    repos: Repository[];
    code_snippets: [CodeSnippet];
}

export interface DataWithError {
    status: number;
    error: Error;
}

export interface CodeSnippet {
    code_snippet: string[];
    comments: Comment[];
    github_url: string;
}

export interface Comment {
    id: number;
    line: number;
    text: string;
    timestamp: string;
}

export interface WorkHistory {
    company: string;
    position: string;
    start_date: string;
    end_date: string;
    description: string;
    location: string;
}