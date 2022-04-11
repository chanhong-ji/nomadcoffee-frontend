import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { getUserLogout, isLoggedInVar } from "../apollo";
import { me } from "../__generated__/me";

const ME = gql`
  query me {
    me {
      id
      username
      avatarURL
    }
  }
`;

function useUser() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useQuery<me>(ME, { skip: !isLoggedIn });
  useEffect(() => {
    if (data?.me === null) getUserLogout();
  }, [data]);
  return data;
}

export default useUser;
