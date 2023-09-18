import io from 'socket.io-client';

const socket = io.connect('https://api.goxx.ru', {
    path: '/market-ws',
    transports: ['websocket']
});

socket.on('close', (reason) => {
    console.log('Соединение закрыто:', reason);
});

socket.on('disconnect', (reason) => {
    console.log('[socket] Disconnected:', reason);
});

socket.on('error', (error) => {
    console.log('[socket] Error:', error);
});

export default socket;
