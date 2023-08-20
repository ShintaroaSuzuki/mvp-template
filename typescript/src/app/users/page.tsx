import UserList from "@/app/users/_components/UserList";
import Link from "next/link";

export default function Users() {
    return (
        <main>
            <UserList />
            <Link href="/users/new">ユーザー作成</Link>
        </main>
    );
}
