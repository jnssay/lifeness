import { NewTodo } from "@/app/components/todos/NewTodo";
import { TodoItem } from "@/app/components/todos/TodoItem";
import prisma from "@/lib/prisma";

export default async function Todo() {
  const todos = await prisma.todo.findMany();

  return (
    <main className=" flex h-full w-full justify-center items-center">
      <div className="flex flex-col h-full w-full">
        <div className="text-center">TO-DO</div>
        <ul>
          <TodoItem todos={todos} />
        </ul>
      </div>
    </main>
  );
}
