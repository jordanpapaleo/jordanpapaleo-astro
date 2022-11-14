const isMale = true
const heightCm = 180.34 // in * 2.54
const weightKg = 88.45 // lb / 2.205
const ageYears = 43

/*
Men: (10 × weight in kg) + (6.25 × height in cm) – (5 × age in years) + 5
Women: (10 × weight in kg) + (6.25 × height in cm) – (5 × age in years) – 161
*/

const getRestingMetabolicRate = (isMale, heightIn, weightLbs, ageYears) => {
  const weightKg = weightLbs / 2.205
  const heightCm = heightIn * 2.54
  return isMale
    ? (10 * weightKg) + (6.25 * heightCm) - (5 * ageYears) + 5
    : (10 * weightKg) + (6.25 * heightCm) - (5 * ageYears) - 161
}

const activityLevels = {
  sedentary: 1.2,
  light: 1.375, // 1 - 3 workouts
  moderate: 1.55, // 4 - 5
  heavy: 1.725, // 6 - 7
  extreme: 1.9, // 2x day
}

const getCalories = (rmr, activityLevel) => Math.round(rmr * activityLevel)

const getMacros = (weightLbs, cals, phase, activityLevel) => {
  const activityAdjustedCals = cals * activityLevel
  const weightInKg = weightLbs / 2.205
  const carbs = 50
  let protein
  let calories

  switch (phase) {
    case 'bulk': {
      calories = activityAdjustedCals * 1.2
      protein = weightInKg * 2
      break
    }
    case 'cut': {
      calories = activityAdjustedCals * 0.8
      protein = weightInKg * 1.4
      break
    }
    default: {
      calories = activityAdjustedCals * 1
      protein = weightInKg * 1.7
    }
  }

  const proteinCal = Math.round(protein * 4)
  const carbCal = Math.round(carbs * 4)
  const fatCal = Math.round(calories - carbCal - proteinCal)

  return {
    cal: Math.round(calories),
    carbCal,
    carbGram: carbs,
    fatCal,
    fatGram: Math.round(fatCal / 9),
    proteinCal,
    proteinGram: Math.round(protein),
  }
}

const plop = {}
const phases = ['bulk', 'cut', 'maintain']

const restingMetabolicRate = getRestingMetabolicRate(true, 71, 195, 42.5)
console.log(restingMetabolicRate)

// Print everything out
Object.keys(activityLevels).forEach((level) => {
  const calories = getCalories(restingMetabolicRate, activityLevels[level])

  phases.forEach((phase) => {
    const key = `${level}-${phase}`
    const macros = getMacros(
      195,
      restingMetabolicRate,
      phase,
      activityLevels[level],
    )
    plop[key] = macros
  })
})

console.log(JSON.stringify(plop, null, 2))
