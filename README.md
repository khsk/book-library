# book-library
React + Rails によるSPA習作書籍管理アプリ

過去成果物整理です。

# スクリーンショット

## 書籍情報と状態の管理
![2018-09-14_15h30_45](https://user-images.githubusercontent.com/10125386/45538240-729bd380-b841-11e8-8fb7-346b04934aa4.png)
## 書籍へのコメント
![2018-09-14_15h31_15](https://user-images.githubusercontent.com/10125386/45538250-7cbdd200-b841-11e8-99ce-7bb436aadd9d.png)
## 書籍のリクエスト
![2018-09-14_15h29_11](https://user-images.githubusercontent.com/10125386/45538257-80515900-b841-11e8-8705-380c2649aebc.png)


# 開発時期

2016年10月頃 ~ 2016年12月頃まで。  
当時の作業の合間を見て作成していました。

# 使用技術

## React

主目的がReactを触ってみることでした。  
当時は仮想DOMの概念やSPAを目にはしていたものの、実際に手を動かしてみたことがありませんでした。  
そのため、Reactを使ったSPAが最低条件でした。  

ReactはJSXで書くため、畢竟webpackによるbabelを使用することになりました。  
当時はbrowserifyかwebpackかという話が出ており、webpackの使用感を見る目的もあったと記憶しています。

ReduxなどはまずはReactに慣れるため未使用でしたが、代わりに簡便化のため  
[hokaccha/react-micro-container: Micro framework for React](https://github.com/hokaccha/react-micro-container)  
を使用しました。  
[小さいReactアプリケーションのためのライブラリ書いた - Qiita](https://qiita.com/hokaccha/items/76332e9863c067522835)  
[非SPAなサービスにReactを導入する - クックパッド開発者ブログ](https://techlife.cookpad.com/entry/2016/10/26/135818)  

JS周りはBootstrapを除きほぼ初使用ばかりでした。

コードは  
`/client/`  
以下で管理しています

## Rails

バックエンドにはこちらも経験が薄いRailsを採用しました。  
習熟目的もありましたが、SPAにする関係上バックエンドはDB操作がメインの薄いものになる予想があったため、  
ActiveRecordとsqliteを活かせる意味でもRailsを選択しました。  

# テーマ理由

当時の書籍の貸出記録・購入依頼が紙による手書きだったため、  

* 貸出状況が不透明 → 読みたい本が今あるかわからない・拠点間の書籍の融通が難しい
* 購入依頼状況が不透明 → 追加予定の確認や、購入の賛同などがし辛い
* 書籍検索ができない → どんな本があるのかわからない
* 社内で読んだ感想が共有されていない → 良い本、社内に適した本がわからない

といった問題を抱えていました。  
これらの問題への解決作となるペーパーレス化と全員への情報公開、部分一致検索による書籍の探索、コメント機能のためには、Webアプリ化が必要と感じていました。  

# サブ機能

書籍のリクエスト項目の入力補助として、ISBNを入力するだけで外部APIを使い入力値を補完する機能を作成しました。  
紙による申請時から手間だったものの、web化しても楽にならず、require化で逆に手間が増加する恐れを感じたため省力化できないかを考えました。  

その時の調査資料です。  
[書籍検索に使える登録不要APIちゃんはちょっと足りない - Qiita](https://qiita.com/khsk/items/9679f16b7bf6bfac9c2a)
