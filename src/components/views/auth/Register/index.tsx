import React, { FormEvent } from "react";
import style from "../Auth.module.scss";
import Link from "next/link";

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

    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseJSON = await response.json();

      console.log(responseJSON);
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

  return (
    <section className={style.wrapper}>
      <div className={style.background}>
        <div className={style.background_shape}></div>
        <div className={style.background_shape}></div>
      </div>
      <div className={style.register}>
        <h1 className={style.register_title}>Register</h1>
        <div className={style.register_form}>
          <form onSubmit={handleSubmit}>
            <div className={style.register_inputBox}>
              <label className={style.register_label}>Username</label>
              <input
                className={style.register_input}
                type="text"
                name="username"
                placeholder="Username"
              />
            </div>
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
              {isLoading ? "Loading..." : "Register"}
            </button>
          </form>
        </div>
        <div>
          <p>
            Sudah punya akun? Masuk <Link href="/auth/login">disini</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterView;
