[Firebase Genkit](https://firebase.google.com/products/genkit) は、開発者が AI 搭載のアプリケーションを作成するのを支援するオープンソースフレームワークです。

このチュートリアルでは、Firebase Genkit の基本原理を探り、開発プロセスをどのように向上させるかを説明します。

備考: 以下英語記事の翻訳版なので、日本語として言い回し変なところあるかもですが、ご了承ください(´・ω・｀)汗

https://medium.com/@yukinagae/your-first-guide-to-getting-started-with-firebase-genkit-6948d88e8a92

## 急いでいる人のためのクイックスタート

詳細を読むことなく Firebase Genkit をすぐに始めたい方のために、 [genkit-sample](https://github.com/yukinagae/genkit-sample) プロジェクトをご用意しました。

https://github.com/yukinagae/genkit-sample

このサンプルプロジェクトは、Firebase Genkit の動作を最も迅速に体験するための方法です。以下の手順に従って、すぐに使い始めましょう。

**リポジトリのクローン**：まず、 [genkit-sample](https://github.com/yukinagae/genkit-sample) リポジトリをローカルマシンにクローンします。

```bash
$ git clone https://github.com/yukinagae/genkit-sample.git
```

**依存関係のインストール**：クローンしたディレクトリに移動し、必要な依存関係をインストールします。

```bash
$ cd genkit-sample
$ npm install
```

**API キーの設定**：Firebase Genkit と連携するためには、`OPENAI_API_KEY` 環境変数を設定する必要があります。このキーにより、アプリケーションは OpenAI のサービスと通信できます。

```bash
$ export OPENAI_API_KEY=your_api_key
```

**プロジェクトの起動**：API キーを設定したら、Genkit サーバーを起動します。

```bash
$ npm run genkit
```

このコマンドはプロジェクトを起動し、デフォルトの Web ブラウザで http://localhost:4000 を開きます。
これで、Firebase Genkit を詳細を読み込むことなく体験できる簡単な方法が提供されました。

## Firebase Genkit の探求を始めるための初心者ガイド

Firebase Genkit を初めて使う方のために、基本的な設定方法や機能を紹介します。

### 1. Genkit の設定

まず、Genkit の設定を行います。

```typescript
import { genkit, z } from "genkit";
import { gpt4o, openAI } from "genkitx-openai";

// コンソールにデバッグ出力をログ記録します。
import { logger } from "genkit/logging";
logger.setLogLevel("debug");

const ai = genkit({
  // 提供されたAPIキーを使用してOpenAIプラグインを使用します。
  // 実行前にOPENAI_API_KEY環境変数が設定されていることを確認します。
  plugins: [openAI({ apiKey: process.env.OPENAI_API_KEY })],
});
```

サンプルプロジェクトでは、OpenAI モデルを活用して動的にコンテンツを生成します。

**注**: 上記のコードスニペットでは `OPENAI_API_KEY` 環境変数が明示的に設定されていますが、OpenAI モデルは `OPENAI_API_KEY` 環境変数を暗黙的に認識するように設計されています。

```typescript
// 暗黙的な使用
plugins: [openAI()],

// 明示的な使用
plugins: [openAI({ apiKey: process.env.OPENAI_API_KEY })],
```

### 2. 最初の Flow の作成

「Flow」とは、アプリが何かを行うためのステップのことです。ここでは、簡単な Flow を設定する方法を紹介します。

```typescript
import { gpt4o, openAI } from "genkitx-openai";

export const summarizeFlow = ai.defineFlow(
  {
    name: "summarizeFlow",
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (content: string) => {
    const llmResponse = await ai.generate({
      prompt: `Summarize the ${content} within 20 words.`,
      model: gpt4o, // 使用するモデルを指定
      tools: [],
      config: {
        temperature: 1, // 応答の創造性/変動性を設定
      },
    });

    return llmResponse.text;
  }
);
```

**注**: [Firebase Genkit - Get started](https://firebase.google.com/docs/genkit/get-started) に従うと、コードの最後に `startFlowsServer();` を呼び出す必要があるとされていますが、なぜか Genkit サーバーの起動はこの呼び出しがなくても正常に動作します。

### 3. Genkit サーバーの起動

最初の Flow が準備できたら、それを実際に動かしてみましょう。Genkit サーバーを起動するための手順を案内します。

Firebase Genkit を起動してそのグラフィカルユーザーインターフェースを探索するには、ターミナルで以下のコマンドを実行します。

```bash
$ genkit start -o -- npx tsx src/index.ts
# または
$ npm run genkit
```

![Genkit GUI - first screen](https://raw.githubusercontent.com/yukinagae/genkit-sample/main/docs/1.png)

コマンドを実行した後、Web ブラウザで http://localhost:4000 にアクセスして、Firebase Genkit の GUI を操作します。

**注**: `Error: please pass in the API key or set the OPENAI_API_KEY environment variable` というエラーメッセージが表示された場合、`OPENAI_API_KEY` が正しく設定されていないことを示しています。

### 4. Flow の実行

ガイドの左サイドバーで Flow セクションを見つけて、summarizeFlow Flow を選択します。

![Genkit GUI - input flow](https://raw.githubusercontent.com/yukinagae/genkit-sample/main/docs/2.png)

次のプロンプトを Provide input (JSON):に入力します。

```json
"Haiku is a type of poetry unique to Japan that expresses natural aesthetics and human emotions in a limited number of characters. The poems typically comprise 17 on (phonetic units similar to syllables) in lines of five, seven and five (5-7-5) syllables. The basic rule is to include only one word to express the season, called a “kigo,” among the seventeen syllables. The kigo are categorized as spring, summer, fall, winter and new year words, and people usually reference a book called the Saijiki, which lists such kigo like a dictionary, when composing haiku."
```

（[Matsuo Basho: The Unparalleled Haiku Poet](https://www.gov-online.go.jp/eng/publicity/book/hlj/html/202205/202205_12_en.html) から引用）

プロンプトを入力したら、Run ボタンをクリックします。次のような出力が表示されます。

```text
Haiku, a Japanese poetry form, expresses nature and emotions in 17 syllables (5-7-5) and includes a seasonal word (kigo).
```

![Genkit GUI - flow result](https://raw.githubusercontent.com/yukinagae/genkit-sample/main/docs/3.png)

おめでとうございます！セットアップが正しく構成され、正常に動作しています。

### 5. Flow にさらに機能を追加する

基本的な Flow に慣れてきたら、さらに機能を追加してみましょう。新しいステップや「ツール」を追加して、アプリをより興味深いものにすることができます。

次のステップでは、新しいツール webLoader を定義します。このツールは、Web コンテンツを取得する役割を果たします。これは、URL を入力として受け取り、ウェブページのテキストコンテンツを返すステートレスな関数です。

```typescript
const webLoader = ai.defineTool(
  {
    name: "webLoader",
    description: "Loads a webpage and returns the textual content.",
    inputSchema: z.object({ url: z.string() }),
    outputSchema: z.string(),
  },
  async ({ url }) => {
    // 提供されたURLからコンテンツを取得
    const res = await fetch(url);
    const html = await res.text();
    // HTMLコンテンツをCheerioにロードして解析
    const $ = cheerio.load(html);

    // 不要な要素を削除
    $("script, style, noscript").remove();

    // 'article'コンテンツを優先し、利用できない場合は'body'を使用
    return $("article").length ? $("article").text() : $("body").text();
  }
);
```

webLoader ツールを定義した後、既存の Flow summarizeFlow に組み込みます。この Flow は、URL 入力に基づいてコンテンツを取得し要約するために webLoader を利用します。

```typescript
import { gpt4o, openAI } from "genkitx-openai";

export const summarizeFlow = ai.defineFlow(
  {
    name: "summarizeFlow",
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (url: string) => {
    const llmResponse = await ai.generate({
      prompt: `First, fetch this link: "${url}". Then, summarize the content within 20 words.`,
      model: gpt4o, // 使用するモデルを指定
      tools: [webLoader], // 先に定義したwebLoaderツールを含む
      config: {
        temperature: 1, // 応答の創造性/変動性を設定
      },
    });

    return llmResponse.text;
  }
);
```

### 6. 強化された Flow の実行

Flow に新機能を追加した後、その機能をテストすることが重要です。Genkit サーバーを再起動するか、すでに実行中の場合はブラウザをリフレッシュしてください。

リフレッシュ後、左サイドバーに webLoader ツールが表示されるのがわかります。このツールをクリックすると、その入力ページに移動し、Genkit GUI の優れた機能の一つである各ツールの個別実行とテストが可能になります。

![Genkit GUI - input flow with tools](https://raw.githubusercontent.com/yukinagae/genkit-sample/main/docs/4.png)

無効な URL でテスト：

```json
{
  "url": "https://not-found"
}
```

![Genkit GUI - input tool](https://raw.githubusercontent.com/yukinagae/genkit-sample/main/docs/5.png)

予想通り、エラーが発生します。

```text
TRPCClientError: fetch failed
    at n.from (http://localhost:4000/main-ZS4I5FPL.js:17:525025)
    at http://localhost:4000/main-ZS4I5FPL.js:17:529028
    at u.invoke (http://localhost:4000/polyfills-QXL6O4PO.js:16:6385)
    at Object.onInvoke (http://localhost:4000/chunk-HQANKQXH.js:22:79656)
    at u.invoke (http://localhost:4000/polyfills-QXL6O4PO.js:16:6325)
    at Y.run (http://localhost:4000/polyfills-QXL6O4PO.js:16:1715)
    at http://localhost:4000/polyfills-QXL6O4PO.js:17:554
    at u.invokeTask (http://localhost:4000/polyfills-QXL6O4PO.js:16:7010)
    at Object.onInvokeTask (http://localhost:4000/chunk-HQANKQXH.js:22:79472)
    at u.invokeTask (http://localhost:4000/polyfills-QXL6O4PO.js:16:6931)
```

一方、有効な URL を使用した場合：

```json
{
  "url": "https://en.wikipedia.org/wiki/Haiku"
}
```

この場合、ツールは正常にコンテンツを取得し、Web データの取得と処理の機能を実証します。

```text
"Jump to content\n\n\t\n\t\t\n\t\t\t\n\t\t\t\t\n\n\t\n\t\n\nMain menu\n\t\n\t\n\n\n\t\t\t\t\n\t\t\n\n\t\n\tMain menu\n\tmove to sidebar\n\thide\n\n\n\t\n\n\t\n\t\tNavigation\n\t\n\t\n\t\t\n\t\t\n\t\t\t\n\t\t\tMain pageContentsCurrent eventsRandom articleAbout WikipediaContact usDonate\n\t\t\n\t\t\n\t\n\n\n\t\n\t\n\n\t\n\t\tContribute\n\t\n\t\n\t\t\n\t\t\n\t\t\t\n\t\t\tHelpLearn to editCommunity portalRecent changesUpload
```

Flow の効果をさらに検証するため、summarizeFlow に直接 URL を入力してみましょう。

```json
"https://en.wikipedia.org/wiki/Haiku"
```

結果は簡潔で有益な要約であり、Flow の情報を凝縮する能力を示しています。

```text
Haiku is a traditional Japanese poetic form consisting of three lines with a 5-7-5 syllable structure, often evoking nature.
```

![Genkit GUI - result flow with tool](https://raw.githubusercontent.com/yukinagae/genkit-sample/main/docs/6.png)

最後に、入力がどのように処理されたかの詳細を知るために、ヘッダーの Inspect セクションをクリックします。トレースでは、Flow がコンテンツを取得するために webLoader ツールを使用していることが示され、Flow の実行ステップが表示されます。

![Genkit GUI - inspect flow](https://raw.githubusercontent.com/yukinagae/genkit-sample/main/docs/7.png)

基本的な使い方を理解したので、さらに Flow やツールを探索してみましょう。実践的な開始点として、 [genkit-sample](https://github.com/yukinagae/genkit-sample) をチェックして、Firebase Genkit を学習目的で実行することをお勧めします。

https://github.com/yukinagae/genkit-sample

楽しんでください！
