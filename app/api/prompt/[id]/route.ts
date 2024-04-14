import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";

// GET (read)
export const GET = async (request: any, { params }: { params: any }) => {
    try {

        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');

        if (!prompt) new Response("Prompt not Found", { status: 404 });

        return new Response(
            JSON.stringify(prompt),
            { status: 200 }
        )
    } catch (error) {
        console.log(error);

        return new Response(
            "Failed to Fetch Prompts",
            { status: 500 }
        )
    }

}

// PATCH (update)
export const PATCH = async (request: any, { params }: { params: any }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) return new Response("Prompt not Found", { status: 404 });

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(
            JSON.stringify(existingPrompt),
            { status: 201 }
        )

    } catch (error) {
        console.log(error);
        return new Response(
            "Failed to Update Prompt",
            { status: 500 }
        )
    }
}


// DELETE (delete)
export const DELETE = async (request: any, { params }: { params: any }) => {

    try {
        await connectToDB();

        await Prompt.findByIdAndDelete(params.id);

        return new Response(
            "Prompt Deleted",
            { status: 200 }
        )

    } catch (error) {
        console.log(error);
        return new Response(
            "Failed to  delete Prompt",
            { status: 500 }
        )
    }
}
