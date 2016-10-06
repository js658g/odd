module Users1sHelper
  def show_field_error1(model, field)
    s=""
    if !model.errors[field].empty?
      s =
          <<-EOHTML
          <div id="error_message">
           #{model.errors[field][0]}
          </div>
      EOHTML
    end

    s.html_safe
  end

end
