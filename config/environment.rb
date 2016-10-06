# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
BasicAuth::Application.initialize!

if RUBY_PLATFORM =~ /java/
    require 'rubygems'
    RAILS_CONNECTION_ADAPTERS = %w(jdbc)
end



# Rails::Initializer.run do |config|


# end