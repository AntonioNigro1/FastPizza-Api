import { Request, Response } from "express";
const AdServices = require("../services/ad.services");

module.exports = {
  async create(req: Request, res: Response) {
    try {
      const { name, description, user, price, ingredients } = req.body;
      console.log(req);
      if (req.file) {
        const imagePath = req.file.path;
        const newAd = {
          name,
          imagePath,
          description,
          user,
          price,
          ingredients,
        };
        const response = await AdServices.create(newAd);
        res.status(response.status).send(response);
      }
    } catch (error) {
      res.status(500).send({ message: error });
    }
  },
  async getAds(req: Request, res: Response) {
    try {
      const response = await AdServices.getAds();
      res.status(response.status).send(response);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  },
  async filterAds(req: Request, res: Response) {
    try {
      console.log(req.body);
      const { filter } = req.body;
      const response = await AdServices.filterAds(filter);
      res.status(response.status).send(response);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  },
  async like(req: Request, res: Response) {
    try {
      const { adId } = req.body;
      const response = await AdServices.like(adId);
      res.status(response.status).send(response);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  },
  async rmvLike(req: Request, res: Response) {
    try {
      const { adId } = req.body;
      const response = await AdServices.rmvLike(adId);
      res.status(response.status).send(response);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  },
  async mostLiked(req: Request, res: Response) {
    try {
      const response = await AdServices.mostLiked();
      res.status(response.status).send(response);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  },
  async comment(req: Request, res: Response) {
    try {
      const { adId, comment } = req.body;
      const response = await AdServices.comment(adId, comment);
      res.status(response.status).send(response);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  },

  async getComments(req: Request, res: Response) {
    try {
      const { params } = req;
      const response = await AdServices.getComments(params.id);
      res.status(response.status).send(response);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  },

  async rmvComment(req: Request, res: Response) {
    try {
      const { adId, commentId } = req.body;
      const response = await AdServices.rmvComment(adId, commentId);
      res.status(response.status).send(response);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  },
  async likeComment(req: Request, res: Response) {
    try {
      const { adId, commentId } = req.body;
      const response = await AdServices.likeComment(adId, commentId);
      res.status(response.status).send(response);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  },
  async rmvLikeComment(req: Request, res: Response) {
    try {
      const { adId, commentId } = req.body;
      const response = await AdServices.rmvCommentLike(adId, commentId);
      res.status(response.status).send(response);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  },
  async listCommentByLike(req: Request, res: Response) {
    try {
      const { params } = req;
      const response = await AdServices.listCommentByLike(params.id);
      res.status(response.status).send(response);
    } catch (error) {
      res.status(500).send({ message: error });
    }
  },
};
