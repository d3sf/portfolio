import React from 'react';
import { Card } from '@/components/ui/card';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your portfolio content
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Projects</h2>
          <p className="text-3xl font-bold">12</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Total projects</p>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Skills</h2>
          <p className="text-3xl font-bold">24</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Total skills</p>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Experience</h2>
          <p className="text-3xl font-bold">5</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Work experiences</p>
        </Card>
      </div>
    </div>
  );
} 