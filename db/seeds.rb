# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

class BookSeed
  def self.create(title, author, isbn, purchar, base = '大阪', status = '存在', published_date = nil, purchase_date = nil, label = nil)
    Book.create({
      :title         =>  title,
      :author        =>  author,
      :isbn          =>  isbn,
      :purchaser     =>  purchar,
      :base          =>  base,
      :status        =>  status,
      :published_date => published_date,
      :purchase_date =>  purchase_date,
      :label         =>  label,
    })
  end
end


Book.delete_all
Book.connection.execute("delete from sqlite_sequence where name='books'")

# BookSeed.create('', '', '', '', '大阪', '存在', '', nil, '-')
BookSeed.create('PHP､Perlで使う XML/XSL', '㈲ﾏｰｸｱｯﾌﾟ', '978-4886486165', '', '大阪', '存在', '2001.7.1', nil, 'K-3')
BookSeed.create('Ｊａｖａではじめるプログラミング オブジェクト指向ﾌﾟﾛｸﾞﾗﾐﾝｸﾞ入門', '箕原　辰夫', '', '', '大阪', '存在', '1999.3.30', nil, 'K-8')
BookSeed.create('ＰＨＰ５徹底攻略', '堀田　倫英', '', '', '大阪', '存在', '2004.10.5', nil, 'K-14')
BookSeed.create('改訂新版　SQL ポケットリファレンス', '朝井　淳', '', '', '大阪', '存在', '1999.12.25', nil, 'K-18')
BookSeed.create('ＰＨＰ５徹底攻略 エキスパート編', '廣川　類', '', '', '大阪', '存在', '2005.7.11', nil, 'K-22')
BookSeed.create('', '', '', '', '大阪', '存在', '', nil, '-')



Book.create(
  {   
    :title => 'リーダブルコード',
    :author => '角征典',
    :purchaser => '竹内',
    :purchase_date => '2015-10-27',
    :label => 'K-80',
    :base  => '大阪',
    :status => '存在' 
  })
Book.create({
    :title => 'チーム開発実践入門',
    :author => '池田尚史',
    :purchaser => '百々',
    :purchase_date => '2014-05-15',
    :label => 'K-75',
    :base  => '大阪',
    :status => '存在' 
  })


Comment.delete_all
Comment.connection.execute("delete from sqlite_sequence where name='comments'")

Comment.create(
  {
    :book_id => 1,
    :name => '名無しさん',
    :title => 'タイトル1',
    :text => 'コメントテスト1',
    :evaluation => 3,
  })

Comment.create(
  {
    :book_id => 1,
    :name => '「」',
    :title => 'タイトル2',
    :text => 'コメントテスト2',
    :evaluation => 3,
  })



Comment.create(
  {
    :book_id => 2,
    :name => '従業員',
    :title => 'いい本です',
    :text => 'オススメ',
    :evaluation => 5,
  })
