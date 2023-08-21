"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
    useCreateUserMutation,
    GetUsersDocument,
} from "@/gql/_generated_/graphql";

const schema = z.object({
    name: z.string().nonempty("名前を入力してください"),
});
type FormData = z.infer<typeof schema>;

export default function UserForm() {
    const router = useRouter();

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
            router.back();
        },
        [createUser]
    );

    if (loading) return <p>Loading...</p>;

    if (error != null) return <p>Error: {error.message}</p>;

    return (
        <form
            className="w-2/3 max-w-lg flex flex-col items-center items-stretch gap-y-2"
            onSubmit={handleSubmit(onSubmit)}
        >
            <input
                className="text-black rounded-lg px-5 py-2.5 text-sm hover:font-semibold disabled:hover:font-normal"
                type="text"
                {...register("name")}
            />
            <p className="validation-error">{errors.name?.message}</p>
            <button
                className="rounded-lg px-10 py-2.5 text-sm hover:font-semibold disabled:hover:font-normal text-black bg-white hover:bg-gray-100"
                type="submit"
            >
                作成
            </button>
        </form>
    );
}
