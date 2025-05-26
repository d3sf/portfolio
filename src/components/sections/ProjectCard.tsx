"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Github, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  websiteUrl?: string;
  githubUrl?: string;
}

const ProjectCard = ({
  title,
  description,
  image,
  technologies,
  websiteUrl,
  githubUrl,
}: ProjectCardProps) => {
  return (
    <Card className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-[#1E1F21] dark:to-[#1E1F21] border-0 shadow-lg h-full flex flex-col backdrop-blur-lg">
      {/* Magic Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      <div className="absolute inset-[1px] bg-gradient-to-b from-white to-gray-50 dark:from-[#1E1F21] dark:to-[#000000] rounded-lg backdrop-blur-lg" />
      <CardContent className="relative flex-1">
        {/* Project Logo */}
        <div className="flex mb-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500/50">
            <Image
              src={image}
              alt={`${title} logo`}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-black dark:text-gray-300 mb-4 line-clamp-3 h-[4.5rem]">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-1.5 mb-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-300 transition-colors duration-200 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            >
              {tech}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="relative px-6 py-3 grid grid-cols-2 gap-2 mt-auto">
        {githubUrl && (
          <Link href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full gap-1.5 h-8 text-xs border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Github className="h-3.5 w-3.5" />
              Source
            </Button>
          </Link>
        )}
        {websiteUrl && (
          <Link href={websiteUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full gap-1.5 h-8 text-xs border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Website
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard; 