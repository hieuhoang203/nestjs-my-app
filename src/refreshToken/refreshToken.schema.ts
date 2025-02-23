import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type RefreshTokenDocument = RefreshToken & Document;

@Schema({
    timestamps: true,
})
export class RefreshToken {
    
    @Prop({ required: true })
    userId: string;
    
    @Prop({ required: true })
    token: string;

    @Prop({ required: true , default: Date.now })
    createDate: Date;
    
    @Prop({ required: true })
    expiresAt: Date;

}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);