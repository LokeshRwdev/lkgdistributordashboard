"use client";

import CustomArrowLeft from "@/components/icon/svg-icons/CustomLeftArrow";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CustomActiveIconGreen, { CustomActiveIconBlue, CustomActiveIconYellow } from "@/components/icon/svg-icons/CustomActiveIcon";

export default function SupportTicketPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const TICKETS = [
    {
      id: "TXN123456789",
      description: "Customer reported incorrect transaction amount",
      mode: "BBPS Offline",
      date: "24 Aug 25, 14:30PM",
      status: "Active" as const,
      icon: <CustomActiveIconGreen className="w-6 h-6" />,
    },
    {
      id: "TXN123456789",
      description: "Customer reported incorrect transaction amount",
      mode: "BBPS Offline",
      date: "24 Aug 25, 14:30PM",
      status: "Closed" as const,
      icon: <CustomActiveIconBlue className="w-6  h-6" />,
    },
    {
      id: "TXN123456789",
      description: "Customer reported incorrect transaction amount",
      mode: "BBPS Offline",
      date: "24 Aug 25, 14:30PM",
      status: "Closed" as const,
      icon: <CustomActiveIconBlue className="w-6 h-6" />,
    },
  ];

  return (
    <div className="p-6 space-y-4">
      {/* Top title with back arrow (outside main card) */}
      <div className="flex items-center gap-2 text-gray-800 ml-6">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="inline-flex items-center gap-2 hover:text-black"
        >
          <CustomArrowLeft />
        </button>
        <div className="font-semibold text-xl">Raised Tickets</div>
      </div>

      {/* Main card containing Tickets header, action button, and list */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
        {/* Card header row */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          <div className="text-[#3386FF] text-sm font-semibold">Tickets</div>
          <button
            onClick={() => setShowModal(true)}
            className="h-10 px-4 rounded-lg bg-[#3386FF] text-white text-sm font-medium shadow hover:bg-blue-700"
          >
            + Create New Ticket
          </button>
        </div>

        {/* Divider */}
        {/* <div className="h-px bg-gray-100" /> */}

        {/* Tickets list inside card */}
        <div className="p-4 sm:p-6 space-y-6">
          {TICKETS.map((t, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl border border-gray-100 p-5 shadow-xl`}
              //   style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.04)" }}
            >
              <div className="flex items-start gap-4">
                {/* Left icon */}
                <div
                  className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 ${
                    t.status === "Active" ? "bg-[#0BA82F36]" : "bg-[#5298FF54]"
                  }`}
                >
                  {t.icon}
                </div>

                <div className="flex-1">
                  <div className="mb-2">
                    <span
                      className={`px-2 py-1 rounded-full text-[11px] font-semibold ${
                        t.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-800 font-semibold">
                    Transaction ID- {t.id}
                  </div>
                  <div className="text-[12px] text-gray-600 mt-1">
                    Description- {t.description}
                  </div>
                  <div className="text-[12px] text-gray-600 mt-1">
                    Mode- {t.mode}
                  </div>
                  <div className="text-[12px] text-gray-600 mt-1">
                    Date/Time- {t.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowModal(false)}
          />

          <div className="relative bg-white rounded-2xl w-full max-w-xl p-6 shadow-2xl z-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#3386FF] font-semibold">
                Support Ticket Form
              </h3>
              <button
                aria-label="Close"
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: submit the ticket to API
                setShowModal(false);
              }}
              className="space-y-4"
            >
              <div>
                <span className="block text-sm font-medium mb-2">
                  Transaction ID
                </span>
                <input
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-sm"
                  placeholder="TXN123456789"
                />
              </div>

              <div>
                <span className="block text-sm font-medium mb-2">Subject</span>
                <input
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-sm"
                  placeholder="Transaction Details"
                />
              </div>

              <div>
                <span className="block text-sm font-medium mb-2">
                  Description
                </span>
                <textarea
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-sm"
                  placeholder="Customer reported incorrect transaction amount"
                  rows={3}
                />
              </div>

              <div>
                <span className="block text-sm font-medium mb-2">Priority</span>
                <select
                  defaultValue=""
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-sm"
                >
                  <option value="" disabled>
                    Select Priority
                  </option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="flex items-center justify-around pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-14 py-2 rounded-2xl border border-[#3386FF] text-[#3386FF] bg-white"
                >
                  Cancel
                </button>
                <button className="px-14 py-2 rounded-2xl bg-[#3386FF] text-white">
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
