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
import CustomArrowLeft from "@/components/icon/svg-icons/CustomLeftArrow";
import { createDistributorAccount } from "../../../../lib/api/user";

export default function CreateNewUser() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    userType: "Retailer",
    fullName: "",
    gender: "Male",
    email: "",
    mobileNo: "",
    dateOfBirth: "",
    panCardNo: "",
    agreeTerms: false,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, userType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    // Map frontend form to API payload shape
    const mapUserType = (val: string) => val.replace(/\s+/g, '_').toUpperCase();
    const payload = {
      user_type: mapUserType(formData.userType),
      name: formData.fullName,
      mobile: formData.mobileNo,
      email: formData.email,
      dob: formData.dateOfBirth, // already YYYY-MM-DD from input[type=date]
      gender: formData.gender.toUpperCase(),
      pan_number: formData.panCardNo.toUpperCase().trim(),
      accepted_terms: formData.agreeTerms,
    };

    try {
      const res = await createDistributorAccount(payload);
      if (res) {
        console.log('User created successfully:', res);
        // Optionally navigate or reset form
        // router.push('/some-success-page')
        setFormData(prev => ({
          ...prev,
          fullName: '',
          email: '',
          mobileNo: '',
          dateOfBirth: '',
          panCardNo: '',
          agreeTerms: false,
        }));
      } else {
        console.error('User creation failed');
      }
    } catch (err) {
      console.error('Error creating user:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Enable submit only when all required fields are filled and terms agreed
  const isFormValid =
    !!formData.userType &&
    formData.fullName.trim().length > 0 &&
    formData.gender.trim().length > 0 &&
    formData.email.trim().length > 0 &&
    formData.mobileNo.trim().length > 0 &&
    formData.dateOfBirth.trim().length > 0 &&
    formData.panCardNo.trim().length > 0 &&
    formData.agreeTerms === true;

  return (
    <div className="p-4 min-h-screen rounded-2xl">
      {/* Back Button */}
      <div className="mb-6 ml-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <CustomArrowLeft />
          <div className="text-2xl font-semibold text-gray-900">
            Create New User
          </div>
        </button>
      </div>

      {/* Breadcrumb */}
      {/* <div className="mb-6">
        <div className="flex items-center text-sm text-gray-600">
          <span>Manage Users</span>
          <span className="mx-2">›</span>
          <span className="text-gray-900">Create New User</span>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <div className="text-2xl font-semibold text-gray-900">
            Create New User
          </div>
          <button className="bg-[#3286fe] text-white px-8 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
            User List
          </button>
        </div>

        {/* User Type Dropdown Section */}
        <div className="p-6">
          <div className="space-y-2">
            <div className="text-sm font-semibold text-gray-700">User Type</div>
            <Select
              value={formData.userType}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger className="w-full h-12 bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20">
                <SelectValue placeholder="Select user type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="Retailer"
                  className="data-[state=checked]:bg-gray-800 data-[state=checked]:text-white"
                >
                  Retailer
                </SelectItem>
                <SelectItem
                  value="Distributor"
                  className="data-[state=checked]:bg-gray-800 data-[state=checked]:text-white"
                >
                  Distributor
                </SelectItem>
                <SelectItem
                  value="Super Distributor"
                  className="data-[state=checked]:bg-gray-800 data-[state=checked]:text-white"
                >
                  Super Distributor
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Row - Full Name, Gender, Email */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter Full Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>
            </div>

            {/* Second Row - Mobile, Date of Birth, Pan Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile No <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleInputChange}
                  placeholder="Mobile No"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  placeholder="dd-mm-yyyy"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pan Card No <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="panCardNo"
                  value={formData.panCardNo}
                  onChange={handleInputChange}
                  placeholder="Enter PAN Card Number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                required
              />
              <div className="ml-2 text-sm text-gray-700 font-semibold">
                I agree to LKG Terms & Conditions
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={!isFormValid || submitting}
                className="bg-[#3286fe] text-white px-16 py-2 rounded-lg font-medium transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#3286fe]"
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
