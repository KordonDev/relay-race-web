<script>
</script>

<style>
	.snap-vertical {
		min-width: 100vw;
        min-height: 100vh;
		scroll-snap-align: start;
		scroll-snap-stop: always;
	}
</style>

<div class="snap-vertical">
    <slot />
</div>