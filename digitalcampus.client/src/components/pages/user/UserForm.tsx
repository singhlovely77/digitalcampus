
import React, { useState, useEffect } from "react";
import InputField from "../user/inputfield";
// import axios from "axios";

type User = {
  firstName: string;
  middleName: string;
  lastName: string;
  department: string;
  reportsTo: string;
  email: string;
  gender: string;
  isActive: string;
  userRole: string;
  systemRole: string;
};

interface UserFormProps {
  onCancel: () => void;
  onSubmit: (user: User) => Promise<void>;
  initialUser?: User;
  isEditing?: boolean;
  showBackButton?: boolean;
  onBack?: () => void;
  backButtonText?: string;
}

const UserForm: React.FC<UserFormProps> = ({
  onCancel,
  onSubmit,
  initialUser = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    department: "",
    reportsTo: "",
    gender: "",
    isActive: "",
    userRole: "",
    systemRole: "",
  },
  isEditing = false,
  showBackButton = true,
  onBack,
  backButtonText = "Back to User List",
}) => {
  const [formData, setFormData] = useState<User>(initialUser);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof User, string>>>({});

  // Dropdown data from API
  const [departments, setDepartments] = useState<string[]>([]);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [systemRoles, setSystemRoles] = useState<string[]>([]);

  // Load dropdown data from API
  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [deptRes, roleRes, systemRes] = await Promise.all([
          axios.get("/api/departments"),
          axios.get("/api/userroles"),
          axios.get("/api/systemroles"),
        ]);

        setDepartments(deptRes.data);
        setUserRoles(roleRes.data);
        setSystemRoles(systemRes.data);
      } catch (error) {
        console.error("Failed to load dropdown data:", error);
      }
    };

    fetchDropdowns();
  }, []);

  useEffect(() => {
    setFormData(initialUser);
  }, [initialUser]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof User, string>> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.reportsTo.trim()) newErrors.reportsTo = "Reports To is required";
    if (!formData.isActive) newErrors.isActive = "Status is required";
    if (!formData.userRole) newErrors.userRole = "User Role is required";
    if (!formData.systemRole) newErrors.systemRole = "System Role is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof User, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      console.log("Submitted Data:", formData);
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackClick = () => {
    if (onBack) onBack();
    else onCancel();
  };

  return (
    <div className="w-full bg-gray-800 rounded-lg shadow-lg p-6 text-white">
      {showBackButton && (
        <div className="mb-6">
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 transition-colors"
          >
            ⬅ {backButtonText}
          </button>
        </div>
      )}

      <h2 className="text-3xl font-bold mb-6">
        {isEditing ? "Edit User" : "Add New User"}
      </h2>

      <div className="space-y-4">
        <InputField id="firstName" label="First Name" value={formData.firstName} onChange={(value) => handleInputChange("firstName", value)} error={errors.firstName} placeholder="Enter first name" disabled={isSubmitting} />
        <InputField id="middleName" label="Middle Name" value={formData.middleName} onChange={(value) => handleInputChange("middleName", value)} placeholder="Enter middle name" disabled={isSubmitting} />
        <InputField id="lastName" label="Last Name" value={formData.lastName} onChange={(value) => handleInputChange("lastName", value)} error={errors.lastName} placeholder="Enter last name" disabled={isSubmitting} />
        <InputField id="reportsTo" label="Reports To" value={formData.reportsTo} onChange={(value) => handleInputChange("reportsTo", value)} error={errors.reportsTo} placeholder="Enter manager name" disabled={isSubmitting} />
        <InputField id="email" label="Email" type="email" value={formData.email} onChange={(value) => handleInputChange("email", value)} error={errors.email} placeholder="Enter email" disabled={isSubmitting} />

        {/* Dropdowns */}
        <Dropdown id="gender" label="Gender" options={["Male", "Female"]} value={formData.gender} onChange={(value) => handleInputChange("gender", value)} error={errors.gender} disabled={isSubmitting} />
        <Dropdown id="department" label="Department" options={departments} value={formData.department} onChange={(value) => handleInputChange("department", value)} error={errors.department} disabled={isSubmitting} />
        <Dropdown id="userRole" label="User Role" options={userRoles} value={formData.userRole} onChange={(value) => handleInputChange("userRole", value)} error={errors.userRole} disabled={isSubmitting} />
        <Dropdown id="systemRole" label="System Role" options={systemRoles} value={formData.systemRole} onChange={(value) => handleInputChange("systemRole", value)} error={errors.systemRole} disabled={isSubmitting} />
        <Dropdown id="isActive" label="Is Active" options={["1", "0"]} value={formData.isActive} onChange={(value) => handleInputChange("isActive", value)} error={errors.isActive} disabled={isSubmitting} />

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button type="submit" onClick={handleSubmit} disabled={isSubmitting} className={`flex-1 px-4 py-2 rounded font-medium transition-colors ${isSubmitting ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} text-white`}>
            {isSubmitting ? "Submitting..." : isEditing ? "Update User" : "Add User"}
          </button>
          <button type="button" onClick={onCancel} disabled={isSubmitting} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded font-medium text-white">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;

// Reusable Dropdown Component
const Dropdown = ({
  id,
  label,
  options,
  value,
  onChange,
  error,
  disabled,
}: {
  id: string;
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}) => (
  <div className="flex flex-col text-white">
    <label htmlFor={id} className="mb-1 font-medium">{label}</label>
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-2"
    >
      <option value="">Select {label}</option>
      {options.map((option) => (g
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
    {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
  </div>
);







