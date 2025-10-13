import React from 'react';
import { Link } from 'react-scroll';
import { useHubConfig } from '../hooks/useHubConfig';
import { FaArrowDown } from 'react-icons/fa';

const IntroSection: React.FC = () => {
    // Use the same scroll configuration as in Navbar
    const scrollDuration = 200;
    const scrollOffset = -60;
    const { config: hubConfig } = useHubConfig();
    
    return (
        <div className="relative flex flex-col min-h-screen bg-neutral-white">
            {/* Hero section with image - Full height for first view */}
            <div className="w-full h-screen pt-16"> {/* Added pt-16 to account for navbar space */}
                <div className="relative h-full w-full overflow-hidden">
                    {/* Image Background */}
                    <img
                        src="/assets/images/intro.jpg"
                        alt="Intro"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    
                    {/* Dark overlay gradient for better contrast */}
                    <div className="absolute inset-0 bg-gradient-to-b from-neutral-black/50 via-neutral-black/70 to-neutral-black/80"></div>
                    
                    {/* Content overlay - Centered with max-width */}
                    <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center">
                        <div className="space-y-6 max-w-3xl">
                            <h1 className="text-neutral-white text-4xl md:text-6xl font-bold tracking-tight leading-tight text-shadow">
                                {hubConfig?.heroTitle || "Shaping the Future"}
                            </h1>
                            <p className="text-neutral-white mt-6 text-lg font-normal text-shadow">
                                {hubConfig?.heroSubtitle || "A community of young leaders driving local impact with global perspective"}
                            </p>
                            <div className="pt-8 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
                                <Link
                                    to="about"
                                    smooth={true}
                                    duration={scrollDuration}
                                    offset={scrollOffset}
                                    className="px-6 py-3 bg-primary text-neutral-white font-medium rounded-lg hover:bg-primary-dark transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer w-full md:w-auto"
                                >
                                    Discover Our Impact
                                </Link>
                                <Link
                                    to="join us"
                                    smooth={true}
                                    duration={scrollDuration}
                                    offset={scrollOffset}
                                    className="px-6 py-3 bg-neutral-white/20 backdrop-blur-sm text-neutral-white border border-neutral-white/40 font-medium rounded-lg hover:bg-neutral-white/30 transition-all duration-200 cursor-pointer w-full md:w-auto"
                                >
                                    Join Our Hub
                                </Link>
                            </div>
                        </div>
                        
                        {/* Scroll indicator - moved up slightly */}
                        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
                            <Link
                                to="about"
                                smooth={true}
                                duration={scrollDuration}
                                offset={scrollOffset}
                                className="flex flex-col items-center text-neutral-white hover:text-neutral-white cursor-pointer"
                            >
                                <span className="text-sm mb-2 font-medium">Scroll to explore</span>
                                <FaArrowDown className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntroSection;
