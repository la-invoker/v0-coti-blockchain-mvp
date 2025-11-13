import { NextResponse } from "next/server"
import { getCotiClient } from "@/lib/coti/client"
import type { GrantResponse, ApiResponse } from "@/lib/coti/types"

export async function GET() {
  try {
    // Get COTI client
    const cotiClient = getCotiClient()

    // Retrieve all grants
    const grants = await cotiClient.getAllGrants()

    const response: GrantResponse[] = grants.map((grant) => ({
      id: grant.id,
      ...grant.data,
      submitter: grant.data.author || "Unknown",
      timestamp: Date.parse(grant.data.created_at) / 1000,
    }))

    return NextResponse.json<ApiResponse<GrantResponse[]>>({
      success: true,
      data: response,
    })
  } catch (error) {
    console.error("Error retrieving grants:", error)
    return NextResponse.json<ApiResponse<never>>(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to retrieve grants",
      },
      { status: 500 },
    )
  }
}
