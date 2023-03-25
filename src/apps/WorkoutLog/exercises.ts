import { v4 as uuidv4 } from 'uuid'

const exercises = [
  {
    id: 'ae43aa99-897e-4171-ad49-aa3f2d0548cc',
    name: 'Squats',
    technique: '',
    type: 'resistance',
    muscles: [
      'gluteus maximus, minimus, and medius',
      'quadriceps',
      'hamstrings',
      'adductor',
      'hip flexors',
      'calves',
    ],
  },
  {
    id: 'be43aa99-897e-4171-ad49-aa3f2d0548cc',
    name: 'Romanian Dead Lift',
    technique: '',
    type: 'resistance',
    muscles: [
      'erector spinae',
      'gluteus maximus',
      'hamstrings',
      'adductor magus',
      'gastrocnemius',
      'trapezius',
      'forearm flexors',
    ],
  },
]

const FLEXIBILITY = 'flexibility'
const flexibility = [
  ['SMR: Calves', FLEXIBILITY],
  ['SMR: Peroneals', FLEXIBILITY],
  ['SMR: Hamstrings', FLEXIBILITY],
  ['SMR: Quadriceps', FLEXIBILITY],
  ['SMR: Adductors', FLEXIBILITY],
  ['SMR: Lateral thigh', FLEXIBILITY],
  ['SMR: Tensor Fascia Latae', FLEXIBILITY],
  ['SMR: Piriformis', FLEXIBILITY],
]

const cardio = []

const core = []

const balance = []

const plyometric = []

const SAQ = 'Speed Agility Quickness'
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

const RESISTANCE = 'resistance'
const resistance = [
  ['Dumbbell lateral raise', RESISTANCE],
  ['Standing shoulder press', RESISTANCE],
  ['Barbell front raise', RESISTANCE],
  ['Rear deltoid fly', RESISTANCE],
  ['Face pull', RESISTANCE],
  ['Front squat', RESISTANCE],
  ['Bent over dumbell rows', RESISTANCE],
  ['Stiff legged dead lift', RESISTANCE],
  ['Hip thrist', RESISTANCE],
]

const plop = [...resistance, ...flexibility]

// console.log(
//   plop.map(([name, type]) => ({
//     name,
//     id: uuidv4(),
//     technique: '',
//     type,
//     muscles: [],
//   })),
// )

export default exercises
