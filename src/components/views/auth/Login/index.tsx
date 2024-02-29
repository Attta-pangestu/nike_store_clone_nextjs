import React, { FormEvent } from "react";
import Link from "next/link";
import style from "../Auth.module.scss";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

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
        redirect: true,
        email: data.email,
        password: data.password,
        callbackUrl,
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

  return (
    <section className={style.wrapper}>
      <div className={style.background}>
        <div className={style.background_shape}></div>
        <div className={style.background_shape}></div>
      </div>
      <div className={style.register}>
        <h1 className={style.register_title}>Login</h1>
        <div className={style.register_form}>
          <form onSubmit={handleSubmit}>
            <div className={style.register_inputBox}>
              <label className={style.register_label}>Email</label>
              <input
                className={style.register_input}
                type="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className={style.register_inputBox}>
              <label className={style.register_label}>Password</label>
              <input
                className={style.register_input}
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <button type="submit" className={style.register_button}>
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
        <div>
          <p>
            Belum punya akun? Daftar <Link href="/auth/register">disini</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginView;
