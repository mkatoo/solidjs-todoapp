import { Component, createSignal, createResource, For } from 'solid-js';

import styles from './App.module.css';

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
    <div class={styles.App}>
      <div>
        <h1>Todo App</h1>
        <form onSubmit={handleAdd}>
          <input
            value={content()}
            onInput={e => setContent(e.currentTarget.value)}
            placeholder="新しいタスクを入力"
          />
          <button type="submit">追加</button>
        </form>
        <ul>
          <For each={tasks()}>
            {(task: any) => (
              <li>
                {task.content}
                <button onClick={() => handleDelete(task.id)}>削除</button>
              </li>
            )}
          </For>
        </ul>
      </div>
    </div>
  );
};

export default App;
