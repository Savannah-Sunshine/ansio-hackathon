<script>
	// Array of programming languages
	export let symbols = [];
</script>

<style>
	/* Style for the list container */
	.symbols-list {
		display: flex;
		gap: 20px;
		list-style: none;
		padding: 0;
		margin: 0;
		align-items: center;
	}

	/* Style for individual items */
	.symbols-item {
		position: relative;
		width: 32px;
		height: 32px;
		cursor: pointer;
	}

	/* Style for the language name (hidden by default) */
	.symbols-item p {
		position: absolute;
		bottom: -20px;
		left: 50%;
		transform: translateX(-50%);
		background: rgba(0, 0, 0, 0.7);
		color: white;
		font-size: 12px;
		padding: 4px 8px;
		border-radius: 4px;
		white-space: nowrap;
		opacity: 0;
		visibility: hidden;
		transition: opacity 0.3s, visibility 0.3s;
	}

	/* Show the name on hover */
	.symbols-item:hover p {
		opacity: 1;
		visibility: visible;
	}
</style>

<ul class="symbols-list">
	{#each symbols as symbol}
		<li class="symbols-item">
			<img
				height="32"
				width="32"
				src={`https://unpkg.com/simple-icons@v13/icons/${symbol.toLowerCase()}.svg`}
				alt="{symbol} icon"
			/>
			<p>{symbol}</p>
		</li>
	{/each}
</ul>
