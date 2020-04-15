import { writable } from "svelte/store";
import { smallStore } from './data/smallStore';
import { setStoreToValidators } from "./validators";
import { updateCurrentStore, syncStoreRunsToDistance, syncAllStoreRunsToDistance } from './store.utils'
import { updateTotalDistance, updateAddPerson, updateAddDistance, updateRunTime, updateRemovePerson, updateRemoveRun } from './store.updates';

const storageKey = 'stores';
const defaultStore = { selectedStore: 'example', stores: [ smallStore ] };
export const stores = writable(JSON.parse(localStorage.getItem(storageKey)) || defaultStore);
stores.subscribe(val => localStorage.setItem(storageKey, JSON.stringify(val)));
syncAllStoreRunsToDistance(stores);


setStoreToValidators(stores);


export const setTotalDistance = (totalDistance) => {
    stores.update(state => updateCurrentStore(state, updateTotalDistance(totalDistance)));
}

export const addPerson = (name) => {
    stores.update(state => updateCurrentStore(state, updateAddPerson(name)));
}

export const addDistance = (distance) => {
    stores.update(state => updateCurrentStore(state, updateAddDistance(distance)));
    stores.update(state => updateCurrentStore(state, syncStoreRunsToDistance));
}

export const setRunTime = (personName, distance, time) => {
    stores.update(state => updateCurrentStore(state, updateRunTime(personName, distance, time)));
}

export const removePerson = (personName) => {
    stores.update(state => updateCurrentStore(state, updateRemovePerson(personName)));
}

export const removeRun = (distanceToRemove) => {
    stores.update(state => updateCurrentStore(state, updateRemoveRun(distanceToRemove)));
    stores.update(state => updateCurrentStore(state, syncStoreRunsToDistance));
}

export const setSelectedStore = (storeName) => {
    stores.update(state => ({
        ...state,
        selectedStore: storeName,
    }));
}

export const addRelayRace = (storeName) => {
    const newStore = {
        name: storeName,
        totalDistance: 0,
        runDistances: [],
        persons: [],
    };
    stores.update(state => ({
        ...state,
        stores: [ ...state.stores, newStore ],
    }))
}

export const removeRelayRace = (storeName) => {
    stores.update(state => ({
        ...state,
        stores: state.stores.filter(store => store.name !== storeName),
    }))
}