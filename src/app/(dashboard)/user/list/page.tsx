"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	ArrowLeft,
	Filter as FilterIcon,
	Plus,
	Pencil,
	Trash2,
} from "lucide-react";
import Link from "next/link";

interface UserRow {
	id: string;
	name: string;
	role: string;
	email: string;
	phone: string;
	kyc: string;
	pan: string;
	aadhaar: string;
	status: string;
	mainBalance: number;
	aepsBalance: number;
}

const sampleUsers: UserRow[] = [
	{
		id: "R342900999",
		name: "Sunita Patil",
		role: "Retailer",
		email: "sunita@abc.com",
		phone: "7899888244",
		kyc: "Verified",
		pan: "Verified",
		aadhaar: "Verified",
		status: "Active",
		mainBalance: 386.52,
		aepsBalance: 184.78,
	},
];

export default function UserListPage() {
	const router = useRouter();
	const [roleFilter, setRoleFilter] = useState("Retailer");
	const [statusFilter, setStatusFilter] = useState("Yes");

	// In real implementation filters would modify derived list
	const filtered = sampleUsers.filter((u) => {
		return (
			(roleFilter === "All" || u.role === roleFilter) &&
			(statusFilter === "All" || (statusFilter === "Yes" ? u.status === "Active" : u.status !== "Active"))
		);
	});

	return (
		<div className="p-6" style={{ background: "#e9e9e9" }}>
			{/* Back + Title */}
			<div className="mb-6">
				<button
					onClick={() => router.back()}
					className="flex items-center gap-2 text-gray-800 hover:text-black"
				>
					<ArrowLeft className="w-5 h-5" />
					<span className="text-2xl font-semibold">List of User</span>
				</button>
			</div>

			{/* Main Card */}
			<div
				className="bg-white shadow-md"
				style={{ borderRadius: 16 }}
			>
				<div className="p-10">
					{/* Heading Row with Actions */}
					<div className="flex items-start justify-between mb-10">
						<h2 className="text-2xl font-semibold text-gray-900">User Management</h2>
						<div className="flex items-center gap-4">
							<button
								className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 text-sm font-medium"
								type="button"
							>
								<FilterIcon className="w-4 h-4" />
								<span>Filter</span>
							</button>
							<Link
								href="/user/create"
								className="inline-flex items-center gap-2 bg-[#3386FF] text-white px-6 py-3 rounded-xl hover:bg-black/90 text-sm font-medium"
							>
								<Plus className="w-4 h-4" />
								<span>Add User</span>
							</Link>
						</div>
					</div>

					{/* Filters Row */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8 max-w-4xl">
							<div>
								<label className="block text-sm font-semibold text-gray-800 mb-2">Role</label>
								<Select value={roleFilter} onValueChange={setRoleFilter}>
									<SelectTrigger className="w-full h-11 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="Retailer">Retailer</SelectItem>
										<SelectItem value="Distributor">Distributor</SelectItem>
										<SelectItem value="Super Distributor">Super Distributor</SelectItem>
										<SelectItem value="All">All</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div>
								<label className="block text-sm font-semibold text-gray-800 mb-2">Status</label>
								<Select value={statusFilter} onValueChange={setStatusFilter}>
									<SelectTrigger className="w-full h-11 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="Yes">Yes</SelectItem>
										<SelectItem value="No">No</SelectItem>
										<SelectItem value="All">All</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

					{/* Table Header Bar */}
					<div
						className="w-full grid grid-cols-9 text-sm font-semibold text-gray-800"
						style={{
							background: "#f2f2f2",
							borderRadius: 10,
						}}
					>
						<div className="px-4 py-3">User Details</div>
						<div className="px-4 py-3">Role</div>
						<div className="px-4 py-3">Contact</div>
						<div className="px-4 py-3">KYC</div>
						<div className="px-4 py-3">PAN</div>
						<div className="px-4 py-3">Aadhaar</div>
						<div className="px-4 py-3">Status</div>
						<div className="px-4 py-3">Balance</div>
						<div className="px-4 py-3 text-center">Action</div>
					</div>

					{/* Rows */}
					<div className="divide-y divide-gray-100">
						{filtered.map((u) => (
							<div
								key={u.id}
								className="grid grid-cols-9 text-sm text-gray-800 items-stretch"
							>
								{/* User Details */}
								<div className="px-6 py-5">
									<div className="font-medium">{u.name}</div>
									<div className="text-xs text-gray-500">@{u.id}</div>
								</div>
								<div className="px-4 py-5 font-medium">{u.role}</div>
								<div className="px-4 py-5">
									<div>{u.email}</div>
									<div className="text-xs text-gray-500 mt-1">{u.phone}</div>
								</div>
								{/* Badges */}
								<div className="px-4 py-5">
									<span className="inline-block bg-green-200 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
										{u.kyc}
									</span>
								</div>
								<div className="px-4 py-5">
									<span className="inline-block bg-green-200 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
										{u.pan}
									</span>
								</div>
								<div className="px-4 py-5">
									<span className="inline-block bg-green-200 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
										{u.aadhaar}
									</span>
								</div>
								<div className="px-4 py-5">
									<span className="inline-block bg-green-200 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
										{u.status}
									</span>
								</div>
								<div className="px-4 py-5 font-medium">
									<div>Main:{u.mainBalance}</div>
									<div className="mt-1 font-medium">AEPS:{u.aepsBalance}</div>
								</div>
								<div className="px-4 py-5 flex items-center justify-center gap-2">
									<button
										className="w-8 h-8 rounded-lg bg-white shadow border border-gray-200 flex items-center justify-center hover:bg-gray-50"
										aria-label="Edit user"
									>
										<Pencil className="w-4 h-4" />
									</button>
									<button
										className="w-8 h-8 rounded-lg bg-white shadow border border-gray-200 flex items-center justify-center hover:bg-gray-50"
										aria-label="Delete user"
									>
										<Trash2 className="w-4 h-4" />
									</button>
								</div>
							</div>
						))}
					</div>

					{/* Pagination */}
					<div className="flex justify-end mt-10">
						<div className="inline-flex items-stretch rounded-lg overflow-hidden border border-gray-200">
							<button className="px-4 py-3 text-sm hover:bg-gray-50">&lt;</button>
							<button className="px-6 py-3 text-sm font-medium bg-[#3386FF] text-white">1</button>
							<button className="px-6 py-3 text-sm hover:bg-gray-50">2</button>
							<button className="px-4 py-3 text-sm hover:bg-gray-50">&gt;</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}


