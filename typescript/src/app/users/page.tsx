import Link from "next/link";
import UserList from "@/app/users/_components/UserList";

export default function Users() {
    return (
        <main>
            <UserList />
            <Link href="/users/new">ユーザー作成</Link>
        </main>
    );
}
