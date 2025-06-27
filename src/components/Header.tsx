import { useNavigate } from "@solidjs/router";
import { type Component, Show } from "solid-js";
import { logout, user } from "../auth";

type HeaderProps = {
	token: () => string;
	setToken: (token: string) => void;
};

const Header: Component<HeaderProps> = (props) => {
	const navigate = useNavigate();

	const handleLogout = () => {
		// Use the new logout function for proper cleanup
		logout();
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
				<div class="flex items-center space-x-4">
					<button
						type="button"
						onClick={() => navigate("/profile", { replace: true })}
						class="text-sm text-white hover:underline cursor-pointer"
					>
						プロフィール
					</button>
					<button
						type="button"
						onClick={handleLogout}
						class="text-sm text-white hover:underline cursor-pointer"
					>
						ログアウト
					</button>
				</div>
			</Show>
		</div>
	);
};

export default Header;
