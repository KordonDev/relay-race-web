const subworker = new Worker('/web-worker/sub-worker.js');

subworker.addEventListener('message', function(e) {
    console.log('Subworker said: ', e.data);
    self.postMessage(e.data);
}, false);

self.addEventListener('message', function(e) {
    subworker.postMessage('Hello World'); // Send data to our worker.
}, false);

const calculateRelayRaces = (persons, personPosition, currentRuns, targetDistance, fastestRelayRace) => {

    // Abbruchbedingung
    if (persons.length  >= personPosition) {
        const completeRelayRace = currentRuns.reduce((prev, current) => {
            return {
                distance: prev.distance + current.distance,
                duration: prev.duration + current.duration,
            };
        }, { distance: 0, duration: 0 });
        if (completeRelayRace.distance === targetDistance && completeRelayRace.duration < fastestRelayRace.duration) {
            return completeRelayRace;
        }
        return completeRelayRace;
    }

    // Recursion step
    let _fastestRelayRace = fastestRelayRace;
    const person = persons[personPosition];
    for (run in person.run) {
        currentRuns.push(run);
        _fastestRelayRace = calculateRelayRaces(persons, personPosition +1, currentRuns, targetDistance, _fastestRelayRace);
        currentRuns.pop();
    }

    return _fastestRelayRace;
}
/*
interface Run {
    distance: number;
    duration: number;
    name: String;
}

interface Person {
    runs: Run[];
}

interface RelayRace {
    distance: number;
    duration: number;
    runs: Runs[]
}
*/