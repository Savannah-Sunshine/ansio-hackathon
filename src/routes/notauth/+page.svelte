<script>
	import { goto } from '$app/navigation';
</script>

<div class="this">
	<!-- See my resume -->
	<button on:click={() => goto('/notauth/resume/Savannah-Sunshine')}>See my resume</button>
	<!-- Create new resume -->
	<button on:click={() => goto('/notauth/create')}>Create new resume</button>
</div>

<style>
	.this {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 40%;
	} 
	
	button {
		background-color: var(--color-bg-2);
		color: var(--color-text-1);
		border: none;
		border-radius: 5px;
		padding: 10px 20px;
		margin: 10px;
		cursor: pointer;
	}
</style>