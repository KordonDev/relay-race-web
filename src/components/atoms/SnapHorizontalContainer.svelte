<script>
</script>

<style>
	.snap-horizontal-container {
		scroll-snap-type: x mandatory;
		display: flex;
		overflow-x: scroll;
		min-height: 100vh;
	}
</style>

<div class="snap-horizontal-container">
    <slot />
</div>