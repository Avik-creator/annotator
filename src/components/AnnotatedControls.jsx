import { useState } from 'react';
import { useAnnotationStore } from '../store/useAnnotationStore';
import { GroqService } from '../services/groqService';
import { Download, Wand2 } from 'lucide-react';
import PropTypes from 'prop-types';

export const AnnotationControls = ({ apiKey }) => {
  const { text, annotations, entityTypes, addAnnotation } = useAnnotationStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleAIAnnotate = async () => {
    if (!text || !apiKey) return;

    setIsLoading(true);
    try {
      const groqService = new GroqService(apiKey);
      const aiAnnotations = await groqService.annotateText(
        text,
        entityTypes.map(et => et.name)
      );

      aiAnnotations.forEach((ann) => {
        const entityType = entityTypes.find(et => et.name === ann.label);
        if (entityType) {
          addAnnotation({
            id: Math.random().toString(36).substr(2, 9),
            start: ann.start,
            end: ann.end,
            text: ann.text,
            label: ann.label,
            color: entityType.color,
          });
        }
      });
    } catch (error) {
      console.error('AI annotation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    const data = {
      text,
      annotations: annotations.map(({ id, ...rest }) => rest),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'annotations.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={handleAIAnnotate}
        disabled={isLoading || !text || entityTypes.length === 0}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Wand2 size={20} />
        {isLoading ? 'Processing...' : 'AI Annotate'}
      </button>
      <button
        onClick={handleDownload}
        disabled={annotations.length === 0}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Download size={20} />
        Download JSON
      </button>
    </div>
  );
};

AnnotationControls.propTypes = {
  apiKey: PropTypes.string
};