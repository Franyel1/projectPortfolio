let add = document.getElementById("add");
let addNew = document.getElementById("addNew");
let cancel = document.getElementById("cancel");
let save = document.getElementById("save");
let title = document.getElementById("title");
let category = document.getElementById("category");
let description = document.getElementById("description");
let error = document.getElementById("error");
let post = document.getElementById("post");
let form1 = document.getElementById("form1");
let season = document.getElementById("seasonView");

let postName = document.getElementById("postName");
let postSeason = document.getElementById("postSeason");
let postDes = document.getElementById("postDes");
let postAcc = document.getElementById("postAcc");
let postCrea = document.getElementById("postCrea");
let postInfo = document.getElementById("postInfo");
let close = document.getElementById("close");

let allNotes;
let allDelete;

let completedView = document.getElementById("compOrNot");

let editPanel = document.getElementById("editPanel");
let save2 =document.getElementById("save2");
let cancel2=document.getElementById("cancel2");
let categoryEdit= document.getElementById("categoryEdit");
let error2 = document.getElementById("error2");
let form2 = document.getElementById("form2");
let titleEdit=document.getElementById("titleEdit");
let descriptionEdit=document.getElementById("descriptionEdit");

let allEdits;
let allTexts;


add.onmouseover = function(){
    add.style.width = "12%";
}
add.onmouseleave = function(){
    add.style.width = "auto";
}

