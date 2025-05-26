"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string;
  achievements: string[];
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

const Education = () => {
  const [educations, setEducations] = useState<EducationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchEducations = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/education');
        const data = await res.json();
        
        if (Array.isArray(data)) {
          // Sort by order field, then by startDate
          const sortedData = [...data].sort((a, b) => {
            if (a.order !== b.order) {
              return a.order - b.order;
            }
            return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
          });
          setEducations(sortedData);
        } else {
          setError('Failed to fetch education data');
        }
      } catch (err) {
        setError('Error fetching education data');
        console.error('Error fetching education data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEducations();
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Format date from ISO string to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-midnight">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Education
        </h2>
        
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400">Loading education...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500">{error}</p>
            </div>
          ) : educations.length === 0 ? (
            <div className="text-center py-10">
              {/* <p className="text-gray-500 dark:text-gray-400">No education found.</p> */}
            </div>
          ) : (
            <div className="space-y-8">
              {educations.map((edu, index) => (
                <div key={edu.id} className="group">
                  {/* Header - Always visible */}
                  <div 
                    className="flex items-center gap-6 cursor-pointer"
                    onClick={() => toggleExpand(index)}
                  >
                    {/* Institution Logo - Using first letter as fallback */}
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-white dark:bg-gray-700 flex-shrink-0 flex items-center justify-center text-3xl font-bold text-gray-700 dark:text-gray-300">
                      {edu.institution.charAt(0).toUpperCase()}
                    </div>

                    {/* Institution Info */}
                    <div className="flex-grow">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {edu.institution}
                        </h3>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          {expandedIndex === index ? (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-500" />
                          )}
                        </div>
                      </div>
                      <p className="text-gray-900 dark:text-white text-sm ">
                        {edu.degree} in {edu.field}
                      </p>
                      <p className="text-sm text-gray-500">
                        {edu.location}
                      </p>
                    </div>

                    {/* Duration */}
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                    </span>
                  </div>

                  {/* Expandable Content */}
                  {expandedIndex === index && (
                    <div className="mt-4 ml-22 pl-22">
                      <p className="mb-4 ml-16 text-gray-600 dark:text-gray-300">
                        {edu.description}
                      </p>
                      
                      {edu.achievements && edu.achievements.length > 0 && (
                        <div className="mt-3 ml-16">
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">Achievements:</p>
                          <ul className="list-disc list-inside space-y-2 mb-4">
                            {edu.achievements.map((achievement, i) => (
                              <li key={i} className="text-gray-600 dark:text-gray-300">
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Education; 