class AddBooleanToEventsFromAccept < ActiveRecord::Migration
  def change
	add_column :events, :accepted, :boolean, default: nil
  end
end
