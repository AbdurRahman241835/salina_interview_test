import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "db.json");

function readData() {
  const jsonData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(jsonData);
}

function writeData(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const data = readData();
  const originalLength = data.todos.length;
  data.todos = data.todos.filter((todo: any) => todo.id !== id);

  if (data.todos.length === originalLength) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  writeData(data);
  return NextResponse.json({ message: "Todo deleted" }, { status: 200 });
}
