<script>
    export let persons;
    export let addPerson;
    export let addDistance;
    export let totalDistance;
    export let setTotalDistance;
    import SnapVertical from './atoms/SnapVertical.svelte';

    let newPersonName;
    let newDistance;

    function addNewPerson() {
        addPerson(newPersonName);
        newPersonName = '';
    }
    function addNewDistance() {
        addDistance(newDistance);
        newDistance = 0;
    }
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

<SnapVertical>
    <div class="relay-race-input">
        <div>
            Personen:
            <ul>
                {#each persons as person}
                    <li>{person.name}</li>
                {/each}
            </ul>

            <form on:submit|preventDefault={addNewDistance}>
                <label for="name">Name:</label>
                <input id="name" bind:value={newPersonName} placeholder="enter your name">
                <button on:click|preventDefault={addNewPerson}>
                    Person hinzufügen
                </button>
            </form>
        </div>

        <div>
            <label for="totalDistance">Gesamtdistanz in Meter:</label>
            <input id="totalDistance" type="number" bind:value={totalDistance} placeholder="in Meter">
        </div>

        <div>
            Distanzen:
            <ul>
                {#each persons[0].runs as run}
                    <li>{run.distance}</li>
                {/each}
            </ul>

            <form on:submit|preventDefault={addNewDistance}>
                <label for="distance">Distanz in Meter:</label>
                <input id="distance" type="number" bind:value={newDistance} placeholder="in Meter">
                <button type="submit">
                    Distanz hinzufügen
                </button>
            </form>
        </div>
    </div>
</SnapVertical>