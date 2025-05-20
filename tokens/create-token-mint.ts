// file1
// token mint account address: 3RyyuhSUnBc2iyDfb6DsAYV8UJUSL9Wj5dsnvDw2rzJj
import { createMint } from "@solana/spl-token";
import "dotenv/config";
import {
    getKeypairFromEnvironment,
    getExplorerLink,
} from "@solana-developers/helpers"
import { Connection, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(` Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58}`);

// This is a shortcut that runs:
// SystemProgram.createAccount()
// token.createInitializeMintInstruction()

// const tokenMint = await createMint(
//     connection,        // RPC connection to Solana
//     payer,             // Who pays for the transaction (usually your wallet)
//     mintAuthority,     // PublicKey that can mint new tokens
//     freezeAuthority,   // PublicKey that can freeze accounts (or null)
//     decimals           // Decimal precision of the token
//   );

const tokenMint = await createMint(
    connection,
    user,
    user.publicKey,
    null,
    2
);

const link = getExplorerLink("address", tokenMint.toString(), "devnet");
console.log(`✅ Finished! Created token mint: ${link}`);