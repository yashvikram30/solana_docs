// src/App.jsx
import { useCallback } from "react";
import {
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";

const PING_PROGRAM_ID = new PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa");
const PING_PROGRAM_DATA_ID = new PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod");

function App() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const onPing = useCallback(async () => {
    if (!publicKey) {
      alert("Connect your wallet first!");
      return;
    }

    const transaction = new Transaction().add(
      new TransactionInstruction({
        keys: [
          { pubkey: PING_PROGRAM_DATA_ID, isSigner: false, isWritable: true },
        ],
        programId: PING_PROGRAM_ID,
      })
    );

    try {
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "confirmed");
      alert(`✅ Ping sent! Signature: ${signature}`);
    } catch (err) {
      console.error(err);
      alert("❌ Transaction failed!");
    }
  }, [publicKey, sendTransaction, connection]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🛎️ Solana Ping</h1>
      <WalletMultiButton />
      <button
        onClick={onPing}
        disabled={!publicKey}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Send Ping
      </button>
    </div>
  );
}

export default App;
