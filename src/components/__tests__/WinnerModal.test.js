import { fireEvent, render } from '@testing-library/react-native'
import WinnerModal from '../WinnerModal'
import { StackActions } from '@react-navigation/native'

describe('Winner modal', () => {
  const navigationMock = { navigate: jest.fn(), dispatch: jest.fn() }
  afterEach(() => jest.resetAllMocks())
  const setModalMock = jest.fn()

  it('Deveria renderizar corretamente', () => {
    const modal = { visible: true, winnerText: 'Player ganhou!' }
    const { toJSON } = render(
      <WinnerModal
        navigation={navigationMock}
        modal={modal}
        setModal={setModalMock}
      />
    )
    expect(toJSON).toMatchSnapshot()
  })
  it('Deveria fechar o modal e redirecionar para a home', () => {
    const modal = { visible: true, winnerText: 'Player ganhou!' }
    const { getByText } = render(
      <WinnerModal
        navigation={navigationMock}
        modal={modal}
        setModal={setModalMock}
      />
    )
    fireEvent.press(getByText('Fechar'))
    expect(setModalMock).toHaveBeenCalledWith({
      visible: false,
      winnerText: null
    })
    expect(navigationMock.navigate).toHaveBeenCalledWith('Home')
  })
  it('Deveria fechar o modal e reiniciar o jogo', () => {
    const modal = { visible: true, winnerText: 'Player ganhou!' }
    const { getByText } = render(
      <WinnerModal
        navigation={navigationMock}
        modal={modal}
        setModal={setModalMock}
      />
    )
    fireEvent.press(getByText('Reiniciar'))
    expect(setModalMock).toHaveBeenCalledWith({
      visible: false,
      winnerText: null
    })
    expect(navigationMock.dispatch).toHaveBeenCalledWith(
      StackActions.replace('Game')
    )
  })
})
