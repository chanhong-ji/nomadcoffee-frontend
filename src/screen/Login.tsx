import { gql, useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserLogin } from "../apollo";
import AuthLayout from "../components/auth/AuthLayout";
import FormError from "../components/auth/FormError";
import PageTitle from "../components/PageTitle";
import { login, loginVariables } from "../__generated__/login";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      error
      token
    }
  }
`;

interface IForm {
  result: string;
}

function Login() {
  const location: any = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { isValid, errors },
  } = useForm<loginVariables & IForm>({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username,
      password: location?.state?.password,
    },
  });

  const onCompleted = (data: login) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) return setError("result", { message: error || "" });
    if (token) {
      getUserLogin(token || "");
      navigate("/");
    }
  };

  const [login, { loading }] = useMutation<login, loginVariables>(
    LOGIN_MUTATION,
    { onCompleted }
  );

  const onValid: SubmitHandler<loginVariables> = ({ username, password }) => {
    if (loading) return;
    login({ variables: { username, password: String(password) } });
  };

  return (
    <AuthLayout>
      <PageTitle title="Login" />
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

        <input type="submit" value="Login" disabled={!isValid || loading} />
      </form>
      <FormError text={errors?.result?.message || null} />
    </AuthLayout>
  );
}

export default Login;
