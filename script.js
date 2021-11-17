Vue.component('loading', {
  template: '<div class="vue-load"><div class="block-loader"><span class="block"></span><span class="block"></span><span class="block"></span><span class="block"></span></div></div>'
})
new Vue({
  el: '#loading',
  data: {
    loading: true,
  },
})

// you may use/need these variables for step 4 in lab 5
var thumbnails = document.getElementById("thumbnails")
var imgs = thumbnails.getElementsByTagName("img")
var main = document.getElementById("main")
var urls = thumbnails.innerHTML.split("\n")


for(let i=0;i<imgs.length;i++){
  let img=imgs[i]
  img.addEventListener("click",function(){
  main.src=this.src
  console.log(JSON.stringify(main.src))
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      $('#loading').removeClass('hidden');
      document.getElementById("demo").innerHTML = ''
    };
  xhttp.open("POST", "https://saif-lab-5.azurewebsites.net/img-url", true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(main.src));
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      $('#loading').addClass('hidden');
      document.getElementById("demo").innerHTML = this.responseText;
    };
  };
})
}

var list = [];
var newlist = [];

for (var i = 0; i < thumbnails.children.length; i += 1) {
  list.push(thumbnails.children[i]);
}

list.sort(function(a, b) {
  return -1 + Math.random() * 3;
});

while (thumbnails.children.length > 0) {
  thumbnails.removeChild(thumbnails.children[0]);
}
list.forEach(function(el) {
  thumbnails.appendChild(el);
});

// update hero image too
main.src = imgs[0].src