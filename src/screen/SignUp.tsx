import { gql, useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import FormError from "../components/auth/FormError";
import PageTitle from "../components/PageTitle";
import {
  createAccount,
  createAccountVariables,
} from "../__generated__/createAccount";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $name: String!
    $password: String!
  ) {
    createAccount(
      username: $username
      email: $email
      name: $name
      password: $password
    ) {
      ok
      error
    }
  }
`;

interface IForm {
  result: string;
  passwordConfirm: string;
}

function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    formState: { isValid, errors },
  } = useForm<createAccountVariables & IForm>({ mode: "onChange" });

  const onCompleted = (data: createAccount) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) return setError("result", { message: error || "" });
    navigate("/login", { state: { username, password } });
  };

  const [createAccount, { loading }] = useMutation<
    createAccount,
    createAccountVariables
  >(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const onValid: SubmitHandler<createAccountVariables & IForm> = ({
    username,
    name,
    email,
    password,
    passwordConfirm,
  }) => {
    if (loading) return;
    if (password !== passwordConfirm)
      return setError(
        "password",
        { message: "Password Confirm Wrong" },
        { shouldFocus: true }
      );
    createAccount({
      variables: { username, email, name, password: String(password) },
    });
  };
  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <form onSubmit={handleSubmit(onValid)}>
        <input
          placeholder="Username between 4-20"
          {...register("username", {
            required: "Required",
            minLength: { value: 4, message: "more than 4" },
            maxLength: { value: 16, message: "less than 16" },
          })}
          onFocus={() => clearErrors()}
        />
        <FormError text={errors?.username?.message || null} />

        <input
          placeholder="Email"
          {...register("email", {
            required: "Required",
            maxLength: 100,
          })}
          type="email"
          onFocus={() => clearErrors()}
        />
        <FormError text={errors?.email?.message || null} />

        <input
          placeholder="Name"
          {...register("name", {
            required: "Required",
            minLength: { value: 4, message: "more than 4" },
            maxLength: { value: 20, message: "less than 20" },
          })}
          onFocus={() => clearErrors()}
        />
        <FormError text={errors?.name?.message || null} />

        <input
          placeholder="Password between 6-20"
          {...register("password", {
            required: "Required",
            maxLength: { value: 20, message: "less than 20" },
            minLength: { value: 6, message: "More than 6" },
          })}
          type="password"
          onFocus={() => clearErrors()}
        />
        <FormError text={errors?.password?.message || null} />

        <input
          placeholder="Password Confirm"
          {...register("passwordConfirm", {
            required: "Required",
          })}
          onFocus={() => clearErrors()}
          type="password"
        />
        <FormError text={errors?.passwordConfirm?.message || null} />

        <input type="submit" value="Sign Up" disabled={!isValid || loading} />
      </form>
      <FormError text={errors?.result?.message || null} />
    </AuthLayout>
  );
}

export default SignUp;
