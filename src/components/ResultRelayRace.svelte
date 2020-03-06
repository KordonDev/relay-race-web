<script>
	import SnapVertical from './atoms/SnapVertical.svelte';
	import { store } from '../services/stores';
	import { runTimeErrors, totalDistanceError } from '../services/validators';

	let data;
	let errors;
	let perfectRelayRace = {};
	$: timeInMinutes = perfectRelayRace.time > 60 ? `${Math.floor(perfectRelayRace.time / 60)}:${perfectRelayRace.time % 60}` : `${perfectRelayRace.time}`

    store.subscribe(value => {
		errors = runTimeErrors(value).concat(totalDistanceError(value));
		console.log(errors);
		data = value;
	});
	const worker = new Worker('/web-worker/worker.js');


	worker.addEventListener('message', function(e) {
		perfectRelayRace = e.data;
	}, false);

	function sendDataToWorker() {
		const dataForServiceWorker = {
			totalDistance: data.totalDistance,
			persons: data.persons.map(person => ({
				...person,
				runs: person.runs.map(run => ({
					...run,
					name: person.name,
				})),
			})),
		};
		worker.postMessage(dataForServiceWorker); // Send data to our worker.
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
		<ul>
			{#each errors as error}
				<li>{error}</li>
			{/each}
		</ul>
        <button on:click|preventDefault={sendDataToWorker} disabled='{errors.length}'>Schnellster Staffellauf berechnen</button>
		{#if perfectRelayRace.time}
			<div>
				<h3>
					Bestes Ergebnis
				</h3>
				<p>
					Möglich sind die {perfectRelayRace.distance} Meter in {perfectRelayRace.time} Sekunden ({timeInMinutes}).
				</p>

				Dafür ist die folgende Verteilung nötig:
				<ul>
					{#each perfectRelayRace.runs as run}
						<li>{run.name} läuft {run.distance}m in {run.time}s</li>
					{/each}
				</ul>
			</div>
		{/if}
    </div>
</SnapVertical>