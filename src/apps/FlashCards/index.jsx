import React from 'react'
import initQuestions from './questions.json'
import CheckboxGroup from '@componentsReact/CheckboxGroup'
import Button from '@componentsReact/Button'
import clsx from 'clsx'
import {
  FaExpand,
  FaExpandArrowsAlt,
  FaExpandAlt,
  FaCompressAlt,
  FaCompressArrowsAlt,
  FaCompress,
  FaChevronRight,
  FaChevronLeft,
} from 'react-icons/fa'
import { RxShuffle } from 'react-icons/rx'

const Flashcards = (props) => {
  const [cardIndex, setCardIndex] = React.useState(0)
  const [filters, setFilters] = React.useState([])
  const [questions, setQuestions] = React.useState(initQuestions)
  const [fullScreen, setFullScreen] = React.useState(false)
  const [tags] = React.useState(
    initQuestions.reduce((allTags, q) => {
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
    }, []),
  )

  const handleFilter = (checked, value) => {
    if (checked) {
      setFilters([...filters, value])
    } else {
      setFilters(filters.filter((f) => f !== value))
    }
  }

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

  const shuffle = () => {
    const shuffled = [...questions].sort(() => (Math.random() > 0.5 ? 1 : -1))
    setQuestions(shuffled)
    setCardIndex(0)
  }

  const fsClass =
    'fixed top-0 left-0 w-[100vw] h-[100vh] bg-background dark:bg-dm-background'

  return (
    <>
      <div>
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
      <br />
      Cards: {questions.length}
      <div className={clsx('flex gap-2 w-[100%]', fullScreen && fsClass)}>
        <div className="flex flex-col gap-1">
          <Button
            title="Previous Question"
            onClick={() => {
              if (cardIndex > 0) setCardIndex(cardIndex - 1)
            }}
          >
            <FaChevronLeft />
          </Button>
          <span className="flex-1" />
          <Button onClick={() => shuffle()} title="Shuffle Questions">
            <RxShuffle />
          </Button>
        </div>
        {questions
          .filter((meh, i) => i === cardIndex)
          .map((question) => {
            return <Card key={question.id} {...question} />
          })}
        <div className="flex flex-col gap-1">
          <Button
            title="Next Question"
            onClick={() => {
              if (cardIndex < questions.length - 1) setCardIndex(cardIndex + 1)
            }}
          >
            <FaChevronRight />
          </Button>
          <span className="flex-1" />
          <Button
            onClick={() => setFullScreen(!fullScreen)}
            title={fullScreen ? 'Compress Cards' : 'Expand Cards'}
          >
            {!fullScreen && <FaExpand />}
            {fullScreen && <FaCompress />}
          </Button>
        </div>
      </div>
    </>
  )
}

const Card = ({ question, answer, tags = [] }) => {
  const [showAnswer, setShowAnswer] = React.useState(false)

  return (
    <button
      onClick={() => setShowAnswer(!showAnswer)}
      style={{ borderRadius: '4px', borderWidth: 1 }}
      className="border-nobel p-2 flex-1"
    >
      {!showAnswer && <h1 className="text-center">{question}</h1>}
      {showAnswer && <p className="text-left">{answer}</p>}
      <small className="flex gap-1">
        {tags.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </small>
    </button>
  )
}

export default Flashcards
