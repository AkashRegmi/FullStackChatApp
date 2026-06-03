import { jwtDecode } from "jwt-decode";

export const currentUser = () => {
  const token = localStorage.getItem("accessToken");
  
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch (error) {
    console.log("Invalid Token", error.message);
    return null;
  }
};
