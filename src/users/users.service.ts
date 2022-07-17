import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { User, UserEntity } from './users.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/updatePasswordDto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private db: DbService<User>) {}

  async getAll() {
    return this.db.findAll();
  }

  async getById(id: string) {
    return this.db.findOne(id);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const item: User = {
      ...createUserDto,
      id: uuidv4(),
      version: 1,
      createdAt: +Date.now(),
      updatedAt: +Date.now(),
    };

    return await this.db.create(new UserEntity(item));
  }

  async update(updatePasswordDto: UpdatePasswordDto, id: string) {
    // 404
    const user = this.db.findOne(id);
    if (!user) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    // 403 200
    const { oldPassword, newPassword } = updatePasswordDto;

    if (oldPassword !== user.password) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }

    const newUser = new UserEntity({
      id: user.id,
      login: user.login,
      password: newPassword,
      version: user.version + 1,
      createdAt: user.createdAt,
      updatedAt: +Date.now(),
    });

    this.db.remove(id);

    return await this.db.create(newUser);
  }

  async remove(id: string) {
    return this.db.remove(id);
  }
}
