---
layout: ../../layouts/BlogLayout.astro
title: "The Cat APIを使ってみた"
date: "2023-05-05"
headImage: "nagagutsu_haita_neko.png"
description: "ランダムに猫画像を返すAPIを使って猫画像を表示するページを作りました"
draft: false
---

[typescriptの勉強](https://typescriptbook.jp/)をしていたら
[The Cat API](https://thecatapi.com/) なるものを見つけました。

これは使ってみるしかないということで、このブログにも画像を表示するページを作ってみました。

<img src="https://i.gyazo.com/0e554c50c90c07020d48f9209288e4ad.png" width="300">

ということで、以下は実装した時の覚書です

## APIについて
Document のクイックスターを読んでみると、次のURLを叩くだけでjsonが取得できました。

https://api.thecatapi.com/v1/images/search

jsonは次の形式です

```json
[{
    "id":"p5",
    "url":"https://cdn2.thecatapi.com/images/p5.jpg",
    "width":640,
    "height":429
}]
```

jsonに合わせて取得する時のクラスを定義します

```typescript
export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}
```

このクラスを使って、APIを取得する部分も実装します

```typescript
export async function fetchCat(): Promise<CatImage> {
  const response = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await response.json();

  return images[0];
}

```

本当は取得失敗時の処理や、空のリスト対策などをちゃんと書いた方がいいかもしれないですが、
今回は省きました。いつか書きます（書かない）

さて表示するページを作ります。

```astro
---
import Layout from "../layouts/Layout.astro";
import { fetchCat } from "../libs/fetchCatApi";
const image = await fetchCat();
---

<Layout title="今日の猫">
  <div class="flex py-6 px-2 justify-center">
    <img src={image.url} width={image.width} height={image.height} />
  </div>
</Layout>
```

これで猫の画像が表示されるようになりました。やった〜！

しかし、astroコンポーネント部分ではビルド時にしかfetchしてくれません。
なのでリロードしても、誰がみても同じ猫の画像が表示されます。

- [Astro データフェッチについて](https://docs.astro.build/ja/guides/data-fetching/)

## クライアントサイドでAPIをリクエストする

Astroの `<script>` タグは TypeScriptも対応しているとのことで、
クライアント側でAPIを叩いて、画像を差し替える方法に変えようと思いました。

実装は次の通りです

```typescript
import { fetchCat } from "./fetchCatApi"

const loading = document.getElementById("loading");

fetchCat().then(image => {
  const catImg = document.createElement("img");

  catImg.src = image.url;
  catImg.width = image.width;
  catImg.height = image.height;

  loading?.replaceWith(catImg);
})
```

astroのページは次の通りです
```astro
---
import Layout from "../layouts/Layout.astro";
---

<Layout title="今日の猫">
  <div id="cat" class="flex py-6 px-2 justify-center">
    <h3 id="loading">Loading</h3>
  </div>
</Layout>
<script src="../libs/replaceImage.ts"></script>
```

読み込むまでは `Loading` の文字を表示するようにし、
画像を読み込んだら、 `img` タグを作成して置き換えます。

これでリロードするたびに画像が切り替わるようになりました。

## 感想

本当はSSRとかやってみたかったのですが、Astroでやるにはアダプターを追加する必要がありそうで、
githubのビルドの方法とかも変わりそうだなぁと思い、そこまでするか？となったので辞めました

それとUIフレームワークを使うと、もっと良さげな方法で実装できそうですが、
その辺はまだまだ勉強が足りずなんもわからんとなりました。

