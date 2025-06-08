import { Component } from 'solid-js';

type Props = {
  email: string;
  password: string;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  handleLogin: (e: Event) => void;
};

const LoginForm: Component<Props> = (props) => (
  <form onSubmit={props.handleLogin} class="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm flex flex-col gap-4 mt-8">
    <h2 class="text-xl font-bold text-center text-blue-600 mb-4">ログイン</h2>
    <input
      type="email"
      value={props.email}
      onInput={e => props.setEmail(e.currentTarget.value)}
      placeholder="メールアドレス"
      class="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      required
    />
    <input
      type="password"
      value={props.password}
      onInput={e => props.setPassword(e.currentTarget.value)}
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
);

export default LoginForm;
