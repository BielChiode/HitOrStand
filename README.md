# Hit or Stand Game

## Descrição

Este é um aplicativo do jogo blackjack (21), desenvolvido com React Native e Expo. O objetivo do jogo é adicionar cartas para o jogador e o dealer, acumulando pontos conforme as regras do jogo. 

## Pré-requisitos

Antes de começar, você precisará ter o seguinte instalado no seu computador:

- [Node.js](https://nodejs.org/) (recomendado a versão LTS)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

## Instalação

1. **Clone o repositório**
   ```sh
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```
2. **Instale as dependências**
   ```sh
   npm install
   ```
3. **Execute o projeto**
   ```sh
   expo start
   ```
4. **Abra o aplicativo no dispositivo ou emulador**
- No dispositivo físico: Baixe o aplicativo Expo Go da App Store ou Google Play e escaneie o QR code exibido no navegador.
- No emulador: Siga as instruções no terminal para iniciar o emulador Android/iOS.

## Scripts Disponíveis

- **`npm start`**: Inicia o servidor de desenvolvimento do Expo.
- **`npm run android`**: Inicia o aplicativo no emulador Android.
- **`npm run ios`**: Inicia o aplicativo no emulador iOS (necessário macOS).
- **`npm test`**: Executa os testes da aplicação.
- **`npm run coverage`**: Executa os testes e mostra a cobertura de testes.
- **`npm run test_watch`**: Executa os testes em modo de monitoramento.

## Estrutura do Projeto
├── assets              # Imagens e outros recursos estáticos
├── components          # Componentes reutilizáveis do React
├── screens             # Telas do aplicativo
├── api                 # Serviços e hooks para chamadas de API
├── utils               # Funções utilitárias
├── App.js              # Componente principal do aplicativo
├── app.json            # Configurações do Expo
├── package.json        # Dependências e scripts do npm
└── README.md           # Documentação do projeto

## Testes
Os testes são escritos utilizando a biblioteca @testing-library/react-native.
Para rodar os testes, use o seguinte comando:
   ```sh
   npm test
   ```