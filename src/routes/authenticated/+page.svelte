<script>
	import { goto } from '$app/navigation';
</script>

<!-- See my resume -->
<button on:click={() => goto('/authenticated/resume/Savannah-Sunshine')}>See my resume</button>
<!-- Create new resume -->
<button on:click={() => goto('/authenticated/create')}>Create new resume</button>
