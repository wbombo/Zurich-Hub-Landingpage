import React from 'react';
import { FaInstagram, FaLinkedin, FaMapMarkerAlt, FaEnvelope, FaGlobe } from 'react-icons/fa';
import { useHubConfig } from '../hooks/useHubConfig';
import { Link } from 'react-scroll';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    const { config: hubConfig } = useHubConfig();
    
    return (
        <footer className="bg-gradient-to-br from-primary-dark to-neutral-dark text-neutral-white py-16">
            <div className="max-w-7xl mx-auto px-6">
                {/* Footer top with logo and sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Logo and brief description */}
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <div className="w-14 h-14 relative flex items-center justify-center mr-3 bg-white/90 rounded">
                                <img 
                                    src={hubConfig?.branding.logo || "/assets/images/logo.png"} 
                                    alt={hubConfig?.hubName || "Global Shapers"} 
                                    className="h-12 w-12 object-contain"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-neutral-white">{hubConfig?.hubName?.split(' ').slice(0, 2).join(' ') || 'Global Shapers'}<br/>{hubConfig?.hubShortName || 'Hub'}</h3>
                        </div>
                        <p className="text-neutral-white/80 text-sm mt-4 leading-relaxed">
                            A community of young leaders driving local impact with global perspective.
                        </p>
                    </div>
                    
                    {/* Quick links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-neutral-white relative after:absolute after:bottom-[-8px] after:left-0 after:h-[2px] after:w-8 after:bg-secondary-light">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {['about', 'join us', 'members'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={item}
                                        smooth={true}
                                        duration={200}
                                        offset={-60}
                                        className="text-neutral-white/80 hover:text-neutral-white transition-colors duration-300 cursor-pointer capitalize inline-block"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <a 
                                    href="https://www.globalshapers.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-neutral-white/80 hover:text-neutral-white transition-colors duration-300 inline-flex items-center gap-2"
                                >
                                    Global Network <FaGlobe className="text-xs" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Contact Information */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-neutral-white relative after:absolute after:bottom-[-8px] after:left-0 after:h-[2px] after:w-8 after:bg-secondary-light">
                            Contact
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                                <FaMapMarkerAlt className="text-secondary-light mt-1 flex-shrink-0" />
                                <div className="text-neutral-white/80">
                                    <p>{hubConfig?.contact.address.line1 || 'Address Line 1'}</p>
                                    <p>{hubConfig?.contact.address.line2 || 'Address Line 2'}</p>
                                    <p>{hubConfig?.contact.address.line3 || 'City, Country'}</p>
                                </div>
                            </li>
                            <li className="flex items-center space-x-3">
                                <FaEnvelope className="text-secondary-light flex-shrink-0" />
                                <a
                                    href={`mailto:${hubConfig?.contact.email || 'info@globalshapers.com'}`}
                                    className="text-neutral-white/80 hover:text-neutral-white transition-colors duration-300"
                                >
                                    {hubConfig?.contact.email || 'info@globalshapers.com'}
                                </a>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Banking and Social */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-neutral-white relative after:absolute after:bottom-[-8px] after:left-0 after:h-[2px] after:w-8 after:bg-secondary-light">
                            Connect With Us
                        </h4>
                        
                        {hubConfig?.contact?.donation?.bankingInfo && (
                            <div className="mb-6 text-neutral-white/80">
                                <p className="mb-2 text-sm font-medium">Donation Information:</p>
                                <p className="text-sm">{hubConfig.contact.donation.bankingInfo}</p>
                            </div>
                        )}
                        
                        <div className="flex space-x-4">
                            <a
                                href={hubConfig?.social.instagram || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-neutral-white/10 hover:bg-neutral-white/20 p-3 rounded-full transition-colors duration-300"
                                aria-label="Instagram"
                            >
                                <FaInstagram size={20} />
                            </a>
                            <a
                                href={hubConfig?.social.linkedin || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-neutral-white/10 hover:bg-neutral-white/20 p-3 rounded-full transition-colors duration-300"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin size={20} />
                            </a>
                        </div>
                    </div>
                </div>
                
                {/* Separator */}
                <div className="border-t border-neutral-white/10 my-10"></div>
                
                {/* Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-white/60">
                    <p>&copy; {currentYear} {hubConfig?.hubName || 'Global Shapers'}. All rights reserved.</p>
                    <p className="mt-2 md:mt-0">Part of the World Economic Forum's Global Shapers Community</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
