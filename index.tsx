import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { documentation } from './src/lib/documentation';
import { Repl } from './src/components/Repl';
import { NotebookCell } from './src/components/NotebookCell';
import { TestRunner } from './src/components/TestRunner';
import { ReferencePage } from './src/components/ReferencePage';
import { audioEngine } from './src/lib/audio/AudioEngine';

// Icon for collapsible sections
const ChevronIcon = ({ isExpanded }: { isExpanded: boolean }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 transition-transform duration-200 text-gray-500 ${isExpanded ? 'rotate-180' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

// Component for a single collapsible documentation section
const CollapsibleSection = ({ section }: { section: typeof documentation[0] }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const sectionId = `section-content-${section.name.replace(/\s+/g, '-')}`;

    return (
        <div className="mb-4 border rounded-lg overflow-hidden shadow-sm bg-white">
            <button
                className="w-full text-left p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={() => setIsExpanded(!isExpanded)}
                aria-expanded={isExpanded}
                aria-controls={sectionId}
            >
                <h2 className="text-2xl font-bold text-gray-800">{section.name}</h2>
                <ChevronIcon isExpanded={isExpanded} />
            </button>
            {isExpanded && (
                <div id={sectionId} className="p-4 border-t border-gray-200">
                    {section.description && <p className="mb-4 text-gray-600">{section.description}</p>}
                    {section.cells.map(cell => (
                        <NotebookCell key={cell.name} cellData={cell} />
                    ))}
                </div>
            )}
        </div>
    );
};

// Renamed from NotebookPage to TutorialPage for clarity
const TutorialPage = () => (
    <div id="notebook-container">
        {documentation.map(section => (
            <CollapsibleSection key={section.name} section={section} />
        ))}
    </div>
);

const App = () => {
    const [route, setRoute] = useState(window.location.hash);

    useEffect(() => {
        const handleHashChange = () => {
            setRoute(window.location.hash);
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);
    
    // Initialize audio engine on first user interaction
    useEffect(() => {
        const initAudio = () => {
            audioEngine.init();
        };

        window.addEventListener('click', initAudio, { once: true });
        window.addEventListener('keydown', initAudio, { once: true });
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, newRoute: string) => {
        e.preventDefault();
        window.location.hash = newRoute;
        setRoute(newRoute);
    };

    const renderPage = () => {
        switch (route) {
            case '#/reference':
                return <ReferencePage />;
            case '#/tutorial':
                return <TutorialPage />;
            case '#/tests':
                return <TestRunner />;
            case '#/repl':
            case '#':
            case '#/':
            case '':
            default:
                return <Repl />;
        }
    };
    
    // Updated active state logic
    const isRepl = ['#/repl', '#', '#/', ''].includes(route);
    const isReference = route === '#/reference';
    const isTests = route === '#/tests';
    const isTutorial = route === '#/tutorial';

    return (
        <div className={`mx-auto ${isRepl ? 'max-w-full' : 'max-w-4xl'}`}>
            <header className="mb-8 text-center">
                <h1 className="text-5xl font-bold text-gray-900">Yield</h1>
                <p className="mt-2 text-lg text-gray-600">Concatenative live coding language that yields</p>
                <nav className="mt-4 space-x-4">
                    {/* Reordered and renamed tabs */}
                    <a href="#/repl" onClick={(e) => handleNavClick(e, '#/repl')} className={`text-indigo-600 hover:underline ${isRepl ? 'font-bold' : ''}`}>REPL</a>
                    <a href="#/reference" onClick={(e) => handleNavClick(e, '#/reference')} className={`text-indigo-600 hover:underline ${isReference ? 'font-bold' : ''}`}>Reference</a>
                    <a href="#/tutorial" onClick={(e) => handleNavClick(e, '#/tutorial')} className={`text-indigo-600 hover:underline ${isTutorial ? 'font-bold' : ''}`}>Tutorial</a>
                    <a href="#/tests" onClick={(e) => handleNavClick(e, '#/tests')} className={`text-indigo-600 hover:underline ${isTests ? 'font-bold' : ''}`}>Test Suite</a>
                </nav>
            </header>
            <main>
                {renderPage()}
            </main>
        </div>
    );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);