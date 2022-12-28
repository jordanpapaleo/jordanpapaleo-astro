import fs from 'fs'
import path from 'path'
import csv from 'csvtojson'
import { v4 as uuidv4 } from 'uuid'

// Convert a csv file with csvtojson
csv()
  .fromFile('src/pages/tools/flashcards/questions.csv')
  .then((json) => {
    json.forEach((arr) => {
      arr.id = uuidv4()
      if (arr.tags) {
        arr.tags = arr.tags.split('|')
      }
    })

    //when parse finished, result will be emitted here.
    // console.log(json)

    return json
  })
  .then((mappedJson) => {
    var mappedJson = JSON.stringify(mappedJson, null, 2)

    fs.writeFile(
      'src/pages/tools/flashcards/questions.json',
      mappedJson,
      'utf8',
      (err) => {
        if (err) {
          console.log('An error occured while writing JSON Object to File.')
          throw err
        }

        console.log('JSON file has been saved.')
      },
    )
  })
  .catch((err) => {
    console.log(err)
  })
