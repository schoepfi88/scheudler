class DeleteLengthFromEvents < ActiveRecord::Migration
  def change
	remove_column :events, :length
  end
end
