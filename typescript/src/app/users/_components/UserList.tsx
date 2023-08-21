"use client";

import { useGetUsersQuery } from "@/gql/_generated_/graphql";
import Link from "next/link";

export default function Home() {
    const { data, loading, error } = useGetUsersQuery();

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error: {error.message}</p>;

    if (data) {
        if (data.users.length === 0)
            return <Link href="/users/new">ユーザーを作成</Link>;

        return (
            <ul>
                {data.users.map((user) => (
                    <li className="bg-slate-400" key={user.id}>
                        <p className="h-8">{user.name}</p>
                    </li>
                ))}
            </ul>
        );
    }
}
