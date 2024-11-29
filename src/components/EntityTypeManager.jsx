import { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';
import { useAnnotationStore } from '../store/useAnnotationStore';

export const EntityTypeManager = () => {
  const { entityTypes, addEntityType, removeEntityType } = useAnnotationStore();
  const [newEntityName, setNewEntityName] = useState('');

  const handleAddEntity = () => {
    if (newEntityName.trim()) {
      const color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
      addEntityType({ name: newEntityName.trim(), color });
      setNewEntityName('');
    }
  };

  return (
    <div className="mb-4">
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          className="flex-1 px-3 py-2 border rounded-lg"
          value={newEntityName}
          onChange={(e) => setNewEntityName(e.target.value)}
          placeholder="Add new entity type..."
        />
        <button
          onClick={handleAddEntity}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <PlusCircle size={24} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {entityTypes.map((entity) => (
          <div
            key={entity.name}
            className="flex items-center gap-2 px-3 py-1 rounded-full"
            style={{ backgroundColor: entity.color + '20', color: entity.color }}
          >
            <span>{entity.name}</span>
            <button
              onClick={() => removeEntityType(entity.name)}
              className="hover:opacity-75"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};