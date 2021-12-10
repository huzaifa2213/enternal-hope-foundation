


function createOtp(lenght) {
  var text = "";
  var possible = "0123456789";

  for (var i = 0; i < lenght; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function validateEmail(email) {
  var re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

module.exports = {createOtp, validateEmail };
