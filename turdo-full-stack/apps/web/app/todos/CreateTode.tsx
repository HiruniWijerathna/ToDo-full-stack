"use client";
import { useState } from "react";
import { trpc } from "../../trpc/client";
import { on } from "events";

export default function CreateTodo() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState<"low"| "medium" | "high"| "">("");

    const mutation = trpc.todo.createTodo.useMutation({
        onSuccess: () => {
            setName("");
            setDescription("");
            setDueDate("");
            setPriority("");
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!name.trimEnd()|| !description.trim()) return;
        mutation.mutate({  
            name,
            description,
            completed: false, 
            dueDate,
            priority: priority || undefined     
         })
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
                type="text"
                placeholder="Todo Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded"
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 rounded"
            />
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="border p-2 rounded"
            />
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
                className="border p-2 rounded"
            >
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Create Todo
            </button>
        </form>
    );

}