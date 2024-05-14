"use client";

import { TodoItem } from "@/app/components/todos/TodoItem";
import { format, parseISO } from "date-fns";
import {
  Pencil2Icon,
  PaperPlaneIcon,
  Cross1Icon,
  CalendarIcon,
} from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { CustomSpinner } from "@/app/components/CustomSpinner";

interface Todo {
  id: string;
  title: string;
  content: string | null;
  due: Date;
  complete: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function Todo() {
  const { data: session } = useSession();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [showInput, setShowInput] = useState(false);
  const [date, setDate] = useState<Date>();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [dateSetUsingPicker, setDateSetUsingPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTodoLoading, setIsTodoLoading] = useState(false);
  const { toast } = useToast();

  const refreshTodos = async () => {
    const response = await fetch("/api/todos");
    const data = await response.json();
    setTodos(data);
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setDateSetUsingPicker(true);
      setPopoverOpen(false);
    }
  };

  const handlePencilClick = () => {
    setNewTodo("");
    setShowInput(!showInput);
    setDate(new Date());
    setDateSetUsingPicker(false);
  };

  const formattedDate =
    dateSetUsingPicker && date
      ? `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`
      : "";

  useEffect(() => {
    const fetchTodos = async () => {
      setIsTodoLoading(true);
      if (session?.user?.uid) {
        const response = await fetch(`/api/todos`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "User-Id": session.user.uid,
          },
        });
        if (response.ok) {
          const userTodos = await response.json();
          setTodos(userTodos);
          setIsTodoLoading(false);
        }
      }
    };

    fetchTodos();
  }, [session]);

  const handleAddTodo = async () => {
    if (
      !session ||
      !session.user ||
      typeof session.user.uid !== "string" ||
      !session.user.uid.trim()
    ) {
      console.error("User is not logged in or email is not available.");
      return;
    }

    if (!newTodo.trim()) {
      toast({
        title: `Your todo item is empty!`,
        description: `(ノಠ益ಠ)ノ彡┻━┻`,
        className: "bg-pink-300",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Id": session.user.uid,
        },
        body: JSON.stringify({
          title: newTodo,
          due: date,
        }),
      });

      if (response.ok) {
        const addedTodo = await response.json();
        const formattedDueDate = format(
          parseISO(addedTodo.due),
          "MMMM dd"
        ).toLowerCase();
        setTodos((prevTodos) => [...prevTodos, addedTodo]);
        setNewTodo("");
        toast({
          title: `Added "${addedTodo.title}" to the todo list!`,
          description: `Due on ${formattedDueDate}`,
          className: "bg-pink-300",
        });
      } else {
        console.error("Failed to add todo, server responded with an error.");
      }
    } catch (error) {
      console.error("Failed to send request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!session || !session.user) {
    return (
      <div className="flex flex-col h-full w-full justify-center items-center">
        <CustomSpinner className="text-pink-500" size="large" />
      </div>
    );
  }

  return (
    <main className=" flex flex-col h-full w-full justify-center items-center">
      <div className="flex flex-col h-full w-full">
        <div className="flex flex-row w-full justify-between items-center">
          {showInput ? (
            <>
              <div className="flex w-full items-center space-x-2 pb-1">
                <div className="flex w-full items-center bg-pink-300 px-2">
                  {isLoading ? (
                    <div className="flex text-pink-700 text-xl italic w-full justify-center items-center py-1">
                      Loading...
                    </div>
                  ) : (
                    <>
                      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                        <PopoverTrigger asChild>
                          <CalendarIcon className="text-pink-700 h-fit w-5 hover:scale-150 transition cursor-pointer" />
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={handleDateSelect}
                            initialFocus
                            className="bg-pink-100"
                          />
                        </PopoverContent>
                      </Popover>
                      {formattedDate && (
                        <div className="ml-2 text-pink-700">
                          {formattedDate}
                        </div>
                      )}
                      <Input
                        autoFocus
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        className="text-pink-700 bg-transparent border-none h-min input-no-border placeholder:text-pink-500 placeholder:italic"
                        placeholder="What do you need to do?"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleAddTodo();
                          }
                        }}
                      />
                      <PaperPlaneIcon
                        className="text-pink-700 h-fit w-5 hover:scale-150 transition cursor-pointer"
                        onClick={handleAddTodo}
                      />
                    </>
                  )}
                </div>
                <Cross1Icon
                  className="text-pink-700 h-fit w-5 hover:scale-150 transition cursor-pointer"
                  onClick={() => setShowInput(!showInput)}
                />
              </div>
            </>
          ) : (
            <div className="flex flex-row w-full justify-between items-center pb-3">
              <div className="text-pink-700 text-center h-max italic font-bold text-xl">
                To do
              </div>
              <Pencil2Icon
                className="text-pink-700 h-fit w-6 hover:scale-150 transition cursor-pointer"
                onClick={handlePencilClick}
              />
            </div>
          )}
        </div>

        {isTodoLoading ? (
          <div className="flex flex-col h-full w-full justify-center">
            <CustomSpinner className="text-pink-500" size="medium" />
          </div>
        ) : (
          <ul className="overflow-auto custom-scrollbar pt-1 pr-2">
            <TodoItem todos={todos} onTodosChange={refreshTodos} />
          </ul>
        )}
      </div>
    </main>
  );
}
