import { generateImagePrompt } from "@/lib/openAI"
import { auth } from "@clerk/nextjs"

export async function POST(req: Request, res: Response) {
    const { userId } = auth()
    if (!userId) {
        return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const {name} = body
    const image_prompt = await generateImagePrompt(name)
    console.log(image_prompt)
    return new Response("ok")
}