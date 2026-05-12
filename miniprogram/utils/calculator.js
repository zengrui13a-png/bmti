// miniprogram/utils/calculator.js
// Maps 7 answers → 4 dimension scores → type index (0-15)

function calculateType(answers) {
  const dimSums = [0, 0, 0, 0]
  const dimCounts = [0, 0, 0, 0]

  answers.forEach(option => {
    dimSums[option.dim] += option.value
    dimCounts[option.dim] += 1
  })

  const d0 = dimCounts[0] > 0 ? (dimSums[0] / dimCounts[0] >= 0.5 ? 1 : 0) : 0
  const d1 = dimCounts[1] > 0 ? (dimSums[1] / dimCounts[1] >= 0.5 ? 1 : 0) : 0
  const d2 = dimCounts[2] > 0 ? (dimSums[2] / dimCounts[2] >= 0.5 ? 1 : 0) : 0
  const d3 = dimCounts[3] > 0 ? (dimSums[3] / dimCounts[3] >= 0.5 ? 1 : 0) : 0

  return d0 * 8 + d1 * 4 + d2 * 2 + d3 * 1
}

function calcRGBTI(typeIndex, results) {
  const r = results[typeIndex]
  return { R: r.r, G: r.g, B: r.b, T: r.t, note: r.colorNote }
}

module.exports = { calculateType, calcRGBTI }
