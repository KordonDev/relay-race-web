<script>
    let title;
    let onClick;
</script>

<style>
</style>

<button title={title} on:click|preventDefault={onClick}>
    <slot />
</button>