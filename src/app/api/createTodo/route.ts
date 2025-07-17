import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";


const filePath = path.join(process.cwd(), "db.json");


function readData() {
  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData);
}

function writeData(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { text } = body;

  if (!text) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }

  const data = readData();
  const newTodo = {
    id: Date.now(),
    text,
    completed: false,
  };

  data.todos.push(newTodo);
  writeData(data);

  return NextResponse.json({data : newTodo}, { status: 201 });
}

