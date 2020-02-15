<script>
	export let name;
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


	const worker = new Worker('/web-worker/worker.js');
	worker.addEventListener('message', function(e) {
		console.log('Worker said: ', e.data);
	}, false);

	function sendDataToWorker() {
		worker.postMessage('Hello World'); // Send data to our worker.
	}

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

</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<button on:click|preventDefault={sendDataToWorker}>Send mesages</button>

	<div class="inputContainer">


		<div class="person">
			<div>
				Personen:
				<ul>
					{#each persons as person}
						<li>{person.name}</li>
					{/each}
				</ul>

				<button on:click|preventDefault={addPerson}>
					Person hinzufügen
				</button>
			</div>

			<div>
				Distanzen:
				<ul>
					{#each persons[0].runs as run}
						<li>{run.distance}</li>
					{/each}
				</ul>
				<button on:click|preventDefault={addDistance}>
					Distanz hinzufügen
				</button>
			</div>
		</div>

		{#each persons as person}
			<div class="person">
				<h3>{person.name}</h3>
				<ul>
					{#each person.runs as run}
						<li>
							{run.distance} run in {run.time}
						</li>
					{/each}
				</ul>
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
	.person {
		background-image:linear-gradient(90deg, cornflowerblue 0%, wheat 50%);
		border: black solid 4px;
		min-width: 50vw;
		scroll-snap-align: start;
		scroll-snap-stop: always;
	}

	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
