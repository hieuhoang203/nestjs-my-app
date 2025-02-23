import { Module } from "@nestjs/common";
import { AccessToken, AccessTokenSchema } from "./accessToken.chema";
import { MongooseModule } from "@nestjs/mongoose";
import { RedisModule } from "src/redis/redis.module";
import { AccessTokenService } from "./accessToken.service";
import { AccessTokenController } from "./accessToken.controller";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: AccessToken.name, schema: AccessTokenSchema }]),
        RedisModule
    ],
    controllers: [AccessTokenController],
    providers: [AccessTokenService],
})
export class AccessTokenModule {}