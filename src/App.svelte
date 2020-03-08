<script>
	import PersonRunTimes from './components/PersonRunTimes.svelte';
	import PrepareRelayRace from './components/PrepareRelayRace.svelte';
	import ResultRelayRace from './components/ResultRelayRace.svelte';
	import Navigation from './components/Navigation.svelte';


    import SnapVertical from './components/atoms/SnapVertical.svelte';
	import SnapVerticalContainer from './components/atoms/SnapVerticalContainer.svelte';
	import SnapHorizontal from './components/atoms/SnapHorizontal.svelte';
	import SnapHorizontalContainer from './components/atoms/SnapHorizontalContainer.svelte';

	import { store } from './services/stores';

	let persons;

	store.subscribe(value => persons = value.persons);
</script>

<main>
	<SnapVerticalContainer paddingInPx="0">
		<SnapVertical>
			<SnapHorizontalContainer>
				<SnapHorizontal width="100vw">
					<PrepareRelayRace />
				</SnapHorizontal>
			</SnapHorizontalContainer>
		</SnapVertical>

		<SnapVertical>
			<div id="relay-race-times">
				<SnapHorizontalContainer>
					{#each persons as person}
						<SnapHorizontal width="50vw">
							<PersonRunTimes person={person} />
						</SnapHorizontal>
					{/each}
				</SnapHorizontalContainer>
			</div>
		</SnapVertical>

		<SnapVertical>
			<SnapHorizontalContainer>
				<SnapHorizontal width="100vw">
					<ResultRelayRace />
				</SnapHorizontal>
			</SnapHorizontalContainer>
		</SnapVertical>
	</SnapVerticalContainer>

	<Navigation/>
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
