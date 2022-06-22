export type SolanaTokenContract = {
  "version": "0.1.0",
  "name": "solana_token_contract",
  "instructions": [
    {
      "name": "mintToken",
      "accounts": [
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "transferToken",
      "accounts": [
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "from",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "to",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fromAuthority",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    }
  ]
};

export const IDL: SolanaTokenContract = {
  "version": "0.1.0",
  "name": "solana_token_contract",
  "instructions": [
    {
      "name": "mintToken",
      "accounts": [
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "transferToken",
      "accounts": [
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "from",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "to",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fromAuthority",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    }
  ]
};
