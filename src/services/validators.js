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

export const validateSetTotalDistance = (totalDistance) => {
    if (!state || !totalDistance) {
        return false;
    }
    return totalDistance > 0;
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

export const runTimeErrors = (_state) => {
    const errors = [];
    if (!_state) {
        return errors;
    }
    _state.persons.map(person => {
        person.runs.map(run => {
            if (!run.time || run.time <= 0) {
                errors.push({ name: person.name, distance: run.distance });
            }
        })
    });
    return errors;
}