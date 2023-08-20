import UserForm from "@/app/users/_components/UserForm";
import Link from "next/link";

export default function NewUser() {
    return (
        <main>
            <h1>ユーザー作成</h1>
            <UserForm />
            <Link href="/users">ユーザー一覧</Link>
        </main>
    );
}
