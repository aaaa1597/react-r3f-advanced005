# react-r3f-advanced005
React+TypeScript+R3Fのtutorial応用編5(glTFで3Dアニメーション(モーション切替え))

![](https://storage.googleapis.com/zenn-user-upload/b3a34869dc25-20240104.png)

# ハマったところ
## ①先に定義した<div/>タグ子要素の文字列群が表示されなかった。
HTMLは、後勝ちらしくって、後ろに定義したら表示されるようになった。

## ②json形式の定義方法
json形式の型定義が分からんくって、地味に時間食った。

## ③json形式の初期化は{}
TypeScriptでずっとエラーが取れず、解決策が分からなかった。

## ④useMemoだと実装が分からん
参考元のコードだとuseMemo使ってたんだけど、関数でビルドエラーが取れんくって、仕方なくuseRef()に変更した。const actions:  jsoactions = {}ってやると、値が保持してくれなかった。

## ⑤ useState＜AnimationAction＞だとsetAction()呼び出してもundefinedにしかならない。
なぜか、AnimationAction型のuseStateを定義してもundefinedにしかならず、不明。仕方なくstringに変更した。
