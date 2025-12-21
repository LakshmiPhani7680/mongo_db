import { LikeRepository } from "./likes.repository.js";

export class LikeController {
  constructor() {
    this.likeRepository = new LikeRepository();
  }
  async likeProduct(req, res) {
    const { id, type } = req.body;
    try {
      if (type !== "Product" && type !== "Category") {
        return res
          .status(400)
          .json({ success: false, message: "Invalid like type" });
      } else if (type === "Product") {
        this.likeRepository
          .likeProduct(req.user.id, id)
          .then((like) =>
            res
              .status(200)
              .json({ success: true, message: "Product liked", data: like })
          )
          .catch((err) =>
            res.status(500).json({ success: false, message: err.message })
          );
      } else if (type === "Category") {
        this.likeRepository
          .likeCategory(req.user.id, id)
          .then((like) =>
            res
              .status(200)
              .json({ success: true, message: "Category liked", data: like })
          )
          .catch((err) =>
            res.status(500).json({ success: false, message: err.message })
          );
      }
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}
