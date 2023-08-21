"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    useCreateUserMutation,
    GetUsersDocument,
} from "@/gql/_generated_/graphql";

const schema = z.object({
    name: z.string().nonempty("名前を入力してください"),
});
type FormData = z.infer<typeof schema>;

export default function UserForm() {
    const [createUser, { loading, error }] = useCreateUserMutation({
        awaitRefetchQueries: true,
        refetchQueries: [
            {
                query: GetUsersDocument,
            },
        ],
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const onSubmit = useCallback(
        async (data: FormData) => {
            await createUser({
                variables: {
                    name: data.name,
                },
            });
        },
        [createUser]
    );

    if (loading) return <p>Loading...</p>;

    if (error != null) return <p>Error: {error.message}</p>;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input className="text-black" type="text" {...register("name")} />
            <p>{errors.name?.message}</p>
            <button type="submit">作成</button>
        </form>
    );
}
