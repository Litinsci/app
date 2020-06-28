var
    header= document.querySelector(".bar"),
    list = document.querySelector(".list"),
    icons = document.querySelector(".icons"),
    fa_ellipsis_h = document.querySelector(".fa-ellipsis-h"),
    ul_bar = document.getElementById("ul_bar"),
    dictionary = document.querySelector(".dictionary"),
    profile = document.querySelector(".profile"),
    hide_panel = document.querySelector(".hide_panel"),
    exit = document.querySelector(".exit");


  var 
    test_list = document.getElementById("test_list"),
    to_add_words= document.getElementById("to_add_words"),
    test_list_btn= document.getElementById("test_list_btn"),
    to_add_words_btn= document.getElementById("to_add_words_btn"),
    testing = document.querySelector(".testing");

    let [addit_word_btn,answer_word_btn] = [document.getElementById("addit_word_btn"),document.getElementById("answer_word_btn")];
    var [ru_word,en_word] = [document.getElementById("ru_word"),document.getElementById("en_word")];
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
  

en_word.onkeyup = function () {
  var reg = /[а-яА-ЯёЁ^0-9.]/g;
  if (this.value.search(reg) !=  -1) {
      this.value  =  this.value.replace(reg, '');
      alert("В данное поле можно вводить только английские символы");
  }
  
}
//a-zA-Z 
ru_word.onkeyup = function () {
  var reg = /[a-zA-Z]/g;
  if (this.value.search(reg) !=  -1) {
      this.value  =  this.value.replace(reg, '');
      alert("В данное поле можно вводить только русские символы");
  }
}






//````dom movies````
exit.onclick = function  () {
  document.location.replace("/unsetsession");
}


hide_panel.onclick = function (){
  icons.style.display = "none";
  header.style.width = "75px";
  showHide_flex(list);
  showHide_flex(icons);
}


fa_ellipsis_h.onclick = function (){
  header.style.width = "20%";
  showHide_flex(list);
  showHide_flex(icons);
}




addit_word_btn.setAttribute("disabled", "true");
// переход от ответа к добавлению
test_list_btn.onclick = function(){
  togle_animate(to_add_words,test_list,addit_word_btn,answer_word_btn,ru_word,en_word);
  answer_word_btn.setAttribute("disabled", "true");
  addit_word_btn.removeAttribute("disabled");
  ru_word.value = "";
  en_word.value = "";
}

// переход к ответу от добавления
to_add_words_btn.onclick = function(){
  togle_animate(to_add_words,test_list,addit_word_btn,answer_word_btn,ru_word,en_word);
  addit_word_btn.setAttribute("disabled", "true");
  answer_word_btn.removeAttribute("disabled");
  load_page();
}

// кнопка отправки ответа
let [correct_answer,wrong_answer,counter_answer_true = 0,counter_answer_false = 0] =[document.getElementById("true"),document.getElementById("false")]


// fuck this function
let num1 = [0,1,2,3,4,5,6,7,8,9,10],
    num2 = [0];
const rand = max => {
  return Math.floor(Math.random() * Math.floor(max));
}
// let difference = num1.filter(x => !num2.includes(x));
let difference = (num1,num2) =>{
  num1.filter(x => !num2.includes(x));
}
let same_nambers = rand(num1.length);

answer_word_btn.onclick = function () {
  // console.log(difference);
  let ru,en,name;
  ru = ru_word.value;
  en = en_word.value;
  name = document.querySelector(".username_bar").innerHTML;
  $.ajax({
    type: "POST",
    url: "/answer",
    data: { name:name,ru_word: ru, en_word: en},
    type: 'POST',
    success: function(response) {
      if (response.answer == "true") {
        counter_answer_true++;
        correct_answer.innerHTML = counter_answer_true;
      } else {
        counter_answer_false++;
        wrong_answer.innerHTML = counter_answer_false;
      }
    },
    error: function(error) {
        console.log(error);
    }
  });
  if (num1.length == num2.length) {
    alert("f u!");
  }else{
    for (let ellement of  num2) {
      same_nambers = rand(num1.length);
      if (ellement == same_nambers) {
        console.log(`${same_nambers} уже в массиве`);
        continue;
      } else {
        num2.push(same_nambers);
        difference(num1,num2);
        console.log(`${num2} массив вычетания`);
        console.log(`${num1} вычтенный массив`);
        break;
      }
      
     }
    }
}
// кнопка отправки добавления слов
addit_word_btn.onclick = function () {
  let ru,en,name;
  ru = ru_word.value;
  en = en_word.value;
  name = document.querySelector(".username_bar").innerHTML;
  reg = /[а-яА-ЯёЁ]/g;
  if (en!=reg) {
    alert("good boy")
  }
  $.ajax({
    type: "POST",
    url: "/add_words",
    data: { name:name,ru_word: ru, en_word: en},
    type: 'POST',
    success: function(response) {
      alert(response.name);
    },
    error: function(error) {
        console.log(error);
    }
});
}
// при загрузке страницы подтянуть значение из бд

window.onload = function(){
  load_page();
}