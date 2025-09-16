"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Simple placeholder select for Transfer Mode
const transferModes = ["IMPS", "NEFT", "RTGS"];

function DebitFundsContent() {
  const router = useRouter();
  const params = useSearchParams();
  const viewParam = (params.get("view") || "withdraw").toLowerCase();
  const [view, setView] = useState<"withdraw" | "transfer">(
    viewParam === "transfer" ? "transfer" : "withdraw"
  );
  useEffect(() => {
    const v = (params.get("view") || "withdraw").toLowerCase();
    setView(v === "transfer" ? "transfer" : "withdraw");
  }, [params]);

  const [selectedBank, setSelectedBank] = useState(0);
  const [transferMode, setTransferMode] = useState("IMPS");
  const [amount, setAmount] = useState("");
  // Transfer Amount form
  const [beneficiary, setBeneficiary] = useState("");
  const [remark, setRemark] = useState("");

  const banks = [1, 2, 3].map((i) => ({
    id: i,
    name: "Rajesh Kumar",
    bank: "SBI",
    masked: "•••••1234",
    ifsc: "SBIFN89",
  }));

  const canSubmitWithdraw = amount.trim() !== "" && Number(amount) > 0;
  const canSubmitTransfer = beneficiary.trim() !== "" && amount.trim() !== "" && Number(amount) > 0;

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#ececec" }}>
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="px-10 pb-10">
          {/* Back + Title */}
          <div className="flex items-center gap-3 mb-6 mt-4">
            <button
              onClick={() => router.back()}
              className="text-gray-700 hover:text-black flex items-center gap-2 text-sm font-medium"
              aria-label="Go back"
            >
              <span className="text-xl leading-none">←</span>
              <span className="text-xl font-semibold">Bank Withdrawal</span>
            </button>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 mb-8">
            {view === "withdraw" && (
              <>
                <h2 className="text-sm font-semibold text-gray-800 mb-6">Bank Withdrawal</h2>
                {/* Bank Cards */}
                <div className="flex flex-nowrap gap-6 overflow-x-auto pb-4">
                  {banks.map((b, idx) => {
                    const active = idx === selectedBank;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setSelectedBank(idx)}
                        className={`relative text-left w-60 flex-shrink-0 bg-white border rounded-2xl p-5 flex flex-col gap-4 shadow-sm transition-all ${
                          active
                            ? "border-blue-400 ring-2 ring-blue-500/30"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl">👤</div>
                          <div className="flex-1 text-sm leading-tight pt-1">
                            <p className="font-semibold">{b.name}</p>
                            <p className="text-gray-600 text-[13px]">{b.bank}</p>
                          </div>
                          <div className="absolute top-3 right-3">
                            <span
                              className={`w-5 h-5 inline-flex items-center justify-center rounded-sm border text-[12px] font-bold ${
                                active
                                  ? "bg-green-100 text-green-600 border-green-400"
                                  : "bg-white text-gray-400 border-gray-300"
                              }`}
                            >
                              {active ? "▢" : "☐"}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="space-y-1">
                            <p className="uppercase text-[11px] font-semibold tracking-wide text-gray-600">Account:</p>
                            <p className="font-medium">{b.masked}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="uppercase text-[11px] font-semibold tracking-wide text-gray-600">IFSC Code</p>
                            <p className="font-semibold tracking-wide">{b.ifsc}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Transfer Mode */}
                <div className="mt-8 space-y-2">
                  <label className="text-xs font-semibold tracking-wide text-gray-700 uppercase">
                    Transfer Mode
                  </label>
                  <div className="relative">
                    <select
                      value={transferMode}
                      onChange={(e) => setTransferMode(e.target.value)}
                      className="w-full h-11 appearance-none px-3 pr-10 border border-gray-300 rounded-md bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      {transferModes.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500 text-xs">
                      ▼
                    </span>
                  </div>
                </div>

                {/* Amount */}
                <div className="mt-8 space-y-2">
                  <label className="text-xs font-semibold tracking-wide text-gray-700 uppercase">
                    Enter Amount *
                  </label>
                  <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                    placeholder="Enter Amount"
                    className="w-full h-11 px-3 border border-gray-300 rounded-md bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Notes */}
                <div className="mt-8">
                  <p className="text-[11px] font-semibold text-gray-700 mb-2">Please Note:</p>
                  <ul className="text-[11px] text-gray-600 space-y-1 list-disc list-inside">
                    <li>
                      IMPS Service Will Charge for real time settlement . it will charge Rs. 5 for less than 25000 and Rs. 10 for upto 2lac.
                    </li>
                    <li>NEFT MDR Charges Waived.</li>
                  </ul>
                </div>

                {/* Actions */}
                <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center sm:justify-start">
                  <button
                    type="button"
                    onClick={() => { setAmount(""); setTransferMode("IMPS"); }}
                    className="flex-1 sm:flex-initial sm:w-48 h-11 border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-sm font-medium text-gray-800 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={!canSubmitWithdraw}
                    className="flex-1 sm:flex-initial sm:w-48 h-11 rounded-md bg-blue-600 enabled:hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium shadow-sm transition"
                  >
                    Submit
                  </button>
                </div>
              </>
            )}

            {view === "transfer" && (
              <>
                <h2 className="text-sm font-semibold text-gray-800 mb-8">Transfer Amount</h2>
                <div className="space-y-8 max-w-5xl">
                  {/* Beneficiary */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-wide text-gray-700 uppercase">Choose Beneficiary</label>
                    <div className="relative">
                      <input
                        value={beneficiary}
                        onChange={(e) => setBeneficiary(e.target.value)}
                        placeholder="Choose Beneficiary"
                        className="w-full h-11 px-3 pr-10 border border-gray-300 rounded-md bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">🔍</span>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-wide text-gray-700 uppercase">Enter Amount *</label>
                    <input
                      value={amount}
                      onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                      placeholder="Enter Amount"
                      className="w-full h-11 px-3 border border-gray-300 rounded-md bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Remark */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-wide text-gray-700 uppercase">Remark</label>
                    <div className="relative">
                      <input
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                        placeholder="Remark (if any)"
                        className="w-full h-11 px-3 pr-10 border border-gray-300 rounded-md bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">▾</span>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      disabled={!canSubmitTransfer}
                      className="w-48 h-11 rounded-md bg-blue-600 enabled:hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium shadow-sm transition"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Transfer History */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
            <h2 className="text-sm font-semibold text-gray-800 mb-6">Transfer History</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-wide text-gray-600 border-b border-gray-200">
                    {view === "transfer" && <th className="py-3 px-4 font-semibold">Transaction ID</th>}
                    {view === "transfer" && <th className="py-3 px-4 font-semibold">Date & Time</th>}
                    {view === "transfer" && <th className="py-3 px-4 font-semibold">Received By</th>}
                    {view === "transfer" && <th className="py-3 px-4 font-semibold">Transferred From</th>}
                    <th className="py-3 px-4 font-semibold">Amount</th>
                    {view === "transfer" && <th className="py-3 px-4 font-semibold">Remark</th>}
                    <th className="py-3 px-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b last:border-b-0 border-gray-100">
                    {view === "transfer" && <td className="py-4 px-4 font-medium text-gray-800 whitespace-nowrap">TXN123456789</td>}
                    {view === "transfer" && <td className="py-4 px-4 text-gray-600 whitespace-nowrap">24 Aug 25, 14:30PM</td>}
                    {view === "transfer" && <td className="py-4 px-4 text-gray-700 whitespace-nowrap">ABHISHEK | R00470170</td>}
                    {view === "transfer" && <td className="py-4 px-4 text-gray-700 whitespace-nowrap">LKG Admin | R00470170</td>}
                    <td className="py-4 px-4 font-semibold text-gray-800 whitespace-nowrap">₹190</td>
                    {view === "transfer" && <td className="py-4 px-4 text-gray-700 whitespace-nowrap">Advance DMT PreFund</td>}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 h-6 rounded-full text-[10px] font-semibold bg-green-100 text-green-700">{view === 'transfer' ? 'Active' : 'Success'}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DebitFundsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-500">Loading...</div>}>
      <DebitFundsContent />
    </Suspense>
  );
}
