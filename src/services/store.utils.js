
export const getCurrentStore = (stores, currentStoreName, fallback) => {
    const currentStore = stores.find(store => store.name === currentStoreName);
    if (currentStore) {
        return currentStore;
    }

    if (fallback) {
        fallback(stores[0].name);
    }
    return stores[0];
}

export const updateCurrentStore = (state, update) => ({
    ...state,
    stores: state.stores.map(store => store.name === state.selectedStore ? update(store) : store)
});

export const syncAllStoreRunsToDistance = (stores) => {
    stores.update(state => ({
        ...state,
        stores: state.stores.map(store => syncStoreRunsToDistance(store)),
    }))
}

export const syncStoreRunsToDistance = (store) => ({
    ...store,
    persons: store.persons.map(person => ({
        ...person,
        runs: store.runDistances.map(distance => ({
            distance,
            time: person.runs.find(run => run.distance === distance) ? person.runs.find(run => run.distance === distance).time : undefined
        })).sort((a, b) => a.distance - b.distance)
    })),
})

