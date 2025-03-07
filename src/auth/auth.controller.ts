import { Body, Controller, Param, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "src/auth/auth.dto";
import { UserDto } from "src/user/user.dto";

@Controller('auth')

export class AuthController {

    constructor(private authService:AuthService) {}

    @Post('signup')
    signup(@Body() dto : UserDto) {
        return this.authService.signup(dto); 
    }

    @Post('signin')
    signin(@Body() dto : AuthDto, @Param('rememberPass') rememberPass : boolean) {
        return this.authService.login(dto, rememberPass);
    }   

};