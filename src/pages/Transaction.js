import React, { useState, useEffect } from "react";
import { Ether } from "../utils";
import { TransactionTable } from "../components/transaction";
const Transaction = ({ match }) => {
	const [blockNumber, setBlockNumber] = useState("");
	const [transactions, setTransactions] = useState([]);
	const blockHashFromParams = match.params.id;
	useEffect(() => {
		const provider = Ether.provider;
		provider
			.getBlockWithTransactions(blockHashFromParams)
			.then(({ number, transactions }) => {
				const formattedTransactions = transactions.map(
					({ from, to, value: { _hex }, hash }) => ({
						from,
						to,
						_hex: parseInt(_hex, 16),
						hash,
					})
				);
				setTransactions(formattedTransactions);
				setBlockNumber(number);
			})
			.catch((err) => {
				console.log("Error not able to fetch", err);
				setTransactions([]);
			});
	}, [blockHashFromParams]);

	return (
		<div>
			<p className="text-center h4">
				Transaction for Block #{blockNumber}
			</p>
			<TransactionTable transactions={transactions} />
		</div>
	);
};

export default Transaction;
