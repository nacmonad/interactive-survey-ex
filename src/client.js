import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';

export const socket = io('http://localhost:3030');
export const client = feathers().configure(socketio(socket));
