import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.biomarkers || !Array.isArray(body.biomarkers)) {
      return NextResponse.json(
        { error: "Invalid request: 'biomarkers' must be an array" },
        { status: 400 }
      );
    }

    for (const marker of body.biomarkers) {
      if (!marker.name || typeof marker.name !== "string") {
        return NextResponse.json(
          { error: "Each biomarker must have a 'name' string field" },
          { status: 400 }
        );
      }
      if (marker.value === undefined || typeof marker.value !== "number") {
        return NextResponse.json(
          { error: "Each biomarker must have a numeric 'value' field" },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: `Successfully updated ${body.biomarkers.length} biomarkers`,
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
