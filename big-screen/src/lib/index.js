const { getIdGenerator } = require('./id-generator')

while (true) {
  const id = getIdGenerator()

  if (id.startsWith('0')) {
    break
  }
}
