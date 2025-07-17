import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "db.json");


function readData() {
  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData);
}

function writeData(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, completed } = body;

  const data = readData();
  const todo = data.todos.find((t: any) => t.id === id);

  if (!todo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  todo.completed = completed;
  writeData(data);

  return NextResponse.json(todo);
}