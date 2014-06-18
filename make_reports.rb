count = 5

def make_report *urls
  urls.each { |url| `grunt phantomas --target=#{url}` }
end

# generate one report per website address with 5 data points
count.times do
  make_report 'http://www.appium.io', 'http://appium.io/getting-started.html'
end

