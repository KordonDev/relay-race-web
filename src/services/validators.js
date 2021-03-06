import { getCurrentStore } from "./store.utils";

let state;
export const setStoreToValidators = (store) => {
    store.subscribe(stores => state = getCurrentStore(stores.stores, stores.selectedStore));
}

export const validateAddRun = (distance) => {
    if (!state || !distance || state.persons.length === 0) {
        return false;
    }
    if (distance < 0) {
        return false;
    }
    return state.persons[0].runs.every(run => run.distance !== distance);
}

export const validateAddPerson = (personName) => {
    if (!state || !personName) {
        return false;
    }
    return state.persons.every(person => person.name !== personName);
}


export const validateAddPersonRunTime = (runTime) => {
    if (!state) {
        return false;
    }
    if (runTime === '') {
        return true;
    }
    return runTime > 0;
}

export const totalDistanceError = (_state) => {
    const totalDistance = _state.totalDistance;
    if (!state || !totalDistance) {
        return [ 'No total distance' ];
    }
    if (totalDistance > 0) {
        return [];
    }
    return [ 'Total distance needs to be more than zero meter' ];
}

export const runTimeErrors = (_state) => {
    const errors = [];
    if (!_state) {
        return errors;
    }
    if (_state.persons.length === 0) {
        errors.push('At least one person should run the relay race.');
    }
    if (_state.persons.length > 0 && _state.persons[0].runs.length === 0) {
        errors.push('At least one split distance is needed');
    }
    _state.persons.map(person => {
        person.runs.map(run => {
            if (!run.time || run.time <= 0) {
                errors.push(`Person ${person.name} has no valid time for distance ${run.distance} meter.`);
            }
        })
    });
    return errors;
}