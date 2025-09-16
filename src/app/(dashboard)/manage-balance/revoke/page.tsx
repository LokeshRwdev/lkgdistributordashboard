"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {  Filter } from "lucide-react";
import CustomArrowLeft from "@/components/icon/svg-icons/CustomLeftArrow";

// Placeholder receiver list – will be replaced with API data later
const RECEIVERS = [
	{ id: "RO047010LK", name: "ABHISHEK" },
	{ id: "RO047011LK", name: "PRIYA" },
	{ id: "RO047012LK", name: "RAHUL" },
];

export default function RevokeBalancePage() {
	const router = useRouter();
	const [receiverId, setReceiverId] = useState("");
	const [amount, setAmount] = useState("");
	const [remark, setRemark] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [showFilter, setShowFilter] = useState(false);

	const canSubmit = receiverId && Number(amount) > 0 && !submitting;

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!canSubmit) return;
		setSubmitting(true);
		// Simulate async
		setTimeout(() => {
			// Reset (placeholder – real impl would toast & refresh table)
			setAmount("");
			setRemark("");
			setSubmitting(false);
		}, 900);
	}

	return (
		<div className="p-6 space-y-6">
			{/* Top bar */}
			<div className="flex items-center gap-2 mb-2">
				<button
					type="button"
						aria-label="Go back"
					onClick={() => router.back()}
					className="p-2 -ml-2 rounded-lg hover:bg-gray-200 text-gray-700"
				>
					 <CustomArrowLeft />
				</button>
				<h1 className="text-xl font-semibold text-gray-800">Revoke Balance</h1>
			</div>

			{/* Form Card */}
			<div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
				<form onSubmit={handleSubmit} className="p-8 space-y-8">
					<h2 className="text-lg font-semibold text-gray-900 mb-2">Revoke Trading Balance</h2>

					<div className="space-y-6">
						{/* Receiver ID */}
						<div className="flex flex-col gap-2">
							<label className="text-sm font-medium text-gray-800">Receiver ID</label>
							<div className="relative">
								<select
									value={receiverId}
									onChange={(e) => setReceiverId(e.target.value)}
									className="w-full h-11 rounded-lg border border-gray-200 bg-white px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
								>
									<option value="">Choose wallet ID</option>
									{RECEIVERS.map((r) => (
										<option key={r.id} value={r.id}>{`${r.name} | ${r.id}`}</option>
									))}
								</select>
								<span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400 text-xs">▼</span>
							</div>
						</div>

						{/* Amount */}
						<div className="flex flex-col gap-2">
							<label className="text-sm font-medium text-gray-800">Amount</label>
							<input
								type="number"
								min={0}
								placeholder="Enter Amount"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								className="w-full h-11 rounded-lg border border-gray-200 bg-white px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
							/>
						</div>

						{/* Remark */}
						<div className="flex flex-col gap-2">
							<label className="text-sm font-medium text-gray-800">Remark</label>
							<input
								type="text"
								placeholder="Remark (if any)"
								value={remark}
								onChange={(e) => setRemark(e.target.value)}
								className="w-full h-11 rounded-lg border border-gray-200 bg-white px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
							/>
						</div>
					</div>

					<div className="flex justify-end pt-2">
						<button
							type="submit"
							disabled={!canSubmit}
							className="min-w-[160px] h-11 rounded-md bg-neutral-900 text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-800 transition-colors"
						>
							{submitting ? "Submitting..." : "Submit"}
						</button>
					</div>
				</form>
			</div>

			{/* History Card */}
			<div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
				<div className="p-8 pb-4 flex items-start justify-between">
					<h2 className="text-lg font-semibold text-gray-900">Previous Revoke History</h2>
					<button
						type="button"
						onClick={() => setShowFilter((v) => !v)}
						className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm hover:shadow px-4 py-2 rounded-lg text-sm font-medium"
					>
						<Filter className="w-4 h-4" />
						Filter
					</button>
				</div>

				{showFilter && (
					<div className="px-8 pb-6">
						<div className="grid md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
							<input
								placeholder="Search Receiver ID"
								className="h-10 rounded-md border border-gray-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
							/>
							<input
								type="date"
								className="h-10 rounded-md border border-gray-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
							/>
							<button className="h-10 rounded-md bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800">Apply</button>
						</div>
					</div>
				)}

				<div className="px-4 pb-6">
					<div className="overflow-x-auto rounded-xl border border-gray-200">
						<table className="min-w-full bg-white text-sm">
							<thead>
								<tr className="text-left text-gray-600 bg-gray-50">
									{[
										"Transaction ID",
										"Transaction Date",
										"Received By",
										"Amount",
										"Status",
										"Created At",
										"Updated At",
									].map((h) => (
										<th key={h} className="font-medium px-6 py-3 whitespace-nowrap">
											{h}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								<tr className="border-t border-gray-100">
									<td className="px-6 py-4 font-mono text-xs">9LTRF35691315</td>
									<td className="px-6 py-4">15-04-2023</td>
									<td className="px-6 py-4 font-medium">ABHISHEK | RO047010LK</td>
									<td className="px-6 py-4">10000</td>
									<td className="px-6 py-4">
										<span className="inline-flex items-center rounded-full bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1">
											Success
										</span>
									</td>
									<td className="px-6 py-4">15-04-2023 10:07 AM</td>
									<td className="px-6 py-4">5-04-2023 10:07 AM</td>
								</tr>
							</tbody>
						</table>
					</div>

					{/* Pagination */}
					<div className="flex justify-end items-center gap-2 mt-6 pr-2">
						<button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm">
							‹
						</button>
						<button className="w-8 h-8 flex items-center justify-center rounded-md bg-neutral-900 text-white text-sm font-medium">
							1
						</button>
						<button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm">
							2
						</button>
						<button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm">
							›
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

