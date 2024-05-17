import { fireEvent, render } from '@testing-library/react-native'
import HomeScreen from '../HomeScreen'

describe('Home', () => {
  const navigationMock = { navigate: jest.fn() }
  afterEach(() => jest.resetAllMocks())
  it('Deveria renderizar corretamente', () => {
    const { toJSON } = render(<HomeScreen navigation={navigationMock} />)
    expect(toJSON).toMatchSnapshot()
  })
  it('Deveria levar para a página do jogo', () => {
    const { getByTestId } = render(<HomeScreen navigation={navigationMock} />)
    fireEvent.press(getByTestId('inicia-jogo'))
    expect(navigationMock.navigate).toHaveBeenCalledWith('Game')
  })
})
