import { Connection , LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const suppliedPublicKey = process.argv[2];
if(!suppliedPublicKey){
    throw new Error("Provide a public key to find balance of!");
}

try{
    // loading our publickey
const publickey = new PublicKey(suppliedPublicKey);

// making a connection with the solana devnet
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// getting back our balance
const balance_in_lamports = await connection.getBalance(publickey);

// converting it into sol
const balance_in_sol = balance_in_lamports/ LAMPORTS_PER_SOL;

console.log(
    `💰 Finished! The balance for the wallet at address ${publickey} is ${balance_in_sol}!`,
  );
}catch(error){
    console.log("Invalid address or public key.");
}
