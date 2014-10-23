require 'test_helper'

class UserTest < ActiveSupport::TestCase
    test "should not save user without properties" do
     user = User.new
     assert !user.save
    end

    test "should not save user without email" do
     user = User.new(provider:'facebook',
                        uid:"1438808021",
                        name:"Michael Fröwis",
                        oauth_token:"wuseldusel")
     assert !user.save
    end

        test "should not save user without properties oauth_token" do
     user = User.new(provider:'facebook',
                        uid:"1438808021",
                        name:"Michael Fröwis",
                        email:"michael.froewis@gmx.at")
     assert !user.save
    end

    test "should not save user without properties name" do
     user = User.new(provider:'facebook',
                        uid:"1438808021",
                        oauth_token:"wuseldusel",
                        email:"michael.froewis@gmx.at")
     assert !user.save
    end

    test "should not save user without properties uid" do
     user = User.new(provider:'facebook',
                        name:"Michael Fröwis",
                        oauth_token:"wuseldusel",
                        email:"michael.froewis@gmx.at")
     assert !user.save
    end


    test "should not save user without properties provider" do
     user = User.new(name:"Michael Fröwis",
                        uid:"1438808021",
                        oauth_token:"wuseldusel",
                        email:"michael.froewis@gmx.at")
     assert !user.save
    end

end
