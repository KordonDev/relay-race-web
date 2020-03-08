let state;
export const setStoreToValidators = (store) => {
    store.subscribe(val => state = val);
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
    _state.persons.map(person => {
        person.runs.map(run => {
            if (!run.time || run.time <= 0) {
                errors.push(`Person ${person.name} has no valid time for distance ${run.distance} meter.`);
            }
        })
    });
    return errors;
}