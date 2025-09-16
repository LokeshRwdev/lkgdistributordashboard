"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

type TabKey =
	| "personal"
	| "company"
	| "banking"
	| "address"
	| "password";

export default function ProfilePage() {
	const router = useRouter();
	const [active, setActive] = useState<TabKey>("personal");
	const tabs: { key: TabKey; label: string }[] = [
		{ key: "personal", label: "Personal Details" },
		{ key: "company", label: "Company Data" },
		{ key: "banking", label: "Banking Details" },
		{ key: "address", label: "Address" },
		{ key: "password", label: "Change Password" },
	];

	const [gender, setGender] = useState("Female");
	const [acceptTerms, setAcceptTerms] = useState(false);
	const [showAddBankForm, setShowAddBankForm] = useState(false);
	const [bankForm, setBankForm] = useState({
		ifsc: "SBI7474887",
		accountNumber: "",
		confirmAccountNumber: "",
		accountHolder: "",
		accountType: "",
	});
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showNewPwd, setShowNewPwd] = useState(false);
	const [showConfirmPwd, setShowConfirmPwd] = useState(false);

	const passwordRules = {
		len: newPassword.length >= 8,
		upper: /[A-Z]/.test(newPassword),
		special: /[^A-Za-z0-9]/.test(newPassword),
	};
	const passwordValid = passwordRules.len && passwordRules.upper && passwordRules.special && newPassword === confirmPassword && newPassword.length > 0;

	function updateBankField<K extends keyof typeof bankForm>(key: K, value: string) {
		setBankForm((prev) => ({ ...prev, [key]: value }));
	}

	return (
		<div className="flex h-screen overflow-hidden" style={{ background: "#ececec" }}>
			<div className="flex-1 flex flex-col overflow-auto">
			
				<div className="px-10 pb-10">
					{/* Back + Title */}
					<div className="flex items-center gap-3 mb-6 mt-2">
						<button
							onClick={() => router.back()}
							className="text-gray-700 hover:text-black flex items-center gap-2 text-sm font-medium"
							aria-label="Go back"
						>
							<span className="text-xl leading-none">←</span>
							<span className="text-xl font-semibold">Profile</span>
						</button>
					</div>

					{/* Card */}
						<div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 min-h-[520px]">
							{/* Tabs */}
							<div className="flex border-b border-gray-200 mb-8 overflow-hidden">
								{tabs.map((t) => {
									const activeTab = active === t.key;
									return (
										<button
											key={t.key}
											onClick={() => setActive(t.key)}
											className={`relative px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
												activeTab
													? "text-blue-600"
													: "text-gray-600 hover:text-gray-900"
											}`}
											aria-current={activeTab ? "page" : undefined}
										>
											{t.label}
											{activeTab && (
												<span className="absolute left-0 right-0 -bottom-px h-[2px] bg-blue-600 rounded-full" />
											)}
										</button>
									);
								})}
							</div>

							{/* Personal Details */}
							{active === "personal" && (
								<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
									{/* Avatar Block */}
									<div className="lg:col-span-3 flex flex-col items-center text-center">
										<div className="w-48 h-48 rounded-full bg-gray-200 border border-gray-300 mb-6" />
										<div className="space-y-1">
											<p className="font-medium text-gray-800">Suman Kumar</p>
											<p className="text-xs text-gray-500">@A9820832</p>
										</div>
									</div>

									{/* Form Fields */}
									<div className="lg:col-span-9 space-y-8">
										<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
											<div className="space-y-2">
												<label className="text-xs font-semibold tracking-wide text-gray-700 uppercase">
													Applicant Name:
												</label>
												<input
													defaultValue="Suman Kumar"
													disabled
													className="w-full h-11 px-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 text-sm"
												/>
											</div>
											<div className="space-y-2">
												<label className="text-xs font-semibold tracking-wide text-gray-700 uppercase">
													Email:
												</label>
												<input
													defaultValue="suman@company.com"
													disabled
													className="w-full h-11 px-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 text-sm"
												/>
											</div>
											<div className="space-y-2">
												<label className="text-xs font-semibold tracking-wide text-gray-700 uppercase">
													Mobile No.:
												</label>
												<input
													defaultValue="7589782139"
													disabled
													className="w-full h-11 px-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 text-sm"
												/>
											</div>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
											<div className="space-y-2">
												<label className="text-xs font-semibold tracking-wide text-gray-700 uppercase">
													Date Of Birth:
												</label>
												<input
													defaultValue="1990-05-15"
													disabled
													className="w-full h-11 px-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 text-sm"
												/>
											</div>
											<div className="space-y-2">
												<label className="text-xs font-semibold tracking-wide text-gray-700 uppercase">
													Gender:
												</label>
												<select
													value={gender}
													onChange={(e) => setGender(e.target.value)}
													className="w-full h-11 px-3 border border-gray-300 rounded-md bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
												>
													<option value="Female">Female</option>
													<option value="Male">Male</option>
													<option value="Other">Other</option>
												</select>
											</div>
										</div>

										<div className="pt-2">
											<label className="inline-flex items-center gap-3 text-sm text-gray-700 cursor-pointer select-none">
												<input
													type="checkbox"
													checked={acceptTerms}
													onChange={(e) => setAcceptTerms(e.target.checked)}
													className="w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
												/>
												<span className="font-medium">Accept Terms And Conditions</span>
											</label>
										</div>
									</div>
								</div>
							)}

							{/* Company Data */}
							{active === "company" && (
								<div className="space-y-10">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
										{/* Row 1 */}
										<div className="space-y-2">
											<label className="text-xs font-semibold tracking-wide text-gray-700 uppercase">Company Name:</label>
											<input
												defaultValue="LKG INFOSOLUTIONS PRIVATE LIMITED"
												disabled
												className="w-full h-11 px-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 text-sm"
											/>
										</div>
										<div className="space-y-2">
											<label className="text-xs font-semibold tracking-wide text-gray-700 uppercase">B_Name:</label>
											<input
												defaultValue="LKG INFOSOLUTIONS PRIVATE LIMITED"
												disabled
												className="w-full h-11 px-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 text-sm"
											/>
										</div>

										{/* Row 2 */}
										<div className="space-y-2">
											<label className="text-xs font-semibold tracking-wide text-gray-700 uppercase">Business Type:</label>
											<input
												defaultValue="Private Limited Company"
												disabled
												className="w-full h-11 px-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 text-sm"
											/>
										</div>
										<div className="space-y-2">
											<label className="text-xs font-semibold tracking-wide text-gray-700 uppercase">Gstin:</label>
											<input
												defaultValue="22AAAAA0000A1Z5"
												disabled
												className="w-full h-11 px-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 text-sm"
											/>
										</div>

										{/* Row 3 */}
										<div className="space-y-2">
											<label className="text-xs font-semibold tracking-wide text-gray-700 uppercase">Email:</label>
											<input
												defaultValue="info@techsolutions.com"
												disabled
												className="w-full h-11 px-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 text-sm"
											/>
										</div>
										<div className="space-y-2">
											<label className="text-xs font-semibold tracking-wide text-gray-700 uppercase">Formation Date</label>
											<input
												defaultValue="2025-01-01, 12:00:00"
												disabled
												className="w-full h-11 px-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 text-sm"
											/>
										</div>

										{/* Row 4 */}
										<div className="space-y-2">
											<label className="text-xs font-semibold tracking-wide text-gray-700 uppercase">Contact Number:</label>
											<input
												defaultValue="9876543210"
												disabled
												className="w-full h-11 px-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 text-sm"
											/>
										</div>
										<div className="space-y-2">
											<label className="text-xs font-semibold tracking-wide text-gray-700 uppercase">About:</label>
											<textarea
												defaultValue="A leading tech company"
												disabled
												className="w-full h-28 resize-none px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 text-sm"
											/>
										</div>

										{/* Row 5 */}
										<div className="space-y-2">
											<label className="text-xs font-semibold tracking-wide text-gray-700 uppercase">Website:</label>
											<input
												defaultValue="www.techsolutions.com"
												disabled
												className="w-full h-11 px-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 text-sm"
											/>
										</div>
										<div />
									</div>
								</div>
							)}

							{/* Banking Details */}
							{active === "banking" && (
								<div className="space-y-8">
									{/* Toggle between list and form */}
									{!showAddBankForm && (
										<>
											<div className="flex items-center justify-end">
												<button
													type="button"
													onClick={() => setShowAddBankForm(true)}
													className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 h-11 rounded-md shadow-sm transition-colors"
												>
													<span className="text-lg leading-none">+</span>
													<span>Add Bank</span>
												</button>
											</div>
											<div className="flex flex-wrap gap-8">
												{[1,2,3].map((i) => (
													<div key={i} className="relative w-full sm:w-[300px] bg-white border border-gray-100 rounded-2xl shadow-sm p-5 flex flex-col gap-4">
														<div className="flex items-start gap-4">
															<div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl">👤</div>
															<div className="flex-1 text-sm leading-tight pt-1">
																<p className="font-semibold">Rajesh Kumar</p>
																<p className="text-gray-600 text-[13px]">SBI</p>
															</div>
															<div className="flex gap-2">
																<button className="w-9 h-9 grid place-content-center rounded-md border border-gray-200 hover:bg-gray-50 text-gray-600" aria-label="Edit bank">✏️</button>
																<button className="w-9 h-9 grid place-content-center rounded-md border border-gray-200 hover:bg-gray-50 text-gray-600" aria-label="Delete bank">🗑️</button>
															</div>
														</div>
														<div className="grid grid-cols-2 gap-4 text-sm">
															<div className="space-y-1">
																<p className="uppercase text-[11px] font-semibold tracking-wide text-gray-600">Account:</p>
																<p className="font-medium">•••••1234</p>
															</div>
															<div className="space-y-1">
																<p className="uppercase text-[11px] font-semibold tracking-wide text-gray-600">IFSC Code</p>
																<p className="font-semibold tracking-wide">SBIFN89</p>
															</div>
														</div>
													</div>
												))}
											</div>
										</>
									)}

									{showAddBankForm && (
										<form
											className="space-y-10"
											onSubmit={(e) => {
												e.preventDefault();
												// Placeholder for submit logic
												setShowAddBankForm(false);
											}}
										>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 max-w-5xl">
												{/* IFSC */}
												<div className="space-y-2">
													<label className="text-xs font-semibold tracking-wide text-gray-700 uppercase">IFSC</label>
													<input
														value={bankForm.ifsc}
														onChange={(e) => updateBankField("ifsc", e.target.value.toUpperCase())}
														className="w-full h-11 px-3 border border-gray-300 rounded-md bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
													/>
													{bankForm.ifsc && (
														<div className="mt-1 inline-block bg-blue-100 text-blue-700 text-[10px] font-medium px-2 py-1 rounded">
															HDFC Bank - MG Road Branch, Bangalore, Karnataka
														</div>
													)}
												</div>

												{/* Account Number */}
												<div className="space-y-2">
													<label className="text-xs font-semibold tracking-wide text-gray-700 uppercase">Account Number</label>
													<input
														value={bankForm.accountNumber}
														onChange={(e) => updateBankField("accountNumber", e.target.value)}
														className="w-full h-11 px-3 border border-gray-300 rounded-md bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
													/>
												</div>

												{/* Confirm Account Number */}
												<div className="space-y-2">
													<label className="text-xs font-semibold tracking-wide text-gray-700 uppercase">Confirm Account Number</label>
													<input
														value={bankForm.confirmAccountNumber}
														onChange={(e) => updateBankField("confirmAccountNumber", e.target.value)}
														className="w-full h-11 px-3 border border-gray-300 rounded-md bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
													/>
												</div>

												{/* Account Holder Name */}
												<div className="space-y-2">
													<label className="text-xs font-semibold tracking-wide text-gray-700 uppercase">Account Holder Name</label>
													<input
														value={bankForm.accountHolder}
														onChange={(e) => updateBankField("accountHolder", e.target.value)}
														className="w-full h-11 px-3 border border-gray-300 rounded-md bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
													/>
												</div>

												{/* Account Type */}
												<div className="space-y-2">
													<label className="text-xs font-semibold tracking-wide text-gray-700 uppercase">Account Type</label>
													<input
														value={bankForm.accountType}
														onChange={(e) => updateBankField("accountType", e.target.value)}
														placeholder="Savings / Current"
														className="w-full h-11 px-3 border border-gray-300 rounded-md bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
													/>
												</div>
											</div>

											<div className="flex flex-col md:flex-row gap-6 max-w-5xl pt-2">
												<button
													type="button"
													onClick={() => setShowAddBankForm(false)}
													className="flex-1 h-12 border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-sm font-medium text-gray-800 transition"
												>
													Bank List
												</button>
												<button
													type="submit"
													disabled={!bankForm.ifsc || !bankForm.accountNumber || bankForm.accountNumber !== bankForm.confirmAccountNumber}
													className="flex-1 h-12 rounded-md bg-blue-600 enabled:hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium shadow-sm transition"
												>
													Verify & Save
												</button>
											</div>
										</form>
									)}
								</div>
							)}

							{/* Address Tab */}
							{active === "address" && (
								<div className="space-y-8">
									{/* Top bar with Add button */}
									<div className="flex items-center justify-end">
										<button
											type="button"
											className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 h-11 rounded-md shadow-sm transition-colors"
										>
											<span className="text-lg leading-none">+</span>
											<span>Add Address</span>
										</button>
									</div>

									{/* Address List */}
									<div className="space-y-6">
										{/* Single Address Card */}
										<div className="relative flex gap-6 items-start bg-white border border-gray-100 rounded-2xl shadow-sm px-6 py-6">
											{/* Icon */}
											<div className="flex-shrink-0 w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl">🏠</div>
											{/* Address Text */}
											<div className="flex-1 text-sm leading-relaxed">
												<div className="flex items-center gap-3 mb-1">
													<span className="font-semibold">Shri Kanaka Nilaya, Umashankar Nagar 1st Main</span>
													<span className="inline-flex items-center px-2.5 h-5 rounded-full text-[10px] font-semibold bg-green-100 text-green-700 tracking-wide uppercase">Current</span>
												</div>
												<p>Near City Hospital</p>
												<p>Ranibennu, Ranibennu, Karnataka - 560001</p>
												<p>India</p>
											</div>
											{/* Actions */}
											<div className="flex flex-col gap-3 sm:flex-row sm:gap-2 items-start sm:items-center pt-1">
												<button className="w-9 h-9 grid place-content-center rounded-md border border-gray-200 hover:bg-gray-50 text-gray-600" aria-label="Edit address">✏️</button>
												<button className="w-9 h-9 grid place-content-center rounded-md border border-gray-200 hover:bg-gray-50 text-gray-600" aria-label="Delete address">🗑️</button>
											</div>
										</div>

										<div className="relative flex gap-6 items-start bg-white border border-gray-100 rounded-2xl shadow-sm px-6 py-6">
											<div className="flex-shrink-0 w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl">🏠</div>
											<div className="flex-1 text-sm leading-relaxed">
												<div className="flex items-center gap-3 mb-1">
													<span className="font-semibold">Plot No. 123, MG Road</span>
													<span className="inline-flex items-center px-2.5 h-5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-700 tracking-wide uppercase">Billing</span>
												</div>
												<p>Near City Hospital</p>
												<p>Bangalore, Bangalore, Karnataka -560001</p>
												<p>India</p>
											</div>
											<div className="flex flex-col gap-3 sm:flex-row sm:gap-2 items-start sm:items-center pt-1">
												<button className="w-9 h-9 grid place-content-center rounded-md border border-gray-200 hover:bg-gray-50 text-gray-600" aria-label="Edit address">✏️</button>
												<button className="w-9 h-9 grid place-content-center rounded-md border border-gray-200 hover:bg-gray-50 text-gray-600" aria-label="Delete address">🗑️</button>
											</div>
										</div>
									</div>
								</div>
							)}

							{/* Change Password */}
							{active === "password" && (
								<div className="max-w-2xl mx-auto pt-4">
									<h3 className="text-center text-sm font-semibold tracking-wide text-gray-800 mb-10 uppercase">Enter New Password To Change Your Password</h3>
									<form
										onSubmit={(e) => {
											e.preventDefault();
											if (!passwordValid) return;
											// Placeholder submit logic
											setNewPassword("");
											setConfirmPassword("");
											alert("Password reset successfully (demo)");
										}}
										className="space-y-10"
									>
										<div className="space-y-8">
											{/* New Password */}
											<div className="space-y-2">
												<label className="text-xs font-semibold tracking-wide text-gray-700 uppercase">New Password</label>
												<div className="relative">
													<input
														type={showNewPwd ? "text" : "password"}
														value={newPassword}
														onChange={(e) => setNewPassword(e.target.value)}
														className="w-full h-11 pr-10 px-3 border border-gray-300 rounded-md bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
														placeholder="Enter new password"
													/>
													<button type="button" onClick={() => setShowNewPwd(v => !v)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700" aria-label={showNewPwd ? "Hide password" : "Show password"}>{showNewPwd ? "🙈" : "👁"}</button>
												</div>
												<ul className="space-y-1 mt-2 text-[11px] text-gray-600 font-medium">
													<li className="flex items-start gap-2">
														<span className={`mt-[3px] inline-block w-2 h-2 rounded-full ${passwordRules.len ? "bg-green-500" : "bg-gray-300"}`} />
														<span>At least 8 characters</span>
													</li>
													<li className="flex items-start gap-2">
														<span className={`mt-[3px] inline-block w-2 h-2 rounded-full ${passwordRules.upper ? "bg-green-500" : "bg-gray-300"}`} />
														<span>At least 1 upper case letter</span>
													</li>
													<li className="flex items-start gap-2">
														<span className={`mt-[3px] inline-block w-2 h-2 rounded-full ${passwordRules.special ? "bg-green-500" : "bg-gray-300"}`} />
														<span>At least 1 special character letter</span>
													</li>
												</ul>
											</div>

											{/* Confirm Password */}
											<div className="space-y-2">
												<label className="text-xs font-semibold tracking-wide text-gray-700 uppercase">Confirm Password</label>
												<div className="relative">
													<input
														type={showConfirmPwd ? "text" : "password"}
														value={confirmPassword}
														onChange={(e) => setConfirmPassword(e.target.value)}
														className="w-full h-11 pr-10 px-3 border border-gray-300 rounded-md bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
														placeholder="Re-enter new password"
													/>
													<button type="button" onClick={() => setShowConfirmPwd(v => !v)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700" aria-label={showConfirmPwd ? "Hide password" : "Show password"}>{showConfirmPwd ? "🙈" : "👁"}</button>
												</div>
												{confirmPassword && confirmPassword !== newPassword && (
													<p className="text-[11px] text-red-600 font-medium mt-1">Passwords do not match.</p>
												)}
											</div>
										</div>

										<div className="pt-2 flex justify-center">
											<button
												type="submit"
												disabled={!passwordValid}
												className="w-60 h-11 rounded-md bg-neutral-900 enabled:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium shadow-sm transition"
											>
												Reset Password
											</button>
										</div>
									</form>
								</div>
							)}

							{/* Placeholder content for other tabs */}
							{active !== "personal" && active !== "company" && active !== "address" && active !== "banking" && active !== "password" && (
								<div className="text-sm text-gray-500 py-10 text-center">
									{tabs.find((t) => t.key === active)?.label} content coming soon.
								</div>
							)}
						</div>
				</div>
			</div>
		</div>
	);
}

