import { Module } from "@nestjs/common";
import { RefreshToken, RefreshTokenSchema } from "./refreshToken.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { RedisModule } from "src/redis/redis.module";
import { RefreshTokenController } from "./refresgToken.controller";
import { RefreshTokenService } from "./refreshToken.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }]),
        RedisModule
    ],
    controllers: [RefreshTokenController],
    providers: [RefreshTokenService],
})
export class RefreshTokenModule {}