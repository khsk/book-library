class CreateBooks < ActiveRecord::Migration[5.0]
  def change
    create_table :books do |t|
      t.string :isbn
      t.string :title
      t.string :author
      t.date :published_date

      t.string :purchaser
      t.date   :purchase_date

      t.string :disposal_person
      t.date   :disposal_date

      t.string :label
      t.string :base
      t.string :status

      t.timestamps
    end
  end
end
