import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { getDomainKey, NameRegistryState } from "@bonfida/spl-name-service";

const domain = "toly"; // without .sol
const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

try {
  // Resolve the domain to a public key
  const { pubkey } = await getDomainKey(domain);

  // Fetch domain registry info
  const registry = await NameRegistryState.retrieve(connection, pubkey);

  // Access the owner (fallback to nftOwner if available)
  const rawOwner = (registry as any).nftOwner ?? (registry as any).owner;

  if (!rawOwner) {
    throw new Error("❌ Could not resolve the domain owner.");
  }

  const owner = rawOwner.toBase58();
  console.log(`✅ Wallet address for ${domain}.sol: ${owner}`);

  // Fetch and print balance
  const balance = await connection.getBalance(new PublicKey(owner));
  console.log(`💰 Balance: ${balance / LAMPORTS_PER_SOL} SOL`);
} catch (error) {
  console.error("❌ Error resolving domain:");
  console.error(error.message);
}
