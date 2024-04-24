import { Todo } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";

interface TodoItemProps {
  todos: Todo[];
  onTodosChange: () => Promise<void>;
}

export function TodoItem({ todos, onTodosChange }: TodoItemProps) {
  const update = async (todo: Todo) => {
    await fetch(`/api/todos/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !todo.complete,
        id: todo.id,
      }),
    });
    onTodosChange();
  };

  const sortedTodos = todos.sort((a, b) => {
    const defaultDate = new Date(0);
    const dateA = new Date(a.due || defaultDate);
    const dateB = new Date(b.due || defaultDate);

    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="flex flex-col">
      {sortedTodos.map((todo, index) => (
        <div
          key={todo.id}
          className={`items-top flex w-full justify-between items-center ${
            index < sortedTodos.length - 1
              ? "border-b border-pink-400 pb-3 mb-3"
              : "pb-3"
          }`}
        >
          <div className="flex items-center w-5/6">
            <div className="text-muted-foreground text-md w-16 ">
              {todo.due &&
                `${new Date(todo.due).getDate().toString().padStart(2, "0")}/${(
                  new Date(todo.due).getMonth() + 1
                )
                  .toString()
                  .padStart(2, "0")}`}
            </div>
            <div className="grid gap-1.5 leading-none">
              <label htmlFor={todo.id} className="text-md pb-1 truncate w-56">
                {todo.title}
              </label>
            </div>
          </div>
          <Checkbox
            className="scale-150 mr-2"
            checked={todo.complete}
            onClick={() => update(todo)}
            id={todo.id}
          />
        </div>
      ))}
    </div>
  );
}
