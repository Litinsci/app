
function showHide() {
    if (arguments[0].style.display == "none") {
        for (let element of arguments) {
        element.style.display = "block";
        }
    } else {
        for (let element of arguments) {
            element.style.display = "none";
        }
    }
}
  
  
function showHide_flex() {
    if (arguments[0].style.display == "none") {
        for (let element of arguments) {
        element.style.display = "flex";
        }
    } else {
        for (let element of arguments) {
            element.style.display = "none";
        }
    }
}
  
  
const togle_animate = function(){
    for (let element of arguments) {
    element.classList.toggle("active");
    }
}
  
  
function load_page(){
    let name = document.querySelector(".username_bar").innerHTML;
    $.ajax({
        type: "POST",
        url: "/onload_wod",
        data: { name:name},
        type: 'POST',
        success: function(response) {
        ru_word.value = response.ru;
        // en_word.value = response.en;
        },
        error: function(error) {
            console.log(error);
        }
    });
}