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

  if (sortedTodos.length === 0) {
    return (
      <div className="flex flex-col h-full w-full">
        <p className="text-gray-500 text-lg pb-3">
          You have no to-do ^-^ items?!! (ʘᗩʘ’)
        </p>
        <p className="text-gray-500 text-md">
          Cwick on the bwutton at the x3 t-top wight t-to make a to-do?!?1
        </p>
      </div>
    );
  }

  const TodoDetails: React.FC<TodoDetailsProps> = ({
    todo,
    titleColor = "",
    dateColor = "",
  }) => {
    return (
      <div className={` flex items-center w-5/6 ${titleColor}`}>
        <div
          className={`text-sm sm:text-lg lg:text-sm xl:text-md pr-3 ${dateColor} border-2 border-black w-12 sm:w-16 md:w-60 `}
        >
          {todo.due &&
            `${new Date(todo.due).getDate().toString().padStart(2, "0")}/${(
              new Date(todo.due).getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}`}
        </div>
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor={todo.id}
            className="text-sm sm:text-lg lg:text-sm xl:text-md w-36 sm:w-96 md:w-72 lg:w-60 2xl:w-52 3xl:w-72 4xl:w-96 truncate"
          >
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
