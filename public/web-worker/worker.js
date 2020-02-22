/*
const subworker = new Worker('/web-worker/sub-worker.js');

subworker.addEventListener('message', function(e) {
    console.log('Subworker said: ', e.data);
    self.postMessage(e.data);
}, false);

self.addEventListener('message', function(e) {
    subworker.postMessage(e.data); // Send data to our worker.
}, false);
*/

self.addEventListener('message', function(e) {
    const data = e.data;
    const relayRace = calculateRelayRaces(data.persons, 0, [], data.totalDistance, undefined);
    self.postMessage(relayRace);
}, false)

const calculateRelayRaces = (persons, personPosition, currentRuns, targetDistance, fastestRelayRace) => {
    // Abbruchbedingung
    if (persons.length  <= personPosition) {
        const completeRelayRace = currentRuns.reduce((prev, current) => {
            return {
                ...prev,
                distance: prev.distance + current.distance,
                time: prev.time + current.time,
            };
        }, { distance: 0, time: 0, runs: currentRuns.map(run => ({ ...run })) });

        if (completeRelayRace.distance === targetDistance && (fastestRelayRace === undefined || completeRelayRace.time < fastestRelayRace.time)) {
            return completeRelayRace;
        }
        return fastestRelayRace;
    }

    // Recursion step
    let _fastestRelayRace = fastestRelayRace;
    const person = persons[personPosition];
    for (run of person.runs) {
        currentRuns.push(run);
        _fastestRelayRace = calculateRelayRaces(persons, personPosition +1, currentRuns, targetDistance, _fastestRelayRace);
        currentRuns.pop();
    }

    return _fastestRelayRace;
}
/*
interface Run {
    distance: number;
    time: number;
    name: String;
}

interface Person {
    runs: Run[];
}

interface RelayRace {
    distance: number;
    time: number;
    runs: Runs[]
}
*/