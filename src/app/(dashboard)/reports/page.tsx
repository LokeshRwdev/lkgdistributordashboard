"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {  Download, Filter, RefreshCw, Search } from "lucide-react";
import CustomArrowLeft from "@/components/icon/svg-icons/CustomLeftArrow";

type Txn = {
  id: string;
  dateTime: string;
  description: string;
  type: "Credited" | "Debited";
  amount: number;
  balance: number;
  status: "Completed" | "Failed";
  help?: string;
};

const SAMPLE_TXNS: Txn[] = [
  {
    id: "T1",
    dateTime: "24 Aug 25, 14:30PM",
    description: "Fund Added by UPI",
    type: "Credited",
    amount: 5000,
    balance: 10000,
    status: "Completed",
  },
  {
    id: "T2",
    dateTime: "24 Aug 25, 14:30PM",
    description: "Fund Added by UPI",
    type: "Debited",
    amount: 1245,
    balance: 16000,
    status: "Failed",
  },
  {
    id: "T3",
    dateTime: "24 Aug 25, 14:30PM",
    description: "Fund Added by UPI",
    type: "Credited",
    amount: 5000,
    balance: 10000,
    status: "Completed",
  },
  {
    id: "T4",
    dateTime: "24 Aug 25, 14:30PM",
    description: "Fund Added by UPI",
    type: "Debited",
    amount: 1245,
    balance: 16000,
    status: "Failed",
  },
];

const metricCards = [
  {
    label: "Current Balance",
    value: "₹ 25,000",
    delta: "+12.5%",
    positive: true,
    since: "Since Last Month",
    icon: <RefreshCw className="w-4 h-4 text-blue-600" />,
  },
  {
    label: "Total Transaction",
    value: "1,247",
    delta: "+8.3%",
    positive: true,
    since: "Since Last Month",
    icon: <RefreshCw className="w-4 h-4 text-blue-600" />,
  },
  {
    label: "Commission Earned",
    value: "₹5,234",
    delta: "-3.2%",
    positive: false,
    since: "Since Last Month",
    icon: <RefreshCw className="w-4 h-4 text-blue-600" />,
  },
  {
    label: "Success Rate",
    value: "92.4%",
    delta: "+1.8%",
    positive: true,
    since: "Since Last Month",
    icon: <RefreshCw className="w-4 h-4 text-blue-600" />,
  },
];

// Transaction History sample set (different shape from wallet statement)
type HistoryTxn = {
  id: string;
  dateTime: string;
  type: string;
  customerNo: string;
  amount: number;
  commission: number;
  status: "Success" | "Processing" | "Failed";
  category: string; // e.g., Electricity, DTH etc.
};

const HISTORY_TXNS: HistoryTxn[] = [
  {
    id: "TXN123456789",
    dateTime: "24 Aug 25, 14:30PM",
    type: "Mobile Recharge",
    customerNo: "965465223",
    amount: 190,
    commission: 2.5,
    status: "Success",
    category: "Electricity",
  },
  {
    id: "TXN123456790",
    dateTime: "24 Aug 25, 14:30PM",
    type: "BBPS",
    customerNo: "965465223",
    amount: 1190,
    commission: 2.5,
    status: "Processing",
    category: "Electricity",
  },
  {
    id: "TXN123456791",
    dateTime: "24 Aug 25, 14:30PM",
    type: "DTH Recharge",
    customerNo: "965465223",
    amount: 999,
    commission: 2.5,
    status: "Success",
    category: "DTH",
  },
];

// Commission summary sample data
type CommissionRow = {
  service: string;
  transactions: number; // count
  volume: number; // total volume
  commission: number; // total commission
  rate: number; // rate percentage
};

const COMMISSION_ROWS: CommissionRow[] = [
  {
    service: "Electricity",
    transactions: 150,
    volume: 52000,
    commission: 2.5,
    rate: 0.5,
  },
  {
    service: "DTH",
    transactions: 89,
    volume: 72000,
    commission: 2.5,
    rate: 0.5,
  },
  {
    service: "Mobile Recharge",
    transactions: 799,
    volume: 78000,
    commission: 2.5,
    rate: 0.5,
  },
  {
    service: "Gas",
    transactions: 1100,
    volume: 92000,
    commission: 2.5,
    rate: 0.5,
  },
];

// Data specifically for the mini distribution chart (two metrics per category)
// primary could represent volume, secondary could represent commission count, etc.
const COMMISSION_DISTRIBUTION = [
  { label: "Elect.", short: "Elect.", primary: 52000, secondary: 47000 },
  { label: "Mobile", short: "Mobile", primary: 78000, secondary: 65000 },
  { label: "DTH", short: "DTH", primary: 72000, secondary: 69000 },
  { label: "Gas", short: "Gas", primary: 92000, secondary: 30000 },
  { label: "Education", short: "Education", primary: 68000, secondary: 71000 },
  { label: "Bills", short: "Bills", primary: 64000, secondary: 52000 },
];

