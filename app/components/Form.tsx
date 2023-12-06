"use client"

import { useRef } from "react"
import { postData } from "../action"
import { SendMessageButton } from "./Buttons"

export default function Form() {

    const formRef = useRef<HTMLFormElement>(null);

    return (
        <form ref={formRef} action={async (formData) => {
            await postData(formData);
            formRef.current?.reset();
        }} className="p-6 fixed w-full bottom-0 left-0 bg-white">
            <div className="flex">
                <input 
                    type="text"
                    name="message"
                    placeholder="Введите ваще сообщение..."
                    className="flex-grow py-2 px-4 outline-none"
                />
                <SendMessageButton />
            </div>
        </form>
    )
}