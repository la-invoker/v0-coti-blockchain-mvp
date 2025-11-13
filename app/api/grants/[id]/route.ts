import { type NextRequest, NextResponse } from "next/server"
import { getCotiClient } from "@/lib/coti/client"
import type { GrantResponse, ApiResponse } from "@/lib/coti/types"

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const grantId = Number.parseInt(id, 10)

    if (isNaN(grantId)) {
      return NextResponse.json<ApiResponse<never>>(
        {
          success: false,
          error: "Invalid grant ID",
        },
        { status: 400 },
      )
    }

    // Get COTI client
    const cotiClient = getCotiClient()

    // Retrieve and decrypt grant data
    const grantData = await cotiClient.getGrant(grantId)

    const response: GrantResponse = {
      id: grantId,
      ...grantData,
      submitter: grantData.author || "Unknown",
      timestamp: Date.parse(grantData.created_at) / 1000,
    }

    return NextResponse.json<ApiResponse<GrantResponse>>({
      success: true,
      data: response,
    })
  } catch (error) {
    console.error("Error retrieving grant:", error)
    return NextResponse.json<ApiResponse<never>>(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to retrieve grant",
      },
      { status: 500 },
    )
  }
}
