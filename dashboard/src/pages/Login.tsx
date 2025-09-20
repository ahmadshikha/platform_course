import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { loginUser } from '../store/slices/login/logging';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {islogged, error: loginError} = useSelector((s: RootState) => s.login);

    // If already logged in, redirect to home
    useEffect(()=> {
        if (islogged) {
            navigate('/courses');
        }
        if (loginError == 'token expired') setError("انتهت صلاحية الجلسة")

    })

    const dispatch = useDispatch<AppDispatch>();

    async function handleSubmit() {
        setError('');
        setIsLoading(true);
        try {
            const resultAction = await dispatch(loginUser({ email, password }));
            if (loginUser.fulfilled.match(resultAction)) {
                // successful login
                navigate('/');
            } else {

                const err: any = resultAction.payload || resultAction.error;
                // console.log(loginError)
                if(loginError == 'Invalid credentials') setError("اسم المستخدم او كلمة السر خطأ");
                else
                setError('خطأ بتسجيل الدخول');
            }
        } catch (err: any) {
            setError(err?.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
        
        // Basic validation
        // if (!username || !password) {
        //     setError('Both username and password are required.');
        //     setIsLoading(false);
        //     return;
        // }

        // In a real app, you would dispatch an action to an auth slice here
        // and handle success/failure from an API call.
        // For demonstration, we'll use a timeout and mock credentials.
        // await new Promise(resolve => setTimeout(resolve, 1000));

        // if (username === 'admin' && password === 'password') {
        //     // console.log('Login successful');
        //     // navigate('/courses'); // Redirect to a protected route
        // } else {
        //     setError('Invalid credentials. Please try again.');
        // }

        setIsLoading(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        تسجيل الدخول
                    </h2>
                </div>
                <div className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">البريد الالكتروني</label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                placeholder="البريد الالكتروني"
                            />
                        </div>
                        <div>
                            <label htmlFor="password-address" className="sr-only">كلمة السر</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-200 rounded-md">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            onClick={()=> handleSubmit()}
                            disabled={isLoading}
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}