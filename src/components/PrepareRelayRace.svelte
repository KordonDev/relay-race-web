<script>
    import SnapVertical from './atoms/SnapVertical.svelte';
    import { store, addPerson, addDistance, setTotalDistance, removeRun, removePerson } from '../services/stores';
    import { validateAddRun, validateAddPerson } from '../services/validators';

    let newPersonName;
    let newDistance;
    let persons;
    let totalDistance;

    store.subscribe(value => persons = value.persons);
    store.subscribe(value => totalDistance = value.totalDistance);

    function addNewPerson() {
        addPerson(newPersonName);
        newPersonName = undefined;
    }
    function addNewDistance() {
        addDistance(newDistance);
        newDistance = undefined;
    }
    function submitTotalDistance() {
        setTotalDistance(totalDistance);
    }
    function _removePerson(person) {
        return () => removePerson(person.name);
    }
    function _removeRun(run) {
        return () => removeRun(run.distance);
    }
    function isDisabledAddRunDistance(distance) {
        return !validateAddRun(distance);
    }
    function isDisabledAddPerson(personName) {
        return !validateAddPerson(personName);
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

    #totalDistance:invalid {
        border: solid red 3px;
    }

</style>

<SnapVertical>
    <div class="relay-race-input">
        <div>
            Personen:
            <ul>
                {#each persons as person}
                    <li>{person.name} <button on:click|preventDefault={_removePerson(person)}>x</button></li>
                {/each}
            </ul>

            <form on:submit|preventDefault={addNewPerson}>
                <label for="name">Name:</label>
                <input id="name" bind:value={newPersonName} placeholder="enter your name">
                <button type="submit" disabled='{isDisabledAddPerson(newPersonName)}'>
                    Person hinzufügen
                </button>
            </form>
        </div>

        <div>
            <form on:submit|preventDefault={submitTotalDistance}>
                <label for="totalDistance">Gesamtdistanz in Meter:</label>
                <input id="totalDistance" type="number" bind:value={totalDistance} on:input={submitTotalDistance} min=0 placeholder="in Meter">
            </form>
        </div>

        <div>
            Distanzen:
            <ul>
                {#each persons[0].runs as run}
                    <li>{run.distance} <button on:click|preventDefault={_removeRun(run)}>x</button></li>
                {/each}
            </ul>

            <form on:submit|preventDefault={addNewDistance}>
                <label for="distance">Distanz in Meter:</label>
                <input id="distance" type="number" bind:value={newDistance} placeholder="in Meter">
                <button type="submit" disabled='{isDisabledAddRunDistance(newDistance)}'>
                    Distanz hinzufügen
                </button>
            </form>
        </div>
    </div>
</SnapVertical>