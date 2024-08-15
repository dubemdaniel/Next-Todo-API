import { NextResponse } from "next/server";

let todos = [
  { id: 1, title: "Become a fullstack Developer", completed: false },
  { id: 2, title: "complete my todo", completed: false },
  { id: 3, title: "Master Typescript", completed: false },
  { id: 4, title: "Post on my blog", completed: false },
  { id: 5, title: "make friends on socials", completed: false },
  { id: 6, title: "Study my Intro to AI", completed: false },
];

export async function GET() {
  return NextResponse.json(todos);
}

export async function POST(request) {
  const { title } = await request.json();
  const newTodo = { id: todos.length + 1, title, completed: false };
  todos.push(newTodo);
  return NextResponse.json(newTodo, { status: 201 });
}

export async function PUT(request) {
  const { id, title, completed } = await request.json();
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos[index] = { ...todos[index], title, completed };
    return NextResponse.json(todos[index]);
  }
  return NextResponse.json({ error: "Todo not found" }, { status: 404 });
}

export async function DELETE(request) {
  const { id } = await request.json();
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    const deletedTodo = todos.splice(index, 1)[0];
    return NextResponse.json(deletedTodo);
  }
  return NextResponse.json({ error: "Todo not found" }, { status: 404 });
}
