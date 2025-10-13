import React, { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { useHubConfig } from '../hooks/useHubConfig';

const Navbar: React.FC = () => {
    // Track navbar scroll state
    const [, setIsScrolled] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { config: hubConfig } = useHubConfig();

    // Centralized scroll configuration
    const scrollDuration = 200;
    const scrollOffset = -60;
    
    const navigationElements = [
        { id: 'about', label: 'about' },
        { id: 'impact', label: 'impact' },
        { id: 'join us', label: 'join us' },
        { id: 'members', label: 'the hub' }
    ];

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = () => {
        setIsOpen(false);
    };
    
    const scrollToTop = () => {
        scroll.scrollToTop({
            duration: scrollDuration,
            smooth: true
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-neutral-white/95 backdrop-blur-sm shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
                {/* Left Side: Logo and Title */}
                <div
                    onClick={scrollToTop}
                    className="flex items-center cursor-pointer group"
                >
                    <img
                        src={hubConfig?.branding.logo || "/assets/images/logo.png"}
                        alt="Logo"
                        className="h-10 mr-3 object-contain transition-transform duration-200 group-hover:scale-105"
                    />
                    <h1 className="text-xl font-bold text-primary">
                        {hubConfig?.hubName || "Global Shapers"}
                    </h1>
                </div>
                {/* Right Side: Desktop Menu and Mobile Burger */}
                <div className="flex items-center">
                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        {navigationElements.map(
                            (section) => (
                                <ScrollLink
                                    key={section.id}
                                    to={section.id}
                                    smooth={true}
                                    duration={scrollDuration}
                                    offset={scrollOffset}
                                    className="cursor-pointer capitalize font-medium text-text-secondary hover:text-primary relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full flex items-center"
                                >
                                    {section.label}
                                </ScrollLink>
                            )
                        )}
                    </div>
                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="focus:outline-none text-text-secondary hover:text-primary"
                            aria-label="Toggle menu"
                            aria-expanded={isOpen}
                        >
                            {isOpen ? (
                                <FaTimes className="h-6 w-6" />
                            ) : (
                                <FaBars className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden shadow-md animate-fadeDown bg-neutral-white">
                    <div className="flex flex-col items-end px-4 py-2 space-y-2">
                        {navigationElements.map(
                            (section) => (
                                <ScrollLink
                                    key={section.id}
                                    to={section.id}
                                    smooth={true}
                                    duration={scrollDuration}
                                    offset={scrollOffset}
                                    onClick={handleLinkClick}
                                    className="w-full text-right px-4 py-2 rounded cursor-pointer capitalize text-text-secondary hover:bg-secondary-light"
                                >
                                    {section.label}
                                </ScrollLink>
                            )
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