export default function ReportsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"wallet" | "txn" | "commission">(
    "wallet"
  );
  const [exporting, setExporting] = useState(false);
  // Filters for Transaction History Tab
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  function exportData() {
    setExporting(true);
    setTimeout(() => setExporting(false), 1000);
  }

  return (
    <div className="p-6 space-y-6">
      {/* Back + Title */}
      <div className="flex items-center gap-2 mb-1">
        <div className="fill-available-fix">
          <button
            type="button"
            aria-label="Go back"
            onClick={() => router.back()}
            className="p-2 -ml-2 rounded-lg hover:bg-gray-200 text-gray-700"
          >
            <CustomArrowLeft className="" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-xl font-semibold text-gray-800">
            Report & Analytics
          </span>
          <span className="text-sm text-gray-500 font-medium -mt-2 mb-2">
            Financial reports and transaction analytics
          </span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((m) => (
          <div
            key={m.label}
            className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-600">
                {m.label}
              </span>
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-50">
                {m.icon}
              </span>
            </div>
            <div className="text-2xl font-semibold tracking-wide text-gray-900">
              {m.value}
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs">
              <span
                className={`font-semibold ${
                  m.positive ? "text-green-600" : "text-red-600"
                }`}
              >
                {m.delta}
              </span>
              <span className="text-gray-400">{m.since}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Row */}
      <div className="grid md:grid-cols-5 gap-4">
        <div className="relative">
          <input
            type="date"
            placeholder="From Date"
            className="w-full h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>
        <div className="relative">
          <input
            type="date"
            placeholder="To Date"
            className="w-full h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
        </div>
        <div className="relative">
          <select className="w-full h-11 rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40">
            <option value="">Service</option>
            <option>Money Transfer</option>
            <option>Bill Payment</option>
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400 text-xs">
            ▼
          </span>
        </div>
        <div className="relative">
          <select className="w-full h-11 rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40">
            <option value="">Status</option>
            <option>Completed</option>
            <option>Failed</option>
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400 text-xs">
            ▼
          </span>
        </div>
        <button className="h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center gap-2 text-sm font-medium hover:shadow">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-white rounded-2xl p-1 border border-gray-200 shadow-sm w-full md:w-max">
        <button
          onClick={() => setActiveTab("wallet")}
          className={`px-6 h-11 rounded-xl text-sm font-medium transition-colors ${
            activeTab === "wallet"
              ? "bg-[#3386FF] text-white shadow"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Wallet Statement
        </button>
        <button
          onClick={() => setActiveTab("txn")}
          className={`px-6 h-11 rounded-xl text-sm font-medium transition-colors ${
            activeTab === "txn"
              ? "bg-[#3386FF] text-white shadow"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Transaction History
        </button>
        <button
          onClick={() => setActiveTab("commission")}
          className={`px-6 h-11 rounded-xl text-sm font-medium transition-colors ${
            activeTab === "commission"
              ? "bg-[#3386FF] text-white shadow"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Commission Summary
        </button>
      </div>

      {/* Content Section */}
      <div className="grid xl:grid-cols-12 gap-4 items-start">
        {/* Main Column (width varies by active tab) */}
        <div
          className={`space-y-6 ${
            activeTab === "wallet"
              ? "xl:col-span-9"
              : activeTab === "commission"
              ? "xl:col-span-8"
              : "xl:col-span-12"
          }`}
        >
          {activeTab === "wallet" && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-auto">
              <div className="p-6 pb-2 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Wallet Transactions
                  </h2>
                  <p className="text-xs text-gray-500 -mt-1">
                    Recent money transfer transactions
                  </p>
                </div>
                <button
                  onClick={exportData}
                  disabled={exporting}
                  className="h-10 px-5 rounded-lg bg-white border border-gray-200 text-sm font-medium flex items-center gap-2 hover:shadow disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />{" "}
                  {exporting ? "Exporting" : "Export"}
                </button>
              </div>
              <div className="px-4 pb-6">
                <div className="overflow-auto rounded-xl border border-gray-200">
                  <table className="min-w-full bg-white text-sm">
                    <thead>
                      <tr className="text-left text-gray-600 bg-gray-50">
                        {[
                          "Date & Time",
                          "Description",
                          "Type",
                          "Amount",
                          "Balance",
                          "Status",
                          "Help",
                        ].map((h) => (
                          <th
                            key={h}
                            className="font-medium px-6 py-3 whitespace-nowrap"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {SAMPLE_TXNS.map((t) => (
                        <tr
                          key={t.id}
                          className="border-t border-gray-100 bg-gray-50/60 hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            {t.dateTime}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {t.description}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                                t.type === "Credited"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              {t.type}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            ₹{t.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4">
                            ₹{t.balance.toLocaleString()}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                                t.status === "Completed"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              {t.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center text-gray-400">
                            <span className="cursor-pointer" title="Info">
                              i
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                {/* <div className="flex justify-end items-center gap-2 mt-6 pr-2">
                  <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm">
                    ‹
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-md bg-blue-600 text-white text-sm font-medium">
                    1
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm">
                    2
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm">
                    ›
                  </button>
                </div> */}
              </div>
            </div>
          )}
          {activeTab === "txn" && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden h-auto">
              <div className="p-6 pb-2">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Transaction History
                </h2>
                <p className="text-xs text-gray-500 -mt-1">
                  Recent money transfer transactions
                </p>
              </div>
              {/* Inner Filters specific to Transaction History */}
              <div className="px-6 pt-4 pb-2 grid lg:grid-cols-5 md:grid-cols-2 gap-4">
                {/* Search */}
                <div className="lg:col-span-2 relative">
                  <input
                    type="text"
                    placeholder="Transaction id, mobile..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full h-11 rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  />
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                {/* Type */}
                <div className="relative">
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full h-11 rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  >
                    <option value="all">All Type</option>
                    <option>Mobile Recharge</option>
                    <option>BBPS</option>
                    <option>DTH Recharge</option>
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400 text-xs">
                    ▼
                  </span>
                </div>
                {/* Status */}
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full h-11 rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  >
                    <option value="all">All Status</option>
                    <option>Success</option>
                    <option>Processing</option>
                    <option>Failed</option>
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400 text-xs">
                    ▼
                  </span>
                </div>
                {/* Category */}
                <div className="relative">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full h-11 rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  >
                    <option value="all">All Category</option>
                    <option>Electricity</option>
                    <option>DTH</option>
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400 text-xs">
                    ▼
                  </span>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => {
                      // For now just a visual action; real impl would refetch
                    }}
                    className="h-11 w-full rounded-xl bg-white border border-gray-200 flex items-center justify-center gap-2 text-sm font-medium hover:shadow"
                  >
                    <Filter className="w-4 h-4" /> Filter
                  </button>
                </div>
              </div>

              <div className="px-4 pb-6">
                <div className="overflow-auto rounded-xl border border-gray-200">
                  <table className="min-w-full bg-white text-sm">
                    <thead>
                      <tr className="text-left text-gray-600 bg-gray-50">
                        {[
                          "Transaction ID",
                          "Date & Time",
                          "Type",
                          "Customer No.",
                          "Amount",
                          "Commission",
                          "Status",
                        ].map((h) => (
                          <th
                            key={h}
                            className="font-medium px-6 py-3 whitespace-nowrap"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {HISTORY_TXNS.filter((t) => {
                        const matchesSearch =
                          !search ||
                          t.id.toLowerCase().includes(search.toLowerCase()) ||
                          t.customerNo.includes(search);
                        const matchesType =
                          typeFilter === "all" || t.type === typeFilter;
                        const matchesStatus =
                          statusFilter === "all" || t.status === statusFilter;
                        const matchesCategory =
                          categoryFilter === "all" ||
                          t.category === categoryFilter;
                        return (
                          matchesSearch &&
                          matchesType &&
                          matchesStatus &&
                          matchesCategory
                        );
                      }).map((t) => (
                        <tr
                          key={t.id}
                          className="border-t border-gray-100 bg-gray-50/60 hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap font-mono text-xs">
                            <div>{t.id}</div>
                            <span className="text-[10px] text-gray-500">
                              {t.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {t.dateTime}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {t.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {t.customerNo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            ₹{t.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-green-600 font-medium">
                            ₹{t.commission}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                                t.status === "Success"
                                  ? "bg-green-100 text-green-700"
                                  : t.status === "Processing"
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              {t.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                {/* <div className="flex justify-end items-center gap-2 mt-6 pr-2">
                  <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm">
                    ‹
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-md bg-blue-600 text-white text-sm font-medium">
                    1
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm">
                    2
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm">
                    ›
                  </button>
                </div> */}
              </div>
            </div>
          )}
          {activeTab === "commission" && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 pb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Commission Summary
                </h2>
                <button
                  onClick={exportData}
                  disabled={exporting}
                  className="h-10 px-5 rounded-lg bg-white border border-gray-200 text-sm font-medium flex items-center gap-2 hover:shadow disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />{" "}
                  {exporting ? "Exporting" : "Export"}
                </button>
              </div>
              <div className="px-4 pb-6">
                <div className="overflow-auto rounded-xl border border-gray-200">
                  <table className="min-w-full bg-white text-sm">
                    <thead>
                      <tr className="text-left text-gray-600 bg-gray-50">
                        {[
                          "Service",
                          "Transactions",
                          "Volume",
                          "Commission",
                          "Rate",
                        ].map((h) => (
                          <th
                            key={h}
                            className="font-semibold px-6 py-3 whitespace-nowrap text-sm"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {COMMISSION_ROWS.map((r) => (
                        <tr
                          key={r.service}
                          className="border-t border-gray-100 bg-gray-50/60 hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            {r.service}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            ₹{r.transactions.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            ₹{r.volume.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-green-600 font-medium">
                            ₹{r.commission}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1">
                              {r.rate}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side Column: Wallet Summary or Commission side cards */}
        {activeTab === "wallet" && (
          <div className="xl:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Wallet Summary
              </h2>
              <ul className="text-sm space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-600">Opening Balance</span>
                  <span className="font-medium text-gray-900">₹15,000</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Credits</span>
                  <span className="font-medium text-green-600">+₹10,045</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Debits</span>
                  <span className="font-medium text-red-600">-₹2,819</span>
                </li>
                <li className="flex justify-between pt-2 border-t border-gray-100">
                  <span className="text-gray-600">Closing Balance</span>
                  <span className="font-semibold text-gray-900">₹26,000</span>
                </li>
              </ul>
              <div className="flex flex-col gap-3">
                <button className="h-11 rounded-xl bg-[#3386FF] text-white text-sm font-medium hover:bg-blue-700">
                  Add Funds
                </button>
                <button className="h-11 rounded-xl bg-white border border-[#3386FF] text-sm font-medium hover:shadow flex items-center justify-center gap-2">
                  <span
                    style={{
                      color: "#3386FF",
                    }}
                  >
                    Download statement
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
        {activeTab === "commission" && (
          <div className="xl:col-span-4 space-y-2">
            {/* Commission Distribution */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 overflow-auto">
              <div className="text-[16] font-semibold text-gray-900 mb-4">
                Commission Distribution
              </div>
              {/* Chart area */}
              <div className="relative">
                <div className="h-[98] bg-[#D9D9D926] border border-gray-100 flex items-end justify-center gap-6 overflow-hidden">
                  {(() => {
                    const max = Math.max(
                      ...COMMISSION_DISTRIBUTION.map((c) =>
                        Math.max(c.primary, c.secondary)
                      )
                    );
                    return COMMISSION_DISTRIBUTION.map((c) => {
                      const primaryH = Math.max((c.primary / max) * 50, 8);
                      const secondaryH = Math.max((c.secondary / max) * 50, 8);
                      return (
                        <div
                          key={c.label}
                          className="flex flex-col items-center justify-end gap-2 min-w-[50px]"
                        >
                          <div className="flex items-end gap-1.5 h-36">
                            {/* Primary bar */}
                            <div
                              title={`${
                                c.label
                              }: ${c.primary.toLocaleString()}`}
                              className="w-2 rounded-t-lg bg-gradient-to-t from-[#817AF3] to-[#79D0F1] shadow-sm border-l border-r border-t border-blue-300"
                              style={{ height: primaryH + "%" }}
                            />
                            {/* Secondary bar */}
                            <div
                              title={`${
                                c.label
                              }: ${c.secondary.toLocaleString()}`}
                              className="w-2 rounded-t-lg bg-gradient-to-t from-[#46A46C] to-[#57DA65] shadow-sm border-l border-r border-t border-green-300"
                              style={{ height: secondaryH + "%" }}
                            />
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
              <div>
                {/* <span
                  className="text-xs text-gray-600 truncate max-w-[50px] leading-tight text-center font-medium"
                  title={c.label}
                >
                  {c.short}
                </span> */}
              </div>
            </div>
            {/* Monthly Summary */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
              <h3 className="text-sm font-semibold text-gray-900">
                Monthly Summary
              </h3>
              <ul className="text-sm space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-600">Opening Balance</span>
                  <span className="font-medium text-gray-900">₹15,000</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Credits</span>
                  <span className="font-medium text-green-600">+₹10,045</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Debits</span>
                  <span className="font-medium text-red-600">-₹2,819</span>
                </li>
                <li className="flex justify-between pt-2 border-t border-gray-100">
                  <span className="text-gray-600">Closing Balance</span>
                  <span className="font-semibold text-gray-900">₹26,000</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Add the style for fill-available-fix */}
      <style jsx>{`
        .fill-available-fix {
          height: -webkit-fill-available;
          height: fill-available;
          min-height: 32px;
        }
      `}</style>
    </div>
  );
}
