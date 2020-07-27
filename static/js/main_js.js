
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


  let main_block = document.querySelector("main"),
      counter_answers = document.getElementById("counter");
  let [correct_answer,wrong_answer,counter_answer_true = 0,counter_answer_false = 0] =[document.getElementById("true"),document.getElementById("false")]

  

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
  header.style.width = "7%";
  main_block.style.cssText = "margin: 10% 15% 5% 33%";
  counter_answers.style.cssText = "margin: 10% 15% 5% 33%";
  showHide_flex(list);
  showHide_flex(icons);
}


fa_ellipsis_h.onclick = function (){
  header.style.width = "20%";
  main_block.style.cssText = "margin: 10% 15% 5% 20%";
  counter_answers.style.cssText = "margin: 10% 15% 5% 20%";
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

let num1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
    num2 = [0];
let length_arr_num1= num1.length;
const forRand = length_arr_num1;
let same_nambers = rand(num1.length);

answer_word_btn.onclick = function () {
  // console.log(difference);
  length_arr_num1= num1.length;
  same_nambers = rand(num1.length);
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
  if (num1.length < 3 ) {
    alert("f u!");
  }
  else{
  RundOfArrays(num1,num2,forRand)
     console.log(`${num1} массив 1 его длинна ${num1.length}`);
     console.log(`${num2} массив 2 его длинна ${num2.length}`);
    //  console.log(`выпавшее число ${same_nambers}`);
  }
    
}

// console.log(contains(num2,11));
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