"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import ProjectForm from '@/components/admin/ProjectForm';
import type { ProjectData } from '@/components/admin/ProjectForm';
import { projectsApi } from '@/lib/api';

export default function NewProjectPage() {
  const router = useRouter();
  
  const handleSubmit = async (data: ProjectData) => {
    try {
      await projectsApi.create(data);
      router.push('/admin/projects');
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project. Please try again.');
    }
  };
  
  const handleCancel = () => {
    router.push('/admin/projects');
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">New Project</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Add a new project to your portfolio
        </p>
      </div>
      
      <ProjectForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
} 