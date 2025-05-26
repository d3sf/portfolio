"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ProjectForm from '@/components/admin/ProjectForm';
import type { ProjectData } from '@/components/admin/ProjectForm';
import { Project, projectsApi } from '@/lib/api';

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await projectsApi.getById(params.id as string);
        setProject(data);
      } catch (err) {
        setError('Failed to load project');
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.id]);
  
  const handleSubmit = async (data: ProjectData) => {
    try {
      await projectsApi.update(params.id as string, data);
      router.push('/admin/projects');
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Failed to update project. Please try again.');
    }
  };
  
  const handleCancel = () => {
    router.push('/admin/projects');
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!project) return <div>Project not found</div>;
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Project</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Update project details
        </p>
      </div>
      
      <ProjectForm 
        initialData={project as unknown as ProjectData} 
        onSubmit={handleSubmit} 
        onCancel={handleCancel} 
      />
    </div>
  );
} 