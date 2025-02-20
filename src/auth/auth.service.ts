import { Injectable } from "@nestjs/common";
import { AuthDto } from "src/dto/auth.dto";
import * as argon from 'argon2';

@Injectable()

export class AuthService {

    login(dto : AuthDto) : AuthDto {
        const hash = argon.hash(dto.password);
        
        return dto;
    }


    signup() : Object {
        return {mess: 'Bú lỗ đít em'};    
    }

};