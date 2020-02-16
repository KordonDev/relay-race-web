<script>
</script>

<style>
	.snap-horizontal {
		scroll-snap-type: x mandatory;
		display: flex;
		overflow-x: scroll;
	}
</style>

<div class="snap-horizontal">
    <slot />
</div>