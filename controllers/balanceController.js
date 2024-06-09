const accountService = require('../services/accountService')

exports.getBalance = (req, res) => {
  const accountId = req.query.account_id
  const balance = accountService.getBalance(accountId)

  if (balance !== null) {
    res.status(200).json(balance)
  } else {
    res.status(404).json(0)
  }
}
