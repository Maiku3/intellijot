import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { generateImage, generateImagePrompt } from "@/lib/openAI";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { userId } = auth();
    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name } = body;
    const image_prompt = await generateImagePrompt(name);

    if (!image_prompt) {
        return new NextResponse("Error generating image prompt", { status: 500 });
    }

    const image_url = await generateImage(image_prompt);

    if (!image_url) {
        return new NextResponse("Error generating image", { status: 500 });
    }

    // Create new note and store in db
    const note_ids = await db.insert($notes).values({
        name,
        userId,
        imageUrl: image_url
    }).returning({
        insertedId: $notes.id
    });


    return NextResponse.json({
        note_id: note_ids[0].insertedId
    })
}