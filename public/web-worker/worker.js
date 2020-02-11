self.addEventListener('message', function(e) {
    self.postMessage(e.data);
}, false);
/*
    Das navigator-Objekt
    Das location-Objekt (schreibgeschützt)
    XMLHttpRequest
    setTimeout()/clearTimeout() und setInterval()/clearInterval()
    Den Anwendungscache
    Import externer Skripts mithilfe der importScripts()-Methode
    Erzeugen weiterer Web Worker
*/