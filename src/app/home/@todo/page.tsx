"use client";

import { TodoItem } from "@/app/components/todos/TodoItem";
import prisma from "@/lib/prisma";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Todo() {
  const { data: session } = useSession();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      if (session?.user?.email) {
        console.log(session.user.email);
        const response = await fetch(`/api/todos`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "User-Email": session.user.email,
          },
        });
        if (response.ok) {
          const userTodos = await response.json();
          setTodos(userTodos);
        }
      }
    };

    fetchTodos();
  }, [session]);

  if (!session || !session.user) {
    return <div>Please sign in to view your todos.</div>;
  }

  return (
    <main className=" flex h-full w-full justify-center items-center">
      <div className="flex flex-col h-full w-full">
        <div className="text-center pb-2">TO-DO</div>
        <ul className="overflow-auto custom-scrollbar pr-2">
          <TodoItem todos={todos} />
        </ul>
      </div>
    </main>
  );
}
