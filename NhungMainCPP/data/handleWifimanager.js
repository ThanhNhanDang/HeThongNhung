function onChangeSelect() {
  const ssid = document.getElementById("ssidSelect").value;
  document.getElementById("ssid").value = ssid;
}

function onChangeSSID() {
  const ssid = document.getElementById("ssid").value;
  if (ssid.length > 20) {
    alert("Tên Wifi không được vượt quá 20 ký tự!");
    document.getElementById("ssid").value = "";
    return false;
  }
}

function onChangePass() {
  const pass = document.getElementById("pass").value;
  if (pass.length > 20) {
    alert("Mật khẩu không được vượt quá 20 ký tự!");
    document.getElementById("pass").value = "";
    return false;
  }
}

function onSubmit() {
  const pass = document.getElementById("pass").value;
  const ssid = document.getElementById("ssid").value;
  if (
    pass.length > 20 ||
    pass.length < 8 ||
    ssid.length < 5 ||
    ssid.length > 20
  ) {
    alert("Mật khẩu hoặc tên wifi không hợp lệ");
    document.getElementById("pass").value = "";
    document.getElementById("ssid").value = "";
    return false;
  }
}

function checkform() {
  const pass = document.getElementById("pass").value;
  const ssid = document.getElementById("ssid").value;
  if (
    pass.length > 20 ||
    pass.length < 8 ||
    ssid.length < 5 ||
    ssid.length > 20
  ) {
    alert("Mật khẩu hoặc tên wifi không hợp lệ");
    document.getElementById("pass").value = "";
    document.getElementById("ssid").value = "";
    return false;
  } else document.getElementById("form").submit();
}
