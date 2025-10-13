import React from 'react';
import Navbar from './components/Navbar';
import IntroSection from './components/IntroSection';
import AboutSection from './components/AboutSection.tsx';
import ProjectsSection from './components/ProjectsSection';
import MembersSection from './components/MembersSection';
import RecruitmentSection from './components/RecruitmentSection';
import Footer from "./components/FooterSection.tsx";
import ConfigErrorDisplay from './components/ConfigErrorDisplay';
import { useHubConfig } from './hooks/useHubConfig';
// import EventsSection from './components/EventsSection';

const App: React.FC = () => {
    const { config, isLoading, errors, isValid } = useHubConfig();

    // Show loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-neutral-white flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-text-secondary">Loading configuration...</p>
                </div>
            </div>
        );
    }

    // Show configuration errors
    if (!isValid || !config) {
        return <ConfigErrorDisplay errors={errors} />;
    }

    // Render normal app with valid configuration
    return (
        <div className="App min-h-screen bg-neutral-white">
            {/* Navbar is only shown when scrolled (handled in component) */}
            <Navbar />
            
            {/* Main content sections */}
            <main>
                <IntroSection />
                <AboutSection />
                <ProjectsSection />
                <RecruitmentSection />
                <MembersSection />
                {/*<EventsSection />*/}
            </main>
            
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default App;
