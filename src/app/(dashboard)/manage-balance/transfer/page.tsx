"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {  Search } from "lucide-react";
import CustomArrowLeft from "@/components/icon/svg-icons/CustomLeftArrow";

const BENEFICIARIES = [
	{ id: "RO047010LK", name: "ABHISHEK" },
	{ id: "RO047011LK", name: "PRIYA" },
	{ id: "RO047012LK", name: "RAHUL" },
];

const ACCOUNTS = [
	{ id: "AC001", label: "Primary Account" },
	{ id: "AC002", label: "Secondary Account" },
];

const WALLETS = [
	{ id: "WA001", label: "Main Wallet" },
	{ id: "WA002", label: "Trading Wallet" },
];

const SERVICES = [
	{ id: "SV001", label: "Advance DMT PreFund" },
	{ id: "SV002", label: "BBPS" },
];

export default function TransferBalancePage() {
	const router = useRouter();
	const [beneficiaryQuery, setBeneficiaryQuery] = useState("");
	const [beneficiaryId, setBeneficiaryId] = useState("");
	const [accountId, setAccountId] = useState("");
	const [walletId, setWalletId] = useState("");
	const [serviceId, setServiceId] = useState("");
	const [remark, setRemark] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const filteredBeneficiaries = beneficiaryQuery
		? BENEFICIARIES.filter((b) =>
				(b.name + b.id).toLowerCase().includes(beneficiaryQuery.toLowerCase())
			)
		: BENEFICIARIES;

	const canSubmit =
		beneficiaryId && accountId && walletId && serviceId && !submitting;

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!canSubmit) return;
		setSubmitting(true);
		setTimeout(() => {
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
				<h1 className="text-xl font-semibold text-gray-800">Transfer Balance</h1>
			</div>

			{/* Form Card */}
			<div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
				<form onSubmit={handleSubmit} className="p-8 space-y-8">
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						Direct TB Transfer
					</h2>

						<div className="space-y-6">
						{/* Beneficiary (search select hybrid) */}
						<div className="flex flex-col gap-2">
							<label className="text-sm font-medium text-gray-800">Beneficiary</label>
							<div className="relative">
								<input
									type="text"
									placeholder="Search Beneficiary"
									value={beneficiaryQuery}
									onChange={(e) => {
										setBeneficiaryQuery(e.target.value);
										setBeneficiaryId("");
									}}
									className="w-full h-11 rounded-lg border border-gray-200 bg-white pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
								/>
								<Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
								{beneficiaryQuery && (
									<div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-56 overflow-auto text-sm">
										{filteredBeneficiaries.length === 0 && (
											<div className="px-4 py-3 text-gray-500">No results</div>
										)}
										{filteredBeneficiaries.map((b) => (
											<button
												type="button"
												key={b.id}
												onClick={() => {
													setBeneficiaryId(b.id);
													setBeneficiaryQuery(`${b.name} | ${b.id}`);
												}}
												className="w-full text-left px-4 py-2 hover:bg-gray-100"
											>
												{b.name} | {b.id}
											</button>
										))}
									</div>
								)}
							</div>
						</div>

						{/* Account ID */}
						<div className="flex flex-col gap-2">
							<label className="text-sm font-medium text-gray-800">Account ID</label>
							<div className="relative">
								<select
									value={accountId}
									onChange={(e) => setAccountId(e.target.value)}
									className="w-full h-11 rounded-lg border border-gray-200 bg-white px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
								>
									<option value="">Choose Account ID</option>
									{ACCOUNTS.map((a) => (
										<option key={a.id} value={a.id}>{`${a.label} | ${a.id}`}</option>
									))}
								</select>
								<span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400 text-xs">▼</span>
							</div>
						</div>

						{/* Wallet ID */}
						<div className="flex flex-col gap-2">
							<label className="text-sm font-medium text-gray-800">Wallet ID</label>
							<div className="relative">
								<select
									value={walletId}
									onChange={(e) => setWalletId(e.target.value)}
									className="w-full h-11 rounded-lg border border-gray-200 bg-white px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
								>
									<option value="">Choose Wallet ID</option>
									{WALLETS.map((w) => (
										<option key={w.id} value={w.id}>{`${w.label} | ${w.id}`}</option>
									))}
								</select>
								<span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400 text-xs">▼</span>
							</div>
						</div>

						{/* Service ID */}
						<div className="flex flex-col gap-2">
							<label className="text-sm font-medium text-gray-800">Service ID</label>
							<div className="relative">
								<select
									value={serviceId}
									onChange={(e) => setServiceId(e.target.value)}
									className="w-full h-11 rounded-lg border border-gray-200 bg-white px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
								>
									<option value="">Choose Service ID</option>
									{SERVICES.map((s) => (
										<option key={s.id} value={s.id}>{`${s.label} | ${s.id}`}</option>
									))}
								</select>
								<span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400 text-xs">▼</span>
							</div>
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
				<div className="p-8 pb-4">
					<h2 className="text-lg font-semibold text-gray-900">Previous Revoke History</h2>
				</div>
				<div className="px-4 pb-6">
					<div className="overflow-x-auto rounded-xl border border-gray-200">
						<table className="min-w-full bg-white text-sm">
							<thead>
								<tr className="text-left text-gray-600 bg-gray-50">
									{[
										"Transaction ID",
										"Transaction Date",
										"Received By",
										"Transferred From",
										"Amount",
										"Remark",
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
									<td className="px-6 py-4 font-medium">LKG Admin | RO0470170</td>
									<td className="px-6 py-4">10000</td>
									<td className="px-6 py-4">Advance DMT PreFund</td>
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

