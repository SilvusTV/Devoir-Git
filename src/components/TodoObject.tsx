import { Todo } from "../types/Todo.ts";

interface TodoObjectProps {
  todo: Todo;
  onToggleDone: (id: number) => void;
}

const TodoObject = ({ todo, onToggleDone }: TodoObjectProps) => {
  // Formater les dates au format français
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      onClick={() => onToggleDone(todo.id)}
      className={`p-4 rounded-md border ${
        todo.done
          ? "bg-gray-100 border-gray-300 line-through"
          : "bg-white border-gray-200 hover:bg-gray-50"
      } shadow-sm cursor-pointer transition duration-200 my-2`}
    >
      <div className="flex justify-between items-center">
        <h3
          className={`text-lg font-semibold ${
            todo.done ? "text-gray-400" : "text-gray-800"
          }`}
        >
          {todo.title}
        </h3>
        {todo.done && (
          <span className="text-xs text-green-600 font-medium">Terminé</span>
        )}
      </div>
      <p
        className={`text-sm ${
          todo.done ? "text-gray-400" : "text-gray-600"
        } mt-1`}
      >
        {todo.description}
      </p>
      <div className="mt-2 text-xs text-gray-500">
        <p>Créé le : {formatDate(todo.createdAt)}</p>
        <p>Mis à jour le : {formatDate(todo.updatedAt)}</p>
      </div>
    </div>
  );
};

export default TodoObject;
