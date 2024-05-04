import { Schema, model, models } from "mongoose";

const LikeSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "user_id is required!"],
    },
    prompt_id: {
        type: Schema.Types.ObjectId,
        ref: 'Prompt',
        required: [true, "prompt_id is required!"],
    },
}, { timestamps: true })

const Like = models.Like || model('Like', LikeSchema)

export default Like;