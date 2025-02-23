import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AccessToken, AccessTokenDocument } from "./accessToken.chema";
import { Model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AccessTokenService {

    constructor(@InjectModel(AccessToken.name) private accessTokenModel : Model<AccessTokenDocument> ) {}
    
}