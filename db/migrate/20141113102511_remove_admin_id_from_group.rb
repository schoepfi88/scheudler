class RemoveAdminIdFromGroup < ActiveRecord::Migration
  def change
	remove_column :groups, :admin_id
  end
end
