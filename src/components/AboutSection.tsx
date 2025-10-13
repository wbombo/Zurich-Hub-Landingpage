import React, { useEffect, useState } from 'react';
import { FaGlobe, FaUserFriends, FaHandsHelping, FaChartLine, FaUsers } from 'react-icons/fa';
import { ImpactPoint } from "../interfaces/ImpactPoint";
import { fetchImpactPoints } from '../services/apiService';

// Updated stats with more impact
const stats = [
    { value: '500+', label: 'City-Based Hubs', icon: <FaGlobe className="text-primary text-4xl" /> },
    { value: '11,000+', label: 'Members Worldwide', icon: <FaUserFriends className="text-primary text-4xl" /> },
    { value: '3,000+', label: 'Projects Initiated', icon: <FaHandsHelping className="text-primary text-4xl" /> },
    { value: '2.5M+', label: 'People Supported', icon: <FaUsers className="text-primary text-4xl" /> },
    { value: '15M+', label: 'Stakeholders Engaged', icon: <FaChartLine className="text-primary text-4xl" /> },
];

const AboutSection: React.FC = () => {
    const [impactPoints, setImpactPoints] = useState<ImpactPoint[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch impact points from JSON files
        fetchImpactPoints()
            .then((data: ImpactPoint[]) => {
                setImpactPoints(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching impact points:', error);
                setError('Failed to load impact points.');
                setIsLoading(false);
            });
    }, []);

    return (
        <section className="pt-4 pb-24 bg-gradient-to-b from-white to-neutral-light" id="about">
            <div className="section-container">
                {/* Section Title with modern styling */}
                <div className="mb-10 text-center">
                    <div className="inline-block">
                        <span className="text-sm font-semibold tracking-wider text-primary uppercase">Who We Are</span>
                        <h2 className="mt-2 text-4xl md:text-5xl font-bold text-text-primary">About Global Shapers</h2>
                        <div className="mt-3 h-1 w-24 bg-primary mx-auto rounded-full"></div>
                    </div>

                    {/* Shortened Introduction */}
                    <p className="text-lg mt-8 text-text-secondary max-w-3xl mx-auto font-normal">
                        Established in 2011 by the World Economic Forum, the Global Shapers Community empowers young leaders to drive dialogue,
                        action, and change across 150 countries.
                    </p>
                </div>

                {/* Modern Statistics Section with animation */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-36">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="p-6 rounded-xl bg-white shadow-xl border border-neutral-lighter hover:border-primary/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group"
                        >
                            <div className="flex flex-col items-center justify-center h-full">
                                <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110 bg-primary/10 p-4 rounded-full">
                                    {stat.icon}
                                </div>
                                <h3 className="text-3xl font-bold text-primary mb-2">{stat.value}</h3>
                                <p className="text-text-secondary text-center">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Loading state */}
                {isLoading ? (
                    <div className="text-center py-10">
                        <div className="inline-block w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-text-secondary mt-4">Loading impact points...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-10 text-accent-red">
                        <p>{error}</p>
                    </div>
                ) : (
                    /* Impact Cards with alternating layout */
                    <div className="space-y-20 md:space-y-24">
                        {impactPoints.map((impact, index) => (
                            <div 
                                key={impact.title}
                                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-12`}
                            >
                                {/* Image with rounded corners and shadow */}
                                <div className="w-full md:w-5/12">
                                    <img 
                                        src={impact.imagePath} 
                                        alt={impact.title} 
                                        className="w-full h-60 md:h-80 object-cover rounded-xl shadow-lg" 
                                    />
                                </div>
                                
                                {/* Content */}
                                <div className="w-full md:w-7/12">
                                    <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                                        {impact.title}
                                    </h3>
                                    <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                                        {impact.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default AboutSection;