import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ChatService } from 'src/chat/chat.service';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly messageService: MessageService,
    private readonly chatService: ChatService,
  ) {}

  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('MessageGateway');

  afterInit() {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  async handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('messageToServer')
  async handleMessage(
    _: Socket,
    createMessageDto: CreateMessageDto,
  ): Promise<void> {
    const message = await this.messageService.create(createMessageDto);
    this.server.in(createMessageDto.chatId).emit('messageToClient', message);
  }

  @SubscribeMessage('join')
  async initializeRoom(
    @MessageBody('chatId') chatId: string,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.join(chatId);
    const chat = await this.chatService.findOne(chatId);
    return chat;
  }
}
