export function openWindow(url) {
  const width = 500
  const height = 500
  const left = window.outerWidth / 2 + window.screenX - width / 2
  const top = window.outerHeight / 2 + window.screenY - height / 2
  const params = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`

  window.open(url, 'authPopup', params)
}
