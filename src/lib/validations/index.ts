import * as z from "zod"



export  const signupFormValidation = z.object({
    name: z.string().min(2, {message: 'Too short'}),
  username: z.string().min(2, {message: "Username must be at least 2 characters.",}),
  email: z.string().email(),
  password: z.string().min(8, {message: 'Password must be at least 8 characters.'}),
})
export  const signinFormValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, {message: 'Password must be at least 8 characters.'}),
})