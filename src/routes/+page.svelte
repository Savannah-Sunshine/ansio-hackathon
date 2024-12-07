<!-- Write simple button that goes to /resume/[userId], -->
<!-- where userId is a number. -->
<script lang="ts">
  import { goto } from '$app/navigation';
    const userId: number = 1;
    const handleClick = () => {
        goto(`/resume/${userId}`);
    };
</script>

<button on:click={handleClick}>Go to resume</button>
