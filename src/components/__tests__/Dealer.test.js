import { render } from '@testing-library/react-native'
import Dealer from '../Dealer'

describe('Dealer', () => {
  const dealer = [
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
  it('Deveria renderizar corretamente com as cartas e uma carta virada para baixo', () => {
    const { toJSON } = render(<Dealer dealer={dealer} stand={false} />)
    expect(toJSON()).toMatchSnapshot()
  })
  it('Deveria renderizar corretamente com as cartas viradas para cima e com pontos', () => {
    const { toJSON, getByText } = render(
      <Dealer dealer={dealer} stand={true} />
    )
    expect(getByText('Pontos: 9'))
    expect(toJSON()).toMatchSnapshot()
  })
})
