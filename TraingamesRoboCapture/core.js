var phrases = ["I am not a robot", "I´m not a robot", "I am human", "I am not a program",
 "I am not a bot", "I am a true people", "I don´t have codes"];

var invisible = ["\r","\n","\t","\0","\1","\r\r","\r\2","\2\1","\r\n","\0\r\n"];
var message;
var tryes = 0;
var human = false;

function loop()
{
    tryes = 5;
    human = false;
    block_timeout();
}

function block_timeout()
{
    var element = document.getElementById("rb_capture");
    var html = element.outerHTML;
    element.innerHTML = "Sorry: Timed-out<br><button id='reload'>Reload</button>";
    element.style = "color:red;";
    var btn = document.getElementById("reload");  
    btn.onclick = function()
    {
        element.outerHTML = html;
        tryes = 0;
    };
}


function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

function setRandomPhrase()
{
    var index = getRandomInteger(0,phrases.length);
    message = phrases[index];
    var element = document.getElementById("message");
    element.innerText = message;
}

function setHuman()
{
    human = true;
    var element = document.getElementById("rb_capture");
    element.innerHTML = "You are human!";
    element.style = "color:green;";
}

function block()
{
    var element = document.getElementById("rb_capture");
    element.innerHTML = "Sorry: You are blocked\n";
    var ch = invisible[getRandomInteger(0,invisible.length)];
    element.innerHTML += ch;
    element.style = "color:red;";
}

function checkUser(e)
{
    if (human == true)
    return;
    if (tryes > 4)
    {
        block();
        return;
    }
    if (e != "Enter")
    return;
    var element = document.getElementById("user_type");
    var text = element.value;
    if (text == message)
    {
        setHuman();
    }
    else
    {
        alert("Incorret answer!");
        setRandomPhrase();
        tryes ++;
        element.value = "";
    }
}

function answer(message)
{
    window.parent.postMessage(message,"*");
}

function handleMessage(mess)
{
    if (mess == "result")
    {
        if (human == true)
        answer("human");
        else if (tryes > 0 && tryes <= 4)
        answer("robot");
        else if (tryes == 0)
        answer("never-tryed");
        else
        answer("robot-confirmed");
    }
}