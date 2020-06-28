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
// Переключатели кнопок
// регистрация первое нажатие
registration.onclick = function n(){
    reg_contain.style.cssText = "display:flex;";
    come_in_btn.style.cssText = "display:none";
    btn_back.style.cssText = "display:flex";
    btn_back_in.style.cssText = "display:none";
    wrap.style.cssText = "animation: none";
    wrap.style.cssText = "display:none";
    wrap1.style.cssText = "display:flex";
} 
// кнопка возврата к выбору
btn_back.onclick = function (){
    reg_contain.style.cssText = "display:none;";
    come_in_btn.style.cssText = "display:block";
    btn_back.style.cssText = "display:none";
    registration.style.cssText = "display:block";
    wrap1.style.cssText = "display:none";
    wrap.style.cssText = "animation: form-fly-up 0.8s ease;";
}
// кнопка первичного входа
come_in.onclick = function(){
    // registration.style.cssText = "display:none";
    btn_back_in.style.cssText = "display:block";
    to_reg.style.cssText = "display:none";
    come_in_contain.style.cssText= "display:flex;";
    come_in_btn.style.cssText = "animation: none";
    come_in_btn.style.cssText = "display:none";
    come_in_btn1.style.cssText = "display:flex";
}
// возврат от первичного входа
btn_back_in.onclick =function (){
    come_in_btn.style.cssText = "animation: form-fly-up 0.8s ease;";
    come_in_contain.style.cssText= "display:none;";
    btn_back_in.style.cssText = "display:none";
    to_reg.style.cssText = "display:flex";
    come_in_btn.style.cssText = "display:flex";
    come_in_btn1.style.cssText = "display:none";
}
// вход и регистрация "logika"
 var
    reg_name,reg_pas1,reg_pas2,name_com,pas_com;


// *************************************
// регистрация
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