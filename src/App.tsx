import { Component, createSignal, createResource, Show } from 'solid-js';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import TaskList from './components/TaskList';
import { login, fetchTasks, addTask, deleteTask } from './api';

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
    <div class="min-h-screen bg-gray-100 flex items-center flex-col pt-16">
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
