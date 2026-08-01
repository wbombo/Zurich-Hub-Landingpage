import React from 'react';
import { FaChalkboardTeacher, FaHandsHelping, FaGlobeAmericas } from 'react-icons/fa';
import { useHubConfig } from '../hooks/useHubConfig';

const RecruitmentSection: React.FC = () => {
    const recruitmentLink = "https://docs.google.com/forms/d/e/1FAIpQLSdNHzERd5QbD1ZRp5m-xVoE-jAor3aqficuvXvo8UHxetj69A/viewform";
    const { config: hubConfig } = useHubConfig();

    // Calculate the date 27 years ago from today
    const today = new Date();
    const maxAgeDate = new Date(
        today.getFullYear() - 27,
        today.getMonth() + 4,
        today.getDate()
    );

    // Format the date as 'DD.MM.YYYY'
    const formatDate = (date: Date): string => {
        const day = ('0' + date.getDate()).slice(-2); // Pad single digit days with a zero
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const maxAgeDateString = formatDate(maxAgeDate);

    const benefits = [
        
        {
            title: "Impact",
            description: "Engage in meaningful initiatives that benefit your community.",
            icon: <FaGlobeAmericas className="text-primary w-6 h-6"/>,
        },
        {
            title: "Leadership",
            description: "Develop skills to lead impactful projects and initiatives.",
            icon: <FaChalkboardTeacher className="text-primary w-6 h-6"/>,
        },
        {
            title: "Community & Networking",
            description: "Connect with like-minded individuals in Zurich and globally.",
            icon: <FaHandsHelping className="text-primary w-6 h-6"/>,
        },
    ];

    const requirements = [
        "You are an extraordinary individual with great potential for future leadership roles in society.",
        `You are at least 18 and at most 27 years old at the time of nomination (born after ${maxAgeDateString}).`,
        "You excel with in a certain field that set you distinctly apart from the mainstream to imporve the world.",
        "You have an entrepreneurial spirit, having already initiated and delivered a major project or founded a company or organization, exceptionally contributing to the Zurich Hub and serving society at large.",
        "You are ready to deeply engage in the Global Shaper Community, reinforcing its mission and objectives and supporting fellow Shapers in their individual and professional development.",
        hubConfig?.recruitmentText.additionalInfo || "Supporting one of our projects as a volunteer or participating in one of our events before your application is considered a huge plus during the recruitment process. Please check out our social media channels or reach out to our Members Officer to learn more about our current projects and events.",
        "We recruit in two annual cycles. Applications submitted by 31 January are considered in the first cycle, and those submitted by 31 August are considered in the second cycle. After an applicant made it through our first screening round, an in-person recruiting event will follow after 2-4 weeks of the application cut-off date. Respective candidate will be informed via Email.",
        <div className="flex flex-col gap-1 mt-1">
            <strong className="font-bold">Recruitment Interviews dates:</strong>            <span>
                • 22 September Tuesday 7–9pm:{" "}
                <a
                href="https://luma.com/ta0y9qf6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:opacity-80"
                >
                https://luma.com/ta0y9qf6
                </a>
            </span>
            <span>
                • 22 February Monday 7–9pm:{" "}
                <a
                href="https://luma.com/8rgi3iz3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:opacity-80"
                >
                https://luma.com/8rgi3iz3
                </a>
            </span>
        </div>,
    ];

    return (
        <section className="bg-secondary-light py-16" id="join us">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Title */}
                <h2 className="text-3xl font-bold mb-8 text-center text-primary">Join Us</h2>

                {/* Promotional Text */}
                <div className="text-center mb-12">
                    <h3 className="text-2xl font-semibold mb-4">{hubConfig?.recruitmentText.title || "Are you a purpose-driven leader?"}</h3>
                    <p className="mb-6 text-text-secondary">
                        {hubConfig?.recruitmentText.subtitle || "Apply to our Global Shapers Hub! We seek diverse young leaders passionate about making a societal impact."}
                    </p>
                    <p className="mb-6 font-semibold">Why join us:</p>
                    <ul className="text-center max-w-3xl mx-auto space-y-4">
                        {benefits.map((benefit, index) => (
                            <li key={index} className="flex items-center justify-center">
                                <div className="flex-shrink-0">{benefit.icon}</div>
                                <div className="ml-4 text-text-secondary">
                                    <span className="font-semibold">{benefit.title}:</span> {benefit.description}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Requirements Section */}
                <div className="max-w-4xl mx-auto mb-12">
                    <h3 className="text-2xl font-semibold mb-6 text-center text-primary">Requirements</h3>
                    <ul className="list-disc list-inside text-text-secondary space-y-4">
                        {requirements.map((requirement, index) => (
                            <li key={index}>{requirement}</li>
                        ))}
                    </ul>
                </div>

                {/* Call to Action */}
                <div className="text-center mb-12">
                    <a
                        href={recruitmentLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-3 bg-primary text-neutral-white font-bold rounded-full shadow-lg hover:bg-primary-dark transition-colors duration-300"
                    >
                        Apply Now
                    </a>
                </div>
            </div>
        </section>
    );
};

export default RecruitmentSection;
