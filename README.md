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

## Fontes dos dados

- **Biomas e delimitações:** [IBGE — Biomas e Sistema Costeiro-Marinho do Brasil](https://www.ibge.gov.br/apps/biomas/), edição/revisão dos limites de 2025. A página consultada publica o mapa e informa alterações nos limites; como não foi possível verificar uma tabela numérica de áreas nessa fonte acessível, o aplicativo não apresenta percentuais territoriais.
- **Categorias globais de conservação:** avaliações por espécie da [Lista Vermelha da IUCN](https://www.iucnredlist.org/), consultadas em 17/10/2026. As avaliações do lobo-guará (2015), mico-leão-dourado (2015), tatu-bola-da-caatinga (2013) e veado-campeiro (2015) estão marcadas pela IUCN como precisando de atualização.
- [Panthera onca — onça-pintada](https://www.iucnredlist.org/species/15953/123791436) (avaliação 2016)
- [Inia geoffrensis — boto-cor-de-rosa](https://www.iucnredlist.org/species/10831/50358152) (avaliação 2018)
- [Chrysocyon brachyurus — lobo-guará](https://www.iucnredlist.org/species/4819/88135664) (avaliação 2015; precisa atualização)
- [Myrmecophaga tridactyla — tamanduá-bandeira](https://www.iucnredlist.org/species/14224/210444314) (avaliação 2024)
- [Leontopithecus rosalia — mico-leão-dourado](https://www.iucnredlist.org/species/11506/192327291) (avaliação 2015; precisa atualização)
- [Ramphastos toco — tucano-toco](https://www.iucnredlist.org/species/22682164/281011279) (avaliação 2025)
- [Cyanopsitta spixii — ararinha-azul](https://www.iucnredlist.org/species/22685533/153022606) (avaliação 2019)
- [Tolypeutes tricinctus — tatu-bola-da-caatinga](https://www.iucnredlist.org/species/21975/47443455) (avaliação 2013; precisa atualização)
- [Caiman yacare — jacaré-do-pantanal](https://www.iucnredlist.org/species/46586/3009881) (avaliação 2019)
- [Jabiru mycteria — tuiuiú](https://www.iucnredlist.org/species/22697710/163624043) (avaliação 2019)
- [Vanellus chilensis — quero-quero](https://www.iucnredlist.org/species/22694075/163620949) (avaliação 2019)
- [Ozotoceros bezoarticus — veado-campeiro](https://www.iucnredlist.org/species/15803/22160030) (avaliação 2015; precisa atualização)
