import React, { FormEvent } from "react";
import FormInput from "@/components/UI/Auth/Form";
import { signIn } from "next-auth/react";
import AuthLayout from "@/components/layouts/AuthLayout";
import authServices from "@/services/fetching";
const RegisterView = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target as HTMLFormElement;
    const data = {
      name: form.username.value,
      email: form.email.value,
      password: form.password.value,
    };
    console.log(form.username.value);
    console.log(form.username.value);

    try {
      const response = await authServices.registerAuth(data);
      if (response.status === 200) {
        setIsLoading(false);
        form.reset();
      } else {
        throw new Error("Gagal mendaftar pengguna");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };


  const handleRegisterWithGoogle = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  return (
    <AuthLayout
      linkHref="/auth/login"
      linkTitle="Belum punya akun daftar "
      title="Register"
    >
      <FormInput
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        handleLoginWithGoogle={handleRegisterWithGoogle}
        isLogin={false}
      />
    </AuthLayout>

  );
};

export default RegisterView;
