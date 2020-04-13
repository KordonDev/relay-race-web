
export const updateTotalDistance = (_totalDistance) => {
    return (store) => ({
        ...store,
        totalDistance: _totalDistance,
    })
}

export const updateAddPerson = (name) => {
    return (store) => {
        const newPerson = {
            name,
            runs: store.runDistances.map(distance => ({ distance, time: undefined})),
        };
        return {
            ...store,
            persons: [ ...store.persons, newPerson],
        }
    }
}

export const updateAddDistance = (newDistance) => {
    return (store) => ({
        ...store,
        runDistances: [ ...store.runDistances, newDistance ].sort((a, b) => a - b),
    })
}

export const updateRunTime = (personName, distance, time) => {
    return (store) => ({
        ...store,
        persons: store.persons.map(person => {
            if (person.name !== personName) {
                return person;
            }
            return {
                ...person,
                runs: person.runs.map(run => {
                    if (run.distance !== distance) {
                        return run;
                    }
                    return {
                        ...run,
                        time,
                    }
                })
            }
        })
    })
}

export const updateRemovePerson = (personName) => {
    return (store) => ({
        ...store,
        persons: store.persons.filter(person => person.name !== personName),
    });
}

export const updateRemoveRun = (distanceToRemove) => {
    return (store) => ({
        ...store,
        runDistances: store.runDistances.filter(distance => distance !== distanceToRemove)
    });
}