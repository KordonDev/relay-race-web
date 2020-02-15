<script>
    export let persons;
    export let addPerson;
    export let addDistance;
</script>

<style>
	.relay-race-input {
		background-image:linear-gradient(90deg, cornflowerblue 0%, wheat 50%);
		border: black solid 4px;
		min-width: 50vw;
        min-height: 100vh;
		scroll-snap-align: start;
		scroll-snap-stop: always;
	}


</style>

<div class="relay-race-input">
    <div>
        Personen:
        <ul>
            {#each persons as person}
                <li>{person.name}</li>
            {/each}
        </ul>

        <button on:click|preventDefault={addPerson}>
            Person hinzufügen
        </button>
    </div>

    <div>
        Distanzen:
        <ul>
            {#each persons[0].runs as run}
                <li>{run.distance}</li>
            {/each}
        </ul>
        <button on:click|preventDefault={addDistance}>
            Distanz hinzufügen
        </button>
    </div>
</div>