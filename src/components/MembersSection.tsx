import React, { useEffect, useState } from 'react';
import { Member } from '../interfaces/Member';
import { FaLinkedin, FaEnvelope, FaGlobe } from 'react-icons/fa';
import { fetchMembers } from '../services/apiService';

const MembersSection: React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        fetchMembers()
            .then((data: Member[]) => {
                // Sort members by role hierarchy
                const sortedMembers = data.sort((a, b) => {
                    // Define role priority order
                    const getRolePriority = (member: Member): number => {
                        const roleLower = member.role?.toLowerCase().trim() || '';
                        
                        // Exact matches only (case-insensitive) for top 3 roles
                        if (roleLower === 'curator') return 1;
                        if (roleLower === 'vice-curator') return 2;
                        if (roleLower === 'impact officer') return 3;
                        
                        // All other board members (regardless of role)
                        if (member.board) return 10;
                        
                        // Non-board members with roles
                        if (member.role) return 30;
                        
                        // Regular members without roles
                        return 100;
                    };
                    
                    const priorityA = getRolePriority(a);
                    const priorityB = getRolePriority(b);
                    
                    if (priorityA !== priorityB) {
                        return priorityA - priorityB;
                    }
                    
                    // If same priority, sort alphabetically by name
                    return a.name.localeCompare(b.name);
                });
                setMembers(sortedMembers);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching members:', error);
                setError('Failed to load members data.');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center py-10">Loading members...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-accent-red">{error}</div>;
    }

    // Find the index where board members end
    const boardMembersEndIndex = members.findIndex(member => !member.board);
    const hasBothTypes = boardMembersEndIndex > 0 && boardMembersEndIndex < members.length;

    return (
        <section className="bg-neutral-light py-16" id="members">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold mb-8 text-center text-primary">The Hub</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Add Board header if there are board members */}
                    {boardMembersEndIndex > 0 && (
                        <div className="col-span-full mb-4">
                            <p className="text-center text-primary font-semibold text-lg">Board</p>
                            <hr className="border-t-2 border-primary-light opacity-30 mt-2" />
                        </div>
                    )}
                    {members.map((member, index) => (
                        <>
                            {/* Add divider when transitioning from board to non-board members */}
                            {hasBothTypes && index === boardMembersEndIndex && (
                                <div className="col-span-full my-8">
                                    <hr className="border-t-2 border-primary-light opacity-30" />
                                    <p className="text-center text-primary mt-4 font-semibold text-lg">Members</p>
                                </div>
                            )}
                            <div
                                key={member.id}
                                className="bg-neutral-white shadow-md rounded-lg text-center p-6 flex flex-col h-full"
                            >
                                <div className="flex-grow">
                                    <img
                                        src={member.photo}
                                        alt={member.name}
                                        className={`w-28 h-28 md:w-32 md:h-32 rounded-full mx-auto mb-4 object-cover ring-4 ring-primary-light`}
                                    />
                                    <h3 className="text-lg font-bold text-primary">{member.name}</h3>
                                    {/* Display role for board members */}
                                    {member.board && member.role && (
                                        <p className="text-sm text-primary-light italic mt-1">
                                            Board Member - {member.role}
                                        </p>
                                    )}
                                    {/* Display role for members with roles but not board members */}
                                    {!member.board && member.role && (
                                        <p className="text-sm text-primary-light italic mt-1">
                                            {member.role}
                                        </p>
                                    )}
                                    {/* Display description if available */}
                                    <div className="mt-2 min-h-[60px]">
                                        {member.description && (
                                            <p className="text-sm text-text-light">{member.description}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-center mt-4 space-x-4">
                                    {member.linkedin && (
                                        <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:text-primary-dark transition-colors duration-200"
                                        >
                                            <FaLinkedin size={24} />
                                        </a>
                                    )}
                                    {member.email && (
                                        <a
                                            href={`mailto:${member.email}`}
                                            className="text-text-secondary hover:text-text-light transition-colors duration-200"
                                        >
                                            <FaEnvelope size={24} />
                                        </a>
                                    )}
                                    {member.website && (
                                        <a
                                            href={member.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-accent-green-dark hover:text-accent-green-light transition-colors duration-200"
                                        >
                                            <FaGlobe size={24} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MembersSection;