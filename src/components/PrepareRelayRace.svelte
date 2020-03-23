<script>
    import { stores, addPerson, addDistance, setTotalDistance, removeRun, removePerson, setSelectedStore, addRelayRace, removeRelayRace } from '../services/stores';
    import { getCurrentStore } from '../services/store.utils';
    import { validateAddRun, validateAddPerson } from '../services/validators';

    let newPersonName;
    let newDistance;
    let currentRelayRace;
    let storeNames;
    let newRelayRaceName = '';
    let selectedStore;

    stores.subscribe(state => currentRelayRace = getCurrentStore(state.stores, state.selectedStore, setSelectedStore));
    stores.subscribe(state => storeNames = state.stores.map(store => store.name));
    stores.subscribe(state => selectedStore = state.selectedStore);

    function addNewPerson() {
        addPerson(newPersonName);
        newPersonName = '';
    }
    function addNewDistance() {
        addDistance(newDistance);
        newDistance = '';
    }
    function submitTotalDistance() {
        setTotalDistance(totalDistance);
    }
    function _removePerson(person) {
        return () => removePerson(person.name);
    }
    function _removeRun(distance) {
        return () => removeRun(distance);
    }
    function isDisabledAddRunDistance(distance) {
        return !validateAddRun(distance);
    }
    function isDisabledAddPerson(personName) {
        return !validateAddPerson(personName);
    }
    function selectStore(name) {
        return () => setSelectedStore(name);
    }
    function _addRelayRace() {
        addRelayRace(newRelayRaceName);
        selectStore(newRelayRaceName)();
        newRelayRaceName = '';
    }
    function _removeRelayRace(name) {
        return () => removeRelayRace(name);
    }
</script>

<style>
.additionalButton {
    margin-left: -5px;
    border-radius: 0 3px 3px 0;
    border-left: 0;
}
.additionalButton:disabled {
    color: grey;
}

input:checked+.relay-race-container .relay-race-select {
    transform: scale(1.2);
    font-weight: bold;
    background-color: wheat;
    padding: 0.8em;
}
input:checked+.relay-race-container .additionalButton {
    padding: 0.8em;
}
.relay-race-select {
    background: transparent;
    border-color: black;
    border-radius: 3px;
    cursor: pointer;
    margin-left: 10px;
    border: solid black 1px;
    padding: 0.4em
}

.beforeAdditionalButton {
    border-radius: 3px 0 0 3px;
}

.relay-races-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
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
        <h2>Your Relay Races</h2>
        <div>
            <formset>
                <div class="relay-races-container">
                    {#each storeNames as storeName}
                        <input class="visually-hidden" type="radio" name="relayRace" group={selectedStore} id={storeName} value={storeName} on:change={selectStore(storeName)} checked={selectedStore === storeName}/>
                        <div class="relay-race-container">
                            <label class="relay-race-select beforeAdditionalButton" for={storeName}>{storeName}</label>
                            <button disabled={storeNames.length === 1 || storeName === selectedStore} class="additionalButton icon" on:click={_removeRelayRace(storeName)}>x</button>
                        </div>
                    {/each}
                </div>
            </formset>
            <form on:submit|preventDefault={_addRelayRace}>
                <label for="new-relay-race">New Relay Race</label>
                <input type="text" required id="new-relay-race" bind:value={newRelayRaceName}>
                <button class="icon" type="submit">+ Race</button>
            </form>
        </div>

        <h2>Configure Your Relay Race</h2>
        <div>
            <h3>Total Distance</h3>
            <form on:submit|preventDefault={submitTotalDistance}>
                <label for="totalDistance">Total distance in meter:</label>
                <input type="number" id="totalDistance" bind:value={currentRelayRace.totalDistance} on:input={submitTotalDistance} min=1 required placeholder="in Meter" autocomplete="off" />
            </form>
        </div>

        <div>
            <h3>Runner</h3>
            <ul>
                {#each currentRelayRace.persons as person}
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
                {#each currentRelayRace.runDistances as distance}
                    <li>{distance}
                        <button class="icon" on:click={_removeRun(distance)}>
                            <img style="width: 15px"src="./assets/waypoint-minus.svg" alt="Remove distance">
                        </button>
                    </li>
                {/each}
            </ul>

            <form on:submit|preventDefault={addNewDistance}>
                <label for="distance">Add Distance:</label>
                <input id="distance" type="number" bind:value={newDistance} placeholder="in Meter" min=1 autocomplete="off"/>
                <button class="icon" type="submit" disabled='{isDisabledAddRunDistance(newDistance)}'>
                    <img style="width: 15px"src="./assets/waypoint-plus.svg" alt="Add distance">
                </button>
            </form>
        </div>
   </div>


</div>