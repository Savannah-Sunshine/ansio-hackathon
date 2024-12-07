<script>
	import { onMount } from 'svelte';
	import Prism from 'prismjs';

	// Import the desired language for syntax highlighting
	import 'prismjs/components/prism-python';
    import 'prismjs/themes/prism-twilight.css';

	// Code snippet to display (can be passed as a prop)
	export let snippet = []
    
    onMount(() => {
        console.log(snippet);
		Prism.highlightAll();
	});
</script>

<style>
	/* Prism.js theme twilight */
	pre {
		background: #f5f5f5;
		padding: 15px;
		/* border-radius: 5px; */
        border: none;
		overflow: auto;
		font-size: 14px;

	}

	code {
		font-family: 'Fira Code', 'Courier New', monospace;
	}
</style>

<pre>
    <div>
        <code class="language-python">
            <!-- {@html snippet.code_snippet.join('\n<br>')} -->
            {#each snippet.code_snippet as line}
                <div>{line}</div>
            {/each}
        </code>
    </div>
</pre>
