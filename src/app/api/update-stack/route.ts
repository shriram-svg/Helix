import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.supplements || !Array.isArray(body.supplements)) {
      return NextResponse.json(
        { error: "Invalid request: 'supplements' must be an array" },
        { status: 400 }
      );
    }

    for (const supp of body.supplements) {
      if (!supp.name || typeof supp.name !== "string") {
        return NextResponse.json(
          { error: "Each supplement must have a 'name' string field" },
          { status: 400 }
        );
      }
      if (!supp.dose || typeof supp.dose !== "string") {
        return NextResponse.json(
          { error: "Each supplement must have a 'dose' string field" },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: `Successfully updated ${body.supplements.length} supplements`,
        updatedAt: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }
}
