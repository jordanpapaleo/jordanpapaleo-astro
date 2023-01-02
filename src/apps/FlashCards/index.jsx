import React from 'react'
import chapter1 from './json/chapter1.json'
import chapter2 from './json/chapter2.json'
import chapter3 from './json/chapter3.json'
import chapter4 from './json/chapter4.json'
import chapter5 from './json/chapter5.json'
import chapter6 from './json/chapter6.json'
import section1Quiz from './json/section1Quiz.json'
import section2Quiz from './json/section2Quiz.json'
import section3Quiz from './json/section3Quiz.json'
import multiplication from './json/multiplication.json'
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

const initQuestions = [
  ...chapter1,
  ...chapter2,
  ...chapter3,
  ...chapter4,
  ...chapter5,
  ...chapter6,
  ...section1Quiz,
  ...section2Quiz,
  ...section3Quiz,
  ...multiplication,
]

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

const Flashcards = (props) => {
  const [cardIndex, setCardIndex] = React.useState(0)
  const [filters, setFilters] = React.useState([])
  const [questions, setQuestions] = React.useState(initQuestions)
  const [fullScreen, setFullScreen] = React.useState(false)
  const [favorites, setFavorites] = React.useState([])
  const [filterFavorites, setFitlerFavorites] = React.useState(false)
  const [tags] = React.useState(initTags)

  React.useEffect(() => {
    const favs = localStorage.getItem('fc_favorites')
    setFavorites(favs ? JSON.parse(favs) : [])
  }, [])

  React.useEffect(() => {
    localStorage.setItem('fc_favorites', JSON.stringify(favorites))
  }, [favorites])

  React.useEffect(() => {
    let filteredQuestions = [...initQuestions]

    if (filters.length) {
      filteredQuestions = filteredQuestions.filter((question) => {
        return question.tags.some((t) => filters.includes(t))
      })
    }

    if (filterFavorites) {
      filteredQuestions = filteredQuestions.filter((question) => {
        return favorites.includes(question.id)
      })
    }

    setCardIndex(0)
    setQuestions(filteredQuestions)
  }, [filters, favorites, filterFavorites])

  React.useEffect(() => {
    if (fullScreen) {
      disableScroll()
    } else {
      enableScroll()
    }
  }, [fullScreen])

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

  const handleToggleFilterFavorite = () => {
    setFitlerFavorites(!filterFavorites)
  }

  const handleFullScreen = () => {
    setFullScreen(!fullScreen)
  }

  const FS_CLASS =
    'fixed top-0 left-0 w-[100vw] h-[100vh] bg-background dark:bg-dm-background'

  return (
    <>
      <div className="mb-2">
        <CheckboxGroup
          label={`Filter: ${filters.join(' OR ')}`}
          options={tags}
          value={[]}
          inline
          onChange={(e) => {
            handleFilter(e.target.checked, e.target.value)
          }}
        />
        <CheckboxGroup
          label={`Favorites`}
          options={[{ name: '⭐', value: 'favorite' }]}
          value={[]}
          inline
          onChange={handleToggleFilterFavorite}
        />
      </div>

      <div className="mb-2">Cards: {questions.length}</div>

      <div className={clsx('flex gap-2 w-[100%]', fullScreen && FS_CLASS)}>
        <CardGutter>
          <Button
            color="gray"
            className="flex-grow"
            title="Previous Question"
            onClick={handlePrev}
          >
            <ChevronLeftIcon />
          </Button>

          <Button color="gray" onClick={shuffle} title="Shuffle Questions">
            <ShuffleIcon />
          </Button>
        </CardGutter>

        {questions

          .filter((meh, i) => i === cardIndex)
          .map((question) => (
            <Card key={question.id} {...question} />
          ))}

        <CardGutter>
          <Button
            color="gray"
            title="Next Question"
            className="flex-grow"
            onClick={handleNext}
          >
            <ChevronRightIcon />
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

const CardGutter = ({ children }) => (
  <div className="flex flex-col gap-2">{children}</div>
)

const Card = ({ question, answer, tags = [] }) => {
  const [showAnswer, setShowAnswer] = React.useState(false)

  return (
    <button
      onClick={() => setShowAnswer(!showAnswer)}
      style={{ borderRadius: '4px', borderWidth: 1 }}
      className="border py-2 px-4 flex-1 relative"
    >
      <h2 className="text-center">{question}</h2>
      <p className={clsx('leading-5 pb-4', !showAnswer && 'opacity-0')}>
        {answer}
      </p>

      <small className="flex gap-1 absolute left-1 bottom-1">
        {tags.map((t, i) => (
          <span
            key={i}
            className="inline-block px-1 border border-primary-light bg-primary-ultraLight text-xs text-primary"
          >
            {t}
          </span>
        ))}
      </small>
    </button>
  )
}

export default Flashcards
