<script>
    export let person;
</script>

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

<div class="person-column">
    <h3>{person.name}</h3>
    <ul>
        {#each person.runs as run}
            <li>
                {run.distance} run in {run.time}
            </li>
        {/each}
    </ul>
</div>