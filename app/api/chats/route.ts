import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";


// M3: Listar todos los chats, ordenados por fecha (más reciente primero)
export async function GET() {
    let chats = await db.chat.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            messages: {
                take: 1,              // solo el último mensaje como preview
                orderBy: { createdAt: "desc" },
            },
        },
    });
    return NextResponse.json(chats);
}


// M4: Crear un nuevo chat
export async function POST(req: Request) {
    const body = await req.json();

    const chat = await db.chat.create({
        data: {
            title: body.title ?? null, // título opcional
        },
    });

    return NextResponse.json(chat, { status: 201 });
}


// M7: guardar mensajes de un chat
export async function PUT(req: Request) {
    const body = await req.json();

    const chat = await db.chat.update({
        where: { id: body.chatId },
        data: {
            messages: {
                create: body.messages,
            },
        },
    });

    return NextResponse.json(chat);
}