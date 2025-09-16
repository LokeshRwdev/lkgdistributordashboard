"use client";

import React, { useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface TxnRow {
	id: string;
	date: string;
	description: string;
	type: "Credited" | "Debited" | "Failed";
	amount: number;
	balance: number;
	status: "Completed" | "Failed" | "Processing";
}

const sampleTxns: TxnRow[] = [
	{
		id: "TXN123456789",
		date: "24 Aug 25, 14:30PM",
		description: "Fund Added by UPI",
		type: "Credited",
		amount: 5000,
		balance: 10000,
		status: "Completed",
	},
	{
		id: "TXN123456790",
		date: "24 Aug 25, 14:30PM",
		description: "Fund Added by UPI",
		type: "Debited",
		amount: 1245,
		balance: 8600,
		status: "Failed",
	},
	{
		id: "TXN123456791",
		date: "24 Aug 25, 14:30PM",
		description: "Fund Added by UPI",
		type: "Credited",
		amount: 5000,
		balance: 13000,
		status: "Completed",
	},
	{
		id: "TXN123456792",
		date: "24 Aug 25, 14:30PM",
		description: "Fund Added by UPI",
		type: "Debited",
		amount: 5000,
		balance: 8000,
		status: "Failed",
	},
];

export default function RaiseFundsPage() {
	const [receiver, setReceiver] = useState<"company" | "distributor">(
		"company"
	);
		const [depositDate, setDepositDate] = useState("");
	const [paymentMode, setPaymentMode] = useState("Cash");
	const [amount, setAmount] = useState("");
	const [utr, setUtr] = useState("");
	const [remark, setRemark] = useState("");
	const [fileName, setFileName] = useState<string | null>(null);

	const reset = () => {
		setReceiver("company");
		setPaymentMode("Cash");
		setAmount("");
		setUtr("");
		setRemark("");
		setFileName(null);
	};

		const canSubmit =
			amount.trim().length > 0 &&
			utr.trim().length > 0 &&
			paymentMode.length > 0 &&
			!!fileName &&
			depositDate.trim().length > 0;

	const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const f = e.target.files?.[0];
		if (f) setFileName(f.name);
	};

	const submit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!canSubmit) return;
		console.log({ receiver, paymentMode, amount, utr, remark, fileName });
	};

	return (
		<div className="p-6 space-y-6" style={{ background: "#e9e9e9" }}>
			<h1 className="text-2xl font-semibold text-gray-900 mb-2">Dashboards</h1>
			{/* Top Section */}
			<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
				{/* Form Card */}
				<div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col">
					<div className="flex items-center gap-4 mb-6">
						<div className="flex gap-4 bg-gray-100 rounded-full p-1 text-sm font-medium">
							<button
								type="button"
								onClick={() => setReceiver("company")}
								className={`px-4 py-2 rounded-full transition-colors ${
									receiver === "company" ? "bg-black text-white" : "text-gray-700"
								}`}
							>
								Company
							</button>
							<button
								type="button"
								onClick={() => setReceiver("distributor")}
								className={`px-4 py-2 rounded-full transition-colors ${
									receiver === "distributor"
										? "bg-black text-white"
										: "text-gray-700"
								}`}
							>
								Distributer
							</button>
						</div>
						<div className="ml-auto flex gap-3">
							<label className="inline-flex items-center gap-2 bg-black text-white text-sm font-medium px-5 py-2 rounded-lg cursor-pointer hover:bg-black/90">
								<input
									type="file"
									className="hidden"
									onChange={handleFile}
									accept="image/*,.pdf"
								/>
								{fileName ? "Receipt Added" : "Upload Receipt"}
							</label>
							<button
								type="button"
								onClick={reset}
								className="inline-flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium px-6 py-2 rounded-lg"
							>
								Reset
							</button>
						</div>
					</div>
					<p className="text-center text-sm text-gray-600 mb-6">
						Please upload your transaction supported document.
					</p>

						<form onSubmit={submit} className="space-y-5 flex-1">
											{/* Payment Receiver + Deposit Date */}
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div className="space-y-2">
													<label className="block text-sm font-semibold text-gray-800">
														Payment Receiver
													</label>
													<div className="flex items-center gap-4">
														<label className={`inline-flex items-center gap-2 text-sm cursor-pointer ${receiver === 'company' ? 'font-medium' : 'text-gray-700'}`}>
															<input
																type="radio"
																name="paymentReceiver"
																checked={receiver === "company"}
																onChange={() => setReceiver("company")}
																className="w-4 h-4"
															/>
															Company
														</label>
														<label className={`inline-flex items-center gap-2 text-sm cursor-pointer ${receiver === 'distributor' ? 'font-medium' : 'text-gray-700'}`}>
															<input
																type="radio"
																name="paymentReceiver"
																checked={receiver === "distributor"}
																onChange={() => setReceiver("distributor")}
																className="w-4 h-4"
															/>
															Distributor
														</label>
													</div>
												</div>

												<div className="space-y-2">
													<label className="block text-sm font-semibold text-gray-800">
														Deposit Date
													</label>
													<input
														type="date"
														value={depositDate}
														onChange={(e) => setDepositDate(e.target.value)}
														className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
														required
													/>
												</div>
											</div>

											{/* Payment Mode */}
							<div className="space-y-2">
								<label className="block text-sm font-semibold text-gray-800">
									Payment Mode
								</label>
								<Select value={paymentMode} onValueChange={setPaymentMode}>
									<SelectTrigger className="w-full h-11 bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 rounded-lg">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="Cash">Cash</SelectItem>
										<SelectItem value="Net Banking Transfer/IMPS/RTGS/NEFT">
											Net Banking Transfer/IMPS/RTGS/NEFT
										</SelectItem>
										<SelectItem value="UPI(PhonePe/Google Pay/Paytm)">
											UPI(PhonePe/Google Pay/Paytm)
										</SelectItem>
									</SelectContent>
								</Select>
							</div>

							{/* Amount */}
							<div className="space-y-2">
								<label className="block text-sm font-semibold text-gray-800">
									Amount
								</label>
								<input
									type="number"
									min={1}
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
									placeholder="Enter Amount"
									className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
									required
								/>
							</div>

							{/* UTR */}
							<div className="space-y-2">
								<label className="block text-sm font-semibold text-gray-800">
									Transaction Ref/UTR
								</label>
								<input
									value={utr}
									onChange={(e) => setUtr(e.target.value)}
									placeholder="Enter Reference No. UTR No."
									className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
									required
								/>
							</div>

							{/* Remark */}
							<div className="space-y-2">
								<label className="block text-sm font-semibold text-gray-800">
									Remark
								</label>
								<input
									value={remark}
									onChange={(e) => setRemark(e.target.value)}
									placeholder="Remark (if any)"
									className="w-full h-11 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
								/>
							</div>

							<div className="pt-2">
								<button
									type="submit"
									disabled={!canSubmit}
									className="w-full h-11 bg-black text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
								>
									Submit
								</button>
							</div>
						</form>
				</div>

				{/* User Info + Instructions */}
				<div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col">
					<div className="flex items-start gap-4 mb-6">
						<div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-xl">
							👤
						</div>
						<div className="flex-1">
							<div className="flex items-start justify-between">
								<div>
									<p className="font-semibold text-gray-900 leading-tight">
										Rajesh Kumar
									</p>
									<p className="text-xs text-gray-500 mt-1">SBI</p>
								</div>
								<button className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center text-gray-600 text-sm">
									⧉
								</button>
							</div>
							<div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-xs">
								<div className="space-y-1">
									<p className="text-gray-500">Name</p>
									<p className="font-medium text-gray-800 leading-tight">
										LKG FINTECH PVT LTD (No Cash Deposit)
									</p>
								</div>
								<div className="space-y-1">
									<p className="text-gray-500">Bank</p>
									<p className="font-medium text-gray-800">ICICI BANK</p>
								</div>
								<div className="space-y-1">
									<p className="text-gray-500">Bank Account No.</p>
									<p className="font-medium text-gray-800 break-all">
										001203503739
									</p>
								</div>
								<div className="space-y-1">
									<p className="text-gray-500">IFSC CODE</p>
									<p className="font-medium text-gray-800">ICIC0000012</p>
								</div>
								<div className="space-y-1">
									<p className="text-gray-500">Branch Name :</p>
									<p className="font-medium text-gray-800">Jaipur Mega Branch</p>
								</div>
							</div>
						</div>
					</div>

					<div className="flex-1 overflow-hidden">
						<div className="h-full overflow-y-auto pr-2 custom-scroll text-sm space-y-6">
							<div>
								<h3 className="font-semibold text-gray-900 mb-3 text-sm">
									General Instructions
								</h3>
								<ul className="list-disc ml-5 space-y-1 text-gray-600 text-xs">
									<li>How to add wallet balance in LKG</li>
									<li>
										Load balance (PQ) will update your wallet limit instantly once the
										transaction is successful.
									</li>
									<li>
										The receiver will manually verify the fund request, which may take a
										few minutes during working days.
									</li>
									<li>For MDR charges kindly check the following details.</li>
									<li>
										Please do not close the window, refresh the page, press stop or the
										back button while the transaction is being processed.
									</li>
								</ul>
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-3 text-sm">Please Note:</h3>
								<p className="text-xs text-gray-600 leading-relaxed">
									This service adds money to the wallet via NEFT/IMPS/RTGS/UPI/Direct
									Bank Deposit option and is subject to verification by LKG. It may take
									several minutes.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Transactions Table */}
			<div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-lg font-semibold text-gray-900">
						Transactions
					</h2>
					<div className="flex gap-3">
						<button className="flex items-center gap-2 text-xs bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
							<span className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center text-[10px]">
								⚲
							</span>
							Filter
						</button>
						<button className="flex items-center gap-2 text-xs bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
							⭳ Export
						</button>
					</div>
				</div>
				<div className="w-full text-sm">
					<div className="grid grid-cols-7 font-semibold text-gray-700 text-xs bg-gray-100 rounded-lg">
						<div className="py-2 px-4">Date & Time</div>
						<div className="py-2 px-4">Description</div>
						<div className="py-2 px-4">Type</div>
						<div className="py-2 px-4">Amount</div>
						<div className="py-2 px-4">Balance</div>
						<div className="py-2 px-4">Status</div>
						<div className="py-2 px-4">Help</div>
					</div>
					<div className="divide-y divide-gray-100">
						{sampleTxns.map((r) => (
							<div key={r.id} className="grid grid-cols-7 text-xs text-gray-700">
								<div className="px-4 py-3 font-medium">{r.date}</div>
								<div className="px-4 py-3">{r.description}</div>
								<div className="px-4 py-3">
									<span
										className={`inline-block px-3 py-1 rounded-full text-[11px] font-medium ${
											r.type === "Credited"
												? "bg-green-100 text-green-600"
												: r.type === "Debited"
												? "bg-red-100 text-red-600"
												: "bg-yellow-100 text-yellow-600"
										}`}
									>
										{r.type}
									</span>
								</div>
								<div className="px-4 py-3 font-medium">₹{r.amount.toLocaleString()}</div>
								<div className="px-4 py-3 text-gray-800">₹{r.balance.toLocaleString()}</div>
								<div className="px-4 py-3">
									<span
										className={`inline-block px-3 py-1 rounded-full text-[11px] font-medium ${
											r.status === "Completed"
												? "bg-green-100 text-green-600"
												: r.status === "Failed"
												? "bg-red-100 text-red-600"
												: "bg-yellow-100 text-yellow-600"
										}`}
									>
										{r.status}
									</span>
								</div>
								<div className="px-4 py-3 text-gray-500">ℹ</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

