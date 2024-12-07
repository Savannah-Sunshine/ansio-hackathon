<script>
  import { goto } from '$app/navigation';
  let userId = '';
</script>

<!-- Input your github username! Then button allows you to go to /resume/{githubUsername} page. -->
<input type="text" bind:value={userId} />
<!-- Disable button if userId is blank -->
<button on:click={() => goto(`/resume/${userId}`)} disabled={userId === ''}>Go to resume</button>

