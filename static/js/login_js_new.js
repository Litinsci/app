var
    come_in      = document.querySelector(".come_in"),//кнопка входа только на нажатие
    registration = document.querySelector(".registration"),//кнопк регистрации (только на нажатие)
    come_in_btn  = document.querySelector(".come_in_btn"),//кнопка входа целиком
    reg_contain  = document.querySelector(".reg_contain"), //поля регистрации  
    to_reg       = document.querySelector(".to_reg"),//регистрация                                  
    come_in_contain = document.querySelector(".come_in_contain"),
    btn_back     = document.querySelector(".btn_back"),// стрелка вправо
    btn_back_in  = document.querySelector(".btn_back1"),// стрелка вправо
    wrap         = document.querySelector(".wrap"),//обёртка кнопки
    wrap1         = document.querySelector(".wrap1"),
    come_in_btn1  = document.querySelector(".come_in_btn1");



let togleObj1 ={
    construcrorRegistrationObj(bloks,...typeDisplay){
        let i = 0;
        for (let block of bloks) {
            block.style.cssText = `display:${typeDisplay[i]};`;
            i++;
        }
    },
    constructorAnimation(blocksAnimate,...typeAnimate){
        let i = 0;
        for (let block of blocksAnimate) {
            block.style.cssText = `animation:${typeAnimate[i]};`;
            i++;
        }
    }
};

// Переключатели кнопок
// регистрация первое нажатие
registration.onclick = function n(){
    arr = ["flex","none","flex","none","none","flex"];
    arr1 = [reg_contain,come_in_btn,btn_back,btn_back_in,wrap,wrap1]
    togleObj1.construcrorRegistrationObj(arr1,...arr);
} 


// кнопка возврата к выбору
btn_back.onclick = function (){
    arr = ["none","block","none","block","none","none"];
    arr1 = [reg_contain,come_in_btn,btn_back,registration,wrap1,]
    togleObj1.construcrorRegistrationObj(arr1,...arr);


    arr1=['form-fly-up 0.8s ease;'];
    arr=[wrap];
    togleObj1.constructorAnimation(arr,...arr1);
}


// кнопка первичного входа
come_in.onclick = function(){
    arr1=['none;'];
    arr=[come_in_btn];
    togleObj1.constructorAnimation(arr,...arr1);


    arr = ["block","none","flex","none","flex"];
    arr1 = [btn_back_in,to_reg,come_in_contain,come_in_btn,come_in_btn1]
    togleObj1.construcrorRegistrationObj(arr1,...arr);
}


// возврат от первичного входа
btn_back_in.onclick =function (){
    arr1=['form-fly-up 0.8s ease;'];
    arr=[come_in_btn];
    togleObj1.constructorAnimation(arr,...arr1);
    
    // come_in_btn.style.cssText = "animation: form-fly-up 0.8s ease;";
    arr = ["none","none","flex","flex","none"];
    arr1 = [come_in_contain,btn_back_in,to_reg,come_in_btn,come_in_btn1,]
    togleObj1.construcrorRegistrationObj(arr1,...arr)
}
// вход и регистрация "logika"
 var
    reg_name,reg_pas1,reg_pas2,name_com,pas_com;


// *************************************
// регистрация
// отправляет регистрационное имя и значения с поллей ввода пароля 1 и 2 перед этим сравних их
// если ответ 'new' провести регистрацию
wrap1.onclick = function () {
    reg_name = document.getElementById("name_reg").value;
    reg_pas1 = document.getElementById("p1").value;
    reg_pas2 = document.getElementById("p2").value;
    if (reg_name == "" || reg_pas1 == "" ||  reg_pas2 == "") {
        alert("Заполните все поля");
    }else{
        if (reg_pas1.length<10) {
            alert("Пароль должени составляять не мениие 10 знаков");
        } else {
            if (reg_pas1 == reg_pas2) {
                $.ajax({
                    type: "POST",
                    url: "/reg",
                    data: { reg_name: reg_name, reg_pas: reg_pas1},
                    type: 'POST',
                    success: function(response) {
                        // console.log(response.name);
                        // alert(response.name);
                        if (response.name == "new") {
                            document.location.replace("/index");
                        }else{
                            alert(response.name);
                        }
                    },
                    error: function(error) {
                        console.log(error);
                    }
                });
            } else {
                alert("Пароли не совподают!");
            } 
        }
        
    }
}



// Вход
//отправкляет имя пользователя и пароль
// принимает тип имени если 'old' осуществить вход
come_in_btn1.onclick = function(){
    name_com = document.getElementById("name_com").value;
    pas_com = document.getElementById("pas_com").value;
    if (name_com == "" || pas_com == "") {
        alert("Заполните все поля");
    }else{
        $.ajax({
            type: "POST",
            url: "/come_in",
            data: { name_com: name_com, pas_com: pas_com},
            type: 'POST',
            success: function(response) {
                if (response.name == "old") {
                    document.location.replace("/index");
                }else{
                    alert("Не верный логин или пароль");
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    }
}