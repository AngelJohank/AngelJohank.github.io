function gotoForm(){
    window.location.replace('pedidos.html')
}

var anchors = document.getElementsByClassName("card");

for (var i = 0; i <= anchors.length ; i++) {
    var anchor = anchors[i]
    anchor.onclick = gotoForm
}
