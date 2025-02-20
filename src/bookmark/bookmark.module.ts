import { Module } from '@nestjs/common';
import { Bookmark, BookmarkSchema } from './bookmark.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';

@Module({
    imports: [MongooseModule.forFeature([{name: Bookmark.name, schema: BookmarkSchema}])],
    controllers: [BookmarkController],
    providers: [BookmarkService]
})

export class BookmarkModule {}
