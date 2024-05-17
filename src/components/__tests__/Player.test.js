import { render } from '@testing-library/react-native'
import Player from '../Player'

describe('Player', () => {
  const player = [
    {
      code: '5D',
      image: 'https://deckofcardsapi.com/static/img/5D.png',
      suit: 'DIAMONDS',
      value: '5'
    },
    {
      code: '4C',
      image: 'https://deckofcardsapi.com/static/img/4C.png',
      suit: 'CLUBS',
      value: '4'
    }
  ]
  it('Deveria renderizar corretamente com as cartas e com pontos', () => {
    const { toJSON, getByText } = render(<Player player={player} />)
    expect(getByText('Pontos: 9'))
    expect(toJSON()).toMatchSnapshot()
  })
})
