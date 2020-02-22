<script>
	import PersonRunTimes from './components/PersonRunTimes.svelte';
	import PrepareRelayRace from './components/PrepareRelayRace.svelte';
	import ResultRelayRace from './components/ResultRelayRace.svelte';


    import SnapVertical from './components/atoms/SnapVertical.svelte';
	import SnapHorizontal from './components/atoms/SnapHorizontal.svelte';
	import SnapVerticalContainer from './components/atoms/SnapVerticalContainer.svelte';

	import { store } from './services/stores';

	let persons;

	store.subscribe(value => persons = value.persons);
</script>

<main>
	<SnapVerticalContainer paddingInPx="0">
		<PrepareRelayRace />

		<SnapVertical>
			<SnapHorizontal>
				{#each persons as person}
					<div class="person">
						<PersonRunTimes person={person} />
					</div>
				{/each}
			</SnapHorizontal>
		</SnapVertical>

		<ResultRelayRace />
	</SnapVerticalContainer>
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
