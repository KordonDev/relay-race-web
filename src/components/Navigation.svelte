<script>
    import { onMount } from 'svelte';

    let top;
    let bottom;
    let left;
    let right;

    let horizontalRoot;


    onMount(async () => {
        document.querySelectorAll('.snap-vertical').forEach(element => verticalObserver.observe(element));
    });

    const onVerticalIntersection = (entries) => {
        for (const entry of entries) {
            document.querySelectorAll('.snap-vertical').forEach((el, index, list) => {
                if (Math.abs(el.offsetTop - entry.target.offsetTop) < 20) {
                    if (entry.isIntersecting) {
                        if (index === 0) {
                            top = false;
                        }
                        if (index === list.length - 1) {
                            bottom = false;
                        }
                        const snapVerticalList = entry.target.querySelectorAll('.snap-horizontal');
                        if (snapVerticalList.length > 1) {
                            horizontalRoot = entry.target;
                            horizontalObserver = new IntersectionObserver(onHorizontalIntersection, { threshold: 0.9, root: entry.target });
                            snapVerticalList.forEach(element => horizontalObserver.observe(element));
                            right = true;
                            left = true;
                        }
                    }
                    if (!entry.isIntersecting) {
                        if (index === 0) {
                            top = true;
                        }
                        if (index === list.length - 1) {
                            bottom = true;
                        }
                        const snapVerticalList = entry.target.querySelectorAll('.snap-horizontal');
                        if (snapVerticalList.length > 1 && horizontalObserver) {
                            snapVerticalList.forEach(element => horizontalObserver.unobserve(element));
                            right = false;
                            left = false;
                        }
                    }
                }
            });
        }
    };

    const onHorizontalIntersection = (entries) => {
        for (const entry of entries) {
            if (!horizontalRoot) return;
            horizontalRoot.querySelectorAll('.snap-horizontal').forEach((el, index, list) => {
                if (Math.abs(el.offsetLeft - entry.target.offsetLeft) < 20) {
                    if (entry.isIntersecting) {
                        if (index === 0) {
                            left = false;
                        }
                        if (index === list.length - 1) {
                            right = false;
                        }
                    }
                    if (!entry.isIntersecting) {
                        if (index === 0) {
                            left = true;
                        }
                        if (index === list.length -1) {
                            right = true;
                        }
                    }
                }
            });
        }
    }

    let horizontalObserver;
    const verticalObserver = new IntersectionObserver(onVerticalIntersection, { threshold: 0.9 });

</script>

<style>
    .navigation {
        position: fixed;
        bottom: 65px;
        right: 50px;
    }

    .arrow {
        width: 20px;
        height: 20px;
        position: absolute;
        animation: fadeIn 0.5s;
    }
    .top {
        top: -20px;
        transform: rotate(90deg);
        right: 0;

    }
    .bottom {
        top: 20px;
        transform: rotate(-90deg);
        right: 0;
    }
    .right {
        top: 0;
        transform: rotate(180deg);
        right: -20px;
    }
    .left {
        top: 0;
        right: 20px;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
    }
</style>

<div class="navigation">
    {#if top}
        <img class="arrow top" src="./assets/arrow.svg" alt="" />
    {/if}
    {#if bottom}
        <img class="arrow bottom" src="./assets/arrow.svg" alt="" />
    {/if}
    {#if right}
        <img class="arrow right" src="./assets/arrow.svg" alt="" />
    {/if}
    {#if left}
        <img class="arrow left" src="./assets/arrow.svg" alt="" />
    {/if}
</div>