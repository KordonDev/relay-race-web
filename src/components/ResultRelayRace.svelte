<script>
	import { stores, setSelectedStore } from '../services/stores';
	import { getCurrentStore } from '../services/store.utils';
	import { runTimeErrors, totalDistanceError } from '../services/validators';

	let data;
	let errors;
	let perfectRelayRace = {};
	let calculating = false;
	$: timeInMinutes = perfectRelayRace.time > 60 ? `${Math.floor(perfectRelayRace.time / 60)}:${perfectRelayRace.time % 60}` : `${perfectRelayRace.time}`

    stores.subscribe(state => {
		const currentStore = getCurrentStore(state.stores, state.selectedStore, setSelectedStore);
		errors = runTimeErrors(currentStore).concat(totalDistanceError(currentStore));
		data = currentStore;
	});
	const worker = new Worker('/web-worker/worker.js');


	worker.addEventListener('message', function(e) {
		perfectRelayRace = e.data;
		calculating = false;
	}, false);

	function sendDataToWorker() {
		calculating = true;
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

<div id="relay-race-result">
	<h2>Your Perfect Relay Race</h2>
	{#if errors.length > 0}
		<h3>Errors</h3>
		Can't calculate the relay race because
		<ul class="emoji-list">
			{#each errors as error}
				<li class="emoji-list-item emoji-error">{error}</li>
			{/each}
		</ul>
	{/if}
	<button class="result" on:click|preventDefault={sendDataToWorker} disabled='{errors.length}'>Calculate fastest relay race</button>
	{#if calculating}
		<div class="calculating">
			Calculating...
			<div class="running-woman">🏃🏼‍♀️</div>
		</div>
	{/if}
	{#if perfectRelayRace.time}
		<div>
			<h3>
				Best Result
			</h3>
			<p>
				The <b>{perfectRelayRace.distance}</b> meter of the relay race are possible in <b>{perfectRelayRace.time} seconds ({timeInMinutes})</b>.
			</p>

			Therefore the relay race is done with the following splits:
			<ul class="emoji-list">
				{#each perfectRelayRace.runs as run}
					<li class="emoji-list-item emoji-runner">{run.name} runs {run.distance} meter in {run.time} seconds</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

<style>

.calculating {
	position: relative;
}

.running-woman {
	font-size: 50px;
	animation: MoveLeftRight 3s ease-in-out infinite, Rotate 3s ease-in-out infinite;
	position: absolute;
	left: 0%;
	top: 0;
}

@keyframes MoveLeftRight {
	0%, 100% {
		left: 0%;
	}
	50% {
		left: 95%;
	}
}

@keyframes Rotate {
	0%, 45%, 100% {
		transform: scaleX(-1);
	}
	50%, 95% {
		transform: scaleX(1);
	}
}

.result {
	background-image: linear-gradient(45deg, #A0A0A0 25%, transparent 25%), linear-gradient(-45deg, #A0A0A0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #A0A0A0 75%), linear-gradient(-45deg, transparent 75%, #A0A0A0 75%);
	background-size: 20px 20px;
	background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
	padding: 20px;
	font-size: 25px;
    font-weight: bold;
    cursor: pointer;
    border: black solid 2px;
    border-radius: 5px;
    color: wheat;
	text-shadow: 0 0 5px #000;
	margin: 20px 0;
}
.result:disabled {
	cursor: not-allowed;
}

.emoji-list {
	list-style: none;
	padding: 0;
	margin: 0;
}

.emoji-list-item {
    padding-left: 1rem;
    text-indent: -0.7rem;
}
.emoji-runner::before {
    content: "🏃 ";
}
.emoji-error::before {
    content: "❌ ";
}
</style>