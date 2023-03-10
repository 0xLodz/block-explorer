import { Utils } from "alchemy-sdk";

import { getTransaction } from "lib/alchemy";
import Details from "components/Details";
import Link from "components/Link";
import Row from "components/Row";

interface TransactionProps {
  hash: string;
}

export default async function Transaction({ hash }: TransactionProps) {
  let tx;
  try {
    tx = await getTransaction(hash);
    if (tx === null) {
      throw new Error("Transaction not found");
    }
  } catch (e) {
    console.error(e);
    return (
      <Details entity="transaction" title="Transaction details">
        <p className="text-danger-100 font-bold text-sm">
          Error when fetching tx data. Please refresh the page.
        </p>
      </Details>
    );
  }
  return (
    <Details entity="transaction" title="Transaction details">
      <div className="grid grid-cols-[180px_1fr] gap-y-4">
        <Row label="value">
          <p className="truncate font-normal text-sm">{`${Utils.formatUnits(
            tx.value,
            "ether"
          )} ETH`}</p>
        </Row>
        <Row label="from">
          <Link href={`/address/${tx.from}`}>{tx.from}</Link>
        </Row>
        <Row label="to">
          <Link href={`/address/${tx.to}`}>{tx.to}</Link>
        </Row>
        {tx.gasPrice && (
          <Row label="gas price">
            <p className="truncate font-normal text-sm">
              {`${Utils.formatUnits(tx.gasPrice, "gwei")} gwei`}
            </p>
          </Row>
        )}
        <Row label="gas limit">
          <p className="truncate font-normal text-sm">{Number(tx.gasLimit)}</p>
        </Row>
        {tx.maxPriorityFeePerGas && (
          <Row label="maxPriorityFeePerGas">
            <p className="truncate font-normal text-sm">
              {`${Utils.formatUnits(
                tx.maxPriorityFeePerGas?.toString(),
                "gwei"
              )} gwei`}
            </p>
          </Row>
        )}
        {tx.maxFeePerGas && (
          <Row label="maxFeePerGas">
            <p className="truncate font-normal text-sm">
              {`${Utils.formatUnits(tx.maxFeePerGas?.toString(), "gwei")} gwei`}
            </p>
          </Row>
        )}
        <Row label="hash">
          <p className="truncate font-normal text-sm">{tx.hash}</p>
        </Row>
        <Row label="nonce">
          <p className="truncate font-normal text-sm">{tx.nonce}</p>
        </Row>
        <Row label="block hash">
          <Link href={`/block/${tx.blockHash}`}>{tx.blockHash}</Link>
        </Row>
        <Row label="block number">
          <Link href={`/block/${tx.blockNumber}`}>{tx.blockNumber}</Link>
        </Row>
      </div>
    </Details>
  );
}
