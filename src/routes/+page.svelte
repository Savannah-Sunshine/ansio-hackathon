<script lang="ts">
  import { goto } from '$app/navigation';
  import { SignIn, SignOut } from "@auth/sveltekit/components"
  import { page } from "$app/stores"

</script>
 
<div>
  {#if $page.data.session}
    <span class="signedInText">
      <small>Signed in as</small><br />
      <strong>{$page.data.session.user?.name ?? "User"}</strong>
    </span>
    <SignOut>
      <div slot="submitButton" class="buttonPrimary">Sign out</div>
    </SignOut>
  {:else}
    <span class="notSignedInText">You are not signed in</span>
    <SignIn>
      <div slot="submitButton" class="buttonPrimary">Sign in</div>
    </SignIn>
    <!-- <SignIn provider="Github"/> -->
  {/if}
</div>