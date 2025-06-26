





//  Updated User type with all fields used in UserForm
export type User = {
  firstName: string;
  lastName: string;
  department: string;
  reportsTo: string;
  email: string;
  gender: string;
};

// Updated UserTable.tsx to work with updated UserForm
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import UserForm from "./UserForm";
import { User } from "./types";

const PAGE_LIMIT = 10;

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/user/profile");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError("Unable to fetch users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = () => {
    setShowForm(true);
    setIsEditing(false);
    setEditingUser(null);
    setEditingIndex(null);
  };

  const handleEdit = (user: User, index: number) => {
    setShowForm(true);
    setIsEditing(true);
    setEditingUser(user);
    setEditingIndex(index);
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  const handleFormSubmit = async (user: User) => {
    try {
      if (isEditing && editingIndex !== null) {
        const response = await fetch(`/api/user/${editingIndex}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
        if (!response.ok) throw new Error("Failed to update user");
        const updatedUsers = [...users];
        updatedUsers[editingIndex] = user;
        setUsers(updatedUsers);
      } else {
        const response = await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
        if (!response.ok) throw new Error("Failed to add user");
        const newUser = await response.json();
        setUsers([...users, newUser]);
      }
      setShowForm(false);
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / PAGE_LIMIT);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_LIMIT,
    currentPage * PAGE_LIMIT
  );

  if (loading) return <div className="text-white">Loading...</div>;

  if (showForm) {
    return (
      <UserForm
        onCancel={handleFormCancel}           
        onSubmit={handleFormSubmit}
        isEditing={isEditing}
        initialUser={editingUser || {
          firstName: "",
          lastName: "",
          email: "",
          department: "",
          reportsTo: "",
          gender: "",
        }}
        showBackButton
        backButtonText="Back to Table"
        onBack={handleFormCancel}
      />
    );
  }

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">User Table</h1>
        <button onClick={handleAdd} className="bg-green-600 px-4 py-2 rounded">
          + Add User
        </button>
      </div>

      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by name or email"
        className="mb-4 p-2 rounded text-black w-full"
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedUsers.map((user, i) => (
            <TableRow key={i}>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>
                <button
                  onClick={() => handleEdit(user, i)}
                  className="bg-blue-600 px-3 py-1 rounded"
                >
                  Edit
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;
