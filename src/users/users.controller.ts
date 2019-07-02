import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) { }

    @Get('')
    findAll(): Promise<any> {
        return this.userService.findAllUsers();
    }
    @Post('find-one-by-email')
    findOneByEmail(@Body() body): Promise<any> {
        return this.userService.findUserByEmail(body);
    }
    @Put(':id')
    changeUserInfo(@Param() params, @Body() body): Promise<any> {
        return this.userService.changeUserInfo(params, body);
    }
    @Delete(':id')
    deleteUserById(@Param() params): Promise<any> {
        return this.userService.deleteUserById(params);
    }
}
