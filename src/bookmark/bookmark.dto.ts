import { IsNotEmpty, IsString } from "class-validator";

export class BookmarkDto {

    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsNotEmpty()
    @IsString()
    description: string;
    
    @IsString()
    @IsNotEmpty()
    link: string;

    @IsString()
    @IsNotEmpty()
    userId: string;

}