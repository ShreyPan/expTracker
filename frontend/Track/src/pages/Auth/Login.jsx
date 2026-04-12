import React, { useState, useContext } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showProgressOverlay, setShowProgressOverlay] = useState(false);

    const { updateUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!password) {
            setError("Please enter the password");
            return;
        }

        setError("");
        setIsSubmitting(true);

        const overlayTimer = setTimeout(() => {
            setShowProgressOverlay(true);
        }, 600);

        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password
            })
            const { token, accessToken, user } = response.data;
            const authToken = token || accessToken;

            if (authToken) {
                localStorage.setItem("token", authToken);
                updateUser(user);
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
            else {
                setError("Something went wrong. Please try again");
            }
        } finally {
            clearTimeout(overlayTimer);
            setShowProgressOverlay(false);
            setIsSubmitting(false);
        }
    }

    return (
        <AuthLayout showProgressOverlay={showProgressOverlay}>
            <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Welcome back</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">
                    Please enter your login details to login
                </p>

                <form onSubmit={handleLogin} aria-busy={isSubmitting}>
                    <Input
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        label="Email Address"
                        placeholder="abc@example.com"
                        type="text"
                        disabled={isSubmitting}
                    />

                    <Input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        label="Password"
                        placeholder="Min 6 Characters"
                        type="password"
                        disabled={isSubmitting}
                    />

                    {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

                    <button type="submit" className="btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="auth-spinner" />
                                Signing in...
                            </span>
                        ) : (
                            'LOGIN'
                        )}
                    </button>

                    <p className="text-[13px] text-slate-800 mt-3">
                        Don't have an account?{" "}
                        <Link className={`font-medium text-[#875cf5] underline ${isSubmitting ? 'pointer-events-none opacity-60' : ''}`} to="/signup">
                            Signup
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
}

export default Login
