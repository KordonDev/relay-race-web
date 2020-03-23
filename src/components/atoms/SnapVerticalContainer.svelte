<script>
</script>

<style>
	.snap-vertical-container {
		scroll-snap-type: y mandatory;
		max-height: 100vh;
		overflow-y: scroll;
	}
</style>

<div class="snap-vertical-container">
    <slot />
</div>