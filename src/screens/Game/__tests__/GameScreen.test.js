import { fireEvent, render, waitFor } from '@testing-library/react-native'
import GameScreen from '../GameScreen'
import { useGetDeck } from '../../../api/hooks/useGetDeck'
import { useGetCards } from '../../../api/hooks/useGetCards'
import getCards from '../../../api/getCards'
import { StackActions } from '@react-navigation/native'
import Toast from 'react-native-toast-message'

jest.mock('../../../api/hooks/useGetDeck')
jest.mock('../../../api/hooks/useGetCards')
jest.mock('../../../api/getCards')
jest.mock('react-native-toast-message', () => ({
  show: jest.fn()
}))

describe('Game', () => {
  const cards = {
    cards: [
      {
        code: '6H',
        image: 'https://deckofcardsapi.com/static/img/6H.png',
        value: '6',
        suit: 'HEARTS'
      },
      {
        code: '8H',
        image: 'https://deckofcardsapi.com/static/img/6H.png',
        value: '8',
        suit: 'HEARTS'
      },
      {
        code: '5S',
        image: 'https://deckofcardsapi.com/static/img/5S.png',
        value: '5',
        suit: 'SPADES'
      },
      {
        code: '8S',
        image: 'https://deckofcardsapi.com/static/img/5S.png',
        value: '8',
        suit: 'SPADES'
      }
    ]
  }
  const deck = {
    success: true,
    deck_id: '123',
    shuffled: false,
    remaining: 52
  }
  const navigationMock = { navigate: jest.fn(), dispatch: jest.fn() }
  afterEach(() => jest.resetAllMocks())

  it('Deveria renderizar corretamente carregando', () => {
    useGetDeck.mockReturnValue({ data: null, loading: true, error: null })
    useGetCards.mockReturnValue({ data: null, loading: true, error: null })

    const { toJSON } = render(<GameScreen navigation={navigationMock} />)
    expect(toJSON()).toMatchSnapshot()
  })
  it('Deveria renderizar corretamente com as cartas', () => {
    useGetDeck.mockReturnValue({ data: deck, loading: false, error: null })
    useGetCards.mockReturnValue({ data: cards, loading: false, error: null })

    const { toJSON } = render(<GameScreen navigation={navigationMock} />)
    expect(toJSON()).toMatchSnapshot()
  })
  it('Deveria adicionar uma carta para o player a para o dealer quando HIT', async () => {
    useGetDeck.mockReturnValue({ data: deck, loading: false, error: null })
    useGetCards.mockReturnValue({ data: cards, loading: false, error: null })
    getCards.mockReturnValue({
      cards: [
        {
          code: '6H',
          image: 'https://deckofcardsapi.com/static/img/6H.png',
          value: '6',
          suit: 'HEARTS'
        },
        {
          code: '5S',
          image: 'https://deckofcardsapi.com/static/img/5S.png',
          value: '5',
          suit: 'SPADES'
        }
      ]
    })
    const { getByText, toJSON } = render(
      <GameScreen navigation={navigationMock} />
    )
    fireEvent.press(getByText('HIT'))
    await waitFor(() => {
      expect(getCards).toHaveBeenCalledWith('123', 2)
      expect(getByText('Pontos: 19')).not.toBeNull()
    })
    expect(toJSON()).toMatchSnapshot()
  })
  it('Deveria mostrar modal quando o dealer ganhar com STAND', () => {
    useGetDeck.mockReturnValue({ data: deck, loading: false, error: null })
    useGetCards.mockReturnValue({ data: cards, loading: false, error: null })

    const { getByText, toJSON } = render(
      <GameScreen navigation={navigationMock} />
    )

    fireEvent.press(getByText('STAND'))
    expect(getByText('Dealer ganhou!')).not.toBeNull()
    expect(toJSON()).toMatchSnapshot()
  })
  it('Deveria mostrar modal quando o player ganhar com STAND', async () => {
    useGetDeck.mockReturnValue({ data: deck, loading: false, error: null })
    useGetCards.mockReturnValue({ data: cards, loading: false, error: null })
    getCards.mockReturnValue({
      cards: [
        {
          code: '6H',
          image: 'https://deckofcardsapi.com/static/img/6H.png',
          value: '6',
          suit: 'HEARTS'
        },
        {
          code: '2S',
          image: 'https://deckofcardsapi.com/static/img/5S.png',
          value: '2',
          suit: 'SPADES'
        }
      ]
    })

    const { getByText, toJSON } = render(
      <GameScreen navigation={navigationMock} />
    )

    fireEvent.press(getByText('HIT'))
    await waitFor(() => {
      expect(getCards).toHaveBeenCalledWith('123', 2)
      expect(getByText('Pontos: 19')).not.toBeNull()
    })

    fireEvent.press(getByText('STAND'))
    expect(getByText('Player ganhou!')).not.toBeNull()
    expect(toJSON()).toMatchSnapshot()
  })
  it('Deveria mostrar modal com vitoria do dealer quando player exceder 21 pontos', async () => {
    useGetDeck.mockReturnValue({ data: deck, loading: false, error: null })
    useGetCards.mockReturnValue({ data: cards, loading: false, error: null })
    getCards.mockReturnValue({
      cards: [
        {
          code: '9H',
          image: 'https://deckofcardsapi.com/static/img/6H.png',
          value: '9',
          suit: 'HEARTS'
        },
        {
          code: '5S',
          image: 'https://deckofcardsapi.com/static/img/5S.png',
          value: '5',
          suit: 'SPADES'
        }
      ]
    })
    const { getByText, toJSON } = render(
      <GameScreen navigation={navigationMock} />
    )

    fireEvent.press(getByText('HIT'))
    await waitFor(() => {
      expect(getCards).toHaveBeenCalledWith('123', 2)
      expect(
        getByText('Dealer ganhou! Player excedeu o máximo de pontos')
      ).not.toBeNull()
    })
    expect(toJSON()).toMatchSnapshot()
  })
  it('Deveria mostrar modal com vitoria do player quando dealer exceder 21 pontos', async () => {
    useGetDeck.mockReturnValue({ data: deck, loading: false, error: null })
    useGetCards.mockReturnValue({ data: cards, loading: false, error: null })
    getCards.mockReturnValue({
      cards: [
        {
          code: '5H',
          image: 'https://deckofcardsapi.com/static/img/6H.png',
          value: '5',
          suit: 'HEARTS'
        },
        {
          code: '9S',
          image: 'https://deckofcardsapi.com/static/img/5S.png',
          value: '9',
          suit: 'SPADES'
        }
      ]
    })
    const { getByText, toJSON } = render(
      <GameScreen navigation={navigationMock} />
    )

    fireEvent.press(getByText('HIT'))
    await waitFor(() => {
      expect(getCards).toHaveBeenCalledWith('123', 2)
      expect(
        getByText('Player ganhou! Dealer excedeu o máximo de pontos')
      ).not.toBeNull()
    })
    expect(toJSON()).toMatchSnapshot()
  })
  it('Deveria mostrar modal com empate', async () => {
    useGetDeck.mockReturnValue({ data: deck, loading: false, error: null })
    useGetCards.mockReturnValue({ data: cards, loading: false, error: null })
    getCards.mockReturnValue({
      cards: [
        {
          code: '7H',
          image: 'https://deckofcardsapi.com/static/img/6H.png',
          value: '7',
          suit: 'HEARTS'
        },
        {
          code: '6S',
          image: 'https://deckofcardsapi.com/static/img/5S.png',
          value: '6',
          suit: 'SPADES'
        }
      ]
    })
    const { getByText, toJSON } = render(
      <GameScreen navigation={navigationMock} />
    )

    fireEvent.press(getByText('HIT'))
    await waitFor(() => {
      expect(getCards).toHaveBeenCalledWith('123', 2)
    })
    fireEvent.press(getByText('STAND'))
    await waitFor(() => {
      expect(getByText('Empate!')).not.toBeNull()
    })
    expect(toJSON()).toMatchSnapshot()
  })
  it('Deveria mostrar erro ao tentar HIT', async () => {
    useGetDeck.mockReturnValue({ data: deck, loading: false, error: null })
    useGetCards.mockReturnValue({ data: cards, loading: false, error: null })
    getCards.mockReturnValue(new Error('Erro teste'))

    const { getByText } = render(<GameScreen navigation={navigationMock} />)

    fireEvent.press(getByText('HIT'))
    await waitFor(() => {
      expect(Toast.show).toHaveBeenCalledWith({
        type: 'error',
        text1: 'Não foi possível distribuir cartas, tente novamente',
        topOffset: 60
      })
    })
  })
  it('Deveria mostrar erro na tela', async () => {
    useGetDeck.mockReturnValue({
      data: null,
      loading: false,
      error: new Error('Erro')
    })
    useGetCards.mockReturnValue({
      data: null,
      loading: false,
      error: new Error('Erro')
    })
    const { getByText, toJSON } = render(
      <GameScreen navigation={navigationMock} />
    )
    expect(getByText('Houve um erro ao distribuir as cartas')).not.toBeNull()
    fireEvent.press(getByText('Tentar novamente'))
    expect(navigationMock.dispatch).toHaveBeenCalledWith(
      StackActions.replace('Game')
    )
  })
})
