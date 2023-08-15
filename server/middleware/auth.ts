import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const SECRET_ADMIN = "superS3cr3ta6m1n";
const SECRET_USER = "superS3cr3tus3r";

const generateJwt = (
  payload: string | object | Buffer,
  secretKey: jwt.Secret
) => jwt.sign(payload, secretKey, { expiresIn: "1h" });

const authenticateJwt = (
  secretKey: string,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, secretKey, (err, jwtPayload) => {
    if (err || !jwtPayload || typeof jwtPayload === "string") {
      return res.sendStatus(403);
    }

    req.headers.username = jwtPayload.username;
    next();
  });
};

export const generateJwtUser = ({ username }: { username: string }) =>
  generateJwt({ username }, SECRET_USER);
export const generateJwtAdmin = ({ username }: { username: string }) =>
  generateJwt({ username }, SECRET_ADMIN);

export const authenticateUser = (...args: [Request, Response, NextFunction]) =>
  authenticateJwt(SECRET_USER, ...args);
export const authenticateAdmin = (...args: [Request, Response, NextFunction]) =>
  authenticateJwt(SECRET_ADMIN, ...args);
