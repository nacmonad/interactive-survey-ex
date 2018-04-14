import io from 'socket.io-client';
//import feathers from '@feathersjs/client';
//import socketio from '@feathersjs/socketio-client';

export const socket = io('http://ec2-52-15-175-91.us-east-2.compute.amazonaws.com/');
export const client = window.feathers().configure(window.feathers.socketio(socket));
