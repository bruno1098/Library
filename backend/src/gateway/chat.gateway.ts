
import {OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer, SubscribeMessage} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';


@WebSocketGateway({
    cors:{
        origin: '*',
    },
})

export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{


    private users: Map<string, string> = new Map();
    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket){
        console.log('Cliente conectado');
    }

    handleDisconnect(client: Socket){
        const username = this.users.get(client.id);
        this.users.delete(client.id);
        this.server.emit('userLeft', username);
    }

    @SubscribeMessage('join')
    handlejoin(client: Socket, username: string){

        this.users.set(client.id, username);
        this.server.emit('userJoined', username);
    }

    @SubscribeMessage('message')
    handleMessage(client: Socket, message: string){
        const username = this.users.get(client.id);
        this.server.emit('message', {
            username,
            message,
            timestamp: new Date(),
        })
    }
}