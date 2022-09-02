import React, { useState } from 'react';
import Link from 'next/link';
import { trpc } from '../utils/trpc'
import { useForm } from 'react-hook-form'
import { CreateUserInput } from '../schema/user.schema';
import { useRouter } from 'next/router';

function register() {
    const { handleSubmit, register } = useForm<CreateUserInput>()
    const [success, setSuccess] = useState(false)
    const router = useRouter()
    const { mutate, error } = trpc.useMutation(['users.request-otp'], {
        onSuccess: () => {
            setSuccess(true)
        }
    })
    
    function onSubmit(values: CreateUserInput) {
        mutate(values)
    }

    return (
    <>
        <form onSubmit={handleSubmit(onSubmit)}>
            {error && error.message}
            {success && <p>Check your email</p>}
        <h1>Login</h1>
        <input 
            type="email" 
            placeholder='jane.doe@example.com' 
            {...register('email')} 
        />
        <button type='submit'>Login</button>
        </form>

        <Link href="/login">Register</Link>
    </>
  )
}

export default register