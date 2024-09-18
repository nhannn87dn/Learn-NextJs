"use client";
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from "next-auth/react";
import { ChangeEvent, FormEvent,  useState } from "react";


type FormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/customers';
  const [msg, setMsg] = useState('');
  const router = useRouter()



  const [loading, setLoading] = useState({
    emailLoading: false,
    googleLoading: false,
    facebookLoading: false
  });


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setLoading({
      ...loading,
      emailLoading: true,
    });

    const resSignIn = await signIn("credentials", {
      redirect: false, // tắt tự động chuyển, để handle lỗi login
      email: formData.email,
      password: formData.password,
      callbackUrl: callbackUrl
    });

    console.log(resSignIn);
    if (!resSignIn?.error) {
      setLoading({
        ...loading,
        emailLoading: false,
      });
      setMsg('Login thành công !');
      router.push(callbackUrl);
    } else {
      setLoading({
        ...loading,
        emailLoading: false,
      });
      setMsg('invalid email or password');
    }
  };

  return (
    <div className="flex max-w-[400px] mx-auto min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {msg !== '' && <p className="py-3 my-4 text-orange-500">{msg}</p>}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          type="text"
          autoComplete="off"
          required
          value={formData.email || ""}
          onChange={handleChange}
          className="w-full"
        />

        <input
          placeholder="Password"
          name="password"
          type="password"
          autoComplete="off"
          required
          value={formData.password || ""}
          onChange={handleChange}
          className="w-full"
        />

    <button className="w-full" type="submit" disabled={loading.emailLoading}>
        {loading.emailLoading ? 'SignInning...' : 'Sign In'}
      </button>
      </form>
    </div>
  );
};

export default LoginForm;
