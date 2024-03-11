import { NewTodo } from "@/app/components/todos/NewTodo";
import { TodoItem } from "@/app/components/todos/TodoItem";
import prisma from "@/lib/prisma";

export default async function Todo() {
  const todos = await prisma.todo.findMany();

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
