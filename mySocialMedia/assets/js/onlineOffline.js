document.getElementById('status').innerHTML = navigator.onLine ? 'online' : 'offline';
let state = navigator.onLine ? 'online' : 'offline';
localStorage.setItem('connectionStatus', state);

let statusElement = document.getElementById('status');
var target = document.getElementById('target');

function updateStatusFromLocalStorage() {
    state = localStorage.getItem('connectionStatus');

    if (state) {
        // Remover ambas as classes antes de adicionar uma nova
        statusElement.classList.remove('online', 'offline');

        if (state === 'online') {
            statusElement.textContent = 'online';
            statusElement.classList.add("online");
        } else {
            statusElement.textContent = 'offline';
            statusElement.classList.add('offline');
        }
    }
}

function handleStateChange(event) {
    var newState = document.createElement('p');
    var state = event.type === 'online' ? 'online' : 'offline';

    // Armazene o status no localStorage apenas se ele mudar
    if (state !== localStorage.getItem('connectionStatus')) {
        localStorage.setItem('connectionStatus', state);
        window.location.reload();
    }
}

// Atualize o elemento de status na carga da página
updateStatusFromLocalStorage();

window.addEventListener('online', handleStateChange);
window.addEventListener('offline', handleStateChange);
