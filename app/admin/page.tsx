'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '../../services/api';
import type { User } from '../../types';
import { CheckCircleIcon } from '../../components/icons';
import { useAuth } from '../../components/Providers';

export default function AdminPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'admin') {
        loadUsers();
    }
  }, [user]);

  const loadUsers = async () => {
    try {
      const data = await api.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to load users", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if(window.confirm('Are you sure you want to delete this user?')) {
        await api.deleteUser(id);
        loadUsers();
    }
  };

  const getPlanColor = (plan: string) => {
    switch(plan) {
        case 'Enterprise': return 'bg-purple-500/20 text-purple-300 border-purple-500/50';
        case 'Pro': return 'bg-secondary/20 text-secondary border-secondary/50';
        default: return 'bg-gray-500/20 text-gray-400 border-gray-600';
    }
  };

  if (!user || user.role !== 'admin') {
      return (
          <div className="container mx-auto px-6 py-24 text-center">
              <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
              <p className="text-light-200 mt-4">You do not have permission to view this page.</p>
              <Link href="/" className="text-secondary mt-4 inline-block hover:underline">Return Home</Link>
          </div>
      )
  }

  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in">
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold text-light-100">Admin Dashboard</h1>
                <p className="text-light-200">Track user subscriptions and platform analytics.</p>
            </div>
            <Link 
                href="/"
                className="text-light-200 hover:text-white font-semibold"
            >
                Back to Home
            </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
                <h3 className="text-light-200 text-sm uppercase tracking-wider mb-2">Total Users</h3>
                <p className="text-4xl font-bold text-white">{users.length}</p>
            </div>
            <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
                <h3 className="text-light-200 text-sm uppercase tracking-wider mb-2">Pro Subscribers</h3>
                <p className="text-4xl font-bold text-secondary">{users.filter(u => u.plan === 'Pro').length}</p>
            </div>
            <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
                <h3 className="text-light-200 text-sm uppercase tracking-wider mb-2">Revenue (Monthly)</h3>
                <p className="text-4xl font-bold text-green-400">
                    ${users.filter(u => u.plan === 'Pro').length * 29 + users.filter(u => u.plan === 'Enterprise').length * 99}
                </p>
            </div>
        </div>

        {/* User Table */}
        <div className="bg-dark-800 rounded-xl overflow-hidden border border-dark-700 shadow-xl">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-dark-900 text-light-200 uppercase text-xs font-semibold tracking-wider">
                        <tr>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Plan</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Joined</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-700">
                        {isLoading ? (
                            <tr><td colSpan={5} className="p-8 text-center text-light-200">Loading users...</td></tr>
                        ) : users.map((user) => (
                            <tr key={user.id} className="hover:bg-dark-700/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-secondary to-purple-600 flex items-center justify-center text-xs font-bold text-white mr-3">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="font-medium text-light-100">{user.name}</div>
                                            <div className="text-xs text-light-200">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getPlanColor(user.plan)}`}>
                                        {user.plan}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {user.subscriptionStatus === 'active' ? (
                                        <span className="flex items-center text-green-400 text-xs font-bold">
                                            <CheckCircleIcon className="w-4 h-4 mr-1" /> Active
                                        </span>
                                    ) : (
                                        <span className="text-gray-400 text-xs">Inactive</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-light-200">
                                    {new Date(user.joinedAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {user.role !== 'admin' && (
                                        <button 
                                            onClick={() => handleDelete(user.id)}
                                            className="text-red-400 hover:text-red-300 text-xs font-bold hover:underline"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
}