import { Body, Injectable } from "@nestjs/common";
import { AuthDto } from "src/dto/auth.dto";

@Injectable({

})

export class AuthService {

    login(dto : AuthDto) : AuthDto {
        console.log(dto);
        return dto;
    }


    signup() : Object {
        return {mess: 'Bú lỗ đít em'};    
    }

};