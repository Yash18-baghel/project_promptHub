import Prompt from "@/models/prompt";
import Like from "@/models/like";
import { connectToDB } from "@/utils/database";
import { ObjectId } from "mongodb";

export const POST = async (request: Request) => {
    const { userId, promptId, likes } = await request.json();

    try {
        await connectToDB()

        const existingLike = await Like.findOne({ user_id: userId, prompt_id: promptId });

        if (!existingLike) {
            await Like.create({ user_id: userId, prompt_id: promptId });

        } else {
            await Like.deleteOne({ user_id: userId, prompt_id: promptId });
        }
        
        await Prompt.findByIdAndUpdate(
            promptId,
            { $set: { likes: likes } },
            { new: true } // to return the updated document
        )

        return new Response(JSON.stringify("Like updated successfully"), { status: 201 });
    } catch (err) {
        console.log(err);

        return new Response("Failed to like a prompt", { status: 500 });
    }
}