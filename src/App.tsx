import { Component, createSignal, createResource, For, Show } from 'solid-js';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import TaskList from './components/TaskList';

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
    <div class="min-h-screen bg-gray-100 flex items-center justify-center flex-col pt-16">
      <Header token={token()} handleLogout={handleLogout} />
      <Show when={token()} fallback={
        <LoginForm
          email={email()}
          password={password()}
          setEmail={setEmail}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      }>
        <TaskList
          content={content()}
          setContent={setContent}
          tasks={tasks()}
          handleAdd={handleAdd}
          handleDelete={handleDelete}
        />
      </Show>
    </div>
  );
};

export default App;
