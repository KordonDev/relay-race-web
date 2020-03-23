<script>
	export let width;
	export let middleWidth = width;
	export let bigWidth = middleWidth;

</script>

<style>
	.snap-horizontal {
		border: black solid 4px;
		background-image: linear-gradient(90deg, cornflowerblue 0%, wheat 50%);
		min-width: var(--width);
        min-height: 100vh;
		scroll-snap-align: start;
		scroll-snap-stop: always;
		padding: 20px;
	}
	@media only screen and (min-width: 768px) {
		.snap-horizontal {
			min-width: var(--middleWidth);
		}
	}
	@media only screen and (min-width: 1200px) {
		.snap-horizontal {
			min-width: var(--bigWidth);
		}
	}
</style>

<div class="snap-horizontal" style="--width:{width}; --middleWidth:{middleWidth}; --bigWidth:{bigWidth}">
    <slot />
</div>