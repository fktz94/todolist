import { useState } from 'react';

export default function useHandleHook() {
  const [tasks, setTasks] = useState([]);
  const [toDoValue, setToDoValue] = useState('');
  const [isEditing, setIsEditing] = useState(null);

  const handleDelete = (id) => {
    if (id === 'all') return setTasks([]);
    return setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleEdit = (id) => {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    setIsEditing(tasks[taskIndex]);
  };

  const handleInput = (e) => {
    const {
      target: { value, id }
    } = e;
    if (id === 'deleteValue') return setToDoValue('');
    if (toDoValue.length < 1 && value === ' ') return;
    return setToDoValue(value);
  };

  const handleFinishEdit = (id, value) => {
    if (value.length <= 0) {
      return;
    }

    setTasks((prevTasks) =>
      prevTasks.map((item) => {
        if (item.id === id)
          return {
            ...item,
            isDone: false,
            value
          };
        return { ...item };
      })
    );

    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const uuid = crypto.randomUUID();

    if (toDoValue.length > 0)
      setTasks((prevTasks) => [{ value: toDoValue, id: uuid, isDone: false }, ...prevTasks]);

    setToDoValue('');
  };

  const handleIsDone = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((item) => {
        if (item.id === id)
          return {
            ...item,
            isDone: !item.isDone
          };
        return { ...item };
      })
    );
  };

  const handleMoveItem = (id, direction) => {
    const cut = tasks.findIndex((item) => item.id === id);

    if (direction === 'up') {
      if (!cut) return;
      setTasks((prevTasks) => {
        return [
          ...prevTasks.slice(0, cut - 1),
          ...prevTasks.filter((item) => item.id === id),
          ...prevTasks.slice(cut - 1).filter((item) => item.id !== id)
        ];
      });
    }

    if (direction === 'down') {
      if (cut === tasks.length - 1) return;
      setTasks((prevTasks) => {
        return [
          ...prevTasks.slice(0, cut + 2).filter((item) => item.id !== id),
          ...prevTasks.filter((item) => item.id === id),
          ...prevTasks.slice(cut + 2)
        ];
      });
    }
  };

  return {
    handleDelete,
    handleEdit,
    handleFinishEdit,
    handleInput,
    handleIsDone,
    handleMoveItem,
    handleSubmit,
    isEditing,
    tasks,
    toDoValue
  };
}
