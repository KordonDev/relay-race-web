<script>
    export let personName;
    export let runTime;
    export let runDistance;

    import { setRunTime } from '../services/stores';

    function setTime() {
        return (event) => setRunTime(personName, runDistance, event.target.value);
    }
</script>

<li>
    <label for={personName + runDistance}>{runDistance}m: </label>
    <input class="time-input" id={personName + runDistance} value={runTime} on:input={setTime()} min=0 required type="number" placeholder="in Seconds">
</li>

<style>
</style>
