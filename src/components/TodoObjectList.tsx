import TodoObject from "./TodoObject.tsx";
import { Todo } from "../types/Todo.ts";

interface TodoObjectListProps {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
}

const TodoObjectList = ({ todos, setTodos }: TodoObjectListProps) => {
  // Séparer les todos en cours et terminées
  const ongoingTodos = todos.filter((todo) => !todo.done);
  const finishedTodos = todos.filter((todo) => todo.done);

  // Fonction pour marquer une tâche comme terminée ou en cours
  const toggleDone = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, done: !todo.done, updatedAt: new Date().toISOString() }
        : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div>
      {/* Tâches en cours */}
      {ongoingTodos.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-2 text-primary-50">Tâches en cours</h2>
          {ongoingTodos.map((todo) => (
            <TodoObject
              key={todo.id}
              todo={todo}
              onToggleDone={toggleDone}
            />
          ))}
        </div>
      )}

      {/* Tâches terminées */}
      {finishedTodos.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2 text-primary-50">Fini</h2>
          {finishedTodos.map((todo) => (
            <TodoObject
              key={todo.id}
              todo={todo}
              onToggleDone={toggleDone}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoObjectList;
