<script>
	import PersonColumn from './components/PersonColumn.svelte';
	import RelayRacePerson from './components/RelayRacePersons.svelte';
	export let persons = [{
		name: 'Person A',
		runs: [{
			distance: '50m', time: 0,
		},{
			distance: '100m', time: 0,
		}, {
			distance: '150m', time: 0,
		}, {
			distance: '200m', time: 0,
		}]
	}, {
		name: 'Person B',
		runs: [{
			distance: '50m', time: 0,
		},{
			distance: '100m', time: 0,
		}, {
			distance: '150m', time: 0,
		}, {
			distance: '200m', time: 0,
		}]
	}, {
		name: 'Person C',
		runs: [{
			distance: '50m', time: 0,
		},{
			distance: '100m', time: 0,
		}, {
			distance: '150m', time: 0,
		}, {
			distance: '200m', time: 0,
		}]
	}, {
		name: 'Person D',
		runs: [{
			distance: '50m', time: 0,
		},{
			distance: '100m', time: 0,
		}, {
			distance: '150m', time: 0,
		}, {
			distance: '200m', time: 0,
		}]
	}];

	function addPerson() {
		const newPerson = {
			name: 'Person E',
			runs: persons[0].runs.map(run => ({ distance: run.distance, time: 0})),
		}
		const allPersons = persons.push(newPerson);
		persons = [ ...persons ];
	}

	function addDistance() {
		persons = persons.map(person => {
			const allRuns = [ ...person.runs ];
			allRuns.push({ distance: '300m', time: 0 });

			return {
				name: person.name,
				runs: allRuns.sort((a, b) => a.distance - b.distance),
			};
		})
	}

	const worker = new Worker('/web-worker/worker.js');
	worker.addEventListener('message', function(e) {
		console.log('Worker said: ', e.data);
	}, false);

	function sendDataToWorker() {
		worker.postMessage('Hello World'); // Send data to our worker.
	}
</script>

<main>
	<button on:click|preventDefault={sendDataToWorker}>Send mesages</button>

	<RelayRacePerson
		persons={persons}
		addPerson={addPerson}
		addDistance={addDistance}
	/>

	<div class="inputContainer">
		{#each persons as person}
			<div class="person">
				<PersonColumn person={person} />
			</div>
		{/each}

	</div>
</main>

<style>
	.inputContainer {
		scroll-snap-type: x mandatory;
		display: flex;
		overflow-x: scroll;
	}

	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
