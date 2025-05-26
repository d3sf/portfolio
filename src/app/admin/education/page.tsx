"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import EducationForm, { EducationData } from '@/components/admin/EducationForm';

export default function EducationPage() {
  const [educations, setEducations] = useState<EducationData[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<EducationData | undefined>();

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      const response = await fetch('/api/education');
      const data = await response.json();
      console.log('Education data:', data);
      if (Array.isArray(data)) {
        setEducations(data);
      } else if (data && typeof data === 'object') {
        const educationsArray = data.educations || [];
        setEducations(educationsArray);
      } else {
        console.error('Unexpected response format for education data:', data);
        setEducations([]);
      }
    } catch (error) {
      console.error('Error fetching education data:', error);
      setEducations([]);
    }
  };

  const handleSubmit = async (data: EducationData) => {
    try {
      const url = data.id ? `/api/education/${data.id}` : '/api/education';
      const method = data.id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        fetchEducations();
        setIsFormOpen(false);
        setEditingEducation(undefined);
      }
    } catch (error) {
      console.error('Error saving education:', error);
    }
  };

  const handleEdit = (education: EducationData) => {
    setEditingEducation(education);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this education entry?')) {
      try {
        const response = await fetch(`/api/education/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchEducations();
        }
      } catch (error) {
        console.error('Error deleting education:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Education</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your education history
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Education
        </Button>
      </div>

      {isFormOpen && (
        <div className="mb-8">
          <EducationForm
            initialData={editingEducation}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingEducation(undefined);
            }}
          />
        </div>
      )}

      <div className="space-y-4">
        {Array.isArray(educations) && educations.length > 0 ? (
          educations.map((education) => (
            <Card key={education.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">{education.institution}</h2>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <span>{education.degree} in {education.field}</span>
                      <span className="mx-2">•</span>
                      <span>{education.location}</span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {new Date(education.startDate).toLocaleDateString()} - {' '}
                      {education.endDate
                        ? new Date(education.endDate).toLocaleDateString()
                        : 'Present'}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(education)}
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(education.id!)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 my-4">
                  {education.description}
                </p>
                
                {education.achievements && education.achievements.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Achievements:</h3>
                    <div className="flex flex-wrap gap-2">
                      {education.achievements.map((achievement) => (
                        <span
                          key={achievement}
                          className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400">No education entries found. Add your first education entry.</p>
          </div>
        )}
      </div>
    </div>
  );
} 