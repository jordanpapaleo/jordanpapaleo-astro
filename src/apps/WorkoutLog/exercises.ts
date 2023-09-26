import { map } from 'lodash'
import { v4 as uuidv4 } from 'uuid'

const mapIt = ([name, category, muscles]) => ({
  name,
  id: uuidv4(),
  technique: 'ToDo',
  category,
  type: 'ToDo',
  muscles,
})

const FLEXIBILITY = 'flexibility'
export const flexibilityExercises = [
  ['SMR', FLEXIBILITY],
  // ['SMR: Calves', FLEXIBILITY],
  // ['SMR: Peroneals', FLEXIBILITY],
  // ['SMR: Hamstrings', FLEXIBILITY],
  // ['SMR: Quadriceps', FLEXIBILITY],
  // ['SMR: Adductors', FLEXIBILITY],
  // ['SMR: Lateral thigh', FLEXIBILITY],
  // ['SMR: Tensor Fascia Latae', FLEXIBILITY],
  // ['SMR: Piriformis', FLEXIBILITY],
].map(mapIt)

export const cardio = []

export const core = []

export const balance = []

const SAQ = 'Speed Agility Quickness'
const PLYO = 'Plyometrics'
const plyometric = []
const saq = [
  ['Ladder: One-Ins', SAQ],
  ['Ladder: Two-Ins', SAQ],
  ['Ladder: In-n-Out', SAQ],
  ['Ladder: In-n-Out zig zag', SAQ],
  ['Ladder: Side Shuffle', SAQ],
  ['Ladder: Ali Shuffle', SAQ],
  ['5-10-5 Drill', SAQ],
  ['Modified Box Drill', SAQ],
  ['T Drill', SAQ],
  ['Box Drill', SAQ],
  ['LEFT', SAQ],
]

export const skillExercises = [...plyometric, ...saq].map(mapIt)

const MUSCLES = {
  lower: {
    tibalis: {
      name: 'Tibalis',
    },
    gastrocnemus: {
      name: 'Gastrocnemus',
    },
    soleus: {
      name: 'Soleus',
    },
    quadriceps: {
      name: 'Quadriceps',
    },
    gluteusMaximus: {
      name: 'Gluteus Maximus',
    },
    gluteusMedius: {
      name: 'Gluteus Medius',
    },
    hamstrings: {
      name: 'Hamstrings',
    },
    adductors: {
      name: 'Adductors',
    },
    tensorFasciaLatae: {
      name: 'Tensor Fascia Latae',
    },
    abductors: {
      name: 'Abductors',
    },
  },
  upper: {
    pectorals: {
      name: 'Pectorals',
    },
    biceps: {
      name: 'Biceps',
    },
    triceps: {
      name: 'Triceps',
    },
    latissimusDorsi: {
      name: 'Latissimus Dorsi',
    },
    rhomboids: {
      name: 'Rhomboids',
    },
    lowerTrapezius: {
      name: 'Lower Trapezius',
    },
    middleTrapezius: {
      name: 'Middle Trapezius',
    },
    upperTrapezius: {
      name: 'Upper Trapezius',
    },
    levatorScapulae: {
      name: 'Levator Scapulae',
    },
    anteriorDeltoid: {
      name: 'Anterior Deltoid',
    },
    medialDeltoid: {
      name: 'Medial Deltoid',
    },
    posteriorDeltoid: {
      name: 'Posterior Deltoid',
    },
    brachioradialis: {
      name: 'Brackioradialis',
    },
    sternocleidomastiod: {
      name: 'Sternocleidomastiod',
    },
  },
  core: {
    rectusAbdominis: {
      name: 'Rectus Abdominis',
    },
    obliques: {
      name: 'Obliques',
    },
    transverseAbdominus: {
      name: 'Transverse Abdominus',
    },
  },
}

const VARIENTS = {
  bands: 'Bands',
  barbell: 'Barbell',
  bodyWeight: 'Body weight',
  cable: 'Cable',
  dumbell: 'Dumbell',
}

const RESISTANCE = 'resistance'
export const resistanceExercise = [
  ['Barbell Deadlift', RESISTANCE, []],
  ['Bench Press', RESISTANCE, []],
  ['Bent Over Row', RESISTANCE, []],
  ['Bicep Curl', RESISTANCE, []],
  ['Chest Fly', RESISTANCE, []],
  ['Close Grip Bench', RESISTANCE, []],
  ['Face Pull', RESISTANCE, []],
  ['Front Squat', RESISTANCE, []],
  ['Full Lever Sit-Up', RESISTANCE, []],
  ['Goblet Squat', RESISTANCE, []],
  ['Hip Thrust', RESISTANCE, []],
  ['Incline Press', RESISTANCE, []],
  ['Lateral Raise', RESISTANCE, []],
  ['Lunges: Alternating', RESISTANCE, []],
  ['Pull-Up', RESISTANCE, []],
  ['Reverse Crunch', RESISTANCE, []],
  ['Romanian Deadlift', RESISTANCE, []],
  ['Shoulder Press', RESISTANCE, []],
  ['Skull Crusher', RESISTANCE, []],
  ['Squat', RESISTANCE, []],
  ['Tricep Dip', RESISTANCE, []],
  ['Turkish Get-Up', RESISTANCE, []],
  ['Upright Row: Alternating', RESISTANCE, []],
  ['Farmer Carry', RESISTANCE, []],
].map(mapIt)
