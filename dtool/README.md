# DTool App

## Configurando o ambiente:

Siga o [tutorial oficial](https://reactnative.dev/docs/environment-setup) na aba `React Native CLI Quickstart`.
Não é necessário criar uma nova aplicação, vamos utilizar a nossa para testar seu ambiente, só configure o ambiente por enquanto:
Siga atentamente o tutorial oficial, principalmente os passos:
1. Install Android Studio
2. Install the Android SDK
3. Configure the ANDROID_HOME environment variable
4. Add platform-tools to Path
5. Using a virtual device

Se você usa sistema operacional Windows ou Linux, selecione o `Target OS: Android`. Se seu sistema operacional é macOS, então selecione `Target OS: IOS` (Neste caso você também pode configurar para Android, ambos funcionarão).

Veja também a seção `Using a virtual device`, executaremos o projeto em um virtual device, através da IDE.

Você também pode rodar a aplicação no seu celular, [veja o tutorial aqui](https://reactnative.dev/docs/running-on-device).

### VS Code

Instale o [VSCode](https://code.visualstudio.com/download), editor de código, se você ainda não tiver instalado. Após, instale os plugins [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) e [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) (Estes plugins não são obrigatórios, mas te ajudarão a manter um código padronizado).

## Clone o projeto:

- Abra o terminal do seu computador ou [git bash](https://gitforwindows.org/) e digite um comando por vez:

```bash
$ # clonando o repositório do projeto:
$ git clone http://tools.ages.pucrs.br/dtool/dtool.git

$ # se não tiver instalado:
$ sudo npm install -g react-native-cli

$ # entrando no diretório do app
$ cd dTool

$ # instalando as dependências
$ npm install
```

**Configurações adicionais iOS:**

Para executar o projeto em um dispositivo iOS, é necessário instalar as dependências nativas usando [Cocoapods](https://cocoapods.org/), (gerenciador de dependências muito usado no desenvolvimento iOS):

```bash
$ # primeiro, instale o cocoapods
$ sudo gem install cocoapods

$ # depois, vá até a pasta com arquivos específicos para iOS
$ cd ios

$ # e, por fim, instale as dependências nativas
$ pod install
```

Você deve ver uma mensagem como `Pod installation complete! There are XX dependencies from the Podfile and 28 total pods installed.`.

---

Execute o virtual device em questão (no Android Studio, no caso de desenvolvimento para Android) e depois execute os seguintes comandos no terminal que está na raiz do projeto(./dTool)

```bash
$ # se estiver desenvolvendo para Android:
$ npm run dev-android

$ #se estiver desenvolvendo para IOS:
$ npm run dev-ios

$ # se estiver instalado o app no device:
$ npm start
```

**Extras iOS:**

Por padrão, o React Native executa o projeto em um simulador de iPhone 11 (se não houver um dispositivo físico conectado), mas é possível escolher um simulador diferente:

```bash
$ npm run ios --simulator "iPhone 8" # executa no simulador do iPhone 8
$ npm run ios --simulator "iPhone 8 (13.4)" # executa no simulador do iPhone 8 usando o iOS 13.4
```

---

🎉 Caminho feliz: Pronto, você verá a aplicação sendo instalada no virtual device! (já pode usar, mudar algo no código - teste com textos primeiro ou cores - e apertar R+R no virtual device pra ver se muda)

😞 Caminho nem tão feliz, mas sempre com solução: Caso tenha algum problema em algum passo (a aplicação não aparece no virtual device? o virtual device nem abriu? as dependências não instalam? ...), não deixe pra depois, nos avise para que **possamos te ajudar**, coloca teu problema no canal do slack [`setup-app`](https://dtool-ages.slack.com/archives/C010MTMQDKL).
Será ótimo se tirar screenshots do que está acontecendo e tomar nota dos passos que você executou (dos quais lembrar, é claro).

#### Outras informações

- Para navegação estamos usando a dependência [React Navigation](https://reactnavigation.org/docs/navigating)
