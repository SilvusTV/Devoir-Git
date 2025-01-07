import { Todo } from "./types/Todo.ts";
import { useState } from "react";
import TodoObjectList from "./components/TodoObjectList.tsx";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Fonction pour ajouter une nouvelle tâche
  const addTodo = () => {
    if (title.trim() === "" || description.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      title,
      description,
      done: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTodos([...todos, newTodo]);
    setTitle("");
    setDescription("");
    setIsModalOpen(false); // Fermer la modal après ajout
  };

  return (
    <>
      {/* Bouton Ajouter en haut à droite */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed top-4 right-4 px-4 py-2 rounded-md bg-active-400 hover:bg-active-500 text-white font-semibold shadow-md"
      >
        + Ajouter une tâche
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Nouvelle Tâche</h2>
            <input
              type="text"
              placeholder="Titre de la tâche"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 mb-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Description de la tâche"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-black"
              >
                Annuler
              </button>
              <button
                onClick={addTodo}
                className="px-4 py-2 rounded-md bg-active-400 hover:bg-active-500 text-white"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Liste des tâches */}
      <div className="w-8/12 p-10 min-h-screen m-auto">
        <h1 className="text-3xl text-primary-50 text-center font-bold">Todos List</h1>
        <div className="flex justify-center">
          <div className="w-8/12">
            <TodoObjectList todos={todos} setTodos={setTodos}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
