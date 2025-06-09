import type { Component } from "solid-js";

type Props = {
	name: string;
	email: string;
	password: string;
	setName: (v: string) => void;
	setEmail: (v: string) => void;
	setPassword: (v: string) => void;
	handleRegister: (e: Event) => void;
};

const RegisterForm: Component<Props> = (props) => (
	<form
		onSubmit={props.handleRegister}
		class="bg-white shadow-md rounded-xl px-8 py-10 w-full max-w-md flex flex-col gap-6 mx-auto mt-10"
	>
		<h2 class="text-xl font-bold text-center text-blue-600 mb-4">
			ユーザー登録
		</h2>
		<div class="flex flex-col gap-2">
			<label for="name" class="text-sm font-medium text-gray-700">
				名前
			</label>
			<input
				id="name"
				class="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
				type="text"
				value={props.name}
				onInput={(e) => props.setName((e.target as HTMLInputElement).value)}
				required
			/>
		</div>
		<div class="flex flex-col gap-2">
			<label for="email" class="text-sm font-medium text-gray-700">
				メールアドレス
			</label>
			<input
				id="email"
				class="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
				type="email"
				value={props.email}
				onInput={(e) => props.setEmail((e.target as HTMLInputElement).value)}
				required
			/>
		</div>
		<div class="flex flex-col gap-2">
			<label for="password" class="text-sm font-medium text-gray-700">
				パスワード
			</label>
			<input
				id="password"
				class="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
				type="password"
				value={props.password}
				onInput={(e) => props.setPassword((e.target as HTMLInputElement).value)}
				required
			/>
		</div>
		<button
			class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors mt-4"
			type="submit"
		>
			登録
		</button>
	</form>
);

export default RegisterForm;
