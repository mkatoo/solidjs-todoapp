import { type Component, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";

type HeaderProps = {
	token: () => string;
	setToken: (token: string) => void;
};

const Header: Component<HeaderProps> = (props) => {
	const navigate = useNavigate();

	const handleLogout = () => {
		props.setToken("");
		navigate("/login", { replace: true });
	};

	return (
		<div class="w-full bg-blue-600 py-4 px-8 flex items-center justify-between fixed top-0 left-0 z-50">
			<button
				type="button"
				class="text-white text-xl font-bold bg-transparent border-none cursor-pointer"
				onClick={() => navigate("/", { replace: true })}
			>
				Todo App
			</button>
			<Show when={props.token()}>
				<button
					type="button"
					onClick={handleLogout}
					class="text-sm text-white hover:underline cursor-pointer"
				>
					ログアウト
				</button>
			</Show>
		</div>
	);
};

export default Header;
