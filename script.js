// REGISTER
function register() {
  let name = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if(name=="" || pass=="") {
    alert("Enter username and password");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if(users[name]){
    alert("Username already registered");
    return;
  }

  users[name] = pass;
  localStorage.setItem("users", JSON.stringify(users));

  alert("Register successful! Please login.");
  window.location.href = "index.html";
}

// LOGIN
function login() {
  let name = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if(users[name] && users[name]==pass){
    localStorage.setItem("user", name);
    window.location.href = "chat.html";
  } else {
    alert("Wrong username or password");
  }
}

// SHOW USER ON CHAT
window.onload = function() {
  let name = localStorage.getItem("user");
  let my = document.getElementById("myname");
  if(my && name){
    my.innerHTML = name + " (You)";
  }
}

// SEND MESSAGE
function sendMsg(){
  let input = document.getElementById("msg");
  let chat = document.getElementById("chatbox");
  let name = localStorage.getItem("user") || "User";

  if(input.value.trim()!=""){
    let div = document.createElement("div");
    div.className="msg";
    div.innerHTML="<b>"+name+"</b><br>"+input.value;
    chat.appendChild(div);
    input.value="";
    chat.scrollTop=chat.scrollHeight;
  }
}

// UPLOAD FILE/IMAGE
function uploadFile(){
  let file = document.getElementById("file").files[0];
  if(!file) return;

  let url = URL.createObjectURL(file);
  let chat = document.getElementById("chatbox");
  let name = localStorage.getItem("user") || "User";
  let div = document.createElement("div");
  div.className="msg";
  div.innerHTML="<b>"+name+"</b><br>";

  if(file.type.startsWith("image")){
    let img=document.createElement("img");
    img.src=url;
    div.appendChild(img);
  }

  let link = document.createElement("a");
  link.href = url;
  link.download = file.name;
  link.innerText = "Download "+file.name;
  div.appendChild(link);
  chat.appendChild(div);
  chat.scrollTop=chat.scrollHeight;
}

// VOICE MESSAGE (Hold-to-Record)
let recorder;
let chunks=[];

function startVoice(){
  navigator.mediaDevices.getUserMedia({audio:true})
  .then(stream=>{
    recorder = new MediaRecorder(stream);
    chunks=[];
    recorder.ondataavailable = e=>chunks.push(e.data);
    recorder.onstop = e=>{
      let blob = new Blob(chunks,{type:"audio/webm"});
      let url = URL.createObjectURL(blob);
      let chat = document.getElementById("chatbox");
      let name = localStorage.getItem("user") || "User";

      let div = document.createElement("div");
      div.className = "msg";
      div.innerHTML = "<b>"+name+"</b><br>";

      let audio = document.createElement("audio");
      audio.controls=true;
      audio.src=url;

      let link = document.createElement("a");
      link.href=url;
      link.download="voice.webm";
      link.innerText="Download voice";

      div.appendChild(audio);
      div.appendChild(link);
      chat.appendChild(div);
      chat.scrollTop=chat.scrollHeight;
    };

    recorder.start();
  })
  .catch(()=>alert("Allow microphone permission"));
}

function stopVoice(){
  if(recorder && recorder.state === "recording") recorder.stop();
}

// MEMBERS TOGGLE
function toggleMembers(){
  let m=document.getElementById("members");
  if(m.style.display=="block") m.style.display="none";
  else m.style.display="block";
}

// VOICE CALL DEMO
function voiceCall(){
  alert("Voice call needs server");
}