class RemoveUserIdFromGroup < ActiveRecord::Migration
  def change
	remove_column :groups, :user_id
  end
end
