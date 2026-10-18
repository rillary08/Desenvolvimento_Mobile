# Fauna dos Biomas Brasileiros

Aplicativo móvel educativo para explorar os biomas brasileiros, conhecer animais associados a cada ambiente e registrar observações de passeios.

## Partes do aplicativo

1. **Biomas:** apresenta os seis biomas brasileiros com informações sobre região, clima e características naturais.
2. **Animais:** permite abrir cada bioma, consultar seus animais, nomes científicos, descrições e informações de alimentação, habitat e conservação.
3. **Diário de Observação:** formulário para registrar dados do passeio, bioma e animal favoritos, avistamentos, avaliação e preferências de conservação.

## Instalação

Requer Node.js e npm instalados.

```bash
npm install
```

## Como rodar

```bash
npx expo start
```

Use o QR code com o Expo Go ou escolha uma plataforma disponível no menu do Expo. Para executar na web, instale primeiro os pacotes de web compatíveis com o SDK:

```bash
npx expo install react-dom react-native-web
npx expo start --web
```

## Dependências principais

- Expo SDK 58
- React 19 e React Native 0.88
- `@react-native-picker/picker` para seletores
- `@react-native-community/slider` para controles deslizantes
- `react-dom` e `react-native-web` para execução web

## Créditos das imagens

As fontes, autores e licenças das imagens estão documentados em [CREDITS.md](CREDITS.md).
