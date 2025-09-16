"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {  Eye, Check, X } from "lucide-react";
import CustomArrowLeft from "@/components/icon/svg-icons/CustomLeftArrow";

export default function DownlineFundRequestPage() {
  const router = useRouter();
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
        <h1 className="text-xl font-semibold text-gray-800">
          Downline TB Request
        </h1>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="p-8 pb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Downline Trading Balance Request
          </h2>
        </div>
        <div className="px-4 pb-6">
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="min-w-full bg-white text-sm">
              <thead>
                <tr className="text-left bg-gray-50 font-semibold ">
                  {[
                    "Deposit Date",
                    "Submission Datetime",
                    "Transaction ID",
                    "Amount",
                    "UTR No",
                    "Remark",
                    "Status",
                    "Approver",
                    "View",
                    "Action",
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
                <tr className="border-t border-gray-100">
                  <td className="px-6 py-4 font-medium text-sm">14-03-2023</td>
                  <td className="px-6 py-4 font-medium text-sm">22-04-2023 15:38:21</td>
                  <td className="px-6 py-4 font-medium text-sm font-mono text-xs">TXN1234567890</td>
                  <td className="px-6 py-4 font-medium text-sm">₹ 2000</td>
                  <td className="px-6 py-4 font-medium text-sm">UPI</td>
                  <td className="px-6 py-4 font-medium text-sm">Monthly business funding</td>
                  <td className="px-6 py-4 font-medium text-sm">
                    <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4">Monthly business funding</td>
                  <td className="px-6 py-4">
                    <button
                      className="p-1 rounded hover:bg-gray-100"
                      aria-label="View"
                    >
                      <Eye className="w-5 h-5 text-blue-600" />
                    </button>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      className="p-1 rounded hover:bg-green-100"
                      aria-label="Approve"
                    >
                      <Check className="w-5 h-5 text-green-600" />
                    </button>
                    <button
                      className="p-1 rounded hover:bg-red-100"
                      aria-label="Reject"
                    >
                      <X className="w-5 h-5 text-red-600" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-end items-center gap-2 mt-6 pr-2">
            <button className="w-8 h-8 flex items-center justify-center  border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm">
              ‹
            </button>
            <button className="w-8 h-8 flex items-center justify-center  bg-[#3386FF] text-white text-sm font-medium">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center  border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center  border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm">
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
