import store from "../redux/store";

const useRoleCheck = (userRole) => {
  const state = store.getState();
  const { authUser } = state.auth;
 const hasUserRole = authUser && authUser?.role && authUser?.role === userRole;
  return !!hasUserRole;
};

export default useRoleCheck;