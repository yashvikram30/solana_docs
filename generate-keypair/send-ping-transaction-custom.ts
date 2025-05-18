import {
  Connection,
  Transaction,
  TransactionInstruction,
  sendAndConfirmTransaction,
  PublicKey,
  Keypair,
  SystemProgram,
} from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Buffer } from "buffer";

// System Program ID
const SYSTEM_PROGRAM_ID = new PublicKey("11111111111111111111111111111111");

// Get receiver public key from command line
const suppliedToPubkey = process.argv[2];
if (!suppliedToPubkey) {
  console.error("❌ Please provide a recipient public key");
  process.exit(1);
}
const toPubkey = new PublicKey(suppliedToPubkey);

// Get sender keypair from environment
const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");
const fromPubkey = senderKeypair.publicKey;

// Connect to Devnet
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// Lamports to send
const lamportsToSend = 5000;

// Step 1: Create instruction data buffer
// Transfer instruction = 2 (u32), followed by lamports (u64)
const instructionData = Buffer.alloc(12);
instructionData.writeUInt32LE(2, 0); // 2 is the 'Transfer' instruction enum
instructionData.writeBigUInt64LE(BigInt(lamportsToSend), 4);

// Step 2: Create custom instruction
const instruction = new TransactionInstruction({
  programId: SYSTEM_PROGRAM_ID,
  keys: [
    { pubkey: fromPubkey, isSigner: true, isWritable: true },
    { pubkey: toPubkey, isSigner: false, isWritable: true },
  ],
  data: instructionData,
});

// Step 3: Create transaction and add instruction
const transaction = new Transaction().add(instruction);

// Step 4: Send it
const signature = await sendAndConfirmTransaction(connection, transaction, [
  senderKeypair,
]);

console.log(`✅ Custom transfer successful!`);
console.log(`💸 Sent ${lamportsToSend} lamports (${lamportsToSend / 1e9} SOL)`);
console.log(
  `🔗 Explorer: https://explorer.solana.com/tx/${signature}?cluster=devnet`
);
