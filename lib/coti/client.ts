import { Contract, CotiNetwork, getDefaultProvider, Wallet } from "@coti-io/coti-ethers"
import { COTI_CONFIG, CONTRACT_ABI } from "./config"

export interface GrantData {
  title: string
  description: string
  author: string
  created_at: string
  [key: string]: any
}

export interface EncryptedGrant {
  id: number
  encryptedJson: any
  submitter: string
  timestamp: number
}

export class CotiClient {
  private wallet: Wallet
  private contract: Contract

  constructor(privateKey: string, aesKey: string) {
    const provider = getDefaultProvider(CotiNetwork.Testnet)
    this.wallet = new Wallet(privateKey, provider)
    this.wallet.setAesKey(aesKey)
    this.contract = new Contract(COTI_CONFIG.contractAddress, CONTRACT_ABI, this.wallet)
  }

  async submitGrant(grantData: GrantData): Promise<number> {
    const jsonString = JSON.stringify(grantData)
    const timestamp = Math.floor(Date.now() / 1000)

    // Get function selector for encryption context
    const functionSelector = this.contract.interface.getFunction("submitData")!.selector

    console.log("[v0] Encrypting grant data:", { jsonString, timestamp })

    // Encrypt data
    const encryptedJson = await this.wallet.encryptValue(jsonString, COTI_CONFIG.contractAddress, functionSelector)
    const encryptedTimestamp = await this.wallet.encryptValue(timestamp, COTI_CONFIG.contractAddress, functionSelector)

    console.log("[v0] Encrypted values prepared, submitting transaction...")

    // Submit to blockchain
    const tx = await this.contract.submitData(encryptedJson, encryptedTimestamp, {
      gasLimit: 10_000_000,
    })

    console.log("[v0] Transaction sent:", tx.hash)
    const receipt = await tx.wait()
    console.log("[v0] Transaction confirmed:", receipt.hash)

    const event = receipt.logs
      .map((log: any) => {
        try {
          return this.contract.interface.parseLog(log)
        } catch {
          return null
        }
      })
      .find((e: any) => e?.name === "DataSubmitted")

    const grantId = event ? Number(event.args[0]) : 0
    console.log("[v0] Grant submitted with ID:", grantId)

    return grantId
  }

  async getGrant(id: number): Promise<GrantData & { isActive: boolean }> {
    console.log("[v0] Fetching grant:", id)

    const result = await this.contract.getData(id)
    const encryptedJson = result[0] // ctString
    const encryptedTimestamp = result[1] // ctUint64
    const isActive = result[2] // bool

    console.log("[v0] Encrypted data received, decrypting...")

    // Decrypt the JSON and timestamp
    const decryptedJson = await this.wallet.decryptValue(encryptedJson)
    const decryptedTimestamp = await this.wallet.decryptValue(encryptedTimestamp)

    console.log("[v0] Data decrypted successfully")

    const grantData = JSON.parse(decryptedJson as string)

    return {
      ...grantData,
      isActive,
    }
  }

  async getAllGrantIds(): Promise<number[]> {
    const totalCount = await this.contract.getTotalCount()
    console.log("[v0] Total grants:", Number(totalCount))

    if (Number(totalCount) === 0) {
      return []
    }

    const ids = await this.contract.getDataIds(0, Number(totalCount))
    return ids.map((id: any) => Number(id))
  }

  async getAllGrants(): Promise<Array<{ id: number; data: GrantData; isActive: boolean }>> {
    const ids = await this.getAllGrantIds()
    console.log("[v0] Fetching", ids.length, "grants...")

    const grants = await Promise.all(
      ids.map(async (id) => {
        try {
          const data = await this.getGrant(id)
          return {
            id,
            data: {
              title: data.title,
              description: data.description,
              author: data.author,
              created_at: data.created_at,
            } as GrantData,
            isActive: data.isActive,
          }
        } catch (error) {
          console.error(`[v0] Failed to fetch grant ${id}:`, error)
          return null
        }
      }),
    )

    const validGrants = grants.filter(
      (grant): grant is { id: number; data: GrantData; isActive: boolean } => grant !== null,
    )
    console.log("[v0] Successfully fetched", validGrants.length, "grants")

    return validGrants
  }

  async getActiveCount(): Promise<number> {
    const count = await this.contract.getActiveCount()
    return Number(count)
  }

  async deleteGrant(id: number): Promise<void> {
    console.log("[v0] Deleting grant:", id)
    const tx = await this.contract.deleteData(id, {
      gasLimit: 1_000_000,
    })
    await tx.wait()
    console.log("[v0] Grant deleted successfully")
  }

  getWalletAddress(): string {
    return this.wallet.address
  }
}

// Singleton instance for server-side use
let cotiClientInstance: CotiClient | null = null

export function getCotiClient(): CotiClient {
  if (!cotiClientInstance) {
    const privateKey = process.env.COTI_PRIVATE_KEY
    const aesKey = process.env.COTI_AES_KEY

    if (!privateKey || !aesKey) {
      throw new Error("COTI_PRIVATE_KEY and COTI_AES_KEY must be set in environment variables")
    }

    cotiClientInstance = new CotiClient(privateKey, aesKey)
  }

  return cotiClientInstance
}
