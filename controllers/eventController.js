const accountService = require('../services/accountService')

exports.handleEvent = (req, res) => {
  const { type, destination, origin, amount } = req.body

  if (type === 'deposit') {
    const result = accountService.deposit(destination, amount)
    res.status(201).json(result)
  } else if (type === 'withdraw') {
    const result = accountService.withdraw(origin, amount)
    if (result) {
      res.status(201).json(result)
    } else {
      res.status(404).json(0)
    }
  } else if (type === 'transfer') {
    const result = accountService.transfer(origin, destination, amount)
    if (result) {
      res.status(201).json(result)
    } else {
      res.status(404).json(0)
    }
  } else {
    res.status(400).send('Invalid event type')
  }
}
