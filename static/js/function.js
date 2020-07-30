
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


Array.prototype.remByVal = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === val) {
            this.splice(i, 1);
            i--;
        }
    }
    return this;
}
const rand = max => {
    return Math.floor(Math.random() * Math.floor(max));
}
// поиск значения по массиву 
const contains = (arr, elem) =>{
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
            return true;
        }
    }
    return false;
}
// удаление эллемента из массива по значению
const removeItem = (array, item) =>{
    for(var i in array){
        if(array[i]==item){
            array.splice(i,1);
            break;
        }
    }
}
// ````` try`````
// ````` fuck this function ``````

const RundOfArrays = (arr1,arr2,length_arr_num1) => {
    
    let same_nambers = rand(length_arr_num1);
    // console.log(`выпавшее число ${same_nambers}`);
    if ((contains(arr1,same_nambers)==true) && (contains(num2,same_nambers)== false)) {
        arr1.remByVal(same_nambers);
        arr2.push(same_nambers);
        return same_nambers;
    } 
    else if (arr1.length<2) {
        same_nambers = arr1[0];
        arr1.remByVal(same_nambers);
        arr2.push(same_nambers);
        return same_nambers;
    }
    else {
        // RundOfArrays(arr1,arr2);
        setTimeout(RundOfArrays(arr1,arr2,length_arr_num1),1000);
    }
}
// answer word function
const take_arrays_to_words = (arrays,length_array_word) =>{
    for (let i = 1; i < length_array_word; i++) {
        arrays.push(i);
      }
}
const first_answer = () => {
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
        if (this.answer == "true") {
          counter_answer_true++;
          correct_answer.innerHTML = counter_answer_true;
        } else {
          counter_answer_false++;
          wrong_answer.innerHTML = counter_answer_false;
        }
        answer_word_btn.classList.add("new_answer_word_btn");
        new_answer_btn = document.querySelector(".new_answer_word_btn");
        if (contrl_to_answer == 0) {
            take_arrays_to_words(num1,response.length_array_word);
            contrl_to_answer++;      
        }
        const forRand = response.length_array_word;
        console.log(num1);
        console.log(forRand);
        if ( num1.length == 0) {
                // RundOfArrays(num1,num2,forRand)
              alert(`${name} ваш словарь закончился!`);
        }
        else{
            RundOfArrays(num1,num2,forRand)

            let next_word = num2[num2.length - 1];
            next_answer(next_word,name);
            // console.log(`${num1} массив 1 его длинна ${num1.length}`);
            // console.log(`${num2} массив 2 его длинна ${num2.length}`);
            
        }
      },
      error: function(error) {
          console.log(error);
      }
    });
    
}


const next_answer = (next_word,name) => {
    this.next_word = next_word;
    this.name = name ;
    $.ajax({
        type: "POST",
        url: "/next_answer",
        data: { name:name,id_word: next_word},
        type: 'POST',
        success: function(response) {
          console.log(response.next_word)
          ru_word.value = response.next_word;
        },
        error: function(error) {
            console.log(error);
        }
      });
}