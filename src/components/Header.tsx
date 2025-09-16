"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [openProfile, setOpenProfile] = useState(false);
  const [openDebit, setOpenDebit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const debitRef = useRef<HTMLDivElement | null>(null);
  const addRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      const target = e.target as Node;
      if (profileRef.current && !profileRef.current.contains(target)) {
        setOpenProfile(false);
      }
      if (debitRef.current && !debitRef.current.contains(target)) setOpenDebit(false);
      if (addRef.current && !addRef.current.contains(target)) setOpenAdd(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenProfile(false);
        setOpenDebit(false);
        setOpenAdd(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);
  return (
    <header
      className="bg-white rounded-2xl shadow-md py-6"
      style={{
        margin: "16px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "16px",
      }}
    >
      <div className="flex items-center justify-between px-10">
        {/* Title */}
        <div className="text-2xl font-semibold text-gray-900">Dashboards</div>

  <div className="flex items-center gap-4">
          {/* Balance pill */}
          <button
            className="h-9 px-3 rounded-full bg-gray-100 text-gray-700 text-sm inline-flex items-center gap-2 border border-gray-200 hover:bg-gray-200/80"
            aria-label="Balance"
          >
            <span>₹ 25,000</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Add Funds Dropdown */}
          <div className="relative" ref={addRef}>
            <button
              type="button"
              onClick={() => setOpenAdd(o => !o)}
              aria-haspopup="true"
              aria-expanded={openAdd}
              className="h-9 px-4 rounded-full bg-green-500 text-white text-sm inline-flex items-center gap-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400/40"
            >
              <span className="w-5 h-5 rounded-full bg-white text-green-600 flex items-center justify-center text-[12px] font-bold">
                +
              </span>
              Add Funds
            </button>
            {openAdd && (
              <div
                role="menu"
                aria-label="Add funds menu"
                className="absolute left-0 mt-3 w-64 bg-white rounded-xl shadow-lg ring-1 ring-black/5 border border-gray-100 z-40 py-2 animate-in fade-in slide-in-from-top-2"
              >
                <button
                  type="button"
                  onClick={() => { router.push('/manage-balance/add-funds'); setOpenAdd(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 focus:bg-gray-100 text-sm text-gray-800 transition-colors"
                >
                  <span className="text-base">🏦</span>
                  <span>Payment Gateway (PG)</span>
                </button>
                <button
                  type="button"
                  onClick={() => { router.push('/user/raise-funds'); setOpenAdd(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 focus:bg-gray-100 text-sm text-gray-800 transition-colors"
                >
                  <span className="text-base">🛫</span>
                  <span>Fund Request</span>
                </button>
              </div>
            )}
          </div>

          {/* Debit Funds */}
          <div className="relative" ref={debitRef}>
            <button
              type="button"
              onClick={() => setOpenDebit(o => !o)}
              aria-haspopup="true"
              aria-expanded={openDebit}
              className="h-9 px-4 rounded-full bg-red-500 text-white text-sm inline-flex items-center gap-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400/40"
            >
              <span className="w-5 h-5 rounded-full bg-white text-red-600 flex items-center justify-center text-[12px] font-bold">
                –
              </span>
              Debit Funds
            </button>
            {openDebit && (
              <div
                role="menu"
                aria-label="Debit funds menu"
                className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg ring-1 ring-black/5 border border-gray-100 z-40 p-4 animate-in fade-in slide-in-from-top-2"
              >
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => { router.push('/manage-balance/debit-funds?view=withdraw'); setOpenDebit(false); }}
                    className="w-full h-10 inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow-sm transition-colors"
                  >
                    <span className="text-base">🏦</span>
                    <span>Move To Bank</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { router.push('/manage-balance/debit-funds?view=transfer'); setOpenDebit(false); }}
                    className="w-full flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors"
                  >
                    <span className="text-base">👤</span>
                    <span>Transfer Amount</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        
          {/* User Profile */}
          <div className="relative" ref={profileRef}>
            <div className="flex items-center gap-3 pl-2">
              <button
                type="button"
                onClick={() => router.push('/profile')}
                className="flex items-center gap-3 cursor-pointer focus:outline-none"
                aria-label="Open profile page"
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                  <span className="text-gray-700 text-sm font-semibold">R</span>
                </div>
                <div className="leading-tight text-left">
                  <p className="text-sm font-semibold text-gray-900">Rajesh Saini</p>
                  <p className="text-xs text-gray-500">A837688 (Admin)</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setOpenProfile((o) => !o)}
                className="p-2 rounded-full focus:outline-none hover:bg-gray-100"
                aria-haspopup="menu"
                aria-expanded={openProfile}
                aria-label="Toggle user menu"
              >
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${openProfile ? 'rotate-180' : ''}`} />
              </button>
            </div>
            {openProfile && (
              <div
                role="menu"
                aria-label="User menu"
                className="absolute right-0 mt-3 w-60 bg-white rounded-xl shadow-lg ring-1 ring-black/5 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2"
                style={{ border: '1px solid #eee' }}
              >
                <div className="px-4 py-3 text-xs font-semibold text-gray-500">
                  Hii Rajesh Saini
                </div>
                <ul className="text-sm text-gray-700">
                  {[
                    { label: 'My Profile', icon: '👤' },
                    { label: 'Orders', icon: '📄' },
                    { label: 'Transactions', icon: '🧾' },
                    { label: 'Download Section', icon: '⬇' },
                    { label: 'Help Center', icon: '🛟' },
                    { label: 'Invoice', icon: '📑' },
                  ].map(item => (
                    <li key={item.label}>
                      <button
                        type="button"
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 focus:bg-gray-100 transition-colors"
                        role="menuitem"
                      >
                        <span className="w-5 text-center">{item.icon}</span>
                        <span>{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="my-1 h-px bg-gray-100" />
                <ul className="text-sm text-gray-700">
                  {[
                    { label: 'Manage My Account', icon: '🛡️' },
                    { label: 'Logout', icon: '🚪' },
                  ].map(item => (
                    <li key={item.label}>
                      <button
                        type="button"
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 focus:bg-gray-100 transition-colors"
                        role="menuitem"
                      >
                        <span className="w-5 text-center">{item.icon}</span>
                        <span>{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
      </div>
    </header>
  );
};

export default Header;
