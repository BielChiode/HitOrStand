import { render } from '@testing-library/react-native'
import Routes from '../routes'
import { NavigationContainer } from '@react-navigation/native'

describe('Router', () => {
  it('Deveria iniciar na home', () => {
    const { getByText } = render(
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    )
    expect(getByText('Iniciar jogo')).not.toBeNull()
  })
})
