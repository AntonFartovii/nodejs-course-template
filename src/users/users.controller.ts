import {
  Body, ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/updatePasswordDto';

@Controller('user')
export class UsersController {
  constructor(
    private readonly userService: UsersService ) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<User[] | void> {
    return this.userService.getAll()
  }

  @Get(':id')
  async getOne(@Param('id', new ParseUUIDPipe({ version: '4'})) id: string): Promise<User | void> {
    return await this.userService.getById( id )
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<User | string> {
    return await this.userService.create( createUserDto )
  }

  @Put(':id')
  async update(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('id',  new ParseUUIDPipe({ version: '4'})) id: string): Promise<User | string> {
    return await this.userService.update( updatePasswordDto, id )
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id',  new ParseUUIDPipe({ version: '4'})) id:string) {
    return await this.userService.remove( id )
  }


}
