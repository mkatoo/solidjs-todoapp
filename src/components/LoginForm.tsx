import type { Component } from "solid-js";

type Props = {
	email: string;
	password: string;
	setEmail: (v: string) => void;
	setPassword: (v: string) => void;
	handleLogin: (e: Event) => void;
};

const LoginForm: Component<Props> = (props) => (
	<form
		onSubmit={props.handleLogin}
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
				value={props.email}
				onInput={(e) => props.setEmail(e.currentTarget.value)}
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
				value={props.password}
				onInput={(e) => props.setPassword(e.currentTarget.value)}
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

export default LoginForm;
