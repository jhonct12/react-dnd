import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { useEffect, useState } from "react";

const initialTodos = JSON.parse(localStorage.getItem("todos")) || [
  { id: 1, text: "aprednder react" },
  { id: 2, text: "aprender js" },
  { id: 3, text: "aprender vue" },
];

const App = () => {
  const [todos, setTodos] = useState(initialTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const copyArray = [...todos];
    const [reorderItem] = copyArray.splice(startIndex, 1);

    copyArray.splice(endIndex, 0, reorderItem);

    setTodos(copyArray);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h1>Todo App</h1>
      <Droppable droppableId="todos">
        {(droppableProvider) => (
          <ul
            ref={droppableProvider.innerRef}
            {...droppableProvider.droppableProps}
          >
            {todos.map((todo, index) => (
              <Draggable key={todo.id} index={index} draggableId={`${todo.id}`}>
                {(draggableProvider) => (
                  <li
                    ref={draggableProvider.innerRef}
                    {...draggableProvider.draggableProps}
                    {...draggableProvider.dragHandleProps}
                  >
                    {todo.text}
                  </li>
                )}
              </Draggable>
            ))}
            {droppableProvider.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default App;
