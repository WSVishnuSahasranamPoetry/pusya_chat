import { getServerSession } from "next-auth"
import { authOptions } from "../lib/auth"
import { redirect } from "next/navigation";
import Form from "../components/Form";
import prisma from "@/app/lib/db";
import ChatComponent from "../components/Chat";

async function getData() {
    const data = await prisma.message.findMany({
        select: {
            message: true,
            id: true,
            User: {
                select:{
                    name: true,
                    image: true
                }
            },
            createdAt: true,

        },
        orderBy: {
            createdAt: "asc"
        },
        take: 50
    })

    return data;
}


export default async function ChatHomePage () {

    const session = await getServerSession(authOptions);

    if(!session) {
        redirect("/");
    };

    const data = await getData();

    return (
        <div className="h-screen bg-gray-200 flex flex-col">
            <ChatComponent data={data as any} userName={session.user?.name}/>
            <Form />
        </div>
    )
}