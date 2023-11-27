import { auth } from "@clerk/nextjs"

export async function POST(req: Request, res: Response) {
    const { userId } = auth()
    if (!userId) {
        return new Response("Unauthorized", { status: 401 })
    }
    
    const body = await req.json()
    const {name} = body
}