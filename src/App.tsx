import { Todo } from "./types/Todo.ts";
import { useState, useEffect } from "react";
import TodoObjectList from "./components/TodoObjectList.tsx";

function App() {
  // États principaux
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);
  const [importData, setImportData] = useState<string>("");

  // Sauvegarde automatique dans localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Ajouter une nouvelle tâche
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

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setTitle("");
    setDescription("");
    setIsModalOpen(false);
  };

  // Sauvegarder les Todos dans le presse-papiers
  const saveTodosToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(todos, null, 2));
      alert("✅ Todos sauvegardés dans le presse-papiers !");
    } catch (error) {
      console.error(error);
      alert("❌ Échec de la sauvegarde dans le presse-papiers.");
    }
  };

  // Importer les Todos depuis le texte JSON
  const importTodos = () => {
    try {
      const parsedData: Todo[] = JSON.parse(importData);
      if (Array.isArray(parsedData) && parsedData.every((todo) => "id" in todo && "title" in todo)) {
        setTodos(parsedData);
        setIsImportModalOpen(false);
        setImportData("");
        alert("✅ Todos importés avec succès !");
      } else {
        alert("Format JSON invalide.");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Erreur lors de l'importation des Todos. Vérifiez le format JSON.");
    }
  };

  return (
    <>
      {/* Boutons de gestion en haut à gauche */}
      <div className="fixed top-4 left-4 flex gap-2">
        <button
          onClick={saveTodosToClipboard}
          className="px-4 py-2 rounded-md bg-blue-400 hover:bg-blue-500 text-white font-semibold shadow-md"
        >
          💾 Sauvegarder les Todos
        </button>
        <button
          onClick={() => setIsImportModalOpen(true)}
          className="px-4 py-2 rounded-md bg-green-400 hover:bg-green-500 text-white font-semibold shadow-md"
        >
          📥 Importer les Todos
        </button>
      </div>

      {/* Bouton Ajouter en haut à droite */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed top-4 right-4 px-4 py-2 rounded-md bg-active-400 hover:bg-active-500 text-white font-semibold shadow-md"
      >
        + Nouvelle Tâche
      </button>

      {/* Modal pour Ajouter une Tache */}
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

      {/* Modal pour Importer les Todos */}
      {isImportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Importer des Todos</h2>
            <textarea
              placeholder="Collez le JSON ici"
              value={importData}
              onChange={(e) => setImportData(e.target.value)}
              className="w-full h-40 p-2 mb-4 border rounded-md"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-black"
              >
                Annuler
              </button>
              <button
                onClick={importTodos}
                className="px-4 py-2 rounded-md bg-green-400 hover:bg-green-500 text-white"
              >
                Importer
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
                   <TodoObjectList todos={todos} setTodos={setTodos} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

//Test pre-commit hook
