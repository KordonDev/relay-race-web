import { writable } from "svelte/store";

export const store = writable(JSON.parse(localStorage.getItem('store')) || {
// export const store = writable({
    totalDistance: 150,
    persons: [{
        name: 'Person A',
        runs: [{
            distance: 50, time: undefined,
        },{
            distance: 100, time: undefined,
        }, {
            distance: 150, time: undefined,
        }, {
            distance: 200, time: undefined,
        }]
    }, {
        name: 'Person B',
        runs: [{
            distance: 50, time: undefined,
        },{
            distance: 100, time: undefined,
        }, {
            distance: 150, time: undefined,
        }, {
            distance: 200, time: undefined,
        }]
    }, {
        name: 'Person C',
        runs: [{
            distance: 50, time: undefined,
        },{
            distance: 100, time: undefined,
        }, {
            distance: 150, time: undefined,
        }, {
            distance: 200, time: undefined,
        }]
    }, {
        name: 'Person D',
        runs: [{
            distance: 50, time: undefined,
        },{
            distance: 100, time: undefined,
        }, {
            distance: 150, time: undefined,
        }, {
            distance: 200, time: undefined,
        }]
    }]
});
store.subscribe(val => localStorage.setItem("store", JSON.stringify(val)));

export const setTotalDistance = (_totalDistance) => {
    store.update(state => {
        return {
            ...state,
            totalDistance: _totalDistance,
        };
    });
}

export const addPerson = (name) => {
    store.update(state => {
        const newPerson = {
            name,
            runs: state.persons[0].runs.map(run => ({ distance: run.distance, time: undefined})),
        };
        return {
            ...state,
            persons: [ ...state.persons, newPerson ],
        };
    });
}

export const addDistance = (distance) => {
    store.update(state => {
        return {
            ...state,
            persons: state.persons.map(person => {
                const allRuns = [ ...person.runs ];
                allRuns.push({ distance, time: undefined });

                return {
                    name: person.name,
                    runs: allRuns.sort((a, b) => a.distance - b.distance),
                };
            })
        };
    })
}

export const updateRunTime = (personName, distance, time) => {
    store.update(state => {
        return {
            ...state,
            persons: state.persons.map(person => {
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
            }),
        }
    })
}