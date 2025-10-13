import React, { useEffect, useState } from 'react';
import { Project } from '../interfaces/Project';
import { FaExternalLinkAlt, FaImages, FaTimes } from 'react-icons/fa';
import { fetchProjects } from '../services/apiService';
import { useHubConfig } from '../hooks/useHubConfig';

const ProjectsSection: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<string | 'all'>('all');
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const { config: hubConfig } = useHubConfig();

    useEffect(() => {
        setIsLoading(true);
        
        fetchProjects()
            .then((projectData) => {
                setProjects(projectData);
                // Extract unique categories
                const uniqueCategories = Array.from(new Set(projectData.map(project => project.category)));
                setCategories(uniqueCategories);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
                setError('Failed to load projects.');
                setIsLoading(false);
            });
    }, []);

    // Filter projects by selected category
    const filteredProjects = activeCategory === 'all' 
        ? projects 
        : projects.filter(project => project.category === activeCategory);

    return (
        <section className="pt-4 pb-24 bg-gradient-to-b from-neutral-white to-neutral-light" id="impact">
            <div className="section-container">
                {/* Modern Section Header */}
                <div className="mb-12 text-center">
                    <div className="inline-block">
                        <span className="text-sm font-semibold tracking-wider text-primary uppercase">Our Work</span>
                        <h2 className="mt-2 text-4xl md:text-5xl font-bold text-text-primary">Impact Projects</h2>
                        <div className="mt-3 h-1 w-24 bg-primary mx-auto rounded-full"></div>
                    </div>
                    <p className="text-lg md:text-xl mt-8 text-text-secondary max-w-3xl mx-auto font-normal leading-relaxed">
                        {hubConfig?.aboutSection.projectsDescription || "We drive positive change through innovative projects that address local challenges and contribute to global dialogue. Our initiatives span various sectors, always focused on creating measurable impact."}
                    </p>
                </div>

                {/* Category Filter Tabs */}
                <div className="mb-12">
                    <div className="flex flex-wrap justify-center gap-4">
                        <button 
                            onClick={() => setActiveCategory('all')}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 
                                ${activeCategory === 'all' 
                                    ? 'bg-primary text-white shadow-md' 
                                    : 'bg-neutral-lighter text-text-secondary hover:bg-primary/10'}`}
                        >
                            All Projects
                        </button>
                        {categories.map(category => (
                            <button 
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 
                                    ${activeCategory === category 
                                        ? 'bg-primary text-white shadow-md' 
                                        : 'bg-neutral-lighter text-text-secondary hover:bg-primary/10'}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="text-center py-12">
                        <div className="inline-block w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-text-secondary mt-4">Loading projects...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-12">
                        <p className="text-accent-red">{error}</p>
                    </div>
                )}

                {/* Projects Grid with Gallery Option */}
                {!isLoading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {filteredProjects.map(project => (
                            <div key={project.id} className="group">
                                <div 
                                    className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col cursor-pointer"
                                    onClick={() => setSelectedProject(project)}
                                >
                                    {/* Project Image with Overlay */}
                                    <div className="relative overflow-hidden">
                                        <img 
                                            src={project.image} 
                                            alt={project.title} 
                                            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-black/70 to-transparent"></div>
                                        
                                        {/* Category Badge */}
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-primary/80 text-white text-xs font-semibold rounded-full">
                                                {project.category}
                                            </span>
                                        </div>

                                        {/* Gallery Icon */}
                                        <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-md">
                                            <FaImages className="text-primary text-sm" />
                                        </div>
                                        
                                        {/* Project Title Overlay */}
                                        <div className="absolute bottom-0 left-0 w-full p-6">
                                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:translate-y-0 transition-all duration-300">
                                                {project.title}
                                            </h3>
                                        </div>
                                    </div>
                                    
                                    {/* Project Content */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <p className="text-text-secondary mb-6 flex-grow">
                                            {project.description}
                                        </p>
                                        
                                        {/* Project Actions */}
                                        <div className="mt-auto flex justify-between items-center">
                                            {project.link && (
                                                <a 
                                                    href={project.link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors duration-300"
                                                    onClick={(e) => e.stopPropagation()} // Prevent card click when clicking link
                                                >
                                                    Visit Project <FaExternalLinkAlt className="text-sm" />
                                                </a>
                                            )}
                                            <div className="text-primary font-medium">
                                                See Details
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Project Detail Modal with Gallery */}
                {selectedProject && (
                    <div className="fixed inset-0 z-50 bg-neutral-black/80 flex items-center justify-center p-4 md:p-8 overflow-y-auto" onClick={() => setSelectedProject(null)}>
                        <div 
                            className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header with Close Button */}
                            <div className="relative">
                                <div className="absolute top-4 right-4 z-10">
                                    <button 
                                        onClick={() => setSelectedProject(null)}
                                        className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all duration-300 hover:scale-110"
                                        aria-label="Close modal"
                                    >
                                        <FaTimes className="text-primary" />
                                    </button>
                                </div>
                                
                                {/* Hero Image */}
                                <div className="h-64 md:h-96 w-full relative">
                                    <img 
                                        src={selectedProject.image} 
                                        alt={selectedProject.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-black/70 to-transparent/30"></div>
                                    
                                    {/* Category Badge */}
                                    <div className="absolute top-6 left-6">
                                        <span className="px-4 py-1 bg-primary text-white text-sm font-semibold rounded-full">
                                            {selectedProject.category}
                                        </span>
                                    </div>
                                    
                                    {/* Project Title */}
                                    <div className="absolute bottom-0 left-0 w-full p-8">
                                        <h3 className="text-3xl md:text-4xl font-bold text-white">
                                            {selectedProject.title}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Modal Content */}
                            <div className="p-8">
                                {/* Project Description */}
                                <div className="mb-8">
                                    <h4 className="text-xl font-bold mb-4 text-text-primary">About This Project</h4>
                                    <p className="text-text-secondary text-lg leading-relaxed">
                                        {selectedProject.description}
                                    </p>
                                    
                                    {/* Extended Description - This would be added in a real scenario */}
                                    <p className="text-text-secondary text-lg leading-relaxed mt-4">
                                        This initiative is one of our core impact projects, representing our commitment to sustainable development and positive change in our local community. By bringing together diverse stakeholders and applying innovative approaches, we aim to create lasting solutions to pressing challenges.
                                    </p>
                                </div>
                                
                                {/* Project Gallery - Using images from project data */}
                                {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                                    <div className="mb-8">
                                        <h4 className="text-xl font-bold mb-4 text-text-primary">Project Gallery</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                            {selectedProject.gallery.map((imagePath, index) => (
                                                <div key={index} className="aspect-video rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:opacity-95">
                                                    <img 
                                                        src={imagePath} 
                                                        alt={`${selectedProject.title} - Gallery image ${index + 1}`} 
                                                        className="w-full h-full object-cover" 
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                {/* Call to Action */}
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-lighter">
                                    <div>
                                        <h4 className="text-lg font-semibold text-text-primary">Interested in this project?</h4>
                                        <p className="text-text-secondary">Join us or support our initiative</p>
                                    </div>
                                    
                                    <div className="flex gap-4">
                                        {selectedProject.link && (
                                            <a 
                                                href={selectedProject.link} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-all duration-300 shadow-md"
                                            >
                                                Visit Project
                                            </a>
                                        )}
                                        <button 
                                            onClick={() => setSelectedProject(null)}
                                            className="px-6 py-3 border border-primary text-primary bg-white font-medium rounded-lg hover:bg-primary/5 transition-all duration-300"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProjectsSection;