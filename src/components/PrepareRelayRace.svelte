<script>
    import { store, addPerson, addDistance, setTotalDistance, removeRun, removePerson } from '../services/stores';
    import { validateAddRun, validateAddPerson } from '../services/validators';
    import IconButton from './atoms/IconButton.svelte';

    let newPersonName;
    let newDistance;
    let persons;
    let totalDistance;

    store.subscribe(value => persons = value.persons);
    store.subscribe(value => totalDistance = value.totalDistance);

    function addNewPerson() {
        addPerson(newPersonName);
        newPersonName = '';
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
    #totalDistance:invalid {
        border: solid red 3px;
    }

</style>

<div id="relay-race-input">
    <h1>Perfect Relay Race</h1>
    <p>
        This website will help you to find the perfect split for a rely race. Therefore you have to execute the three steps.
    </p>
    <ol>
        <li><a href="#relay-race-input">Describe your relay race</a></li>
        <li><a href="#relay-race-times">Input the split times for each person</a></li>
        <li><a href="#relay-race-result">Let the app calculate your splits for the perfect relay race</a></li>
    </ol>
    <div style="margin-top: 20px;">
        <h2>Your Relay Race</h2>

        <div>
            <h3>Total Distance</h3>
            <form on:submit|preventDefault={submitTotalDistance}>
                <label for="totalDistance">Total distance in meter:</label>
                <input id="totalDistance" type="number" bind:value={totalDistance} on:input={submitTotalDistance} min=0 placeholder="in Meter">
            </form>
        </div>

        <div>
            <h3>Runner</h3>
            <ul>
                {#each persons as person}
                    <li>
                        {person.name}
                        <IconButton title="Remove runner" onClick={_removePerson(person)}>
                            <img style="width: 15px"src="./assets/flag-disqualify.svg" alt="Remove runner">
                        </IconButton>
                    </li>
                {/each}
            </ul>
            <form on:submit|preventDefault={addNewPerson}>
                <label for="name">Name:</label>
                <input id="name" bind:value={newPersonName} placeholder="enter your name">
                <button type="submit" disabled='{isDisabledAddPerson(newPersonName)}'>
                    Add
                </button>
            </form>
        </div>

        <div>
            <h3>Split distances</h3>
            <ul>
                {#each persons[0].runs as run}
                    <li>{run.distance} <button on:click|preventDefault={_removeRun(run)}>x</button></li>
                {/each}
            </ul>

            <form on:submit|preventDefault={addNewDistance}>
                <label for="distance">Distanz in Meter:</label>
                <input id="distance" type="number" bind:value={newDistance} placeholder="in Meter">
                <button type="submit" disabled='{isDisabledAddRunDistance(newDistance)}'>
                    Add
                </button>
            </form>
        </div>
   </div>


</div>