import { type Component, Show, createSignal } from "solid-js";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import TaskList from "./components/TaskList";

const App: Component = () => {
	const [token, setToken] = createSignal("");
	const [showRegister, setShowRegister] = createSignal(false);

	const handleLogout = () => {
		setToken("");
	};

	return (
		<div class="min-h-screen bg-gray-100 flex items-center flex-col pt-16">
			<Header token={token()} handleLogout={handleLogout} />
			<Show
				when={token()}
				fallback={
					<Show
						when={!showRegister()}
						fallback={
							<>
								<RegisterForm
									setShowRegister={setShowRegister}
									setToken={setToken}
								/>
								<div class="mt-2">
									<button
										type="button"
										class="text-blue-500 underline"
										onClick={() => setShowRegister(false)}
									>
										既にアカウントをお持ちの方はこちら
									</button>
								</div>
							</>
						}
					>
						<LoginForm setToken={setToken} />
						<div class="mt-2">
							<button
								type="button"
								class="text-blue-500 underline"
								onClick={() => setShowRegister(true)}
							>
								新規登録はこちら
							</button>
						</div>
					</Show>
				}
			>
				<TaskList token={token} />
			</Show>
		</div>
	);
};

export default App;
