<script>
    import { onMount } from 'svelte';
    import { store, addPerson, addDistance, setTotalDistance, removeRun, removePerson } from '../services/stores';
    import { validateAddRun, validateAddPerson } from '../services/validators';

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
                            top = 'none';
                        }
                        if (index === list.length - 1) {
                            bottom = 'none';
                        }
                        const snapVerticalList = entry.target.querySelectorAll('.snap-horizontal');
                        if (snapVerticalList.length > 1) {
                            horizontalRoot = entry.target;
                            horizontalObserver = new IntersectionObserver(onHorizontalIntersection, { threshold: 0.9, root: entry.target });
                            snapVerticalList.forEach(element => horizontalObserver.observe(element));
                            right = 'blue';
                            left = 'blue';
                        }
                    }
                    if (!entry.isIntersecting) {
                        if (index === 0) {
                            top = 'red';
                        }
                        if (index === list.length - 1) {
                            bottom = 'red';
                        }
                        const snapVerticalList = entry.target.querySelectorAll('.snap-horizontal');
                        if (snapVerticalList.length > 1 && horizontalObserver) {
                            snapVerticalList.forEach(element => horizontalObserver.unobserve(element));
                            right = 'none';
                            left = 'none';
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
                            left = 'none';
                        }
                        if (index === list.length - 1) {
                            right = 'none';
                        }
                    }
                    if (!entry.isIntersecting) {
                        if (index === 0) {
                            left = 'blue';
                        }
                        if (index === list.length -1) {
                            right = 'blue';
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
    }
    .top {
        top: -20px;
        transform: rotate(90deg);
        right: 0;
        background-color: var(--color);

    }
    .bottom {
        top: 20px;
        transform: rotate(-90deg);
        right: 0;
        background-color: var(--color);
    }
    .right {
        top: 0;
        transform: rotate(180deg);
        right: -20px;
        background-color: var(--color);
    }
    .left {
        top: 0;
        right: 20px;
        background-color: var(--color);
    }

</style>

<div class="navigation">
        <img class="arrow top" src="./arrow.svg" alt="" style="--color:{top}" />
        <img class="arrow bottom" src="./arrow.svg" alt="" style="--color:{bottom}" />
        <img class="arrow right" src="./arrow.svg" alt="" style="--color:{right}" />
        <img class="arrow left" src="./arrow.svg" alt="" style="--color:{left}" />
</div>