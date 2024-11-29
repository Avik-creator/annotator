import { useAnnotationStore } from '../store/useAnnotationStore';
import { X } from 'lucide-react';
import clsx from 'clsx';

export const AnnotatedText= () => {
  const { text, annotations, removeAnnotation, entityTypes } = useAnnotationStore();

  const renderAnnotatedText = () => {
    if (!text) return null;

    let result = [];
    let currentIndex = 0;

    // Sort annotations by start position
    const sortedAnnotations = [...annotations].sort((a, b) => a.start - b.start);

    for (const annotation of sortedAnnotations) {
      if (annotation.start > currentIndex) {
        result.push(
          <span key={`text-${currentIndex}`}>
            {text.slice(currentIndex, annotation.start)}
          </span>
        );
      }

      const entityType = entityTypes.find((et) => et.name === annotation.label);
      
      result.push(
        <span
          key={annotation.id}
          className={clsx(
            "relative group cursor-pointer inline-block",
            "hover:opacity-90"
          )}
          style={{
            backgroundColor: entityType?.color + '20',
            borderBottom: `2px solid ${entityType?.color}`
          }}
        >
          {text.slice(annotation.start, annotation.end)}
          <button
            onClick={() => removeAnnotation(annotation.id)}
            className="absolute -top-2 -right-2 hidden group-hover:flex bg-white rounded-full shadow-sm p-0.5"
          >
            <X size={12} />
          </button>
        </span>
      );

      currentIndex = annotation.end;
    }

    if (currentIndex < text.length) {
      result.push(
        <span key={`text-${currentIndex}`}>
          {text.slice(currentIndex)}
        </span>
      );
    }

    return result;
  };

  return (
    <div className="p-4 border rounded-lg bg-white min-h-[100px] whitespace-pre-wrap">
      {renderAnnotatedText()}
    </div>
  );
};