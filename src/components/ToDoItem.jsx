import { useState } from 'react';

function ClickButton({ onClick, text, styled = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-2 py-1 rounded border border-transparent hover:bg-black bg-neutral-400 ${styled} ${
        text === 'Done!' ? 'active:bg-green-300' : ''
      }`}>
      {text}
    </button>
  );
}

function ArrowButton({ onClick, text, styled = '', isFirst, isLast }) {
  return (
    <button
      type="button"
      className={`relative border rounded-full text-xs px-1 ${styled} ${
        isFirst || isLast ? 'bg-gray-500 text-gray-400' : 'hover:bg-gray-400 hover:text-black'
      }`}
      onClick={onClick}
      disabled={isFirst || isLast}>
      {text}
    </button>
  );
}

export default function ToDoItem({
  handleFinishEdit,
  handleIsDone,
  handleMoveItem,
  id,
  isDone,
  isEditing,
  isLast,
  isFirst,
  onDelete,
  onEdit,
  task
}) {
  const edit = isEditing?.id === id;
  const [editChange, setEditChange] = useState(task);

  const handleEditChange = (e) => {
    const {
      target: { value }
    } = e;

    setEditChange(value);
  };

  return (
    <li
      id={id}
      className="flex pl-2 max-w-sm relative items-center justify-between gap-2 border border-black rounded">
      {!edit ? (
        <span className={`break-all ${isDone ? 'line-through' : ''}`}>{task}</span>
      ) : (
        <input
          type="text"
          value={editChange}
          className="text-black outline-none p-1 -ml-2 rounded border border-transparent focus:border-blue-400"
          onChange={handleEditChange}
        />
      )}
      <div className="flex gap-1">
        <button
          type="button"
          id="deleteValue"
          onClick={() => onDelete(id)}
          className="absolute self-center -left-8 px-2 py-1 text-xs rounded-full border border-transparent bg-gray-950 hover:bg-gray-700 active:border-red-900 active:bg-gray-500">
          X
        </button>
        {!edit ? (
          <ClickButton text="Edit" onClick={() => onEdit(id)} />
        ) : (
          <ClickButton
            text="Save"
            styled="bg-neutral-600"
            onClick={() => handleFinishEdit(id, editChange)}
          />
        )}
        <ClickButton text={isDone ? 'Done?' : 'Done!'} onClick={() => handleIsDone(id)} />
      </div>
      <div className="absolute flex flex-col -right-8">
        <ArrowButton text="🡩" onClick={() => handleMoveItem(id, 'up')} isFirst={isFirst} />
        <ArrowButton text="🡫" onClick={() => handleMoveItem(id, 'down')} isLast={isLast} />
      </div>
    </li>
  );
}
