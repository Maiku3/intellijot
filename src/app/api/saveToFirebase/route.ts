import { db } from "@/lib/db"
import { $notes } from "@/lib/db/schema"
import { uploadImageToFirebase } from "@/lib/firebase"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { noteId } = await req.json()
        const note = await db.select().from($notes).where(eq($notes.id, parseInt(noteId)))

        if(!note[0].imageUrl) {
            return new NextResponse('No image found', {status: 404})
        }

        const firebase_url = await uploadImageToFirebase(note[0].imageUrl, note[0].name, note[0].id.toString())
        await db.update($notes).set({
            imageUrl: firebase_url
        }).where(eq($notes.id, parseInt(noteId)))
        return new NextResponse('Success', {status: 200})
    } catch (error) {
        console.error(error)
        return new NextResponse('Error', {status: 500})
    }
}