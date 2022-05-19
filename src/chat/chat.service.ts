import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    private userService: UserService,
  ) {}

  async create(createChatDto: CreateChatDto) {
    // initialize chat
    let newChat: Chat = new Chat();
    newChat = this.chatRepository.create(newChat);
    const newChatWithId = await this.chatRepository.save(newChat);
    newChatWithId.users = [];
    for (const username of createChatDto.usernames) {
      const user = await this.userService.findOneByUsername(username);
      newChatWithId.users.push(user);
    }
    return this.chatRepository.save(newChatWithId);
  }

  findAllForUser(userId: string) {
    return this.chatRepository.find({
      where: { users: { id: userId } },
      relations: ['users'],
    });
  }

  findOne(chatId: string) {
    return this.chatRepository.findOne({
      where: { id: chatId },
      relations: ['messages', 'users'],
    });
  }

  async update(chatId: string, updateChatDto: UpdateChatDto) {
    const chat = await this.findOne(chatId);
    for (const username of updateChatDto.usernames) {
      const user = await this.userService.findOneByUsername(username);
      chat.users.push(user);
    }
    return this.chatRepository.update(chatId, chat);
  }

  remove(id: string) {
    return this.chatRepository.delete(id);
  }
}
