var newState = "on";

var changeState = {
    "state": newState,
}

$.ajax({
  url: url,
  data: data,
  success: success,
  dataType: dataType
});
