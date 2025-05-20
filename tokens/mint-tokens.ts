// file:4
import { mintTo } from "@solana/spl-token";
import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
const connection = new Connection(clusterApiUrl("devnet"));

// Our token has two decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const user = getKeypairFromEnvironment("SECRET_KEY");

// Substitute in your token mint account from create-token-mint.ts
const tokenMintAccount = new PublicKey("3RyyuhSUnBc2iyDfb6DsAYV8UJUSL9Wj5dsnvDw2rzJj");

// Substitute in your own, or a friend's token account address, based on the previous step.
const recipientAssociatedTokenAccount = new PublicKey(
  "CXhL6oHHWVN4KVB2Ak85xgc4acwUKhTFy8wxumsCriT4",
);

const transactionSignature = await mintTo(
  connection,
  user,                                 // payer
  tokenMintAccount,                     // token mint account
  recipientAssociatedTokenAccount,      // ata of receipient
  user,                                 // mint authority
  10 * MINOR_UNITS_PER_MAJOR_UNITS,     // amount of tokens to mint
);

const link = getExplorerLink("transaction", transactionSignature, "devnet");

console.log(`✅ Success! Mint Token Transaction: ${link}`);