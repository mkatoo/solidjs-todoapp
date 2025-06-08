import { Component, createSignal, createResource, Show } from 'solid-js';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TaskList from './components/TaskList';
import { login, register, fetchTasks, addTask, deleteTask } from './api';

const App: Component = () => {
  const [token, setToken] = createSignal<string | null>(null);
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [content, setContent] = createSignal('');
  const [name, setName] = createSignal('');
  const [showRegister, setShowRegister] = createSignal(false); // 追加
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

  const handleRegister = async (e: Event) => {
    e.preventDefault();
    try {
      await register(name(), email(), password());
      alert('登録が完了しました。ログインしてください。');
      setShowRegister(false);
    } catch {
      alert('登録に失敗しました');
      setShowRegister(true);
      return;
    }
    setName('');
    setEmail('');
    setPassword('');
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
        <Show when={!showRegister()} fallback={
          <>
            <RegisterForm
              name={name()}
              email={email()}
              password={password()}
              setName={setName}
              setEmail={setEmail}
              setPassword={setPassword}
              handleRegister={handleRegister}
            />
            <div class="mt-2">
              <button class="text-blue-500 underline" onClick={() => setShowRegister(false)}>
                既にアカウントをお持ちの方はこちら
              </button>
            </div>
          </>
        }>
          <LoginForm
            email={email()}
            password={password()}
            setEmail={setEmail}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
          <div class="mt-2">
            <button class="text-blue-500 underline" onClick={() => setShowRegister(true)}>
              新規登録はこちら
            </button>
          </div>
        </Show>
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
