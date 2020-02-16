<script>
	export let paddingInPx;
</script>

<style>
	.snap-vertical-container {
		scroll-snap-type: y mandatory;
		max-height: 100vh;
		overflow-y: scroll;


		padding: var(--paddingPx);
	}
</style>

<div class="snap-vertical-container" style="--paddingPx:{paddingInPx}">
    <slot />
</div>