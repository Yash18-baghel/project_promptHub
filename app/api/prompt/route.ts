import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database"

export const GET = async (request: any) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find({}).populate('creator').exec();

        return new Response(
            JSON.stringify(prompts),
            { status: 200 }
        )
    } catch (error) {
        return new Response(
            "Failed to fecth all Prompts",
            { status: 500 }
        )
    }

}