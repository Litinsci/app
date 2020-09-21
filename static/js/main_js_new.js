;
var
    header = document.querySelector(".bar"),
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
    to_add_words = document.getElementById("to_add_words"),
    test_list_btn = document.getElementById("test_list_btn"),
    to_add_words_btn = document.getElementById("to_add_words_btn"),
    testing = document.querySelector(".testing");

let [addit_word_btn, answer_word_btn, now_answer_word_btn] = [document.getElementById("addit_word_btn"), document.getElementById("answer_word_btn"), document.getElementById("now_answer_word_btn")];
var [ru_word, en_word] = [document.getElementById("ru_word"), document.getElementById("en_word")];


let main_block = document.querySelector("main"),
    counter_answers = document.getElementById("counter");
let [correct_answer, wrong_answer, counter_answer_true = 0, counter_answer_false = 0] = [document.getElementById("true"), document.getElementById("false")]

let name = document.querySelector(".username_bar").innerHTML;



en_word.onkeyup = function () {
    var reg = /[а-яА-ЯёЁ^0-9.]/g;
    if (this.value.search(reg) != -1) {
        this.value = this.value.replace(reg, '');
        alert("В данное поле можно вводить только английские символы");
    }

}
//a-zA-Z 
ru_word.onkeyup = function () {
    var reg = /[a-zA-Z]/g;
    if (this.value.search(reg) != -1) {
        this.value = this.value.replace(reg, '');
        alert("В данное поле можно вводить только русские символы");
    }
}



//````dom movies````
exit.onclick = function () {
    document.location.replace("/unsetsession");
}

// 
let togleCssObj = {
    cssTogle(bloks, CssRuls, ...typeDisplay) {
        let i = 0;
        for (let block of bloks) {
            block.style.cssText = `${CssRuls[i]}:${typeDisplay[i]};`;
            i++;
        }
    },
    showHideTBlock(TypeToSwetch,...bloks){
        let i = 0;
        if (bloks[0].style.display == "none") {
            for (let element of bloks) {
                element.style.display = `${TypeToSwetch}`;
            }
        } else {
            for (let element of bloks) {
                element.style.display = "none";
            }
        }
    }

};
// 


hide_panel.onclick = function () {
    icons.style.display = "none";
    header.style.width = "7%";
    main_block.style.cssText = "margin: 10% 15% 5% 33%";
    counter_answers.style.cssText = "margin: 10% 15% 5% 33%";
    // showHide_flex(list);
    // showHide_flex(icons);
    togleCssObj.showHideTBlock("flex",list);
    togleCssObj.showHideTBlock("flex",icons);
}


fa_ellipsis_h.onclick = function () {
    header.style.width = "20%";
    main_block.style.cssText = "margin: 10% 15% 5% 20%";
    counter_answers.style.cssText = "margin: 10% 15% 5% 20%";
    // showHide_flex(list);
    // showHide_flex(icons);
    togleCssObj.showHideTBlock("flex",list);
    togleCssObj.showHideTBlock("flex",icons);
}




addit_word_btn.setAttribute("disabled", "true");
// переход от ответа к добавлению
test_list_btn.onclick = function () {
    togle_animate(to_add_words, test_list, addit_word_btn, answer_word_btn, ru_word, en_word);
    answer_word_btn.setAttribute("disabled", "true");
    addit_word_btn.removeAttribute("disabled");
    ru_word.value = "";
    en_word.value = "";
}

// переход к ответу от добавления
to_add_words_btn.onclick = function () {
    togle_animate(to_add_words, test_list, addit_word_btn, answer_word_btn, ru_word, en_word);
    addit_word_btn.setAttribute("disabled", "true");
    answer_word_btn.removeAttribute("disabled");
    en_word.value = "";
    load_page();
}

// кнопка отправки ответа

let num1 = [0],
    num2 = [0]; //массивы для индексов слов и ответов
let forRand; //для функции определеняи рандомного числа в массиве
let contrl_to_answer = 0; //контроль срабатывания функции
let new_answer_btn; //`кнопка нового ответа`

// Кнопка ответа через #ID
answer_word_btn.onclick = function () {
    console.log(num1);
    console.log(num2);
    first_answer(num1, num2);
}


now_answer_word_btn.onclick = () => {
    console.clear();
    num1 = [0], num2 = [0];
    counter_answer_true = 0;
    counter_answer_false = 0;
    correct_answer.innerHTML = counter_answer_true;
    wrong_answer.innerHTML = counter_answer_false;
    now_answer();
    showHide_flex(answer_word_btn);
    showHide_flex(now_answer_word_btn);

}





// console.log(contains(num2,11));
// кнопка отправки добавления слов
addit_word_btn.onclick = function () {
    let ru, en, name;
    ru = ru_word.value;
    en = en_word.value;
    name = document.querySelector(".username_bar").innerHTML;
    reg = /[а-яА-ЯёЁ]/g;
    if (en != reg) {
        alert("good boy")
    }
    $.ajax({
        type: "POST",
        url: "/add_words",
        data: {
            name: name,
            ru_word: ru,
            en_word: en
        },
        type: 'POST',
        success: function (response) {
            alert(response.name);
        },
        error: function (error) {
            console.log(error);
        }
    });
}


let dictionary_block = document.querySelector(".wrapper_to_dictionary"),
    wrapper = document.querySelector(".wrapper"),
    click_counter = 0;
// при загрузке страницы подтянуть значение из бд


dictionary.onclick = () => {
    wrapper.classList.toggle("active_wrapper");
    dictionary_block.classList.toggle("active_dictionary_block");
    // togle_animate(wrapper,dictionary_block);
}



window.onload = function () {
    load_page();
    console.clear();
    $('#form_send_msg').on('submit', (e) => {
        e.preventDefault();
    });
}
// SOKET


let Chat = document.querySelector(".Chat");
let chat_bar = document.getElementById("chat");
let conteiner = document.querySelector(".container");
let for_soket = 0;
Chat.onclick = () => {
    // alert("f");
    togle_animate(chat_bar, wrapper, conteiner);
    // conteiner.style.display = "block";
    // socket.disconnect();
    const socket = io.connect('http://127.0.0.1:81');
    const username = name;
    if (for_soket == 0) {
        socket.on('connect', () => {
            socket.send({
                'username': 'Service message',
                'msg': 'User ' + username + ' has connected!'
            });
        });


        $('#send_msg').on('click', () => {
            socket.send({
                'msg': $('#message_input').val(),
                'username': username
            });
            $('#message_input').val('');
        });
        $('#send_msg').on('click', () => {
            socket.send({
                'msg': $('#message_input').val(),
                'username': username
            });
            $('#message_input').val('');
        });

        socket.on('message', data => {
            if (data.msg.length > 0) {
                if (data.username === 'Service message') {
                    $('#messages').append(`<p class="text-muted"><strong>${data.username}:</strong> ${data.msg}</p>`);
                } else {
                    $('#messages').append(`<p class="text-muted"><strong>${data.username}:</strong> ${data.msg}</p>`);
                }
                // $('#messages').append(`<li class="text-muted"><strong>${data.username}:</strong> ${data.msg}</li>`);
                console.log('Received message');
            }
        });
        for_soket++;
    } else {
        socket.disconnect();
    }

}
//