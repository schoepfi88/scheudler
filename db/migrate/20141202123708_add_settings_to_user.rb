class AddSettingsToUser < ActiveRecord::Migration
  def change
	add_column :users, :back_link_enabled, :boolean
  end
end
