"use client";

import React from "react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = React.useState<
    "overview" | "weekly" | "monthly" | "yearly"
  >("yearly");
  const [showVirtualInfo, setShowVirtualInfo] = React.useState(false);

  const tabs: { key: typeof activeTab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "weekly", label: "Weekly" },
    { key: "monthly", label: "Monthly" },
    { key: "yearly", label: "Yearly" },
  ];

  return (
    <>
      <div
        className="px-4 min-h-screen scrollbar-hide"
        style={{ background: "#ececec" }}
      >
        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-md mb-4  w-[50%]">
          <div
            className="grid grid-cols-4 gap-1 w-full text-sm font-medium"
            role="tablist"
            aria-label="Dashboard time range tabs"
          >
            {tabs.map((t) => {
              const isActive = activeTab === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`tab-panel-${t.key}`}
                  id={`tab-${t.key}`}
                  onClick={() => setActiveTab(t.key)}
                  className={`h-12 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black/40 ${
                    isActive
                      ? "bg-[#3386FF] text-white shadow"
                      : "text-gray-600 hover:text-black bg-transparent"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* OVERVIEW TAB CONTENT */}
        {activeTab === "overview" && (
          <div
            id="tab-panel-overview"
            role="tabpanel"
            aria-labelledby="tab-overview"
            className="bg-white rounded-xl p-6 mb-6 shadow-md"
          >
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-sm text-gray-600">
              High level snapshot coming soon. Select other tabs to see their
              content.
            </p>
          </div>
        )}

        {/* WEEKLY TAB CONTENT */}
        {activeTab === "weekly" && (
          <div
            id="tab-panel-weekly"
            role="tabpanel"
            aria-labelledby="tab-weekly"
            className="bg-white rounded-xl p-6 mb-6 shadow-md"
          >
            <h2 className="text-xl font-semibold mb-2">Weekly Performance</h2>
            <p className="text-sm text-gray-600">
              Weekly metrics placeholder. Integrate charts / KPIs here later.
            </p>
          </div>
        )}

        {/* MONTHLY TAB CONTENT */}
        {activeTab === "monthly" && (
          <div
            id="tab-panel-monthly"
            role="tabpanel"
            aria-labelledby="tab-monthly"
            className="bg-white rounded-xl p-6 mb-6 shadow-md"
          >
            <h2 className="text-xl font-semibold mb-2">Monthly Performance</h2>
            <p className="text-sm text-gray-600">
              Monthly dataset placeholder. Will mirror Yearly structure with
              filtered data.
            </p>
          </div>
        )}
        {/* YEARLY TAB CONTENT (Existing detailed dashboard) */}
        {activeTab === "yearly" && (
          <>
            {/* welcome tab */}
            <div className="bg-white rounded-2xl p-6 mb-6 shadow-md">
              <div className="flex justify-between items-start gap-6">
                <div>
                  <div className="text-3xl font-semibold text-gray-800 mb-2">
                    Welcome Back <span className="text-[#3386FF]">Rajesh!</span>
                  </div>
                  <p className="text-gray-600">
                    Your business dashboard is ready, Let's make today
                    productive!
                  </p>
                  <div className="flex items-center gap-4 mt-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      All system Online
                    </span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      Premium Member
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch gap-4">
                  {/* Virtual Account card */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-4 w-[230px]">
                    <div className="flex items-center justify-center mb-3">
                      <div className="flex items-center justify-between gap-6">
                        <span className="text-[#3386FF] text-sm font-semibold">
                          Virtual Account
                        </span>
                        <span
                          role="button"
                          aria-label="About Virtual Wallet"
                          onClick={() => setShowVirtualInfo(true)}
                          className="w-5 h-5 rounded-full bg-gray-100 text-[#3386FF] text-[12px] flex items-center justify-center cursor-pointer hover:bg-gray-200"
                          title="About Virtual Wallet"
                        >
                          i
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="mb-1">
                        IFSC:{" "}
                        <span className="text-gray-800 font-medium">
                          SBI004NUE9
                        </span>
                      </div>
                      <div>
                        Account no.:{" "}
                        <span className="text-gray-800 font-medium">
                          587553226995
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Balance card */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-4 w-[230px] flex flex-col items-center justify-center">
                    <div>
                      <p className="text-2xl font-bold text-[#3386FF] leading-snug">
                        ₹ 25,000
                      </p>
                      <p className="text-sm text-gray-500">Total Balance</p>
                    </div>
                    <button className="mt-3 inline-flex items-center bg-[#3386FF] text-white px-4 py-2 rounded-full text-sm shadow hover:bg-blue-600">
                      + Add Money
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* User & Partner Insights */}
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-md border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800 px-2 mb-3">
                User & Partner Insights
              </h3>
              <div className="grid grid-cols-5 gap-3">
                {[
                  {
                    label: "Super Distributors",
                    users: "15 Users",
                    growth: "+3.2%",
                  },
                  {
                    label: "Distributors",
                    users: "155 Users",
                    growth: "+3.2%",
                  },
                  { label: "Retailer", users: "200 Users", growth: "+3.2%" },
                  {
                    label: "Consumers",
                    users: "1155 Consumers",
                    growth: "+3.2%",
                  },
                  { label: "Retailer", users: "200 Users", growth: "+3.2%" },
                ].map((c, i) => (
                  <div
                    key={i}
                    className="bg-white border border-gray-100 rounded-lg shadow-md flex items-center p-3 gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                      👤
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {c.label}
                      </p>
                      <p className="text-xs text-gray-500">{c.users}</p>
                    </div>
                    <div className="text-green-600 text-xs font-medium">
                      {c.growth}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Status Row 1 */}
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-md border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800 px-2 mb-3">
                Service Status
              </h3>
              <div className="grid grid-cols-5 gap-3">
                {[
                  {
                    name: "BBPS",
                    amount: "₹1,875,00",
                    tx: 55,
                    status: "Online",
                  },
                  {
                    name: "DMT",
                    amount: "₹1,675,00",
                    tx: 45,
                    status: "Online",
                  },
                  {
                    name: "AEPS",
                    amount: "₹1,681,00",
                    tx: 25,
                    status: "Online",
                  },
                  {
                    name: "Fastag",
                    amount: "₹28,07,500",
                    tx: 95,
                    status: "Online",
                  },
                  {
                    name: "Service X",
                    amount: "₹1,875,00",
                    tx: 55,
                    status: "Online",
                  },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg border border-gray-100 shadow-md p-3"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <p className="text-sm font-semibold text-gray-800">
                        {s.name}
                      </p>
                      <span className="bg-green-100 text-green-600 text-[10px] px-2 py-0.5 rounded-full">
                        {s.status}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-gray-900">
                      {s.amount}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-1">
                      Total Transaction - {s.tx}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Status Row 2 */}
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-md border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800 px-2 mb-3">
                Service Status
              </h3>
              <div className="grid grid-cols-5 gap-3">
                {[
                  {
                    name: "BBPS Draft",
                    amount: "₹1,875,00",
                    tx: 55,
                    status: "Offline",
                  },
                  {
                    name: "BBPS Offline",
                    amount: "₹1,675,00",
                    tx: 45,
                    status: "Offline",
                  },
                  {
                    name: "Fund Request",
                    amount: "₹1,681,00",
                    tx: 25,
                    status: "Offline",
                  },
                  {
                    name: "User Upgrade",
                    amount: "15 Users",
                    tx: 35,
                    status: "Offline",
                  },
                  {
                    name: "Service Y",
                    amount: "₹1,875,00",
                    tx: 55,
                    status: "Offline",
                  },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg border border-gray-100 shadow-md p-3"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <p className="text-sm font-semibold text-gray-800">
                        {s.name}
                      </p>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full ${
                          s.status === "Online"
                            ? "bg-green-100 text-green-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {s.status}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-gray-900">
                      {s.amount}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-1">
                      Total Transaction - {s.tx}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Transfer Summary + Fund Request */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Transfer Summary */}
              <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 flex flex-col">
                <h3 className="text-sm font-semibold text-gray-800 px-2 mb-4">
                  Transfer Summary
                </h3>
                <div className="flex-1 flex items-center justify-center">
                  {/* Donut placeholder */}
                  <div className="relative">
                    <div className="w-56 h-56 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <div className="w-28 h-28 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="ml-8 space-y-2 text-sm">
                    {[
                      {
                        color: "bg-blue-600",
                        label: "Money Transfer",
                        value: "₹45,000",
                      },
                      {
                        color: "bg-orange-400",
                        label: "Bill Payment",
                        value: "₹35,000",
                      },
                      {
                        color: "bg-green-500",
                        label: "AEPS",
                        value: "₹25,000",
                      },
                      {
                        color: "bg-yellow-400",
                        label: "Others",
                        value: "₹20,000",
                      },
                    ].map((i) => (
                      <div key={i.label} className="flex items-center gap-3">
                        <span
                          className={`w-3 h-3 rounded-full ${i.color}`}
                        ></span>
                        <span className="text-gray-700 flex-1">{i.label}</span>
                        <span className="text-gray-900 font-medium">
                          {i.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Fund Request */}
              <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 flex flex-col">
                <div className="flex items-center justify-between mb-4 px-2">
                  <h3 className="text-sm font-semibold text-gray-800">
                    Fund Request
                  </h3>
                  <button className="text-xs bg-black text-white rounded-md px-4 py-2">
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-white border border-gray-100 rounded-lg shadow-md px-3 py-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                          👤
                        </div>
                        <div className="leading-tight">
                          <p className="text-sm font-medium text-gray-800">
                            Rajesh Kumar{" "}
                            <span className="text-gray-400 text-xs">
                              (Retailer)
                            </span>
                          </p>
                          <p className="text-xs text-gray-500">TXN123456789</p>
                        </div>
                      </div>
                      <div className="text-right mr-4">
                        <p className="text-sm font-semibold text-gray-900">
                          ₹5,000
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-[11px] px-3 py-1 rounded-full border border-gray-300 hover:bg-gray-100">
                          Decline
                        </button>
                        <button className="text-[11px] px-3 py-1 rounded-full bg-black text-white hover:bg-black/90">
                          Approve
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 mt-4 mb-8">
              <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="text-sm font-semibold text-gray-800">
                  Recent Transactions
                </h3>
                <button className="flex items-center gap-2 text-xs bg-white border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50">
                  <span className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center text-[10px]">
                    ⚲
                  </span>
                  Filter
                </button>
              </div>
              <div className="w-full text-sm">
                <div className="grid grid-cols-7 font-semibold text-gray-700 text-xs bg-gray-100 rounded-lg">
                  <div className="py-2 px-4">Transaction</div>
                  <div className="py-2 px-4">Type</div>
                  <div className="py-2 px-4">User</div>
                  <div className="py-2 px-4">Amount</div>
                  <div className="py-2 px-4">Commission</div>
                  <div className="py-2 px-4">Status</div>
                  <div className="py-2 px-4">Timestamp</div>
                </div>
                <div className="divide-y divide-gray-100">
                  {[
                    {
                      id: "TXN123456789",
                      type: "Money Transfer",
                      user: "Rajesh Kumar (Retailer)",
                      amount: "₹5,000",
                      comm: "+25",
                      status: "Success",
                      ts: "24 Aug 25, 14:30PM",
                    },
                    {
                      id: "TXN123456789",
                      type: "Bill Payment",
                      user: "Priya Kumar (Distributor)",
                      amount: "₹15,000",
                      comm: "+15",
                      status: "Processing",
                      ts: "24 Aug 25, 14:30PM",
                    },
                    {
                      id: "TXN123456789",
                      type: "AEPS",
                      user: "Riya Sharma (Retailer)",
                      amount: "₹10,000",
                      comm: "+210",
                      status: "Success",
                      ts: "24 Aug 25, 14:30PM",
                    },
                    {
                      id: "TXN123456789",
                      type: "Fund Request",
                      user: "Diksha Sharma (Distributor)",
                      amount: "₹10,000",
                      comm: "+0",
                      status: "Success",
                      ts: "24 Aug 25, 14:30PM",
                    },
                    {
                      id: "TXN123456789",
                      type: "Wallet Transfer",
                      user: "Om Prakash (SuperDistributor)",
                      amount: "₹12,000",
                      comm: "+220",
                      status: "Success",
                      ts: "24 Aug 25, 14:30PM",
                    },
                  ].map((r) => (
                    <div
                      key={r.id}
                      className="grid grid-cols-7 text-xs text-gray-700"
                    >
                      <div className="px-4 py-3 font-medium">{r.id}</div>
                      <div className="px-4 py-3">
                        <span className="inline-block bg-gray-100 text-gray-800 rounded-md px-3 py-1">
                          {r.type}
                        </span>
                      </div>
                      <div className="px-4 py-3">{r.user}</div>
                      <div className="px-4 py-3 font-medium">{r.amount}</div>
                      <div className="px-4 py-3 text-green-600 font-medium">
                        {r.comm}
                      </div>
                      <div className="px-4 py-3">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-[11px] font-medium ${
                            r.status === "Success"
                              ? "bg-green-100 text-green-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {r.status}
                        </span>
                      </div>
                      <div className="px-4 py-3 text-gray-500">{r.ts}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {showVirtualInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowVirtualInfo(false)}
          />
          <div className="relative bg-white rounded-3xl shadow-2xl w-[92%] max-w-xl p-6 sm:p-7">
            <div className="flex items-start justify-between mb-2">
              <div className="text-[#3386FF] text-xl font-semibold">Virtual Wallet</div>
              <button
                aria-label="Close"
                onClick={() => setShowVirtualInfo(false)}
                className="text-[#3386FF] text-xl leading-none px-1"
              >
                ×
              </button>
            </div>
            <p className="text-[#7E7A7A] font-medium mb-6">Get track of your amount</p>
            <div className="text-[#7E7A7A] mb-2 font-medium">About Virtual wallet:</div>
            <ul className="list-disc pl-8 space-y-3 text-[#7E7A7A]">
              <li>
                The virtual account in LKG Infosolutions Pvt. Ltd. allows you to transfer funds directly from you.
              </li>
              <li>Funds are typically credited within 5 minutes to 24 hours.</li>
              <li>We recommend using this method for quick and secure wallet top-ups.</li>
              <li>
                To ensure a smooth and timely credit, please use RTGS, NEFT, or IMPS as the mode of payment.
              </li>
            </ul>
          </div>
        </div>
      )}

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none !important;
        }
        .scrollbar-hide {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}</style>
    </>
  );
}
