"use client";

import { useRouter } from "next/navigation";
import { Todo } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";

export function TodoItem({ todos }: { todos: Todo[] }) {
  const router = useRouter();
  const update = async (todo: Todo) => {
    await fetch(`/api/todo/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !todo.complete,
      }),
    });
    router.refresh();
  };

  const deleteTodo = async (todo: Todo) => {
    await fetch(`/api/todo/${todo.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: todo.id,
      }),
    });

    router.refresh();
  };

  return (
    <div>
      {todos.map((todo) => {
        const id = todo.id;
        const title = todo.title;
        const checked = todo.complete;
        const content = todo.content;

        return (
          <div key={id} className="items-top flex space-x-2 pb-2">
            <Checkbox checked={checked} onChange={() => update(todo)} id={id} />
            <div className="grid gap-1.5 leading-none">
              <label htmlFor={id} className="text-md">
                {title}
              </label>
              <p className="text-sm text-muted-foreground">{content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
