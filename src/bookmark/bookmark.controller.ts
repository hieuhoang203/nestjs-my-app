import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { BookmarkService } from "./bookmark.service";
import { BookmarkDto } from "./bookmark.dto";
import { Bookmark } from "./bookmark.schema";

@Controller('bookmark')
export class BookmarkController {

    constructor(private readonly bookmarkService:BookmarkService) {}

    @Post('save')
    create(@Body() dto : BookmarkDto) : Promise<Bookmark> {
        return this.bookmarkService.createBookmark(dto);
    }

    @Patch('update/:id')
    update(@Body() dto : BookmarkDto, @Param('id') id : string) : Promise<Bookmark> {
        return this.bookmarkService.updateBookmark(id, dto);
    }

    @Delete('delete/:id')
    delete(@Param('id') id : string) : Promise<Bookmark> {
        return this.bookmarkService.deleteBookmark(id);
    }

    @Get('')
    findAll() : Promise<Bookmark[]> {
        return this.bookmarkService.getAllBookmarks();
    }

    @Get('detail/:id')
    detail(@Param('id') id : string) : Promise<Bookmark> {
        return this.bookmarkService.getBookmark(id);
    }

    @Get('user/:userId')
    getBookmarksByUser(@Param('userId') userId : string) : Promise<Bookmark[]> {
        return this.bookmarkService.getBookmarksByUser(userId);
    }
    
}