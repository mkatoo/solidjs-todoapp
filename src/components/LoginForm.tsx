import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import { login } from "../api";

type Props = {
	setToken: (token: string) => void;
};

const LoginForm: Component<Props> = (props) => {
	const [email, setEmail] = createSignal("");
	const [password, setPassword] = createSignal("");

	const handleLogin = async (e: Event) => {
		e.preventDefault();
		try {
			const res = await login(email(), password());
			props.setToken(res.token);
		} catch {
			alert("ログインに失敗しました");
		}
	};

	return (
		<form
			onSubmit={handleLogin}
			class="bg-white shadow-md rounded-xl px-8 py-10 w-full max-w-md flex flex-col gap-6 mx-auto mt-10"
		>
			<h2 class="text-xl font-bold text-center text-blue-600 mb-4">ログイン</h2>
			<div class="flex flex-col gap-2">
				<label for="email" class="text-sm font-medium text-gray-700">
					メールアドレス
				</label>
				<input
					id="email"
					type="email"
					value={email()}
					onInput={(e) => setEmail(e.currentTarget.value)}
					placeholder="メールアドレス"
					class="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
					required
				/>
			</div>
			<div class="flex flex-col gap-2">
				<label for="password" class="text-sm font-medium text-gray-700">
					パスワード
				</label>
				<input
					id="password"
					type="password"
					value={password()}
					onInput={(e) => setPassword(e.currentTarget.value)}
					placeholder="パスワード"
					class="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
					required
				/>
			</div>
			<button
				type="submit"
				class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors mt-4"
			>
				ログイン
			</button>
		</form>
	);
};

export default LoginForm;
