<script>
    export let persons;

    import SnapVertical from './atoms/SnapVertical.svelte';

	const worker = new Worker('/web-worker/worker.js');
	worker.addEventListener('message', function(e) {
		console.log('Worker said: ', e.data);
	}, false);

	function sendDataToWorker() {
		worker.postMessage(persons); // Send data to our worker.
	}
</script>

<style>
	.relay-race-result {
		background-image:linear-gradient(90deg, cornflowerblue 0%, wheat 50%);
		border: black solid 4px;
		min-width: 50vw;
        min-height: 100vh;
		scroll-snap-align: start;
		scroll-snap-stop: always;
	}
</style>

<SnapVertical>
    <div class="relay-race-result">
        <button on:click|preventDefault={sendDataToWorker}>Send mesages</button>
    </div>
</SnapVertical>