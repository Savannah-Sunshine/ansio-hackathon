<script>
	// Array of programming languages
    const links = [
        {
            name: 'GitHub',
            url: 'https://github.com/Savannah-Sunshine'
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/savannah-smith--/'
        },
        {
            name: 'Portfolio',
            url: 'https://savannah-sunshine.github.io/'
        },
        {
            name: 'Email',
            url: 'mailto:s.ella@me.com'
        },
        {
            name: 'Phone',
            url: 'tel:+1-123-456-7890'
        }
    ]
</script>

<div class="links">
    {#each links as link}
        <a href={link.url}>{link.name}</a>
    {/each}
</div>

<style>
    .links {
        display: flex;
        gap: 30px;
        list-style: none;
        padding: 0;
        margin: 0;
        align-items: center;
    }

    a {
        text-decoration: underline dotted;
        /* TODO: ! lighter than title */
        color: var(--color-text-2);
    }
</style>

