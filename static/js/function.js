
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

function RundOfArrays(arr1,arr2,length_arr_num1) {
    
    let same_nambers = rand(length_arr_num1);
    // console.log(`выпавшее число ${same_nambers}`);
    if ((contains(arr1,same_nambers)==true) && (contains(num2,same_nambers)== false)) {
        arr1.remByVal(same_nambers);
        arr2.push(same_nambers);
        return;
    } else {
        // RundOfArrays(arr1,arr2);
        setTimeout(RundOfArrays(arr1,arr2,length_arr_num1),1000);
    }
}



// var numPool = [ 13, 21, 36, 14, 27, 10 ];

// function shuffle(numPool) {
//   for(var j, x, i = numPool.length; i; j = parseInt(Math.random() * i), x = numPool[--i], numPool[i] = numPool[j], numPool[j] = x);
//   return numPool;
// };
// var randomResult = shuffle(numPool);
// while( randomResult.length > 0 ) {
//   console.log( randomResult.pop() );
// }