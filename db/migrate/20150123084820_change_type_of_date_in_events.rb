class ChangeTypeOfDateInEvents < ActiveRecord::Migration
  def change
  	remove_column :events, :time
  	remove_column :events, :date
  	add_column :events, :start, :datetime
  end
end
