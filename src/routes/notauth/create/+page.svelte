<script>
  import { goto } from '$app/navigation';
  let userId = '';
</script>

<!-- Input your github code! Then button allows you to go to /resume/{githubUsername} page. -->
<h1>Create a new resume</h1>

<input type="text" bind:value={userId} />
<!-- Disable button if userId is blank -->
<button on:click={() => goto(`/resume/${userId}`)} disabled={userId === ''}>Go to resume</button>

