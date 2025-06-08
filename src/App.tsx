import { Component, createSignal, createResource, For } from 'solid-js';

const API_URL = 'http://localhost:3001';

const user = {
  email: "mkatoo@example.com",
  password: "password",
  token: "0f7a0407-b3cd-47f4-83fe-812ab509f444",
};

async function fetchTasks() {
  const url = `${API_URL}/tasks`;
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${user.token}`,
    },
  });
  return res.json();
}

async function addTask(content: string) {
  const url = `${API_URL}/tasks`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`,
    },
    body: JSON.stringify({ content }),
  });
  return res.json();
}

async function deleteTask(id: number) {
  const url = `${API_URL}/tasks/${id}`;
  await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}`,
    },
  });
}

const App: Component = () => {
  const [content, setContent] = createSignal('');
  const [tasks, { refetch }] = createResource(fetchTasks);

  const handleAdd = async (e: Event) => {
    e.preventDefault();
    if (!content().trim()) return;
    await addTask(content());
    setContent('');
    refetch();
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    refetch();
  };

  return (
    <div class="min-h-screen bg-gray-100 flex justify-center">
      <div class="rounded-lg p-8 w-full max-w-md">
        <h1 class="text-2xl font-bold mb-6 text-center text-blue-600">Todo App</h1>
        <form onSubmit={handleAdd} class="flex gap-2 mb-6">
          <input
            value={content()}
            onInput={e => setContent(e.currentTarget.value)}
            placeholder="新しいタスクを入力"
            class="flex-1 border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            追加
          </button>
        </form>
        <ul class="space-y-2">
          <For each={tasks()}>
            {(task: any) => (
              <li class="flex items-center justify-between bg-white px-4 py-2 rounded shadow-sm">
                <span>{task.content}</span>
                <button
                  onClick={() => handleDelete(task.id)}
                  class="text-sm text-red-500 hover:underline"
                >
                  削除
                </button>
              </li>
            )}
          </For>
        </ul>
      </div>
    </div>
  );
};

export default App;
