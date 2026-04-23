import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";


// M5: Obtener un chat específico con sus mensajes
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const chat = await db.chat.findUnique({
        where: { id },
        include: {
            messages: {
                orderBy: { createdAt: "asc" }, // mensajes en orden cronológico
            },
        },
    });

    if (!chat) {
        return NextResponse.json({ error: "Chat no encontrado" }, { status: 404 });
    }

    return NextResponse.json(chat);
}

// M6: borrar un chat
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        await db.chat.delete({
            where: { id },
        });
    } catch (e: any) {
        if (e.code === 'P2025') {
            // Chat already deleted or not found
            return NextResponse.json({ success: true });
        }
        throw e;
    }

    return NextResponse.json({ success: true });
}
