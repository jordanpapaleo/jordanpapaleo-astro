import { v4 as uuidv4 } from 'uuid'

console.log(`
  {
    "question": "",
    "answer": "",
    "tags": ["fav"],
    "id": "${uuidv4()}"
  }
`)
