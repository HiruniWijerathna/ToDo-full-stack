"use client";

import { trpc } from "../trpc/client";

export default function Home() {
  const{data}=trpc.todo.getAllTodos.useQuery();
  console.log('Data', data);
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome to the Web App!</h1>
    </div>
  );
}