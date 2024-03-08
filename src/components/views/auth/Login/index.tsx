import React, { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import FormInput from "@/components/UI/Auth/Form";
// component
import AuthLayout from "@/components/layouts/AuthLayout";

const LoginView = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { query } = useRouter();

  const callbackUrl: string = query.callbackUrl
    ? query.callbackUrl.toString()
    : "/auth/register";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target as HTMLFormElement;

    const data = {
      email: form.email.value,
      password: form.password.value,
    };

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (!res?.error) {
        setIsLoading(false);
        form.reset();
        // push(callbackUrl);
      } else {
        setIsLoading(true);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      await signIn("google", { callbackUrl });
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  return (
    <AuthLayout
      linkHref="/auth/register"
      linkTitle="Sudah punya akun login disini "
      title="Login"
    >
      <FormInput
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        handleLoginWithGoogle={handleLoginWithGoogle}
        isLogin={true}
      />
    </AuthLayout>
  );
};

export default LoginView;
