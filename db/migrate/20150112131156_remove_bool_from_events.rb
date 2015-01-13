class RemoveBoolFromEvents < ActiveRecord::Migration
  def change
    remove_column :events, :accepted
  end
end
