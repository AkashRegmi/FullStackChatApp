import jwt from "jsonwebtoken";
export const generateAccessToken = ({ id }) => {
  if (!process.env.JWT_ACCESS_TOKEKN_SECRET) {
    throw new Error("Jwt access token is missing ");
  }
  const accessToken = jwt.sign({ id }, process.env.JWT_ACCESS_TOKEKN_SECRET, {
    expiresIn: "1d",
  });
  return accessToken;
};

export const generateRefereshToken = ({ id }) => {
  if (!process.env.JWT_REFRESH_TOKEKN_SECRET) {
    throw new Error("Jwt refresh token is missing ");
  }
  const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH_TOKEKN_SECRET, {
    expiresIn: "8d",
  });
  return refreshToken;
};
