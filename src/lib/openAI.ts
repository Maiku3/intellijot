import { Configuration, OpenAIApi } from 'openai-edge';

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function generateImagePrompt(noteName: string) {
    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: "system",
                    content: `You are a creative prompt engineer that writes image prompts for the DALLE AI to generate images that is used as a thumbnail for a notebook. `,
                },
                {
                    role: "user",
                    content: `Please generate an image prompt for the thumbnail of my notebook called ${noteName}`,
                }
            ],
        });
        const data = await response.json();
        const image_prompt = data.choices[0].message.content;
        return image_prompt as string;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function generateImage(image_prompt: string) {
    try {
        const response = await openai.createImage({
            prompt: image_prompt,
            n: 1,
            size: '256x256'
        });
        const data = await response.json();
        const image_url = data.data[0].url;
        return image_url as string;
    } catch (error) {
        console.error(error);
    }
}