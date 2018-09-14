class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.belongs_to :book, foreign_key: true

      t.string :name
      t.string :title
      t.text :text
      t.integer :evaluation

      t.timestamps
    end
  end
end
