<script>
    export let person;

    import RunTime from './RunTime.svelte';
</script>

<div id={person.name}>
    <h3>{person.name}</h3>

    <h5>Laufzeiten</h5>
    <ul>
        {#each person.runs as run}
            <RunTime personName={person.name} runDistance={run.distance} runTime={run.time} />
        {/each}
    </ul>
</div>

<style>
</style>
