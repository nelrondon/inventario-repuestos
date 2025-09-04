import dbLocal from "db-local";
import { hash, compare } from "bcrypt";

import { validateAuth } from "../schemas/auth.schema.js";
import { getErrorsZod } from "../libs/utils.js";

import { createAccessToken, verifyAccessToken } from "../libs/jwt.js";

const { Schema } = new dbLocal({ path: "./db" });

const User = Schema("Users", {
  _id: { type: String, require: true },
  username: { type: String, require: true },
  password: { type: String, require: true },
});

export class AuthRepository {
  static async login(req, res) {
    const result = validateAuth(req.body);
    if (!result.success) {
      const errors = getErrorsZod(result);
      return res.status(400).json({ errors });
    }

    const { username, password } = req.body;
    const existUser = User.findOne({ username });
    if (!existUser) {
      return res.status(400).json({ errors: ["El usuario no existe"] });
    }

    const isMatch = await compare(password, existUser.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: ["Usuario o Contraseña incorrectas"] });
    }

    const token = await createAccessToken({ id: existUser._id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({
      id: existUser._id,
      username: existUser.username,
    });
  }

  static async register(req, res) {
    const result = validateAuth(req.body);

    if (!result.success) {
      const errors = getErrorsZod(result);
      return res.status(400).json({ errors });
    }

    const { username, password } = req.body;

    const existUser = User.findOne({ username });

    if (existUser) {
      return res.status(400).json({ errors: ["El usuario ya existe"] });
    }
    const hashPassword = await hash(password, 10);
    const newUser = User.create({ username, password: hashPassword }).save();

    const token = await createAccessToken({ id: newUser._id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({
      id: newUser._id,
      username: newUser.username,
    });
  }

  static async verify(req, res) {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ errors: ["No autorizado"] });
    }
    try {
      const user = await verifyAccessToken(token);
      const existUser = User.findOne({ _id: user.id });
      if (!existUser) {
        return res.status(401).json({ errors: ["No autorizado"] });
      }

      return res.json({
        id: existUser._id,
        username: existUser.username,
      });
    } catch (error) {
      return res.status(401).json({ errors: ["No autorizado"] });
    }
  }

  static async logout(req, res) {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(0),
    });

    return res.status(200).json({ message: "Logout exitoso" });
  }
}
