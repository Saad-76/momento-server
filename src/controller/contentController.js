const contentService = require("../services/contentService");

const getAllPosts = async (req, res) => {
  try {
    const resp = await contentService.existingPosts();
    return res
      .status(200)
      .send({ messgae: "Content sent Sucessfully", posts: resp.posts });
  } catch (error) {
    return res.send({ message: "Something went wrong", status: 500 });
  }
};

module.exports = {
  getAllPosts,
};
