import {
  updateUserPasswordRepo,
  userLoginRepo,
  userRegisterationRepo,
} from "./user.repository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { customErrorHandler } from "../../middlewares/errorHandler.js";

export const userRegisteration = async (req, res, next) => {
  try {
    let { password } = req.body;
    password = await bcrypt.hash(password, 12);

    const resp = await userRegisterationRepo({ ...req.body, password });

    if (!resp.success) {
      return next(
        new customErrorHandler(resp.error.statusCode, resp.error.msg)
      );
    }

    res.status(201).json({
      success: true,
      msg: "user registration successful",
      res: resp.res,
    });
  } catch (err) {
    next(err);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const resp = await userLoginRepo(req.body);

    if (!resp.success) {
      return next(
        new customErrorHandler(resp.error.statusCode, resp.error.msg)
      );
    }

    const token = jwt.sign({ _id: resp.res._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("jwtToken", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .json({
        success: true,
        msg: "user login successful",
        token,
      });
  } catch (err) {
    next(err);
  }
};

export const updateUserPassword = async (req, res, next) => {
  try {
    let { newPassword } = req.body;

    // newPassword = await bcrypt.hash(newPassword, 12);

    const resp = await updateUserPasswordRepo(req._id, newPassword);

    if (!resp.success) {
      return next(
        new customErrorHandler(resp.error.statusCode, resp.error.msg)
      );
    }

    res.status(201).json({
      success: true,
      msg: "password updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const userLogout = (req, res) => {
  res
    .clearCookie("jwtToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .json({ success: true, msg: "logout successful" });
};
