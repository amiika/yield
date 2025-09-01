import React, { useState, useEffect } from 'react';
import { NotebookCell } from './NotebookCell';

// Reusable components for consistent styling
const InlineCode = ({ children }: { children: React.ReactNode }) => (
    <code className="bg-gray-200 text-gray-800 p-1 rounded-sm fira-code text-sm font-semibold">
        {children}
    </code>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4 border-b pb-2">{children}</h2>
);

const SubTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-2xl font-bold text-gray-700 mt-6 mb-3">{children}</h3>
);

// A simple regex-based markdown to React component parser
const parseMarkdown = (markdown: string) => {
    const lines = markdown.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let keyCounter = 0;

    const processInline = (line: string) => {
        // Process inline code `...` and bold **...**
        const parts = line.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('`') && part.endsWith('`')) {
                return <InlineCode key={index}>{part.slice(1, -1)}</InlineCode>;
            }
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index}>{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.startsWith('```')) {
            if (inCodeBlock) {
                const code = codeBlockContent.join('\n');
                const cellData = {
                    name: 'Synopsis Example',
                    description: '',
                    effect: '',
                    example: code,
                };
                elements.push(<NotebookCell key={`cell-${keyCounter++}`} cellData={cellData} compact={true} />);
                codeBlockContent = [];
            }
            inCodeBlock = !inCodeBlock;
            continue;
        }

        if (inCodeBlock) {
            codeBlockContent.push(line);
            continue;
        }

        if (line.startsWith('# ')) {
            elements.push(<h1 className="text-4xl font-bold text-gray-900 mb-4" key={`h1-${keyCounter++}`}>{processInline(line.substring(2))}</h1>);
        } else if (line.startsWith('## ')) {
            elements.push(<SectionTitle key={`h2-${keyCounter++}`}>{processInline(line.substring(3))}</SectionTitle>);
        } else if (line.startsWith('### ')) {
            elements.push(<SubTitle key={`h3-${keyCounter++}`}>{processInline(line.substring(4))}</SubTitle>);
        } else if (line.startsWith('> ')) {
            let blockquoteContent = [line.substring(2)];
            while (i + 1 < lines.length && lines[i + 1].startsWith('> ')) {
                i++;
                blockquoteContent.push(lines[i].substring(2));
            }
            elements.push(
                <pre className="bg-gray-100 border p-4 rounded-md my-4 text-sm" key={`bq-${keyCounter++}`}>
                    <code>{blockquoteContent.join('\n')}</code>
                </pre>
            );
        } else if (line.trim() !== '') {
            elements.push(<p className="mb-4 text-gray-700" key={`p-${keyCounter++}`}>{processInline(line)}</p>);
        }
    }

    // Handle case where code block is at the end of the file
    if (inCodeBlock && codeBlockContent.length > 0) {
        const code = codeBlockContent.join('\n');
        const cellData = {
            name: 'Synopsis Example',
            description: '',
            effect: '',
            example: code,
        };
        elements.push(<NotebookCell key={`cell-${keyCounter++}`} cellData={cellData} compact={true} />);
    }

    return elements;
};

export const SynopsisPage = () => {
    const [content, setContent] = useState<React.ReactNode[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('./synopsis.md')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(text => {
                setContent(parseMarkdown(text));
            })
            .catch(e => {
                console.error("Failed to load synopsis.md:", e);
                setError("Failed to load synopsis content.");
            });
    }, []);

    if (error) {
        return <div className="bg-white p-6 md:p-8 rounded-lg shadow text-red-500">{error}</div>;
    }

    if (!content) {
        return <div className="bg-white p-6 md:p-8 rounded-lg shadow">Loading...</div>;
    }
    
    return (
        <div className="bg-white p-6 md:p-8 rounded-lg shadow">
            {content}
        </div>
    );
};