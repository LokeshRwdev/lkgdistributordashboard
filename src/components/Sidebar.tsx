"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, ChevronDown, User } from "lucide-react";

type MenuItem = {
  label: string;
  href: string;
};

function CollapsibleMenuGroup({
  icon,
  label,
  items,
  collapsed,
  defaultOpen = true,
  indentClass = "ml-8",
}: {
  icon: React.ReactNode;
  label: string;
  items: MenuItem[];
  collapsed: boolean;
  defaultOpen?: boolean;
  indentClass?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const pathname = usePathname();

  return (
    <div className="px-4 mb-4">
      {/* Group header */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-3 px-4 rounded-lg text-blue-100 hover:bg-blue-700 hover:text-white transition-colors"
      >
        <div className="flex items-center min-w-0">
          <span className="mr-3 flex-shrink-0">{icon}</span>
          <span
            className={`${
              collapsed ? "opacity-0" : "opacity-100"
            } transition-opacity duration-300 whitespace-nowrap font-medium`}
          >
            {label}
          </span>
        </div>
        {!collapsed && (
          <ChevronDown
            className={`ml-3 h-4 w-4 transition-transform ${
              open ? "" : "-rotate-90"
            }`}
          />
        )}
      </button>

      {/* Children */}
      {!collapsed && open && (
        <ul className="mt-2 space-y-1">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center py-2 px-4 rounded-lg transition-colors ${
                    active
                      ? "bg-white/20 text-white"
                      : "text-blue-100 hover:bg-blue-700 hover:text-white"
                  }`}
                >
                  {/* Dash aligned with group label */}
                  <span
                    className={`${indentClass} mr-3 w-4 h-[2px] rounded bg-white/60 inline-block`}
                  />
                  <span className="whitespace-nowrap">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={` ${
        collapsed ? "w-16" : "w-72"
      } bg-[#1b478d] text-white p-0 flex flex-col h-full transition-all duration-300 ease-in-out overflow-hidden`}
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-blue-500">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
            <span className="text-blue-600 font-bold text-lg">L</span>
          </div>
          <div
            className={`${
              collapsed ? "opacity-0" : "opacity-100"
            } transition-opacity duration-300 whitespace-nowrap`}
          >
            <h2 className="text-white font-bold text-lg">LKG INFOSOLUTION</h2>
          </div>
        </div>
        <div
          className={`bg-blue-700 rounded-lg px-3 py-1 inline-block ${
            collapsed ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
        >
          <span className="text-white text-sm font-medium">DISTRIBUTOR</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <div className="px-4 mb-6">
          <Link
            href="/"
            className="flex items-center py-3 px-4 rounded-lg bg-blue-700 text-white hover:bg-blue-600 transition-colors"
          >
            <span className="mr-3 flex-shrink-0">🏠</span>
            <span
              className={`${
                collapsed ? "opacity-0" : "opacity-100"
              } transition-opacity duration-300 whitespace-nowrap`}
            >
              Dashboard
            </span>
          </Link>
        </div>

        {/* Services Section */}
        <div className="px-4 mb-2">
          <h3
            className={`text-blue-200 text-sm font-semibold mb-1 px-4 ${
              collapsed ? "opacity-0" : "opacity-100"
            } transition-opacity duration-300 whitespace-nowrap`}
          >
            SERVICES
          </h3>
        </div>

        {/* Manage User Group (reusable pattern) */}
        <CollapsibleMenuGroup
          icon={<User className="w-5 h-5" />}
          label="Manage User"
          collapsed={collapsed}
          items={[
            { label: "List of User", href: "/user/list" },
            { label: "Create New User", href: "/user" },
            // { label: "Promote Service", href: "/user/promote-service" },
            // { label: "Manage Services", href: "/user/manage-services" },
          ]}
        />

        {/* Manage Balances Group */}
        <CollapsibleMenuGroup
          icon={<span className="text-lg" role="img" aria-label="wallet">💰</span>}
          label="Manage Balances"
          collapsed={collapsed}
          items={[
            { label: "Add Fund", href: "/manage-balance/add-funds" },
            { label: "Downline Request", href: "/manage-balance/downline-fund-request" },
            { label: "Self Fund Request list", href: "/manage-balance/manual-refund" },
            { label: "Revoke Balance", href: "/manage-balance/revoke" },
            { label: "Transfer Balance", href: "/manage-balance/transfer" },
          ]}
        />

        {/* Reports Section */}
        <div className="px-4 mb-6">
          <h3 className="text-blue-200 text-sm font-semibold mb-3 px-4">Reports</h3>
          <ul className="space-y-1">
            <li>
              <Link 
                href="/reports" 
                className="flex items-center py-3 px-4 rounded-lg text-blue-100 hover:bg-blue-700 hover:text-white transition-colors"
              >
                <span className="mr-3">📊</span>
                Report & Analytics
              </Link>
            </li>
          </ul>
        </div>

        {/* FAQ and Logout */}
        <div className="px-4">
          <ul className="space-y-1">
            {/* <li>
              <Link 
                href="/faq" 
                className="flex items-center py-3 px-4 rounded-lg text-blue-100 hover:bg-blue-700 hover:text-white transition-colors"
              >
                <span className="mr-3 flex-shrink-0">❓</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">FAQ</span>
              </Link>
            </li> */}
            <li>
              <Link
                href="/login"
                className="flex items-center py-3 px-4 rounded-lg text-blue-100 hover:bg-blue-700 hover:text-white transition-colors"
              >
                <span className="mr-3 flex-shrink-0">🚪</span>
                <span
                  className={`${
                    collapsed ? "opacity-0" : "opacity-100"
                  } transition-opacity duration-300 whitespace-nowrap`}
                >
                  Logout
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Expand/Collapse control */}
      <div className="p-4 border-t border-blue-700 mt-auto">
        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="w-full flex items-center justify-center gap-3 py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
          <span
            className={`${
              collapsed ? "hidden" : "inline-block"
            } text-sm font-medium`}
          >
            {collapsed ? "" : "Collapse"}
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
