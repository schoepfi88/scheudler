class CreateMember < ActiveRecord::Migration
  def change
    create_table :members do |t|
      t.integer :group_id
      t.integer :user_id
    end
  end
end
