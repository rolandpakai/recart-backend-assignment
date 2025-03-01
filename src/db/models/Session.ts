import { Schema, model } from "mongoose";
import { Session } from "../../types/Session";

const sessionSchema = new Schema<Session>({
    shopifyCartId: { type: String, required: true, unique: true },
    shopId: { type: Schema.Types.ObjectId, ref: 'Shop', required: true },
    currency: { type: String, required: true},
    updated_at: { type: Date, required: true },
    value: { type: Number, required: false },
    valueUSD: { type: Number, required: false },
    itemCount: { type: Number, required: false },
    line_items: [{
        product_id: { type: String, required: false },
        productName: { type: String, required: false },
        quantity: { type: Number, required: false },
        price: { type: Number, required: false }
    }], 
});

export const SessionModel = model<Session>('Session', sessionSchema);
