import { NextRequest, NextResponse } from "next/server";

const cities = [
  "Ciudad de México",
  "Buenos Aires",
  "Bogotá",
  "Lima",
  "São Paulo",
  "Santiago",
  "Río de Janeiro",
];

export async function GET(req: NextRequest) {
  return NextResponse.json(cities);
}
