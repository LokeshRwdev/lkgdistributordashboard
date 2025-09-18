"use client";

import React from "react";
import { useRouter } from "next/navigation";
import CustomArrowLeft from "@/components/icon/svg-icons/CustomLeftArrow";
import CustomActiveIconGreen, {
  CustomActiveIconYellow,
} from "@/components/icon/svg-icons/CustomActiveIcon";
import { FilterIcon } from "lucide-react";

export default function PromoteServicePage() {
  const router = useRouter();
  const [showTickets, setShowTickets] = React.useState(false);

  const requests = Array.from({ length: 2 }).map((_, i) => ({
    id: i + 1,
    user: "User ID - Distributor",
    requestType: "Request Type - Distributor to Super Distributor",
    description:
      "Description - Upgrade account from Distributor to Super Distributor",
    datetime: "Date/Time- 24 Aug 25, 14:30PM",
    status: "Active" as const,
  }));

  return (
    <div className="p-6">
      {/* Top title with back arrow */}
      <div className="flex items-center gap-2 text-gray-800 mb-8 ml-2">
        <button
          type="button"
        //   onClick={() => router.back()}
              onClick={() => setShowTickets(false)}

          aria-label="Go back"
          className="inline-flex items-center gap-2 hover:text-black"
        >
          <CustomArrowLeft />
        </button>
        <h1 className="text-xl font-semibold">Promote User Profile</h1>
      </div>

      {/* Conditional content */}
      {!showTickets ? (
        // Manage Promotion form UI
        <div className="bg-white rounded-2xl shadow-md px-6 py-6">
          <div className="flex items-center justify-end mb-4">
            <button
              onClick={() => setShowTickets(true)}
              className="h-9 px-8 rounded-xl bg-[#3386FF] text-white text-md shadow hover:bg-blue-600"
            >
              View Tickets
            </button>
          </div>

          <div className="text-xl sm:text-xl font-semibold text-gray-800 mb-6">
            Manage Promotion
          </div>

          <div className="mb-2 text-[13px] text-gray-700">
            Select User Which You Want To
            <span className="text-black px-1 rounded ml-1">Promote</span>
            <span className="text-red-500">*</span>
          </div>

          <label className="sr-only" htmlFor="promote-user">
            Select user to Promote
          </label>
          <select
            id="promote-user"
            className="w-full h-10 bg-white border border-gray-300 rounded-lg px-3 text-sm shadow-sm"
            defaultValue=""
          >
            <option value="" disabled>
              Select user to Promote
            </option>
            <option>Retailer 1</option>
            <option>Distributor 1</option>
            <option>Super Distributor 1</option>
          </select>

          <div className="flex justify-end mt-10 mb-20">
            <button className="h-9 px-20 rounded-xl bg-[#3386FF] text-white text-sm shadow hover:bg-blue-600">
              Submit
            </button>
          </div>
        </div>
      ) : (
        // Existing ticket list UI
        <div className="bg-white rounded-2xl shadow-md px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Promote Profile
            </h2>
            {/* <button
              className="inline-flex items-center gap-2 h-9 px-4 rounded-xl bg-white border border-gray-300 text-gray-700 text-xs shadow-sm hover:bg-gray-50"
            >
              ⟵ Back
            </button> */}
          </div>

          {/* Filter row */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <label className="block text-xs tracking-wide text-gray-500 mb-1">
                User Id
              </label>
              <div className="flex items-center gap-3">
                <select className="w-64 h-10 bg-white border border-gray-300 rounded-lg px-3 text-sm shadow-sm">
                  <option>Distributer</option>
                  <option>Retailer</option>
                  <option>Consumer</option>
                </select>
              </div>
            </div>
            <button className="inline-flex items-center gap-2 h-9 px-8 rounded-xl bg-white border border-gray-300 text-gray-700 text-xs shadow-sm hover:bg-gray-50">
              {/* <span className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center text-[10px]">
                ⚲
              </span> */}
              <FilterIcon/>
              Filter
            </button>
          </div>

          {/* Request cards */}
          <div className="space-y-5">
            {requests.map((r) => (
              <div
                key={r.id}
                className="rounded-2xl border border-gray-200 bg-white shadow-md px-5 py-4"
              >
                <div className="flex">
                  <div className="flex flex-col gap-4 items-start">
                    {/* Left status/icon chip */}
                    <div className="flex items-center gap-1 justify-center">
                      <div className="w-9 h-9 rounded-full bg-[#0BA82F36] border  flex items-center justify-center">
                        <CustomActiveIconGreen className="w-4 h-4" />
                      </div>
                      <span className="px-3 py-0.5  rounded-md bg-[#0BA82F36] text-[#0BA82F] text-[10px] font-semibold">
                        Active
                      </span>
                    </div>

                    {/* Content */}
                    <div className="ml-8">
                      <div className="text-sm font-semibold text-gray-800">
                        {r.user}
                      </div>
                      <div className="text-[12px] text-gray-700 mt-1 font-semibold w-max">
                        {r.requestType}
                      </div>
                      <div className="text-[12px] text-gray-500 mt-1 w-max">
                        {r.description}
                      </div>
                      <div className="text-[12px] text-gray-500 mt-1 font-semibold">
                        {r.datetime}
                      </div>
                    </div>
                  </div>
                  {/* Actions */}
                  <div className="flex items-end gap-3 justify-end w-full">
                    <button className="text-[12px] px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100">
                      Decline
                    </button>
                    <button className="text-[12px] px-5 py-2 rounded-xl bg-[#3386FF] text-white hover:bg-black/90">
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
