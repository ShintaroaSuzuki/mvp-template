import CreateUserButton from "@/app/users/_components/CreateUserButton";
import UserList from "@/app/users/_components/UserList";

export default function Users() {
    return (
        <main className="flex flex-col items-center my-20">
            <UserList />
            <CreateUserButton className="mt-20 text-black bg-white hover:bg-gray-100 w-60">
                新規作成
            </CreateUserButton>
        </main>
    );
}
