import { useNavigate } from "@solidjs/router";
import { type Component, Show, Suspense, createResource } from "solid-js";
import { fetchUserInfo } from "../api";
import Header from "./Header";

type UserProfileProps = {
	token: () => string;
	setToken: (token: string) => void;
};

const UserProfile: Component<UserProfileProps> = (props) => {
	const navigate = useNavigate();

	if (!props.token()) {
		navigate("/login", { replace: true });
		return null;
	}

	const [user] = createResource(() => props.token(), fetchUserInfo);

	return (
		<div class="min-h-screen bg-gray-100">
			<Header token={props.token} setToken={props.setToken} />
			<div class="pt-20 px-4">
				<div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
					<h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">
						ユーザー情報
					</h1>
					<Suspense
						fallback={
							<div class="text-center text-gray-500">読み込み中...</div>
						}
					>
						<Show
							when={user()}
							fallback={
								<div class="text-center text-red-500">
									ユーザー情報の取得に失敗しました
								</div>
							}
						>
							{(userData) => (
								<div class="space-y-4">
									<div class="border-b pb-2">
										<div class="text-sm text-gray-600">名前</div>
										<p class="text-lg text-gray-800 font-medium">
											{userData().name}
										</p>
									</div>
									<div class="border-b pb-2">
										<div class="text-sm text-gray-600">メールアドレス</div>
										<p class="text-lg text-gray-800">{userData().email}</p>
									</div>
									<div class="border-b pb-2">
										<div class="text-sm text-gray-600">登録日</div>
										<p class="text-lg text-gray-800">
											{new Date(userData().created_at).toLocaleDateString(
												"ja-JP",
											)}
										</p>
									</div>
								</div>
							)}
						</Show>
					</Suspense>
					<div class="mt-6 pt-4 border-t">
						<button
							type="button"
							onClick={() => navigate("/", { replace: true })}
							class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
						>
							タスク一覧に戻る
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
