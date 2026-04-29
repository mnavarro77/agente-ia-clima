import {
    streamText,
    UIMessage,
    convertToModelMessages,
    tool,
    stepCountIs,
} from 'ai';
import { z } from 'zod';
import { gateway } from '@ai-sdk/gateway';
import { db } from '@/lib/prisma';

export async function POST(req: Request) {
    const body = await req.json();
    const { messages, id }: { messages: UIMessage[], id?: string } = body;
    
    // Si useChat no manda id explícito, usamos el id del primer mensaje o uno por defecto
    const chatId = id || (messages.length > 0 ? messages[0].id : 'new-chat');

    if (messages.length > 0 && messages[0].role === 'user') {
        const msg = messages[0] as any;
        let firstMessage = typeof msg.content === 'string' ? msg.content : '';
        if (!firstMessage && Array.isArray(msg.parts)) {
            const textPart = msg.parts.find((p: any) => p.type === 'text');
            if (textPart) firstMessage = textPart.text || '';
        }
        
        const title = firstMessage.length > 50 ? firstMessage.substring(0, 50) + '...' : firstMessage || 'Nuevo Chat';
        
        try {
            await db.chat.upsert({
                where: { id: chatId },
                update: { title },
                create: { id: chatId, title }
            });
        } catch (error) {
            console.error("Error guardando el titulo del chat:", error);
        }
    }

    const result = streamText({
        model: gateway('openai/gpt-5.3-chat'),
        messages: await convertToModelMessages(messages),
        stopWhen: stepCountIs(5),
        tools: {
            weather: tool({
                description: 'Get the weather in a location (fahrenheit)',
                inputSchema: z.object({
                    location: z.string().describe('The location to get the weather for'),
                }),
                execute: async ({ location }) => {
                    const temperature = Math.round(Math.random() * (90 - 32) + 32);
                    return {
                        location,
                        temperature,
                    };
                },
            }),
            convertFahrenheitToCelsius: tool({
                description: 'Convert a temperature in fahrenheit to celsius',
                inputSchema: z.object({
                    temperature: z
                        .number()
                        .describe('The temperature in fahrenheit to convert'),
                }),
                execute: async ({ temperature }) => {
                    const celsius = Math.round((temperature - 32) * (5 / 9));
                    return {
                        celsius,
                    };
                },
            }),
        },
        async onFinish({ text, toolCalls, toolResults }) {
            // Save messages if chatId is provided
            if (id) {
                // Here you would implement saving the user's message and the AI's response to the DB
            }
        }
    });

    return result.toUIMessageStreamResponse();
}
