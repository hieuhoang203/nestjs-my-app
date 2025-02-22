import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt'
) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: '3QMcngqTR+PhkMpNNUDSbWB3rp5fMQubZsBFgLw8EgSkKVby8XQdqP7dLYvyzWQc',
        });
    }

    async validate(payload: any) {
        return 'hi';
    }
}