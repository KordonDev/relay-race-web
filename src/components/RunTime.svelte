<script>
    export let personName;
    export let runTime;
    export let runDistance;

    import { updateRunTime } from '../services/stores';

    function setTime() {
        return (event) => updateRunTime(personName, runDistance, event.target.value);
    }
</script>

<li>
    <label for={personName + runDistance}>{runDistance}m:</label>
    <input class="time-input" id={personName + runDistance} value={runTime} on:input={setTime()} min=0 type="number" placeholder="in Sekunden">
</li>

<style>
    .time-input {
        display: inline;
    }
    .time-input:invalid {
        border: solid red 3px;
    }
</style>
