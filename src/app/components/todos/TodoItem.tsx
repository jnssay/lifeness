import { Todo } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Spinner } from "../Spinner";

interface TodoItemProps {
  todos: Todo[];
  onTodosChange: () => Promise<void>;
}

interface LoadingState {
  [key: string]: boolean;
}

interface TodoDetailsProps {
  todo: Todo;
  titleColor?: string;
  dateColor?: string;
}

export function TodoItem({ todos, onTodosChange }: TodoItemProps) {
  const [loadingState, setLoadingState] = useState<LoadingState>({});
  const { toast } = useToast();
  const update = async (todo: Todo) => {
    setLoadingState((prevState) => ({ ...prevState, [todo.id]: true }));
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
    toast({
      description: "( ´ ∀ `)ノ～ ♡",
      title: `todo item "${todo.title}" is compwete?!?1`,
      className: "bg-pink-300",
    });
    onTodosChange();
  };

  const sortedTodos = todos.sort((a, b) => {
    const defaultDate = new Date(0);
    const dateA = new Date(a.due || defaultDate);
    const dateB = new Date(b.due || defaultDate);

    return dateA.getTime() - dateB.getTime();
  });

  const TodoDetails: React.FC<TodoDetailsProps> = ({
    todo,
    titleColor = "",
    dateColor = "",
  }) => {
    return (
      <div className={`flex items-center w-5/6 ${titleColor}`}>
        <div className={`text-md w-16 ${dateColor} `}>
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
    );
  };

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
          {loadingState[todo.id] ? (
            <>
              <TodoDetails
                todo={todo}
                titleColor="text-gray-500"
                dateColor="text-gray-400"
              />
              <Spinner className="text-pink-500 mr-2" />
            </>
          ) : (
            <>
              <TodoDetails todo={todo} dateColor="text-muted-foreground" />
              <Checkbox
                className="scale-150 mr-2"
                checked={todo.complete}
                onClick={() => update(todo)}
                id={todo.id}
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
}
