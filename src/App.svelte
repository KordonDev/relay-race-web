<script>
	import PersonColumn from './components/PersonColumn.svelte';
	import RelayRacePersons from './components/RelayRacePersons.svelte';
	import RelayRaceResult from './components/RelayRaceResult.svelte';


    import SnapVertical from './components/atoms/SnapVertical.svelte';
	import SnapHorizontal from './components/atoms/SnapHorizontal.svelte';
	import SnapVerticalContainer from './components/atoms/SnapVerticalContainer.svelte';

	import { store } from './services/stores';

	let persons;

	store.subscribe(value => persons = value.persons);
</script>

<main>
	<SnapVerticalContainer paddingInPx="0">
		<RelayRacePersons />

		<SnapVertical>
			<SnapHorizontal>
				{#each persons as person}
					<div class="person">
						<PersonColumn person={person} />
					</div>
				{/each}
			</SnapHorizontal>
		</SnapVertical>

		<RelayRaceResult />
	</SnapVerticalContainer>
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
