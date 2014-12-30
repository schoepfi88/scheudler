class AddCalidToGroups < ActiveRecord::Migration
  def change
		add_column :groups, :calendar_id, :string
  end
end
