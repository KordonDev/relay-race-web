<script>
    export let person;

    import RunTime from './RunTime.svelte';
</script>

<div class="person-column">
    <h3>{person.name}</h3>

    <h5>Laufzeiten</h5>
    <ul>
        {#each person.runs as run}
            <RunTime personName={person.name} runDistance={run.distance} runTime={run.time} />
        {/each}
    </ul>
</div>

<style>
	.person-column {
		background-image:linear-gradient(90deg, cornflowerblue 0%, wheat 50%);
		border: black solid 4px;
		min-width: 50vw;
        min-height: 100vh;
		scroll-snap-align: start;
		scroll-snap-stop: always;
	}
</style>
