import mongoose from "mongoose";
import Media from "../models/mediaModel.js";

const mediaController = {};

// GET media by user id
mediaController.getMyMediaByUserId = async (req, res) => {
  try {
    const medias = await Media.find({ user_id: req.params.userId })
      .populate("category_id") // populate categories
      .populate("genre_id"); // populate genres
    res.json(medias);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT update My media
mediaController.updateMyMedia = async (req, res) => {
  try {
    const updatedMedia = await Media.findOneAndUpdate(
      { _id: req.params.id, user_id: req.params.userId },
      req.body,
      { new: true }
    );
    if (updatedMedia) {
      res.json(updatedMedia);
    } else {
      res.status(404).json({ message: "Media not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE My media
mediaController.deleteMyMedia = async (req, res) => {
  try {
    const media = await Media.findOne({
      _id: req.params.id,
      user_id: req.params.userId,
    });
    if (media) {
      await Media.deleteOne({ _id: req.params.id });
      res.json({ message: "Deleted media" });
    } else {
      res.status(404).json({ message: "Media not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// // GET media by user id
// mediaController.getMediaByUserId = async (req, res) => {
//   try {
//     const medias = await Media.find({ user_id: req.params.userId })
//       .populate("category_id") // populate categories
//       .populate("genre_id"); // populate genres
//     res.json(medias);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// GET all media
mediaController.getAllMedia = async (req, res) => {
  try {
    const media = await Media.find()
      .populate("category_id")
      .populate("genre_id");
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET media by object id
mediaController.getMediaById = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id)
      .populate("category_id")
      .populate("genre_id");
    if (media == null) {
      return res.status(404).json({ message: "Cannot find media" });
    }
    res.json(media);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// POST new media
mediaController.addMedia = async (req, res) => {
  const media = new Media({
    ...req.body,
    user_id: req.user.userId,
  });
  try {
    const newMedia = await media.save();
    res.status(201).json(newMedia);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// POST bulk media
mediaController.addBulkMedia = async (req, res) => {
  try {
    const mediasWithUserId = req.body.map((media) => {
      const { _id, ...mediaWithoutId } = media; // Remove _id from media
      return {
        ...mediaWithoutId,
        user_id: req.user.userId,
      };
    });
    const newMedias = await Media.insertMany(mediasWithUserId);
    res.status(201).json(newMedias);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update media
mediaController.updateMedia = async (req, res) => {
  try {
    const updatedMedia = await Media.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (updatedMedia) {
      res.json(updatedMedia);
    } else {
      res.status(404).json({ message: "Media not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE media
mediaController.deleteMedia = async (req, res) => {
  try {
    const media = await Media.findOne({ _id: req.params.id });
    if (media) {
      await Media.deleteOne({ _id: req.params.id });
      res.json({ message: "Deleted media" });
    } else {
      res.status(404).json({ message: "Media not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT bulk update media
mediaController.updateBulkMedia = async (req, res) => {
  try {
    const updatedMedias = req.body.map(async (media) => {
      return await Media.findOneAndUpdate({ _id: media._id }, media, {
        new: true,
      });
    });
    const results = await Promise.all(updatedMedias);
    res.json(results);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE bulk media
mediaController.deleteBulkMedia = async (req, res) => {
  try {
    const deletedMedias = req.body.map(async (mediaId) => {
      return await Media.deleteOne({ _id: mediaId });
    });
    await Promise.all(deletedMedias);
    res.json({ message: "Deleted media" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default mediaController;
