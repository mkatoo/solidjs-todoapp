import { Component, createSignal, createResource, For, Show } from 'solid-js';

const API_URL = 'http://localhost:3001';

async function login(email: string, password: string) {
  const url = `${API_URL}/auth`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('ログイン失敗');
  return res.json();
}

async function fetchTasks(token: string) {
  const url = `${API_URL}/tasks`;
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return res.json();
}

async function addTask(token: string, content: string) {
  const url = `${API_URL}/tasks`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });
  return res.json();
}

async function deleteTask(token: string, id: number) {
  const url = `${API_URL}/tasks/${id}`;
  await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
}

const App: Component = () => {
  const [token, setToken] = createSignal<string | null>(null);
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [content, setContent] = createSignal('');
  const [tasks, { refetch }] = createResource(token, fetchTasks);

  const handleLogin = async (e: Event) => {
    e.preventDefault();
    try {
      const res = await login(email(), password());
      setToken(res.token);
      refetch();
    } catch {
      alert('ログインに失敗しました');
    }
  };

  const handleLogout = () => {
    setToken(null);
    setEmail('');
    setPassword('');
    setContent('');
  };

  const handleAdd = async (e: Event) => {
    e.preventDefault();
    if (!content().trim() || !token()) return;
    await addTask(token()!, content());
    setContent('');
    refetch();
  };

  const handleDelete = async (id: number) => {
    if (!token()) return;
    await deleteTask(token()!, id);
    refetch();
  };

  return (
    <div class="min-h-screen bg-gray-100 flex items-center justify-center flex-col">
      <div class="w-full bg-blue-600 py-4 px-8 flex items-center justify-between fixed top-0 left-0 z-50">
        <span class="text-white text-xl font-bold">Todo App</span>
        <Show when={token()}>
          <button
            onClick={handleLogout}
            class="text-sm text-white hover:underline"
          >
            ログアウト
          </button>
        </Show>
      </div>
      <div class="h-16" />
      <Show when={token()} fallback={
        <form onSubmit={handleLogin} class="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm flex flex-col gap-4 mt-8">
          <h2 class="text-xl font-bold text-center text-blue-600 mb-4">ログイン</h2>
          <input
            type="email"
            value={email()}
            onInput={e => setEmail(e.currentTarget.value)}
            placeholder="メールアドレス"
            class="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            value={password()}
            onInput={e => setPassword(e.currentTarget.value)}
            placeholder="パスワード"
            class="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            ログイン
          </button>
        </form>
      }>
        <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mt-8">
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
                <li class="flex items-center justify-between bg-gray-50 px-4 py-2 rounded shadow-sm">
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
      </Show>
    </div>
  );
};

export default App;
