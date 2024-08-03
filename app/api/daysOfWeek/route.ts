import { NextRequest, NextResponse } from "next/server";

const daysOfWeek = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

export async function GET(req: NextRequest) {
  return NextResponse.json(daysOfWeek);
}
