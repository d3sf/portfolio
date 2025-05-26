"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import GeneralSkillForm, { GeneralSkillData } from '@/components/admin/GeneralSkillForm';

export default function SkillsPage() {
  const [skills, setSkills] = useState<GeneralSkillData[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<GeneralSkillData | undefined>();

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/general-skills');
      const data = await response.json();
      console.log('Skills data:', data);
      if (Array.isArray(data)) {
        setSkills(data);
      } else if (data && typeof data === 'object') {
        const skillsArray = data.skills || [];
        setSkills(skillsArray);
      } else {
        console.error('Unexpected response format for skills data:', data);
        setSkills([]);
      }
    } catch (error) {
      console.error('Error fetching skills data:', error);
      setSkills([]);
    }
  };

  const handleSubmit = async (data: GeneralSkillData) => {
    try {
      const url = data.id ? `/api/general-skills/${data.id}` : '/api/general-skills';
      const method = data.id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        fetchSkills();
        setIsFormOpen(false);
        setEditingSkill(undefined);
      }
    } catch (error) {
      console.error('Error saving skill:', error);
    }
  };

  const handleEdit = (skill: GeneralSkillData) => {
    setEditingSkill(skill);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      try {
        const response = await fetch(`/api/general-skills/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchSkills();
        }
      } catch (error) {
        console.error('Error deleting skill:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Skills</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your general skills
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Skill
        </Button>
      </div>

      {isFormOpen && (
        <div className="mb-8">
          <GeneralSkillForm
            initialData={editingSkill}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingSkill(undefined);
            }}
          />
        </div>
      )}

      <div className="space-y-4">
        {Array.isArray(skills) && skills.length > 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Order</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {skills.map((skill) => (
                  <tr key={skill.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-medium">{skill.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-500">{skill.order}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(skill)}
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(skill.id!)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400">No skills found. Add your first skill.</p>
          </div>
        )}
      </div>
    </div>
  );
} 