import express from 'express'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

let accounts = {}

app.get('/', (req, res) => {
  res.send('hello ebanx')
})

app.post('/reset', (req, res) => {
  accounts = {}
  res.status(200).send('OK')
})

app.get('/balance', (req, res) => {
  const { account_id } = req.query
  if (accounts[account_id]) {
    res.status(200).send(accounts[account_id].balance.toString())
  } else {
    res.status(404).send('0')
  }
})

app.post('/event', (req, res) => {
  const { type, origin, destination, amount } = req.body

  if (type === 'deposit') {
    if (!accounts[destination]) {
      accounts[destination] = { balance: 0 }
    }
    accounts[destination].balance += amount
    res
      .status(201)
      .send({
        destination: {
          id: destination,
          balance: accounts[destination].balance,
        },
      })
  } else if (type === 'withdraw') {
    if (!accounts[origin]) {
      res.status(404).send('0')
    } else {
      accounts[origin].balance -= amount
      res
        .status(201)
        .send({ origin: { id: origin, balance: accounts[origin].balance } })
    }
  } else if (type === 'transfer') {
    if (!accounts[origin]) {
      res.status(404).send('0')
    } else {
      if (!accounts[destination]) {
        accounts[destination] = { balance: 0 }
      }
      accounts[origin].balance -= amount
      accounts[destination].balance += amount
      res.status(201).send({
        origin: { id: origin, balance: accounts[origin].balance },
        destination: {
          id: destination,
          balance: accounts[destination].balance,
        },
      })
    }
  } else {
    res.status(400).send('Invalid event type')
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

