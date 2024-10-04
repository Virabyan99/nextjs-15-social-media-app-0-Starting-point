"use client";

import { signUpSchema, SignUpValues } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { signUp } from "./actions";

export default function SignUpForm() {

    const [error, setError] = useState<string>()

    const [isPending, startTransition] = useTransition();

    const form = useForm<SignUpValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            username: "",
            password: ""
        }
    })

    async function onSubmit(values: SignUpValues) {
        setError(undefined)
        startTransition(async () => {
           const {error} = await signUp(values);
           if(error) setError(error);
        })
    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 " >
            {error && <p className="text-center text-destructive">{error}</p>}
            <FormField 
            control={form.control}
            name="username"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Օգտատիրոջ անունը</FormLabel>
                    <FormControl>
                        <Input placeholder="Օգտանուն" {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />
            <FormField 
            control={form.control}
            name="email"
            render={({field}) => (
                <FormItem>
                    <FormLabel>էլփոստի հասցեն</FormLabel>
                    <FormControl>
                        <Input placeholder="էլփոստ" type="email" {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />
            <FormField 
            control={form.control}
            name="password"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Գաղտնաբառ</FormLabel>
                    <FormControl>
                        <Input placeholder="Գաղտնաբառ" type="password" {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            />

            <Button type="submit" className="w-full">Ստեղծել հաշիվ</Button>
        </form>
    </Form>
}