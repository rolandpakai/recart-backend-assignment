import { Schema, model } from "mongoose";
import { Shop } from "../../types/Shop";

const shopSchema = new Schema<Shop>({
    url: { type: String, required: true},
    currency: { type: String, required: true},
});

export const ShopModel = model<Shop>('Shop', shopSchema);