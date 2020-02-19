<script>
	import PersonColumn from './components/PersonColumn.svelte';
	import RelayRacePersons from './components/RelayRacePersons.svelte';
	import RelayRaceResult from './components/RelayRaceResult.svelte';


    import SnapVertical from './components/atoms/SnapVertical.svelte';
	import SnapHorizontal from './components/atoms/SnapHorizontal.svelte';
	import SnapVerticalContainer from './components/atoms/SnapVerticalContainer.svelte';


	export let persons = [{
		name: 'Person A',
		runs: [{
			distance: 50, time: undefined,
		},{
			distance: 100, time: undefined,
		}, {
			distance: 150, time: undefined,
		}, {
			distance: 200, time: undefined,
		}]
	}, {
		name: 'Person B',
		runs: [{
			distance: 50, time: undefined,
		},{
			distance: 100, time: undefined,
		}, {
			distance: 150, time: undefined,
		}, {
			distance: 200, time: undefined,
		}]
	}, {
		name: 'Person C',
		runs: [{
			distance: 50, time: undefined,
		},{
			distance: 100, time: undefined,
		}, {
			distance: 150, time: undefined,
		}, {
			distance: 200, time: undefined,
		}]
	}, {
		name: 'Person D',
		runs: [{
			distance: 50, time: undefined,
		},{
			distance: 100, time: undefined,
		}, {
			distance: 150, time: undefined,
		}, {
			distance: 200, time: undefined,
		}]
	}];
	export let totalDistance;

	function setTotalDistance(_totalDistance) {
		totalDistance = _totalDistance;
	}

	function addPerson(name) {
		const newPerson = {
			name,
			runs: persons[0].runs.map(run => ({ distance: run.distance, time: undefined})),
		}
		const allPersons = persons.push(newPerson);
		persons = [ ...persons ];
	}

	function addDistance(distance) {
		persons = persons.map(person => {
			const allRuns = [ ...person.runs ];
			allRuns.push({ distance, time: undefined });

			return {
				name: person.name,
				runs: allRuns.sort((a, b) => a.distance - b.distance),
			};
		})
	}

</script>

<main>
	<SnapVerticalContainer paddingInPx="0">
		<RelayRacePersons
			persons={persons}
			addPerson={addPerson}
			addDistance={addDistance}
			totalDistance={totalDistance}
			setTotalDistance={setTotalDistance}
		/>

		<SnapVertical>
			<SnapHorizontal>
				{#each persons as person}
					<div class="person">
						<PersonColumn person={person} />
					</div>
				{/each}
			</SnapHorizontal>
		</SnapVertical>

		<RelayRaceResult persons={persons} />


	</SnapVerticalContainer>
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
