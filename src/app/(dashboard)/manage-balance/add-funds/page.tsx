export default function AddFundsPage() {
	return (
		<div className="px-4 pb-6" style={{ backgroundColor: '#ececec' }}>
					{/* Top cards section */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* Amount & payment gateway selection */}
				<div
					className="bg-white"
					style={{
						borderRadius: 16,
						boxShadow: '0 4px 6px rgba(0,0,0,0.10)',
					}}
				>
					<div className="p-6 space-y-6">
						<div>
							<div className="text-[16px] font-bold text-gray-900 mb-2">Amount</div>
							<input
								type="text"
								placeholder="Enter Amount"
								className="w-full h-12 rounded-xl border border-gray-300 px-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
							/>
						</div>

						<div>
							<div className="text-[15px] font-semibold text-gray-900 mb-3">Choose Payment Gateway</div>
							<label className="flex items-center gap-3 text-gray-800">
								<input type="radio" name="pg" defaultChecked className="accent-blue-600 w-4 h-4" />
								<span className="inline-flex items-center gap-2 text-[15px]">
									<span className="inline-block w-5 h-5 rounded-sm bg-gradient-to-br from-green-400 to-blue-500" />
									Cashfree
								</span>
							</label>
						</div>

						<div className="pt-2">
							<button
								className="mx-auto block rounded-full bg-[#3286fe] text-white px-16 py-3 text-sm font-medium hover:bg-black/90 transition-colors"
							>
								Add Money
							</button>
						</div>
					</div>
				</div>

			{/* General Instructions (scrollable) */}
				<div
					className="bg-white"
					style={{
						borderRadius: 16,
						boxShadow: '0 4px 6px rgba(0,0,0,0.10)',
					}}
				>
					<div className="p-6">
						<div className="flex items-center justify-start mb-4">
							<button className="rounded-full bg-[#3286fe] text-white px-4 py-2 text-sm font-medium hover:bg-black/90">
								View PG Transaction
							</button>
						</div>

						<div
							className="bg-white border border-gray-200"
							style={{ borderRadius: 16 }}
						>
							<div className="p-4">
								<div className="text-[16px] font-semibold text-gray-900 mb-2">General Instructions</div>
								<div className="h-48 overflow-y-auto pr-2 text-sm text-gray-700 leading-6">
									<ul className="list-disc pl-5 space-y-1">
										<li>How to add wallet balance</li>
										<li>
											Load balance (PG) will update your wallet limit instantly once the transaction is successful.
										</li>
										<li>
											The receiver will manually verify the fund request, which may take a few minutes during working days.
										</li>
										<li>
											For MDR charges kindly check the following details.
										</li>
										<li>
											Please do not close the window, refresh the page, press stop or the back button while the transaction is being processed.
										</li>
										<li>
											The receiver will manually verify the fund request, which may take a few minutes during working days.
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Charges Card */}
			<div
				className="bg-white mt-6"
				style={{
					borderRadius: 16,
					boxShadow: '0 4px 6px rgba(0,0,0,0.10)',
				}}
			>
				<div className="px-6 pt-4 text-[12px] text-gray-600">
					LKG Provides Several payment methods to upgrade Wallet Limit. You can add money to your wallet through the Payment Gateway mode using the Debit card, Credit card or the Net Banking Service.
				</div>

				<div className="p-6">
					<div className="text-[18px] font-semibold text-gray-900 mb-4">General Instructions</div>

					<div className="w-[90%] mx-auto">
						<div className="grid grid-cols-2 gap-4 items-start">
							{/* Header Row */}
							<div className="col-span-2">
								<div className="w-full flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg">
									<div className="text-sm font-semibold text-gray-800">Services</div>
									<div className="text-sm font-semibold text-gray-800">PG Charges</div>
								</div>
							</div>

							{/* Rows */}
							<div className="space-y-4 text-sm text-gray-800">
								<div>NET BANKING</div>
								<div>UPI</div>
								<div>DEBIT CARD( RUPAY)</div>
								<div>DEBIT CARD(Mastercard,Visa,Maestro) More than 2000</div>
								<div>DEBIT CARD(Mastercard,Visa,Maestro) upto 2000</div>
								<div>CREDIT CARD</div>
								<div>PREPAID CARD</div>
								<div>WALLET</div>
							</div>
							<div className="space-y-4 text-sm text-gray-800 text-right">
								<div>15 Flat</div>
								<div>0 %</div>
								<div>0 %</div>
								<div>1 %</div>
								<div>0.5 %</div>
								<div>1.27 %</div>
								<div>1.27 %</div>
								<div>2 %</div>
							</div>
						</div>
					</div>

					<div className="mt-6 text-xs text-gray-700">
						<div className="mb-2 font-semibold text-sm">* TDR charges are applicable and will be paid by Applicant.</div>
						<div>
							For all payments, applicable taxes will apply. All Above Pg Charges are GST Excluded.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
