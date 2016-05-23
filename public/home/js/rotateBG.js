document.addEventListener('DOMContentLoaded', function() {
    var i = 0;
    setInterval(() => {
        i = (i++)%9;
        document.getElementsByClassName("main-div").style.backgroundImage = "url(./../../img/"+i+")";
    }, 
    3000);
}, false);