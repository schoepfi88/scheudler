class CreateAdmin < ActiveRecord::Migration
  def change
    create_table :admins do |t|
      t.integer :group_id
      t.integer :user_id
      t.timestamps
    end
  end
end
