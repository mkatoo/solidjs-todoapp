import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import { register } from "../api";
import { useNavigate } from "@solidjs/router";
import Header from "./Header";

type RegisterFormProps = {
	token: () => string;
	setToken: (token: string) => void;
};

const RegisterForm: Component<RegisterFormProps> = (props) => {
	const [name, setName] = createSignal("");
	const [email, setEmail] = createSignal("");
	const [password, setPassword] = createSignal("");
	const navigate = useNavigate();

	const handleRegister = async (e: Event) => {
		e.preventDefault();
		try {
			const res = await register(name(), email(), password());
			alert("登録が完了しました。");
			props.setToken(res.token);
			navigate("/", { replace: true });
		} catch {
			alert("登録に失敗しました。");
		}
	};

	return (
		<div class="min-h-screen bg-gray-100 flex items-center flex-col pt-16">
			<Header token={props.token} setToken={props.setToken} />
			<form
				onSubmit={handleRegister}
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
						value={name()}
						onInput={(e) => setName((e.target as HTMLInputElement).value)}
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
						value={email()}
						onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
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
						value={password()}
						onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
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
			<div class="mt-2">
				<button
					type="button"
					class="text-blue-500 hover:underline cursor-pointer"
					onClick={() => {
						navigate("/login");
					}}
				>
					既にアカウントをお持ちの方はこちら
				</button>
			</div>
		</div>
	);
};

export default RegisterForm;
