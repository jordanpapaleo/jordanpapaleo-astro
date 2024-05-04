import React from 'react'
// import quiz from './db/quiz.json'
// import vocab from './db/vocab.json'
// import fav from './db/fav.json'
import CheckboxGroup from '@componentsReact/CheckboxGroup'
import Button from '@componentsReact/Button'
import clsx from 'clsx'
import ExpandIcon from '@images/Expand'
import CompressIcon from '@images/Collapse'
import ChevronRightIcon from '@images/ChevronRight'
import ChevronLeftIcon from '@images/ChevronLeft'
import StarIcon from '@images/Star'
import OutlineStarIcon from '@images/OutlineStar'
import ShuffleIcon from '@images/Shuffle'
import { disableScroll, enableScroll } from '@common/scrollHandler'
// import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

const localQuestions = [
  // ...fav,
  // ...vocab, ...quiz,
]

const getUrl = (local) =>
  local ? 'http://localhost:3002' : 'https://jp-api-v2.vercel.app'

const Flashcards = (props) => {
  const [loading, setLoading] = React.useState(true)
  const [questions, setQuestions] = React.useState([])
  const [vocabQuestions, setVocabQuestions] = React.useState([])
  const [quizQuestions, setQuizQuestions] = React.useState([])
  const [cardIndex, setCardIndex] = React.useState(0)
  const [filterVocab, setFilterVocab] = React.useState(false)
  const [filterQuizes, setFitlerQuizes] = React.useState(false)
  const [fullScreen, setFullScreen] = React.useState(false)
  const [favorites, setFavorites] = React.useState([])
  const [filters, setFilters] = React.useState([])
  const [filterFavorites, setFilterFavorites] = React.useState(false)
  const [filterCerts, setFilterCerts] = React.useState([])

  React.useEffect(() => {
    const favs = localStorage.getItem('fc_favorites')
    setFavorites(favs ? JSON.parse(favs) : [])

    const url = getUrl(false)

    Promise.all([
      fetch(`${url}/api/flashcards/vocab`).then((res) => res.json()),
      fetch(`${url}/api/flashcards/quiz`).then((res) => res.json()),
    ])
      .then(([vocabRes, quizRes]) => {
        console.log({ vocabRes, quizRes })
        setVocabQuestions(vocabRes)
        setQuizQuestions(quizRes)
        setQuestions([...vocabRes, ...quizRes])
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  React.useEffect(() => {
    localStorage.setItem('fc_favorites', JSON.stringify(favorites))
  }, [favorites])

  React.useEffect(() => {
    let filteredQuestions = [...vocabQuestions, ...quizQuestions]

    // Basic question type filtering
    if ((filterVocab && filterQuizes) || (!filterVocab && !filterQuizes)) {
      // do nothing as this is a non filtering condition
    } else if (filterVocab) {
      filteredQuestions = vocabQuestions
    } else if (filterQuizes) {
      filteredQuestions = quizQuestions
    }

    console.log(filterCerts)
    if (filterCerts.length === 0 || filterCerts.length === 3) {
      // do nothing as this is a non filtering condition
    } else if (filterCerts.length > 0) {
      filteredQuestions = filteredQuestions.filter((question) => {
        return filterCerts.includes(question.cert)
      })
    }

    setQuestions(filteredQuestions)
  }, [filterVocab, filterQuizes, filterCerts, filterFavorites])

  React.useEffect(() => {
    if (fullScreen) {
      disableScroll()
    } else {
      enableScroll()
    }
  }, [fullScreen])

  const shuffle = () => {
    const shuffled = [...questions].sort(() => (Math.random() > 0.5 ? 1 : -1))
    setQuestions(shuffled)
    setCardIndex(0)
  }

  const handleNext = () => {
    if (cardIndex < questions.length - 1) {
      setCardIndex(cardIndex + 1)
    } else {
      setCardIndex(0)
    }
  }

  const handlePrev = () => {
    if (cardIndex > 0) {
      setCardIndex(cardIndex - 1)
    } else {
      setCardIndex(questions.length - 1)
    }
  }

  const handleFavorite = () => {
    const id = questions[cardIndex]?.id

    if (favorites.includes(id)) {
      setFavorites(favorites.filter((fId) => fId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  const handleFilter = (checked, value) => {
    if (checked) {
      setFilters([...filters, value])
    } else {
      setFilters(filters.filter((f) => f !== value))
    }
  }

  const handleToggleCert = (checked, value) => {
    if (checked) {
      setFilterCerts([...filterCerts, value])
    } else {
      setFilterCerts(filterCerts.filter((f) => f !== value))
    }
  }

  const handleToggleFilterFavorite = (e) => {
    setFilterFavorites(e.target.checked)
  }

  const handleToggleFilterVocab = (e) => {
    setFilterVocab(e.target.checked)
  }

  const handleToggleFilterQuizes = (e) => {
    setFitlerQuizes(e.target.checked)
  }

  const handleFullScreen = () => {
    setFullScreen(!fullScreen)
  }

  const FS_CLASS =
    'fixed top-0 left-0 w-[100vw] h-[100vh] bg-background dark:bg-dm-background'

  return (
    <>
      <div className="mb-2">
        <div className="flex gap-4">
          <CheckboxGroup
            options={[{ name: '⭐', value: 'favorite' }]}
            value={[]}
            inline
            onChange={handleToggleFilterFavorite}
          />
          <CheckboxGroup
            options={[{ name: 'Vocab', value: 'vocab' }]}
            value={[]}
            inline
            onChange={handleToggleFilterVocab}
          />
          <CheckboxGroup
            options={[{ name: 'Quiz', value: 'quiz' }]}
            value={[]}
            inline
            onChange={handleToggleFilterQuizes}
          />
          |
          <CheckboxGroup
            options={[
              { name: 'NASM CPT', value: 'NASM CPT' },
              { name: 'NASM PES', value: 'NASM PES' },
              { name: 'NASM Nutrition', value: 'NASM Nutrition' },
            ]}
            value={[]}
            inline
            onChange={(e) => {
              handleToggleCert(e.target.checked, e.target.value)
            }}
          />
        </div>

        {/* {loading ? (
          <div>Loading</div>
        ) : (
          <CheckboxGroup
            label={`Filter: ${filters.join(' OR ')}`}
            options={[]}
            value={[]}
            inline
            onChange={(e) => {
              handleFilter(e.target.checked, e.target.value)
            }}
          />
        )} */}
      </div>

      <div className={clsx('flex flex-col gap-2', fullScreen && FS_CLASS)}>
        <div className={clsx('flex gap-2 flex-1 w-full min-w-full')}>
          <CardGutter className="flex-col">
            <Button
              color="gray"
              className="flex-grow"
              title="Previous Question"
              onClick={handlePrev}
            >
              <ChevronLeftIcon />
            </Button>
          </CardGutter>

          <div className="border flex-1 relative min-h-[200px]">
            <small className="mb-2 absolute left-2 top-1">
              {questions.length > 0
                ? `${cardIndex + 1} of ${questions.length}`
                : '0 of 0'}
            </small>

            {questions
              .filter((meh, i) => i === cardIndex)
              .map((question) => (
                <Card {...question} key={question.id} />
              ))}
          </div>

          <CardGutter className="flex-col">
            <Button
              color="gray"
              title="Next Question"
              className="flex-grow"
              onClick={handleNext}
            >
              <ChevronRightIcon />
            </Button>
          </CardGutter>
        </div>

        <CardGutter className="flex-row justify-center">
          <Button color="gray" onClick={shuffle} title="Shuffle Questions">
            <ShuffleIcon />
          </Button>

          <Button color="gray" title="Up vote" onClick={handleFavorite}>
            {favorites.includes(questions[cardIndex]?.id) ? (
              <StarIcon />
            ) : (
              <OutlineStarIcon />
            )}
          </Button>

          <Button
            color="gray"
            onClick={handleFullScreen}
            title={fullScreen ? 'Compress Cards' : 'Expand Cards'}
          >
            {!fullScreen && <ExpandIcon />}
            {fullScreen && <CompressIcon />}
          </Button>
        </CardGutter>
      </div>
    </>
  )
}

const CardGutter = ({ children, className }) => (
  <div className={clsx('flex items-center gap-4', className)}>{children}</div>
)

const Card = ({ question, answer, ...rest }) => {
  const [showAnswer, setShowAnswer] = React.useState(false)

  return (
    <button
      onClick={() => setShowAnswer(!showAnswer)}
      className="py-4 px-8 lg:px-16 relative w-full h-full"
    >
      {showAnswer ? (
        <div className="leading-5 text-lg text-left">{answer}</div>
      ) : (
        <h2 className="text-center">{question}</h2>
      )}

      <small className="flex gap-1 absolute top-1 right-1">
        <strong>{rest.cert}</strong>
      </small>

      <small className="flex gap-1 absolute left-1 bottom-1">
        <strong>{rest.source}</strong>
        {rest.topic}
      </small>
    </button>
  )
}

export default Flashcards
