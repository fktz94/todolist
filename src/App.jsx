import ToDoItem from './components/ToDoItem';
import useHandleHook from './hook/useHandleHook';

export default function App() {
  const {
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
  } = useHandleHook();

  return (
    <div className="mt-10 px-10 py-5 border rounded border-red-500 bg-emerald-900">
      <h1 className="text-center font-mono text-4xl">ToDoList!</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="mt-8 mb-4 flex gap-4 relative">
        <button
          type="button"
          id="deleteValue"
          onClick={handleInput}
          className="absolute self-center -left-8 px-2 py-1 text-xs rounded-full border border-transparent bg-gray-950 hover:bg-gray-700 active:border-red-900 active:bg-gray-500">
          X
        </button>
        <input
          type="text"
          className="px-2 py-1 outline-none rounded border-2 focus:border-blue-400 text-black"
          onChange={(e) => {
            handleInput(e);
          }}
          value={toDoValue}
        />
        <button
          type="submit"
          className="rounded grow px-4 tracking-wider border border-transparent bg-gray-950 hover:bg-gray-700 active:border-red-900 active:bg-gray-500">
          AddTask!
        </button>
      </form>

      {tasks?.length > 0 && (
        <>
          <hr className=" border-black " />
          <ul className="flex flex-col gap-3 mt-4">
            {tasks.map(({ value, id, isDone }) => {
              return (
                <ToDoItem
                  key={id}
                  id={id}
                  onEdit={handleEdit}
                  isEditing={isEditing}
                  handleFinishEdit={handleFinishEdit}
                  handleIsDone={handleIsDone}
                  handleMoveItem={handleMoveItem}
                  onDelete={handleDelete}
                  task={value}
                  isDone={isDone}
                  isFirst={tasks.findIndex((item) => item.id === id) === 0}
                  isLast={tasks.findIndex((item) => item.id === id) + 1 === tasks.length}
                />
              );
            })}
            <button
              type="button"
              onClick={() => handleDelete('all')}
              className="self-center w-fit px-4 text-sm rounded py-1 tracking-wider border border-transparent bg-gray-950 hover:bg-gray-700 active:border-red-900 active:bg-gray-500">
              Delete all items!
            </button>
          </ul>
        </>
      )}
    </div>
  );
}
