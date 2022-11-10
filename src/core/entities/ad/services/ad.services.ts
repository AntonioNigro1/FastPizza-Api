import { IAds, Icomments } from "../interface/ad";
import { verFilterString } from "../utils/verFilter";
const Ad = require("../models/Ad");

module.exports = {
  async create(data: IAds) {
    const adInstance = new Ad({ ...data });
    const response = await adInstance.save();
    return {
      data: response,
      success: true,
      message: "Ad published successfuly",
      status: 200,
    };
  },
  async getAds() {
    try {
      const response = await Ad.find({});
      if (response.length == 0) {
        return { success: false, data: null, status: 400 };
      }
      return { success: true, data: response, status: 200 };
    } catch (error) {
      return { success: false, data: null, status: 400 };
    }
  },
  async filterAds(data: string) {
    try {
      let response;
      verFilterString(data)
        ? (response = await Ad.find({ ingredients: data }))
        : (response = await Ad.find({ price: { $lte: data } }));
      if (response.length != 0) {
        return {
          success: true,
          message: "Filter applied",
          status: 200,
          data: response,
        };
      }
      return {
        sucess: false,
        message: "Failed to aply filter",
        status: 400,
        data: null,
      };
    } catch (error) {
      return { success: false, data: null, status: 400 };
    }
  },
  async like(id: string) {
    try {
      const response = await Ad.findByIdAndUpdate(
        { _id: id },
        { $inc: { likes: 1 } },
        { returnDocument: "after" }
      );
      if (response) {
        return {
          success: true,
          message: "Ad liked successfuly",
          status: 200,
          data: response,
        };
      } else {
        return {
          success: false,
          message: "Ad not found",
          status: 400,
          data: null,
        };
      }
    } catch (error) {
      return { success: false, message: error, status: 400 };
    }
  },
  async rmvLike(id: string) {
    try {
      const data = await Ad.findById({ _id: id }, ["likes"]);
      if (data.likes > 0) {
        const response = await Ad.findByIdAndUpdate(
          { _id: id },
          { $inc: { likes: 1 * -1 } },
          { returnDocument: "after" }
        );
        return {
          success: true,
          message: "Like removed successfuly",
          status: 200,
          data: response,
        };
      } else if (data.likes == 0) {
        return {
          sucess: false,
          message: "No like to remove",
          status: 400,
        };
      } else {
        return {
          success: false,
          message: "Ad not found",
          status: 400,
        };
      }
    } catch (error) {
      return { success: false, message: error, status: 400 };
    }
  },
  async mostLiked() {
    try {
      const response = await Ad.find().sort({ likes: -1 }).limit(1);
      if (response) {
        return {
          success: true,
          message: "Most liked ad found successfuly",
          status: 200,
          data: response,
        };
      }
      return {
        success: false,
        message: "Couldnt find ad",
        status: 400,
        data: response,
      };
    } catch (error) {
      return { success: false, message: error, status: 400 };
    }
  },
  async comment(id: string, data: string) {
    try {
      const commentInstance = {
        comment: data,
      };
      const response = await Ad.updateOne(
        { _id: id },
        { $push: { comments: commentInstance } }
      );
      if (response.modifiedCount !== 0) {
        return {
          success: true,
          message: "Comment added successfuly",
          status: 200,
          data: response,
        };
      }
    } catch (error) {
      return { success: false, message: "Ad not found", status: 400 };
    }
  },
  async getComments(id: string) {
    try {
      const response = await Ad.findById({ _id: id }, ["comments"]);
      return {
        success: true,
        message: "Comments found",
        status: 200,
        data: response,
      };
    } catch (error) {
      return { success: false, message: "Ad not found", status: 400 };
    }
  },
  async rmvComment(adId: string, commentId: string) {
    try {
      const response = await Ad.updateOne(
        { _id: adId },
        { $pull: { comments: { _id: commentId } } }
      );
      if (response.modifiedCount !== 0) {
        return {
          success: true,
          message: "Comment removed successfuly",
          status: 200,
          data: response,
        };
      } else {
        return {
          success: false,
          message: "Comment not found",
          status: 400,
          data: null,
        };
      }
    } catch (error) {
      return { success: false, message: error, status: 400 };
    }
  },
  async likeComment(adId: string, commentId: string) {
    try {
      const response = await Ad.findOneAndUpdate(
        { _id: adId, "comments._id": commentId },
        { $inc: { "comments.$.likes": 1 } },
        { returnDocument: "after" }
      );
      if (response) {
        return {
          success: true,
          message: "Liked comment successfuly",
          status: 200,
          data: response,
        };
      }
      return {
        success: false,
        message: "Something went wrong",
        status: 400,
        data: response,
      };
    } catch (error) {
      return { success: false, message: error, status: 400 };
    }
  },
  async rmvCommentLike(adId: string, commentId: string) {
    try {
      let likes = 0;
      await Ad.findOne({ _id: adId }).then(function (doc: any) {
        doc.comments.forEach((element: any) => {
          if (element._id.toString() === commentId) likes = element.likes;
          if (element._id === commentId) likes = element.likes;
        });
      });
      if (likes > 0) {
        const response = await Ad.findOneAndUpdate(
          { _id: adId, "comments._id": commentId },
          { $inc: { "comments.$.likes": -1 } },
          { returnDocument: "after" }
        );
        if (response) {
          return {
            success: true,
            message: "Like removed from comment successfuly",
            status: 200,
            data: response,
          };
        }
        return {
          success: false,
          message: "Something went wrong",
          status: 400,
          data: response,
        };
      } else {
        return {
          success: false,
          message: "No likes to remove",
          status: 404,
        };
      }
    } catch (error) {
      return { success: false, message: error, status: 400 };
    }
  },
  async listCommentByLike(adId: string) {
    try {
      let data;
      await Ad.findById({ _id: adId }, ["comments"]).then(function (doc: any) {
        data = doc.comments;
        data.sort((a: Icomments, b: Icomments) => (a.likes > b.likes ? -1 : 1));
      });
      if (data) {
        return {
          success: true,
          message: "Sorted comments by likes",
          status: 200,
          data: data,
        };
      }
      return {
        success: false,
        message: "Something went wrong",
        status: 400,
      };
    } catch (error) {
      return { success: false, message: "Couldnt find ad", status: 400 };
    }
  },
};
