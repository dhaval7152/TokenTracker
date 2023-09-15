require("dotenv").config();

const errorMessage = (res, error) => {
  return res.status(400).json({ status: "fail", message: error.message });
};

exports.hello = async (req, res) => {
  try {
    res.send({ msg: "Hello Test APi" });
  } catch (error) {
    res.send({ status: "fail", message: error.message });
  }
};
