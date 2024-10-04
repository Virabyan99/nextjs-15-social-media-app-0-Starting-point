import {z} from "zod";

const requiredString = z.string().trim().min(1, "Պահանջվում է")

export const signUpSchema = z.object({
    email: requiredString.email("Անվավեր էլ․ հասցե"),
    username: requiredString.regex(
        /^[a-zA-Z0-9_-]+$/,
        "Թույլատրվում է միայն տառեր, թվեր, - և _»"
    ),
    password: requiredString.min(8, "Պետք է լինի առնվազն 8 նիշ")
})

export type SignUpValues = z.infer<typeof signUpSchema>

export const loginSchema = z.object({
    username: requiredString,
    password: requiredString
})

export type LoginValues = z.infer<typeof loginSchema>