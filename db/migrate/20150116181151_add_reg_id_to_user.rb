class AddRegIdToUser < ActiveRecord::Migration
  def change
  	add_column :users, :regId, :string
  end
end
