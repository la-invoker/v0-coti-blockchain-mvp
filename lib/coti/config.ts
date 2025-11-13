// COTI Network Configuration
export const COTI_CONFIG = {
  network: "testnet" as const,
  contractAddress: process.env.COTI_CONTRACT_ADDRESS || "0x298435c5e317363a36A4a51a0F258FA2Ef49f57B",
  rpcUrl: process.env.COTI_RPC_URL || "https://testnet.coti.io",
}

export const CONTRACT_ABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint64",
          "name": "id",
          "type": "uint64"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "deletedBy",
          "type": "address"
        }
      ],
      "name": "DataDeleted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint64",
          "name": "id",
          "type": "uint64"
        },
        {
          "indexed": false,
          "internalType": "uint64",
          "name": "timestamp",
          "type": "uint64"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "addedBy",
          "type": "address"
        }
      ],
      "name": "DataSubmitted",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint64",
          "name": "id",
          "type": "uint64"
        }
      ],
      "name": "deleteData",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getActiveCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint64",
          "name": "id",
          "type": "uint64"
        }
      ],
      "name": "getData",
      "outputs": [
        {
          "components": [
            {
              "internalType": "ctUint64[]",
              "name": "value",
              "type": "uint256[]"
            }
          ],
          "internalType": "struct ctString",
          "name": "encryptedJson",
          "type": "tuple"
        },
        {
          "internalType": "ctUint64",
          "name": "encryptedTimestamp",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isActive",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "offset",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "limit",
          "type": "uint256"
        }
      ],
      "name": "getDataIds",
      "outputs": [
        {
          "internalType": "uint64[]",
          "name": "",
          "type": "uint64[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTotalCount",
      "outputs": [
        {
          "internalType": "uint64",
          "name": "",
          "type": "uint64"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "components": [
                {
                  "internalType": "ctUint64[]",
                  "name": "value",
                  "type": "uint256[]"
                }
              ],
              "internalType": "struct ctString",
              "name": "ciphertext",
              "type": "tuple"
            },
            {
              "internalType": "bytes[]",
              "name": "signature",
              "type": "bytes[]"
            }
          ],
          "internalType": "struct itString",
          "name": "encryptedJson",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "ctUint64",
              "name": "ciphertext",
              "type": "uint256"
            },
            {
              "internalType": "bytes",
              "name": "signature",
              "type": "bytes"
            }
          ],
          "internalType": "struct itUint64",
          "name": "encryptedTimestamp",
          "type": "tuple"
        }
      ],
      "name": "submitData",
      "outputs": [
        {
          "internalType": "uint64",
          "name": "",
          "type": "uint64"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]as const
