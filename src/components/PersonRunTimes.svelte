<script>
    export let person;

    import RunTime from './RunTime.svelte';
</script>

<div id={person.name}>
    <h2>{person.name}</h2>

    <h5>Split Times</h5>
    <ul>
        {#each person.runs as run}
            <RunTime personName={person.name} runDistance={run.distance} runTime={run.time} />
        {/each}
    </ul>
</div>

<style>
</style>
