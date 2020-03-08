<script>
	export let width;
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
</style>

<div class="snap-horizontal" style="--width:{width}">
    <slot />
</div>