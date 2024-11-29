import { useState } from 'react';
import { TextInput } from './components/TextInput';
import { EntityTypeManager } from './components/EntityTypeManager';
import { AnnotatedText } from './components/AnnotatedText';
import { AnnotationControls } from './components/AnnotatedControls';
import { KeySquare } from 'lucide-react';

function App() {
  const [apiKey, setApiKey] = useState('');

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Space NER Text Annotator</h1>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Groq API Key
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Groq API key"
                className="flex-1 px-3 py-2 border rounded-lg"
              />
              <KeySquare className="text-gray-400" size={24} />
            </div>
          </div>

          <EntityTypeManager />
          <TextInput />
          <AnnotationControls apiKey={apiKey} />
          <AnnotatedText />
        </div>
      </div>
    </div>
  );
}

export default App;