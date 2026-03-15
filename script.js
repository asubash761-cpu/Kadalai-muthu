function toggleMembers(){

let box=document.getElementById("members");

if(box.style.display==="block")
box.style.display="none";
else
box.style.display="block";

}

function sendMsg(){

let input=document.getElementById("msg");
let chat=document.getElementById("chatbox");

if(input.value!=""){

let div=document.createElement("div");
div.className="msg";
div.innerText=input.value;

chat.appendChild(div);

input.value="";

}

}

function openPrivate(name){

alert("Private chat with "+name);

}