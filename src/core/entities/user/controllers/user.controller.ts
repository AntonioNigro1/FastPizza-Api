import { Request, Response } from "express";
import { IAuthenticateUser, IUser } from "../interface/user";

const UserServices = require("../services/user.services");

module.exports = {
  async create(req: Request, res: Response) {
    try {
      const { body } = req;
      body as IUser;
      const response = await UserServices.create(body);
      res.status(response.status).send(response);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  },
  async authenticate(req: Request, res: Response) {
    try {
      const { body } = req;
      body as IAuthenticateUser;
      const response = await UserServices.authenticate(body);
      res.status(response.status).send(response);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  },
  async update(req: Request, res: Response) {
    try {
      const { params, body } = req;
      const response = await UserServices.update(params.id, body);
      res.status(response.status).send(response);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  },
  async delete(req: Request, res: Response) {
    try {
      const { params } = req;
      const response = await UserServices.delete(params.id, res);
      res.status(response.status).send(response);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  },
  async getUser(req: Request & { userId: string }, res: Response) {
    try {
      const { userId } = req;
      const response = await UserServices.getUser(userId);
      res.status(response.status).send(response);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  },
  async getUsers(req: Request, res: Response) {
    try {
      const response = await UserServices.getUsers();
      res.status(response.status).send(response);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  },
};
