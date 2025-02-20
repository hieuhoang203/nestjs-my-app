import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import e from "express";
import { UserDto } from "src/dto/user.dto";
import { UserService } from "./user.service";
import { User } from "./user.schema";

@Controller('user')

export class UserController {

    constructor(private readonly userServive:UserService) {}

    @Post('save')
    create(@Body() dto : UserDto) : Promise<User> {
        return this.userServive.create(dto);
    }

    @Get('')
    findAll() : Promise<User[]> {
        return this.userServive.findAll();
    }

    @Get('/detail/:id')
    detail(@Param("id") id : string) : Promise<User> {
        return this.userServive.detail(id);
    }

    @Patch('/update/:id')
    update(@Param("id") id : string, @Body() dto : UserDto) : Promise<User> {
        return this.userServive.update(id, dto);
    }

    @Delete('/delete/:id')
    delete(@Param("id") id : string) : Promise<User> {
        return this.userServive.delete(id);
    }  

};