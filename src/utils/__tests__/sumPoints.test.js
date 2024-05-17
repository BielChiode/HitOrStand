import sumPoints from '../sumPoints'

describe('sumPoints', () => {
  it('soma corretamente os valores das cartas sem as cartas especiais', () => {
    const cards = [{ value: '2' }, { value: '3' }, { value: '4' }]
    expect(sumPoints(cards)).toBe(9)
  })

  it('converte corretamente o valor da carta "ACE"', () => {
    const cards = [{ value: 'ACE' }]
    expect(sumPoints(cards)).toBe(1)
  })

  it('converte corretamente o valor da carta "JACK"', () => {
    const cards = [{ value: 'JACK' }]
    expect(sumPoints(cards)).toBe(10)
  })

  it('converte corretamente o valor da carta "QUEEN"', () => {
    const cards = [{ value: 'QUEEN' }]
    expect(sumPoints(cards)).toBe(11)
  })

  it('converte corretamente o valor da carta "KING"', () => {
    const cards = [{ value: 'KING' }]
    expect(sumPoints(cards)).toBe(12)
  })

  it('soma corretamente os valores das cartas com cartas especiais', () => {
    const cards = [
      { value: '2' },
      { value: 'ACE' },
      { value: 'JACK' },
      { value: 'KING' }
    ]
    expect(sumPoints(cards)).toBe(25)
  })
})
