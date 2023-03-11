import { v4 as uuidv4 } from 'uuid'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import fs from 'fs'
import path from 'path'
import lodash from 'lodash'

const app = express()
const port = 4210
const jsonParser = bodyParser.json()

app.use(cors())

app.get('/', (req, res) => res.send('NASM'))

const readFile = (req, res, fileName) => {
  fs.readFile(fileName, 'utf8', (err, jsonString) => {
    if (err) {
      console.log(err)
      res.status(500).send({
        message: 'Db Read fail',
        err,
      })
    }

    try {
      const dbQuestions = JSON.parse(jsonString)
      res.status(200).send(jsonString)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        message: 'Parse JSON error',
        err,
      })
    }
  })
}

const updateDb = (req, res, fileName) => {
  fs.readFile(fileName, 'utf8', (err, jsonString) => {
    if (err) {
      console.log(err)
      res.status(500).send({
        message: 'Db Read fail',
        err,
      })
    }

    try {
      const newQuestions = req.body
      const dbQuestions = JSON.parse(jsonString)
      const allQuestions = [...dbQuestions]

      newQuestions.forEach(({ question: q1 }, i) => {
        const index = allQuestions.findIndex(({ question: q2 }) => q1 === q2)
        if (index !== -1) {
          const updatedQuestion = allQuestions[index]

          // merge tags then get unique
          updatedQuestion.tags = lodash.uniq([
            ...updatedQuestion.tags,
            ...newQuestions[i].tags,
          ])

          updatedQuestion.missed = newQuestions[i].missed

          allQuestions[index] = updatedQuestion
        } else {
          allQuestions.push({
            ...newQuestions[i],
            id: uuidv4(),
          })
        }
      })

      fs.writeFile(fileName, JSON.stringify(allQuestions, null, 2), (err) => {
        if (err) {
          console.log(err)
          res.status(500).send({
            message: 'Write error',
            err,
          })
        } else {
          console.log('Success ' + new Date())
          res.status(200).send({
            message: 'Success',
          })
        }
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        message: 'Parse JSON error',
        err,
      })
    }
  })
}

app.get('/vocab', (req, res) => {
  readFile(req, res, './db/vocab.json')
})

app.post('/vocab', jsonParser, (req, res) => {
  updateDb(req, res, './db/vocab.json')
})

app.get('/quiz', (req, res) => {
  readFile(req, res, './db/quiz.json')
})

app.post('/quiz', jsonParser, (req, res) => {
  updateDb(req, res, './db/quiz.json')
})

app.listen(port, () => console.log(`CORS-enabled Listening on port ${port}!`))
