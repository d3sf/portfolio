"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string;
  skills: string[];
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

const Experience = () => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/experience');
        const data = await res.json();
        
        if (Array.isArray(data)) {
          // Sort by order field, then by startDate
          const sortedData = [...data].sort((a, b) => {
            if (a.order !== b.order) {
              return a.order - b.order;
            }
            return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
          });
          setExperiences(sortedData);
        } else {
          setError('Failed to fetch experiences');
        }
      } catch (err) {
        setError('Error fetching experiences');
        console.error('Error fetching experiences:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExperiences();
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
    <section id="experience" className="py-20 bg-gray-50 dark:bg-midnight">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Work Experience
        </h2>
        
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400">Loading experiences...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500">{error}</p>
            </div>
          ) : experiences.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400">No experiences found.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="group">
                  {/* Header - Always visible */}
                  <div 
                    className="flex items-center gap-6 cursor-pointer"
                    onClick={() => toggleExpand(index)}
                  >
                    {/* Company Logo - Fallback to first letter if no logo */}
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-white dark:bg-gray-700 flex-shrink-0 flex items-center justify-center text-3xl font-bold text-gray-700 dark:text-gray-300">
                      {exp.company.charAt(0).toUpperCase()}
                    </div>

                    {/* Company Info */}
                    <div className="flex-grow">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {exp.company}
                        </h3>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          {expandedIndex === index ? (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-500" />
                          )}
                        </div>
                      </div>
                      <p className="text-gray-900 dark:text-white text-sm">
                        {exp.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {exp.location}
                      </p>
                    </div>

                    {/* Duration */}
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                    </span>
                  </div>

                  {/* Expandable Content */}
                  {expandedIndex === index && (
                    <div className="mt-4 ml-22 pl-22">
                      <p className="mb-4 ml-16 text-gray-600 dark:text-gray-300">
                        {exp.description}
                      </p>
                      
                      {exp.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 ml-16">
                          {exp.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
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

export default Experience; 