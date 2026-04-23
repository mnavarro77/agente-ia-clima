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
    const { messages, id }: { messages: UIMessage[], id?: string } = await req.json();

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
