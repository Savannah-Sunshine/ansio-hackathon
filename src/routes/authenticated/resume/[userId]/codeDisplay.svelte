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
	/* Prism.js theme twilight
	pre {
        border: none;
		overflow: auto;
		font-size: 14px;
		width: fit-content;
	}

	pre h2 {
		margin: 0;
		/* Center 
		text-align: center;

	}

	code {
		font-family: 'Fira Code', 'Courier New', monospace;
	} */

.code-container {
  position: relative;
  font-family: 'Courier New', monospace; /* For code styling */
  padding: 20px;
  background-color: var(--color-bg-2); /* Light gray background for code */
  /* Round the corners */
  border-radius: 8px;
  margin-top: 20px;
}

.code-block {
  margin-top: 20px;
  
}

.code-line-wrapper {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px; /* Space between each line of code */
  margin: 0;
}

.code-line {
  flex: 1; /* Make code take up as much space as possible */
  padding-right: 20px; /* Space for the comment */
  white-space: pre-wrap; /* Preserve line breaks and spaces in code */
}

.comment {
  max-width: 300px; /* Limit comment width */
  font-style: italic; /* Style the comment differently */
  color: #666; /* Light gray for the comment text */
  padding-left: 20px; /* Space between the code and the comment */
}

h2 {
  margin-bottom: 15px;
  font-weight: bold;
}

.index {
  color: #666;
  padding-right: 10px;
  font-size: 14px;
}

</style>

<!-- <div>
	<pre>
		<h2>{snippet.title}</h2>
		<code class="language-python">
				<!-- {@html snippet.code_snippet.join('\n<br>')}
			{#each snippet.code_snippet as line}

				<div>{line}</div>
			{/each}
		</code>
	</pre>

	<!-- Display comments 
	{#if snippet.comments && snippet.comments.length > 0}
		<h3>Comments</h3>
		<ul>
			{#each snippet.comments as comment}
				<li>{comment.text}</li>
			{/each}
		</ul>
	{/if}
</div> -->

<div class="code-container">
	<h2>{snippet.title}</h2>
	<div class="code-block">
	  {#each snippet.code_snippet as line, index}
		<div class="code-line-wrapper">
		  <!-- Code line on the left -->
			<div class="index">{index}</div>
		  <div class="code-line">{line}</div>
  
		  <!-- Comment on the right (if it exists for this line) -->
		  {#if snippet.comments}
			<!-- Go through comments and see if we're on current index -->
			{#each snippet.comments as comment}
			  {#if comment.line === index}
				<div class="comment">
				  <p>{comment.text}</p>
				</div>
			  {/if}
			{/each}
		  {/if}
		</div>
	  {/each}
	</div>
</div>