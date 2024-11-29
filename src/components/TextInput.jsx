
import { useAnnotationStore } from '../store/useAnnotationStore';

export const TextInput = () => {
  const { text, setText } = useAnnotationStore();

  return (
    <div className="w-full mb-4">
      <textarea
        className="w-full h-32 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to annotate..."
      />
    </div>
  );
};