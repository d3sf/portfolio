"use client";

import { useEffect, useState } from "react";
import { GeneralSkill, generalSkillsApi } from "@/lib/api";
import { cn } from "@/lib/utils";

const Skills = () => {
  const [skills, setSkills] = useState<GeneralSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await generalSkillsApi.getAll();
        setSkills(data);
      } catch (err) {
        setError('Failed to load skills');
        console.error('Error fetching skills:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-midnight">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Skills
        </h2>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 dark:text-gray-400">Loading skills...</p>
        </div>
      </div>
    </section>
  );
  
  if (error) return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-midnight">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Skills
        </h2>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    </section>
  );

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-midnight">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Skills
        </h2>
        
        <div className="max-w-4xl mx-auto">
          {skills.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400">No skills found.</p>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-md",
                    "bg-black dark:bg-black",
                    "text-white dark:text-white",
                    "font-medium",
                    "transition-all duration-300",
                    "hover:scale-105 hover:shadow-lg"
                  )}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills; 