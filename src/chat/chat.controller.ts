import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    // create chat
    return this.chatService.create(createChatDto);
  }

  // get single chat by chatID
  @Get(':chatId')
  findChatsByUserId(@Param('chatId') chatId: string) {
    return this.chatService.findOne(chatId);
  }

  // get all chats for a userId
  @Get()
  findOne() {
    const userId = '477c46e5-e0a9-42b4-bf9c-e7f0107900f3'; // TODO replace with extraction of userId from JWT
    return this.chatService.findAllForUser(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(id);
  }
}
