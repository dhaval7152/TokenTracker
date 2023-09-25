require("dotenv").config();
const { FetchTransactionDetail,_callFetchTransactionDetail } = require("../repository/index");

exports.hello = async (req, res) => {
  try {
    res.send({ msg: "Hello Test APi" });
  } catch (error) {
    res.send({ status: "fail", message: error.message });
  }
};

exports.getTransaction = async (req, res) => {
  let account = req.params.account;
  _callFetchTransactionDetail(account);
  // FetchTransactionDetail(account);
  res.send("listening to block");
};
