// show registered user
window.onload=function(){

let name=localStorage.getItem("user");

if(name){
document.getElementById("myname").innerHTML=name+" (You)";
}

}


// send text message
function sendMsg(){

let input=document.getElementById("msg");
let chat=document.getElementById("chatbox");

let name=localStorage.getItem("user") || "User";

if(input.value.trim()!=""){

let div=document.createElement("div");
div.className="msg";

div.innerHTML="<b>"+name+"</b><br>"+input.value;

chat.appendChild(div);

chat.scrollTop=chat.scrollHeight;

input.value="";

}

}


// upload image/file
function uploadFile(){

let file=document.getElementById("file").files[0];
if(!file) return;

let url=URL.createObjectURL(file);

let chat=document.getElementById("chatbox");

let name=localStorage.getItem("user") || "User";

let div=document.createElement("div");
div.className="msg";

div.innerHTML="<b>"+name+"</b><br>";

if(file.type.startsWith("image")){

let img=document.createElement("img");
img.src=url;

div.appendChild(img);

}

let link=document.createElement("a");
link.href=url;
link.download=file.name;
link.innerText="Download "+file.name;

div.appendChild(link);

chat.appendChild(div);

chat.scrollTop=chat.scrollHeight;

}


// voice recording
let recorder;
let chunks=[];

function startVoice(){

navigator.mediaDevices.getUserMedia({audio:true})
.then(stream=>{

recorder=new MediaRecorder(stream);

recorder.start();

chunks=[];

recorder.ondataavailable=e=>chunks.push(e.data);

recorder.onstop=e=>{

let blob=new Blob(chunks,{type:"audio/webm"});
let url=URL.createObjectURL(blob);

let chat=document.getElementById("chatbox");

let name=localStorage.getItem("user") || "User";

let div=document.createElement("div");
div.className="msg";

div.innerHTML="<b>"+name+"</b><br>";

let audio=document.createElement("audio");
audio.controls=true;
audio.src=url;

let link=document.createElement("a");
link.href=url;
link.download="voice.webm";
link.innerText="Download voice";

div.appendChild(audio);
div.appendChild(link);

chat.appendChild(div);

chat.scrollTop=chat.scrollHeight;

};

setTimeout(()=>recorder.stop(),4000);

})
.catch(()=>alert("Allow microphone permission"));

}


// members toggle
function toggleMembers(){

let m=document.getElementById("members");

if(m.style.display=="block")
m.style.display="none";
else
m.style.display="block";

}


// voice call demo
function voiceCall(){

alert("Voice call needs WebRTC server");

}