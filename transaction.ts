import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { SigningStargateClient, GasPrice } from "@cosmjs/stargate";

async function main() {
  const mnemonic = "envelope aunt senior lumber okay soldier travel unit limit rib glory raccoon oxygen appear cement sample cool regular mind reform holiday left health lunch";
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic,{prefix:"wasm"});
  const [firstAccount] = await wallet.getAccounts();
  console.log("shhjhjjlk",firstAccount)

  const rpcEndpoint = "http://localhost:26657";
 // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


  const gasPrice = GasPrice.fromString("0.025token");

  
  const clientOptions = {
    gasPrice: gasPrice,
  };
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet, clientOptions);

  const recipient = "wasm1ft0axamht29kn2twafh2nvq9zrn3sl2zeluz4x";
  const amount = {
    denom: "token",
    amount: "100",
  };

  try {
    const result = await client.sendTokens(firstAccount.address, recipient, [amount], "auto");
    console.log("Transaction successful. Result:", result);
  } catch (error) {
    console.error("Error occurred while sending the transaction:", error);
  }
}

main().catch((error) => {
  console.error("Error in main function:", error);
});
