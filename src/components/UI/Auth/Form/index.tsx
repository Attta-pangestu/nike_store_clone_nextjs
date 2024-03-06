import React, { FormEventHandler } from "react";
import style from "./index.module.scss";
import { FaGoogle } from "react-icons/fa";
import InputBox from "../Form/InputBox";
import Button from "./Button";
type PropTypes = {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
  isLogin: boolean;
  handleLoginWithGoogle: Function;
};

const FormInput = (props: PropTypes) => {
  const { handleSubmit, isLoading, isLogin, handleLoginWithGoogle } = props;

  const inputAmount: string[] = isLogin
    ? ["email", "password"]
    : ["username", "email", "password"];

  return (
    <form onSubmit={handleSubmit}>
      {inputAmount.map((spec, index) => (
        <InputBox key={index} type={spec} name={spec} />
      ))}

      <Button type="submit">
        {isLoading ? "Loading..." : isLogin ? "Login" : "Register"}
      </Button>
      <Button onClick={() => handleLoginWithGoogle()} type="button">
        {isLoading ? (
          "Loading..."
        ) : isLogin ? (
          <>
            <FaGoogle size={22} /> Login With Google
          </>
        ) : (
          <>
            <FaGoogle size={22} /> Sign Up With Google
          </>
        )}
      </Button>
    </form>
  );
};

export default FormInput;
