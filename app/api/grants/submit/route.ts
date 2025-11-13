import { type NextRequest, NextResponse } from "next/server"
import { getCotiClient } from "@/lib/coti/client"
import type { GrantSubmissionRequest, ApiResponse } from "@/lib/coti/types"

export async function POST(request: NextRequest) {
  try {
    const body: GrantSubmissionRequest = await request.json()

    // Validate required fields
    if (!body.title || !body.description) {
      return NextResponse.json<ApiResponse<never>>(
        {
          success: false,
          error: "Title and description are required",
        },
        { status: 400 },
      )
    }

    // Get COTI client
    const cotiClient = getCotiClient()

    // Prepare grant data with timestamp
    const grantData = {
      title: body.title,
      description: body.description,
      author: body.author || cotiClient.getWalletAddress(),
      created_at: new Date().toISOString(),
    }

    // Submit to blockchain
    const grantId = await cotiClient.submitGrant(grantData)

    return NextResponse.json<ApiResponse<{ id: number }>>(
      {
        success: true,
        data: { id: grantId },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error submitting grant:", error)
    return NextResponse.json<ApiResponse<never>>(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to submit grant",
      },
      { status: 500 },
    )
  }
}
