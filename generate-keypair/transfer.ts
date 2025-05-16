import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
} from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

// we will extract the public key from the console
const suppliedToPubkey = process.argv[2] || null;

// if suppliedToPubkey does not exist, then print error, else print the key
if(!suppliedToPubkey){
    console.log('Please enter the public key');
    process.exit(1);
}
console.log(`suppliedToPubkey: ${suppliedToPubkey}`);

// we are the sender
const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

// suppliedToPubkey is the receiver
const toPubkey = new PublicKey(suppliedToPubkey);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana`,
);

// Step:1 creating a transaction
const transaction = new Transaction();
const lamports_to_send = 5000;
// Step:2 information about sol to send
const solSendInformation = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey,
    lamports : lamports_to_send
})

// Step:3 add the information to transaction
transaction.add(solSendInformation);

// Step:4 signature
const signature = await sendAndConfirmTransaction(connection, transaction, [
    senderKeypair,
]);

console.log(
  `💸 Finished! Sent ${lamports_to_send} to the address ${toPubkey}. `,
);
console.log(`Transaction signature is ${signature}!`);