import { Module } from '@nestjs/common';
import { Bookmark, BookmarkSchema } from './bookmark.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { RedisModule } from 'src/redis/redis.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Bookmark.name, schema: BookmarkSchema }]),
        RedisModule
    ],
    controllers: [BookmarkController],
    providers: [BookmarkService]
})

export class BookmarkModule { }
