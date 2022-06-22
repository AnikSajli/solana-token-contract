import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaTokenContract } from "../target/types/solana_token_contract";
import {
  TOKEN_PROGRAM_ID,
  MINT_SIZE,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  createInitializeMintInstruction,
} from "@solana/spl-token"; 
import { assert } from "chai";

describe("solana-token-contract", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.SolanaTokenContract as Program<SolanaTokenContract>;
  const mintKey: anchor.web3.Keypair = anchor.web3.Keypair.generate();
  let associatedTokenAccount = undefined;

  it("Mint a token!", async () => {
    const walletKey = anchor.AnchorProvider.env().wallet.publicKey;
    const lamports: number = await program.provider.connection.getMinimumBalanceForRentExemption(
      MINT_SIZE
    );
    
    associatedTokenAccount = await getAssociatedTokenAddress(
      mintKey.publicKey,
      walletKey
    );
    
    const mint_tx = new anchor.web3.Transaction().add(
      anchor.web3.SystemProgram.createAccount({
        fromPubkey: walletKey,
        newAccountPubkey: mintKey.publicKey,
        space: MINT_SIZE,
        programId: TOKEN_PROGRAM_ID,
        lamports
      }),

      createInitializeMintInstruction(
        mintKey.publicKey, 0, walletKey, walletKey
      ),

      createAssociatedTokenAccountInstruction(
        walletKey, associatedTokenAccount, walletKey, mintKey.publicKey
      )
    );
    const res = await anchor.AnchorProvider.env().sendAndConfirm(mint_tx, [mintKey]);

    console.log("Account: ", res);
    console.log("Mint key: ", mintKey.publicKey.toString());
    console.log("User: ", walletKey.toString());

    const tx = await program.methods.mintToken().accounts({
      mint: mintKey.publicKey,
      tokenProgram: TOKEN_PROGRAM_ID,
      tokenAccount: associatedTokenAccount,
      authority: walletKey
    }).rpc();

    console.log("Your transaction signature", tx);
    const minted = (await program.provider.connection.getParsedAccountInfo(associatedTokenAccount))
                  .value.data.parsed.info.tokenAmount.amount;
    console.log("minted-->" + minted);
    assert.equal(minted, 10);
  });

  it("Transfer token", async () => {
    const myWallet = anchor.AnchorProvider.env().wallet.publicKey;
    const toWallet: anchor.web3.Keypair = anchor.web3.Keypair.generate();
    const toATA = await getAssociatedTokenAddress(
      mintKey.publicKey,
      toWallet.publicKey
    );

    const mint_tx = new anchor.web3.Transaction().add(
      createAssociatedTokenAccountInstruction(
        myWallet, toATA, toWallet.publicKey, mintKey.publicKey
      )
    );

    await anchor.AnchorProvider.env().sendAndConfirm(mint_tx, []);
 
    await program.methods.transferToken().accounts({
      tokenProgram: TOKEN_PROGRAM_ID,
      from: associatedTokenAccount,
      fromAuthority: myWallet,
      to: toATA,
    }).rpc();

    const minted = (await program.provider.connection.getParsedAccountInfo(associatedTokenAccount)).value.data.parsed.info.tokenAmount.amount;
    assert.equal(minted, 5);
  });
});
