class AddBooleanAcceptedToParticipants < ActiveRecord::Migration
  def change
  	add_column :participants, :accepted, :boolean, default: nil
  end
end