add.onclick = function(event){
    event.preventDefault();
    addNew.style.display = "block";
}
cancel.onclick = function(event){
    event.preventDefault();
    addNew.style.display="none";
    form1.reset();
}
save.onclick = function(event){
    event.preventDefault();
    if (title.value =="" || description.value==""){
        error.style.display ="flex";
        return;
    }

    let newPost = document.createElement("div");
    newPost.classList.add("postIt");
    if (category.value == "spring") {newPost.style.backgroundColor="#A5F593";}
    else if (category.value == "summer") {newPost.style.backgroundColor="#77A904";}
    else if (category.value == "fall") {newPost.style.backgroundColor="#F26F1C";}
    else {newPost.style.backgroundColor="#B2EAFF";}


    newPost.dataset.descData = description.value;
    newPost.dataset.descTitle = title.value;
    newPost.dataset.descSeason = category.value;
    newPost.dataset.descComp = "no";

    let dateCrea = new Date();
    let hours = dateCrea.getHours();
    let minutes = dateCrea.getMinutes();
    let amOrPm;
    
    if (hours >= 12) {
        amOrPm = 'PM';
        if (hours > 12) {
            hours -= 12;
        }
    }
    else {
        amOrPm = 'AM';
        if (hours === 0) {
            hours = 12;
        }
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    newPost.dataset.descDate = (dateCrea.getMonth() + 1) + "/" + dateCrea.getDate() + 
    "/" + dateCrea.getFullYear() + " " + hours + ":" + minutes + " " + amOrPm;


    let text= document.createElement("div");
    text.classList.add("texts");
    text.innerHTML = newPost.dataset.descTitle;
    newPost.appendChild(text);


    addNew.style.display="none";
    form1.reset();

    let delete1 = document.createElement("img");
    delete1.src= "images/delete_button.png";
    delete1.classList.add("deleteButton");
    delete1.style.display = "none";
    delete1.style.cursor = "pointer";

    let edit = document.createElement("img");
    edit.src= "images/edit_button.png";
    edit.classList.add("editButton");
    edit.style.display = "none";
    edit.style.cursor = "pointer";

    let check1 = document.createElement("input");
    check1.type = "checkbox";
    check1.name = "completed";
    check1.classList.add("checkBox");
    check1.style.cursor="pointer";


    newPost.appendChild(delete1);
    newPost.appendChild(check1);
    newPost.appendChild(edit);
    newPost.style.display = "none";
    //need to see the season drop down menu to see if we can show it
    if (season.value == newPost.dataset.descSeason) {newPost.style.display = "block";}
    else if (season.value == "showAll"){newPost.style.display = "block";}

    if (completedView.value == "completed"){newPost.style.display = "none";}
    post.appendChild(newPost);
    let postClick = true;

    allNotes = document.querySelectorAll(".postIt");
    allDelete =document.querySelectorAll(".deleteButton");
    allChecks = document.querySelectorAll(".checkBox");
    allEdits = document.querySelectorAll(".editButton");
    allTexts = document.querySelectorAll(".texts");

    for (let i=0; i<allNotes.length; i++)
    {
        allNotes[i].appendChild(delete1);
        allNotes[i].onmouseover = function xButton(){
            allDelete[i].style.display ="block";
            allEdits[i].style.display ="block";
            postClick = true;
        }

        allDelete[i].onmouseover = function xButton(){
            allDelete[i].style.display ="block";
            allEdits[i].style.display ="block";
            postClick = false;
        }
        allChecks[i].onmouseover = function(){
            postClick = false;
        }
        allEdits[i].onmouseover = function(){
            postClick = false;
        }

        allDelete[i].onclick = function(){
            postClick = false;
            deletePost(i);
        }
        
        allNotes[i].onmouseout = function(){
            allDelete[i].style.display="none";
            allEdits[i].style.display ="none";
        } 
        allChecks[i].onclick =function(){
            postClick = false;
            if (allNotes[i].dataset.descComp == "no") {allNotes[i].dataset.descComp="yes"}
            else {allNotes[i].dataset.descComp="no"}
            console.log(allNotes[i].dataset.descComp);
        } 
        allNotes[i].onclick = function(){
            if (postClick){
                postInfo.style.display = "block";
                postName.innerHTML = allNotes[i].dataset.descTitle;
                postSeason.innerHTML = allNotes[i].dataset.descSeason;
                postCrea.innerHTML = allNotes[i].dataset.descDate;
                postDes.innerHTML = allNotes[i].dataset.descData;
                let dateNow = new Date();
                let hours = dateNow.getHours();
                let minutes = dateNow.getMinutes();
                let amOrPm;
                
                if (hours >= 12) {
                    amOrPm = 'PM';
                    if (hours > 12) {
                        hours -= 12;
                    }
                }
                else {
                    amOrPm = 'AM';
                    if (hours === 0) {
                        hours = 12;
                    }
                }
                if (minutes < 10) {
                    minutes = '0' + minutes;
                }
                postAcc.innerHTML = (dateNow.getMonth() + 1) + "/" + dateNow.getDate() + 
                "/" + dateNow.getFullYear() + " " + hours + ":" + minutes + " " + amOrPm;
            }
        }
        allEdits[i].onclick = function(){
            postClick = false;
            editPanel.style.display = "block";
            titleEdit.value = allNotes[i].dataset.descTitle;
            categoryEdit.value = allNotes[i].dataset.descSeason;
            descriptionEdit.value = allNotes[i].dataset.descData;

            save2.onclick=function(){
                allNotes[i].dataset.descTitle = titleEdit.value;
                allNotes[i].dataset.descSeason = categoryEdit.value;
                allNotes[i].dataset.descData = descriptionEdit.value;

                allTexts[i].innerHTML = titleEdit.value;

                if (categoryEdit.value == "spring") {allNotes[i].style.backgroundColor="#A5F593";}
                else if (categoryEdit.value == "summer") {allNotes[i].style.backgroundColor="#77A904";}
                else if (categoryEdit.value == "fall") {allNotes[i].style.backgroundColor="#F26F1C";}
                else {allNotes[i].style.backgroundColor="#B2EAFF";}

                editPanel.style.display = "none";
            }
            
            cancel2.onclick=function(){
                editPanel.style.display = "none";
            }
        }
    }

    function deletePost(n){
        allNotes[n].remove();
    }
    close.onclick =function(){
        postInfo.style.display = "none";
    }
    event.stopPropagation();
}



season.onchange = function(){
    if (allNotes !=null){
        if (season.value == "showAll")
        {
            for (let i=0; i<allNotes.length; i++)
            {
                allNotes[i].style.display = "block";
            }
        }else{
            for (let i=0; i<allNotes.length; i++)
            {
                allNotes[i].style.display = "none";
                if (season.value == allNotes[i].dataset.descSeason){allNotes[i].style.display = "block";}
                
            }
        }
    }
}

completedView.onchange = function(){
    if (allChecks !=null){
        if (completedView.value == "all")
        {
            for (let i=0; i<allChecks.length; i++)
            {
                allNotes[i].style.display = "block";
            }
        }else if (completedView.value == "notCompleted") {
            for (let i=0; i<allChecks.length; i++)
            {
                allNotes[i].style.display = "none";
                if (allNotes[i].dataset.descComp == "no"){allNotes[i].style.display = "block";}
            }
        }else{
            for (let i=0; i<allChecks.length; i++)
            {
                allNotes[i].style.display = "none";
                if (allNotes[i].dataset.descComp == "yes"){allNotes[i].style.display = "block";}
        
            }
        }
    }
}
