"use client";

import Image from "next/image";
import Pusher from "pusher-js";
import { useEffect, useRef, useState } from "react";

interface ChatComponentProps {
  data: {
    User: {
      image: string | null;
      name: string | null;
    };
    message: string;
    createdAt: any;
  }[];
  userName: string | null | undefined;
}

export default function ChatComponent({ data, userName }: ChatComponentProps) {
  
  const [totalComments, setTotalComments] = useState(data);

  const messageOwner = userName;

  const messageEndRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
      cluster: "eu",
    });

    var channel = pusher.subscribe("chat");
    channel.bind("hello", function (data: any) {
      const parsedComments = JSON.parse(data.message);
      setTotalComments((prev) => [...prev, parsedComments]);
    });

    return () => {
      pusher.unsubscribe("chat");
    };
  }, []);

  const correctScrollToBot = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    correctScrollToBot();
  }, [totalComments]);

  return (
    <div className="p-7 flex-grow overflow-y-auto py-32 max-h-screen">
      <div className="flex flex-col gap-4">
        {totalComments.map((messageEl, index) => {
          if (messageOwner !== messageEl.User.name) {
            return (
              <div key={index}>
                <div className="flex items-end">
                  <Image
                    src={messageEl.User.image as string}
                    alt="avatar"
                    className="w-12 h-12 object-cover rounded-lg mr-4"
                    width={50}
                    height={50}
                  />
                  <div className="rounded-lg max-w-2xl bg-white px-4 py-2 md:py-3 md:px-8 text-sm md:text-base shadow-md self-start">
                    {messageEl.message}
                  </div>
                </div>
                <p className="font-light text-sm text-gray-600">
                  {messageEl.User.name}
                </p>
              </div>
            );
          } else {
            return (
              <div className="flex justify-end" key={index}>
                <div className="flex items-end">
                  <div className="rounded-lg max-w-2xl bg-teal-400/70 px-4 py-2 md:py-3 md:px-8 text-sm md:text-base shadow-md self-start">
                    {messageEl.message}
                  </div>
                    <Image
                    src={messageEl.User.image as string}
                    alt="avatar"
                    className="w-12 h-12 ml-4 object-cover rounded-lg"
                    width={50}
                    height={50}
                    />                              
                </div>
              </div>
            );
          }
        })}
        <div ref={messageEndRef}></div>
      </div>
    </div>
  );
}
