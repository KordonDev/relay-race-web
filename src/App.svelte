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
			distance: 50, time: 0,
		},{
			distance: 100, time: 0,
		}, {
			distance: 150, time: 0,
		}, {
			distance: 200, time: 0,
		}]
	}, {
		name: 'Person B',
		runs: [{
			distance: 50, time: 0,
		},{
			distance: 100, time: 0,
		}, {
			distance: 150, time: 0,
		}, {
			distance: 200, time: 0,
		}]
	}, {
		name: 'Person C',
		runs: [{
			distance: 50, time: 0,
		},{
			distance: 100, time: 0,
		}, {
			distance: 150, time: 0,
		}, {
			distance: 200, time: 0,
		}]
	}, {
		name: 'Person D',
		runs: [{
			distance: 50, time: 0,
		},{
			distance: 100, time: 0,
		}, {
			distance: 150, time: 0,
		}, {
			distance: 200, time: 0,
		}]
	}];

	function addPerson(name) {
		const newPerson = {
			name,
			runs: persons[0].runs.map(run => ({ distance: run.distance, time: 0})),
		}
		const allPersons = persons.push(newPerson);
		persons = [ ...persons ];
	}

	function addDistance(distance) {
		persons = persons.map(person => {
			const allRuns = [ ...person.runs ];
			allRuns.push({ distance, time: 0 });

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
