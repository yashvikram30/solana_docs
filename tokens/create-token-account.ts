// file 3
// associated token account (ata) address: CXhL6oHHWVN4KVB2Ak85xgc4acwUKhTFy8wxumsCriT4
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
const user = getKeypairFromEnvironment("SECRET_KEY");

console.log(
    `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`,
);

// obtained from the website
const tokenMintAccount = new PublicKey("3RyyuhSUnBc2iyDfb6DsAYV8UJUSL9Wj5dsnvDw2rzJj")

// Here we are making an associated token account for our own address, but we can
// make an ATA on any other wallet in devnet!
// const recipient = new PublicKey("SOMEONE_ELSES_DEVNET_ADDRESS");
const recipient = user.publicKey;

const associatedTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    user,
    tokenMintAccount,
    recipient
);

console.log(`Token Account: ${associatedTokenAccount.address.toBase58()}`);

const link = getExplorerLink(
    "address",
    associatedTokenAccount.address.toBase58(),
    "devnet"
)

console.log(`✅ Created token Account: ${link}`);