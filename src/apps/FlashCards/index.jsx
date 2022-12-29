import React from 'react'
import initQuestions from './questions.json'
import CheckboxGroup from '@componentsReact/CheckboxGroup'
import Button from '@componentsReact/Button'
import clsx from 'clsx'
// import // FaExpand,
// FaExpandArrowsAlt,
// FaExpandAlt,
// FaCompressAlt,
// FaCompressArrowsAlt,
// FaCompress,
// FaChevronRight,
// FaChevronLeft,
// FaThumbsDown,
// FaThumbsUp,
// 'react-icons/fa'
// import { RxShuffle } from 'react-icons/rx'
import FaExpand from '@images/Expand'
import FaCompress from '@images/Collapse'
import FaChevronRight from '@images/ChevronRight'
import FaChevronLeft from '@images/ChevronLeft'
import FaThumbsDown from '@images/Expand'
import FaThumbsUp from '@images/Expand'
import RxShuffle from '@images/Shuffle'

const initTags = initQuestions.reduce((allTags, q) => {
  if (q.tags) {
    q.tags.forEach((t) => {
      const plop = allTags.some(({ name }) => name === t)
      if (!plop) {
        allTags.push({
          name: t,
          value: t,
        })
      }
    })
  }

  return allTags
}, [])

const getLsVotes = () => {
  const ls = localStorage.getItem('flashcard')
  return ls ? JSON.parse(ls) : {}
}

const saveLsVotes = (d) => {
  console.log(d)
  localStorage.setItem('flashcard', JSON.stringify(d))
}

const Flashcards = (props) => {
  const [cardIndex, setCardIndex] = React.useState(0)
  const [filters, setFilters] = React.useState([])
  const [questions, setQuestions] = React.useState(initQuestions)
  const [fullScreen, setFullScreen] = React.useState(false)
  const [tags] = React.useState(initTags)

  React.useEffect(() => {
    if (!filters.length) {
      setQuestions(initQuestions)
    } else {
      const filteredQuestions = initQuestions.filter((question) => {
        return question.tags.some((t) => filters.includes(t))
      })

      setCardIndex(0)
      setQuestions(filteredQuestions)
    }
  }, [filters])

  const handleFilter = (checked, value) => {
    if (checked) {
      setFilters([...filters, value])
    } else {
      setFilters(filters.filter((f) => f !== value))
    }
  }

  const shuffle = () => {
    const shuffled = [...questions].sort(() => (Math.random() > 0.5 ? 1 : -1))
    setQuestions(shuffled)
    setCardIndex(0)
  }

  const handleNext = () => {
    if (cardIndex < questions.length - 1) setCardIndex(cardIndex + 1)
  }

  const handlePrev = () => {
    if (cardIndex > 0) setCardIndex(cardIndex - 1)
  }

  const handleUpVote = () => {
    const id = questions[cardIndex].id
    const votes = getLsVotes()

    if (votes[id]) {
      votes[id] = votes[id] + 1
    } else {
      votes[id] = 1
    }

    saveLsVotes(votes)
  }

  const handleDownVote = () => {
    const id = questions[cardIndex].id
    const votes = getLsVotes()

    if (votes[id]) {
      votes[id] = votes[id] === 1 ? 0 : votes[id] - 1
    }

    saveLsVotes(votes)
  }

  const fsClass =
    'fixed top-0 left-0 w-[100vw] h-[100vh] bg-background dark:bg-dm-background'

  return (
    <>
      <div className="mb-2">
        <CheckboxGroup
          label={`Filter: ${filters.join(' | ')}`}
          options={tags}
          value={[]}
          inline
          onChange={(e) => {
            handleFilter(e.target.checked, e.target.value)
          }}
        />
      </div>

      <div className="mb-2">Cards: {questions.length}</div>

      <div className={clsx('flex gap-2 w-[100%]', fullScreen && fsClass)}>
        <CardGutter>
          <Button color="gray" title="Previous Question" onClick={handlePrev}>
            <FaChevronLeft />
          </Button>

          <Button color="crimson" onClick={handleDownVote}>
            <FaThumbsDown />
          </Button>

          <span className="flex-1" />

          <Button color="gray" onClick={shuffle} title="Shuffle Questions">
            <RxShuffle />
          </Button>
        </CardGutter>

        {questions
          .filter((meh, i) => i === cardIndex)
          .map((question) => (
            <Card key={question.id} {...question} />
          ))}

        <CardGutter>
          <Button color="gray" title="Next Question" onClick={handleNext}>
            <FaChevronRight />
          </Button>

          <Button color="kellyGreen" title="Up vote" onClick={handleUpVote}>
            <FaThumbsUp />
          </Button>

          <span className="flex-1" />

          <Button
            color="gray"
            onClick={() => setFullScreen(!fullScreen)}
            title={fullScreen ? 'Compress Cards' : 'Expand Cards'}
          >
            {!fullScreen && <FaExpand />}
            {fullScreen && <FaCompress />}
          </Button>
        </CardGutter>
      </div>
    </>
  )
}

const CardGutter = ({ children }) => (
  <div className="flex flex-col gap-1">{children}</div>
)

const Card = ({ question, answer, tags = [] }) => {
  const [showAnswer, setShowAnswer] = React.useState(false)

  return (
    <button
      onClick={() => setShowAnswer(!showAnswer)}
      style={{ borderRadius: '4px', borderWidth: 1 }}
      className="border-nobel p-2 flex-1 relative"
    >
      {!showAnswer && <h1 className="text-center">{question}</h1>}
      {showAnswer && <p className="text-left">{answer}</p>}

      <small className="flex gap-1 absolute left-1 bottom-1">
        {tags.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </small>
    </button>
  )
}

export default Flashcards
