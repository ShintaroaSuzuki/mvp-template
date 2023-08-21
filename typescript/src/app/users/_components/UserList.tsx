"use client";

import Link from "next/link";
import { useGetUsersQuery } from "@/gql/_generated_/graphql";

export default function UserList() {
    const { data, loading, error } = useGetUsersQuery();

    if (loading) return <p>Loading...</p>;

    if (error != null) return <p>Error: {error.message}</p>;

    if (data != null) {
        if (data.users.length === 0)
            return <Link href="/users/new">ユーザーを作成</Link>;

        return (
            <ul>
                {data.users.map((user) => (
                    <li className="bg-slate-400" key={user.id}>
                        <Link href={`/users/${user.id}`}>
                            <p className="h-8">{user.name}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        );
    }
}
