<script>
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
        console.log(distance);
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
                <input id="totalDistance" bind:value={totalDistance} on:input={submitTotalDistance} min="0" placeholder="in Meter" autocomplete="off" />
            </form>
        </div>

        <div>
            <h3>Runner</h3>
            <ul>
                {#each persons as person}
                    <li>
                        {person.name}
                        <button class="icon" title="Remove runner" on:click={_removePerson(person)}>
                            <img style="width: 15px"src="./assets/user-minus.svg" alt="Remove runner">
                        </button>
                    </li>
                {/each}
            </ul>
            <form on:submit|preventDefault={addNewPerson}>
                <label for="name">Add Runner:</label>
                <input id="name" bind:value={newPersonName} placeholder="Name" autocomplete="off" />
                <button class="icon" type="submit" disabled='{isDisabledAddPerson(newPersonName)}'>
                    <img style="width: 15px"src="./assets/user-plus.svg" alt="Add runner">
                </button>
            </form>
        </div>

        <div>
            <h3>Split distances</h3>
            <ul>
                {#each persons[0].runs as run}
                    <li>{run.distance}
                        <button class="icon" on:click={_removeRun(run)}>
                            <img style="width: 15px"src="./assets/waypoint-minus.svg" alt="Remove distance">
                        </button>
                    </li>
                {/each}
            </ul>

            <form on:submit|preventDefault={addNewDistance}>
                <label for="distance">Add Distance:</label>
                <input id="distance" bind:value={newDistance} placeholder="in Meter" min=0 autocomplete="off"/>
                <button class="icon" type="submit" disabled='{isDisabledAddRunDistance(newDistance)}'>
                    <img style="width: 15px"src="./assets/waypoint-plus.svg" alt="Add distance">
                </button>
            </form>
        </div>
   </div>


</div>