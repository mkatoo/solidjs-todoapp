import { useNavigate } from "@solidjs/router";
import {
	type Component,
	Show,
	Suspense,
	createResource,
	createSignal,
} from "solid-js";
import { fetchUserInfo, updateUserProfile } from "../api";
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

	const [user, { refetch }] = createResource(
		() => props.token(),
		fetchUserInfo,
	);
	const [isEditing, setIsEditing] = createSignal(false);
	const [editName, setEditName] = createSignal("");
	const [isUpdating, setIsUpdating] = createSignal(false);
	const [updateMessage, setUpdateMessage] = createSignal("");

	const handleEdit = () => {
		const userData = user();
		if (userData) {
			setEditName(userData.name);
			setIsEditing(true);
			setUpdateMessage("");
		}
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditName("");
		setUpdateMessage("");
	};

	const handleSave = async () => {
		if (!editName().trim()) {
			setUpdateMessage("名前を入力してください");
			return;
		}

		setIsUpdating(true);
		try {
			await updateUserProfile(props.token(), editName().trim());
			setIsEditing(false);
			setEditName("");
			setUpdateMessage("更新が完了しました");
			refetch();
		} catch (error) {
			setUpdateMessage(
				error instanceof Error ? error.message : "更新に失敗しました",
			);
		} finally {
			setIsUpdating(false);
		}
	};

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
										<Show
											when={!isEditing()}
											fallback={
												<div class="space-y-2">
													<input
														type="text"
														value={editName()}
														onInput={(e) => setEditName(e.target.value)}
														class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
														placeholder="名前を入力してください"
														disabled={isUpdating()}
													/>
													<div class="flex space-x-2">
														<button
															type="button"
															onClick={handleSave}
															disabled={isUpdating()}
															class="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors disabled:opacity-50 cursor-pointer"
														>
															{isUpdating() ? "保存中..." : "保存"}
														</button>
														<button
															type="button"
															onClick={handleCancel}
															disabled={isUpdating()}
															class="flex-1 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors disabled:opacity-50 cursor-pointer"
														>
															キャンセル
														</button>
													</div>
												</div>
											}
										>
											<div class="flex justify-between items-center">
												<p class="text-lg text-gray-800 font-medium">
													{userData().name}
												</p>
												<button
													type="button"
													onClick={handleEdit}
													class="text-sm text-blue-500 hover:text-blue-700 underline cursor-pointer"
												>
													編集
												</button>
											</div>
										</Show>
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
					<Show when={updateMessage()}>
						<div
							class={`mt-4 p-3 rounded-md text-sm text-center ${
								updateMessage() === "更新が完了しました"
									? "bg-green-100 text-green-700"
									: "bg-red-100 text-red-700"
							}`}
						>
							{updateMessage()}
						</div>
					</Show>
					<div class="mt-6 pt-4 border-t">
						<button
							type="button"
							onClick={() => navigate("/", { replace: true })}
							class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors cursor-pointer"
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
