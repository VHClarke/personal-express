var trash = document.getElementsByClassName("fa-trash");
var changeColor = document.getElementsByClassName("color");

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const msg = this.parentNode.parentNode.childNodes[1].innerText
    console.log(msg)
    fetch('messages', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ //turns data into a sJSON object to be sent back and forth
        'msg': msg,
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});

Array.from(changeColor).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const msg = this.parentNode.parentNode.childNodes[3].innerText
    const color = this.parentNode.parentNode.childNodes[7].innerText
    fetch('changeColor', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': name,
        'msg': msg,
        'color': color

      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});
