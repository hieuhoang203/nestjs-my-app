import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type AccessTokenDocument = AccessToken & Document;

@Schema({
    timestamps: true,
})
export class AccessToken {

    @Prop({ required: true })
    userId: string;
    
    @Prop({ required: true })
    token: string;

    @Prop({ required: true , default: Date.now })
    createDate: Date;
    
    @Prop({ required: true })
    expiresAt: Date;

}

export const AccessTokenSchema = SchemaFactory.createForClass(AccessToken);