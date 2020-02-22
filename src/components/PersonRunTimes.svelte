<script>
    export let person;

    import { updateRunTime } from '../services/stores';

    function setTime(run) {
        return () => updateRunTime(person.name, run.distance, run.time)
    }
</script>

<div class="person-column">
    <h3>{person.name}</h3>

    <h5>Laufzeiten</h5>
    <ul>
        {#each person.runs as run}
            <li>
                <label for={person.name + run.distance}>{run.distance}m:</label>
                <input style="display: inline" id={person.name + run.distance} bind:value={run.time} on:input={setTime(run)} type="number" placeholder="in Sekunden">
            </li>
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
