let discuss = [];
var right2 = document.getElementById("right");
var submi = document.getElementById("submit1");
let uid = 0;
let starclick = false;
let id;
let subject = document.getElementById("subject");
let question = document.getElementById("question");
let questions = document.getElementsByClassName("questions")[0];
let right = document.getElementsByClassName("right")[0];
let newformbutton = document.getElementsByClassName("new-question")[0];
reload();
function sorting() {
    discuss.sort(function (a, b) {
        return (b.likes - a.likes) - (b.dislikes - a.dislikes);

    })
    reload(discuss);
}
let favv = document.getElementById("favv");
favv.addEventListener("click", favvv);
function favvv() {
    discuss.sort(function (a, b) {
        console.log(a.fav, b.fav);
        return b.fav - a.fav;

    })
    reload(discuss);
}

let search = document.getElementById("search");
search.addEventListener("keyup", function () {
    let size = discuss.length;
    let find = search.value.trim();
    if (find != "") {
        questions.innerHTML = "";
        for (let i = 0; i < size; i++) {
            if (discuss[i].subject.search(find) != -1 || discuss[i].question.search(find) != -1) {
                let sub = discuss[i].subject;
                let ques = discuss[i].question;
                let idd = discuss[i].id;
                let query = document.createElement("div");
                query.id = idd;
                console.log(query.id);
                let newsub = document.createElement("div");
                newsub.style.fontSize = "30px";
                newsub.style.pointerEvents = "none";
                let newques = document.createElement("div");
                newques.style.pointerEvents = "none";
                let hr = document.createElement("hr");
                hr.id = idd;
                newsub.id = idd;
                newques.id = idd;
                newsub.innerHTML = sub;
                newques.innerHTML = ques;
                if (discuss[i].subject.search(find) != -1) {
                    let pos = discuss[i].subject.search(find);
                    let endpos = find.length;
                    let abc = newsub.innerHTML.length;
                    newsub.innerHTML = newsub.innerHTML.substring(0, pos) + `<span style='color:#0E8388'>${newsub.innerHTML.substring(pos, pos + endpos)}</span>${newsub.innerHTML.substring(pos + endpos, abc)}`;
                    // app.style.Color="blue";
                }
                if (discuss[i].question.search(find) != -1) {
                    let pos = discuss[i].question.search(find);
                    let endpos = find.length;
                    let abc = newques.length;
                    newques.innerHTML = newques.innerHTML.substring(0, pos) + `<span style='color:#0E8388'>${newques.innerHTML.substring(pos, pos + endpos)}</span>${newques.innerHTML.substring(pos + endpos, abc)}`;
                    //   newques.innerHTML.substring(pos,(pos+endpos)).style.color="pink";
                }
                console.log(newsub.innerHTML + newques.innerHTML);

                let like = document.createElement("a");
                let likecounter = discuss[i].likes;

                like.className = "fa fa-thumbs-up";
                like.id = idd;
                like.innerHTML = `${likecounter}`;
                like.style.margin = "5px";

                let dislike = document.createElement("a");
                dislike.className = "fa fa-thumbs-down";
                let dislikecounter = discuss[i].dislikes;
                dislike.id = idd;
                dislike.innerHTML = 0;
                dislike.style.margin = "5px";
                dislike.innerHTML = `${dislikecounter}`;
                let star = document.createElement("a");
                star.id = idd;
                star.className = "fav fa fa-star";
                star.style.color = "white";
                star.style.margin = "5px ";

                // debugger;
                let icons = document.createElement("div");
                icons.id = idd;
                icons.style.display = "flex";
                icons.style.flexDirection = "row";
                icons.style.justifyContent = "flex-end";

                icons.appendChild(like);
                icons.appendChild(dislike);
                icons.appendChild(star);
                query.appendChild(newsub);
                query.appendChild(newques);
                query.appendChild(icons);

                query.appendChild(hr);
                if (like.innerHTML > 0) {
                    like.style.color = "blue";
                }
                if (dislike.innerHTML > 0) {
                    dislike.style.color = "grey";
                }
                if (discuss[i].fav == true) {
                    star.style.color = "C92C6D";
                }
                else star.style.color = "white";
                questions.appendChild(query);
                query.addEventListener("click", function (event) {
                    if (event.target == like) {
                        like.style.color = "blue";

                        likecounter++;
                        like.innerHTML = `${likecounter}`;
                        for (let i = 0; i < discuss.length; i++) {
                            if (discuss[i].id == event.target.id) {
                                discuss[i].likes = likecounter;
                            }
                        }
                        sorting();
                        localStorage.setItem("Questions", JSON.stringify(discuss));
                    }
                    else if (event.target == star) {
                        // star.addEventListener("click",function(event){
                        if (starclick == false) {
                            event.target.style.color = "C92C6D";
                            starclick = true;
                            //ob["fav"]=true;
                            for (let i = 0; i < discuss.length; i++) {
                                if (discuss[i].id == event.target.id) {
                                    discuss[i].fav = true;
                                }
                            }
                            localStorage.setItem("Questions", JSON.stringify(discuss));
                        }

                        else {
                            event.target.style.color = "white";
                            starclick = false;
                            ob["fav"] = false;
                            for (let i = 0; i < discuss.length; i++) {
                                if (discuss[i].id == event.target.id) {
                                    discuss[i].fav = false;
                                }
                            }
                            localStorage.setItem("Questions", JSON.stringify(discuss));
                        }

                    }
                    else if (event.target == dislike) {
                        dislike.style.color = "grey";
                        // dislike.style.display="none";

                        dislikecounter++;
                        dislike.innerHTML = `${dislikecounter}`;
                        for (let i = 0; i < discuss.length; i++) {
                            if (discuss[i].id == event.target.id) {
                                discuss[i].dislikes = dislikecounter;
                            }
                        }
                        sorting();
                        localStorage.setItem("Questions", JSON.stringify(discuss));
                    }
                    else
                        showResponse(event, query);
                })
                console.log("ss");
                console.log(query);
                console.log(questions);
            }

        }
    }
    else {
        questions.innerHTML = "";
        discuss = [];
        reload();
    }

})
function reload(d = 0) {
   
    questions.innerHTML = "";
    let old = d || JSON.parse(localStorage.getItem("Questions"));
    discuss = [];
    if (old != null) {
        for (let i = 0; i < old.length; i++) {
            let subject = old[i].subject;
            let question = old[i].question;
            let idd = old[i].id;
            // AddQues(subject,question,old[i].id);
            // function AddQues(subject,question,idd){

            let ob = {};
            id = Date.now();
            let query = document.createElement("div");
            let sub = subject;
            let ques = question;
            query.id = idd;
            //console.log(query.id);
            let newsub = document.createElement("div");
            newsub.style.fontSize = "30px";
            newsub.style.pointerEvents = "none";
            let newques = document.createElement("div");
            newques.style.pointerEvents = "none";

            let hr = document.createElement("hr");
            hr.id = idd;
            newsub.id = idd;
            newques.id = idd;

            newsub.innerHTML = sub;
            newques.innerHTML = ques;


            let like = document.createElement("a");
            let likecounter = old[i].likes;

            like.className = "fa fa-thumbs-up";
            like.id = idd;
            like.innerHTML = `${likecounter}`;
            like.style.margin = "5px";

            let dislike = document.createElement("a");
            dislike.className = "fa fa-thumbs-down";
            let dislikecounter = old[i].dislikes;
            dislike.id = idd;
            dislike.innerHTML = 0;
            dislike.style.margin = "5px";
            dislike.innerHTML = `${dislikecounter}`;
            let star = document.createElement("a");
            star.id = idd;
            star.className = "fav fa fa-star";
            star.style.color = "white";
            star.style.margin = "5px ";


            let icons = document.createElement("div");
            icons.id = idd;
            icons.style.display = "flex";
            icons.style.flexDirection = "row";
            icons.style.justifyContent = "flex-end";

            icons.appendChild(like);    
            icons.appendChild(dislike);
            icons.appendChild(star);
                        
            query.appendChild(newsub);
            query.appendChild(newques);
            query.appendChild(icons);
            let time = document.createElement("div");
             time.innerHTML="loading..";
             time.innerHTML = old[i].time;
           

            
            let timee;
            setInterval(() => {

                timee = (Date.now() / 1000 - old[i].id / 1000);
                if (Math.floor(timee) >= (60 * 60 * 24 * 30)) {

                    time.innerHTML  = `${Math.floor(timee / (60 * 60 * 24 * 30))} months ago`;
                    ob["time"]=time.innerHTML  ;
                    localStorage.setItem("Questions", JSON.stringify(discuss));
                  
                }
                else if (Math.floor(timee) >= (60 * 60 * 24)) {
                    time.innerHTML = `${Math.floor(timee / (60 * 60 * 24))} days ago`;

                    ob["time"]=time.innerHTML  ;
                    localStorage.setItem("Questions", JSON.stringify(discuss));
                  
                }

                else if (Math.floor(timee) >= 60 * 60) {
                    time.innerHTML  = `${Math.floor(timee / (60 * 60))} hours ago`;
                    ob["time"]=time.innerHTML  ;
                    localStorage.setItem("Questions", JSON.stringify(discuss));
                  
                }
                else if (Math.floor(timee) >= 60) {
                    time.innerHTML  = `${Math.floor(timee / (60))} minutes ago`;
                    ob["time"]=time.innerHTML  ;
                    localStorage.setItem("Questions", JSON.stringify(discuss));
                  
                }
                else {
                    time.innerHTML= `${Math.floor(timee)} seconds ago`;
                    ob["time"]=time.innerHTML  ;
                    localStorage.setItem("Questions", JSON.stringify(discuss));
                  
                }
            }, 1000);
            time.pointerEvents="none";
            query.appendChild(time);
            query.appendChild(hr);
          ob["time"]=time.innerHTML;
            
          
            ob["id"] = query.id;
            ob["subject"] = sub;
            ob["question"] = ques;
            ob["likes"] = like.innerHTML;
            if (like.innerHTML > 0) {
                like.style.color = "blue";
            }
            ob["dislikes"] = dislike.innerHTML;
            if (dislike.innerHTML > 0) {
                dislike.style.color = "grey";
            }
            ob["fav"] = old[i].fav;
            if (old[i].fav == true) {
                star.style.color = "C92C6D";
            }
            else star.style.color = "white";
            ob["responses"] = old[i].responses;
            discuss.push(ob);
            localStorage.setItem("Questions", JSON.stringify(discuss));
            questions.appendChild(query);

            query.addEventListener("click", function (event) {
                if (event.target == like) {
                    like.style.color = "blue";

                    likecounter++;
                    like.innerHTML = `${likecounter}`;
                    // ob["likes"]=likecounter;

                    for (let i = 0; i < discuss.length; i++) {
                        if (discuss[i].id == event.target.id) {
                            discuss[i].likes = likecounter;
                        }
                    }
                    sorting();
                    localStorage.setItem("Questions", JSON.stringify(discuss));
                }
                else if (event.target == star) {
                    // star.addEventListener("click",function(event){
                    if (starclick == false) {
                        event.target.style.color = "C92C6D";
                        starclick = true;
                        //ob["fav"]=true;
                        for (let i = 0; i < discuss.length; i++) {
                            if (discuss[i].id == event.target.id) {
                                discuss[i].fav = true;
                            }
                        }
                        localStorage.setItem("Questions", JSON.stringify(discuss));
                    }

                    else {
                        event.target.style.color = "white";
                        starclick = false;
                        ob["fav"] = false;
                        for (let i = 0; i < discuss.length; i++) {
                            if (discuss[i].id == event.target.id) {
                                discuss[i].fav = false;
                            }
                        }
                        localStorage.setItem("Questions", JSON.stringify(discuss));
                    }

                }
                else if (event.target == dislike) {
                    dislike.style.color = "grey";
                    // dislike.style.display="none";

                    dislikecounter++;
                    dislike.innerHTML = `${dislikecounter}`;
                    for (let i = 0; i < discuss.length; i++) {
                        if (discuss[i].id == event.target.id) {
                            discuss[i].dislikes = dislikecounter;
                        }
                    }
                    sorting();
                    localStorage.setItem("Questions", JSON.stringify(discuss));



                }
                else
                    showResponse(event, query);
            })
        }




    }
}
submi.addEventListener("click", function (event) {
    // debugger;
    console.log("hey in submi event listener");
    if (!subject.value.trim() || !subject.value) {

        alert("Subject must not be empty or containing spaces");
        return;
    }
    if (!question.value.trim() || question.value.length == 0) {
        alert("Description of Question must not be empty or containing spaces");
        return;
    }
    else {

        AddQues(subject, question);
        question.value = null;
        subject.value = null;
    }
});
function newForm() {
    right.innerHTML = "";
    let welcome = document.createElement("div");
    welcome.className = "welcome";
    welcome.innerHTML = "Welcome to Discussion Portal !";
    let enter = document.createElement("div");
    enter.className = "enter";
    enter.innerHTML = "Enter a subject and Question to get started.";
    let subjectdiv = document.createElement("div");
    subjectdiv.className = "subjectdiv";

    let subject = document.createElement("input");
    subject.type = "text";
    subject.className = "subject";
    subject.placeholder = "Subject";
    let question = document.createElement("textarea");
    question.classname = "question";
    question.style.minHeight = "200px"
    question.placeholder = "Question";
    let submit = document.createElement("button");
    submit.className = "Submit";
    right.innerHTML = "";
    right.appendChild(welcome);
    right.appendChild(enter);
    subjectdiv.appendChild(subject);
    submit.innerHTML = "Submit";
    right.appendChild(subjectdiv);
    right.appendChild(question);
    right.appendChild(submit);
    
    submit.addEventListener("click", function (event) {
        console.log("hey in submit event listener");
        if (!subject.value.trim() || !subject.value) {

            alert("Subject must not be empty or containing spaces");
            return;
        }
        if (!question.value.trim() || question.value.length == 0) {
            alert("Description of Question must not be empty or containing spaces");
            return;
        }
        else {

            AddQues(subject, question);
            question.value = null;
            subject.value = null;
        }
    });

}


// let submit=document.getElementsByClassName("Submit")[0];

newformbutton.addEventListener("click", newForm);

function AddQues(subject, question) {

    let ob = {};
    id = Date.now();
    let query = document.createElement("div");
    let sub = subject.value;
    let ques = question.value;
    query.id = id;
    console.log(query.id);
    let newsub = document.createElement("div");
    newsub.style.fontSize = "30px";
    newsub.style.pointerEvents = "none";
    let newques = document.createElement("div");
    newques.style.pointerEvents = "none";

    let hr = document.createElement("hr");
    hr.id = id;
    newsub.id = id;
    newques.id = id;
    newsub.innerHTML = sub;
    newques.innerHTML = ques;
    let like = document.createElement("a");
    let likecounter = 0;
    like.className = "fa fa-thumbs-up";
    like.id = id;
    like.innerHTML = `${likecounter}`;
    like.style.margin = "5px";
    let dislike = document.createElement("a");
    dislike.className = "fa fa-thumbs-down";
    let dislikecounter = 0;
    dislike.id = id;
    dislike.innerHTML = 0;
    dislike.style.margin = "5px";
    dislike.innerHTML = `${dislikecounter}`;
    let star = document.createElement("a");
    star.id = id;
    star.className = "fav fa fa-star";
    star.style.color = "white";
    star.style.margin = "5px ";


    let icons = document.createElement("div");
    icons.id = id;
    icons.style.display = "flex";
    icons.style.flexDirection = "row";
    icons.style.justifyContent = "flex-end";
    let time = document.createElement("div");
    time.pointerEvents="none";
    let timee;
    
    time.innerHTML = "just now...";
    ob["time"]=time.innerHTML  ;
    localStorage.setItem("Questions", JSON.stringify(discuss));
    setInterval(() => {

        timee = (Date.now() / 1000 - query.id / 1000);
        if (Math.floor(timee) >= (60 * 60 * 24 * 30)) {

            time.innerHTML= `${Math.floor(timee / (60 * 60 * 24 * 30))} months ago`;
          ob["time"]=time.innerHTML  ;
          localStorage.setItem("Questions", JSON.stringify(discuss));
                  
        }
        else if (Math.floor(timee) >= (60 * 60 * 24)) {
            time.innerHTML= `${Math.floor(timee / (60 * 60 * 24))} days ago`;

            
            ob["time"]=time.innerHTML  ;
            localStorage.setItem("Questions", JSON.stringify(discuss));

        }

        else if (Math.floor(timee) >= 60 * 60) {
            time.innerHTML= `${Math.floor(timee / (60 * 60))} hours ago`;
          
            ob["time"]=time.innerHTML  ;
            localStorage.setItem("Questions", JSON.stringify(discuss));
        }
        else if (Math.floor(timee) >= 60) {
            time.innerHTML = `${Math.floor(timee / (60))} minutes ago`;
            
            ob["time"]=time.innerHTML  ;
            localStorage.setItem("Questions", JSON.stringify(discuss));
        }
        else {
            time.innerHTML = `${Math.floor(timee)} seconds ago`;
            ob["time"]=time.innerHTML  ;
            localStorage.setItem("Questions", JSON.stringify(discuss));
        }
    }
        , 1000);
       // discuss.push(ob);
           localStorage.setItem("Questions",JSON.stringify(discuss));
    icons.appendChild(like);
    icons.appendChild(dislike);
    icons.appendChild(star);
    query.appendChild(newsub);
    query.appendChild(newques);
    query.appendChild(icons);
    query.appendChild(time);
    query.appendChild(hr);
    ob["id"] = query.id;
    ob["subject"] = sub;
    ob["question"] = ques;
    ob["likes"] = like.innerHTML;
    ob["dislikes"] = dislike.innerHTML;
    ob["fav"] = false;
    // ob["time"]=time.innerHTML;
    ob["responses"] = [];
    discuss.push(ob);
    localStorage.setItem("Questions", JSON.stringify(discuss));
    questions.appendChild(query);
    query.addEventListener("click", function (event) {
        if (event.target == like) {
            like.style.color = "blue";

            likecounter++;
            like.innerHTML = `${likecounter}`;
            // ob["likes"]=likecounter;

            for (let i = 0; i < discuss.length; i++) {
                if (discuss[i].id == event.target.id) {
                    discuss[i].likes = likecounter;
                }
            }
            sorting();
            localStorage.setItem("Questions", JSON.stringify(discuss));
        }
        else if (event.target == star) {
            // star.addEventListener("click",function(event){
            if (starclick == false) {
                event.target.style.color = "C92C6D";
                starclick = true;
                //ob["fav"]=true;
                for (let i = 0; i < discuss.length; i++) {
                    if (discuss[i].id == event.target.id) {
                        discuss[i].fav = true;
                    }
                }
                localStorage.setItem("Questions", JSON.stringify(discuss));
            }

            else {
                event.target.style.color = "white";
                starclick = false;
                ob["fav"] = false;
                for (let i = 0; i < discuss.length; i++) {
                    if (discuss[i].id == event.target.id) {
                        discuss[i].fav = false;
                    }
                }
                localStorage.setItem("Questions", JSON.stringify(discuss));
            }

        }
        else if (event.target == dislike) {
            
            dislike.style.color = "grey";
            // dislike.style.display="none";

            dislikecounter++;
            dislike.innerHTML = `${dislikecounter}`;
            for (let i = 0; i < discuss.length; i++) {
                if (discuss[i].id == event.target.id) {
                    discuss[i].dislikes = dislikecounter;
                }
            }
            sorting();
            localStorage.setItem("Questions", JSON.stringify(discuss));
        }
        else
            showResponse(event, query);
    })
}
function showResponse(event, query) {
    let parentid = event.target.id;
    console.log(parent);
    let subclicked = query.children[0].innerHTML;
    let quesclicked = query.children[1].innerHTML;
    let div1 = document.createElement("div");
    let heading = document.createElement("p");
    heading.style.fontSize = "30px";
    heading.innerHTML = "Question";
    let displaySub = document.createElement("div");
    displaySub.style.fontSize = "25px";
    let displayQue = document.createElement("div");
    displayQue.innerHTML = quesclicked;
    displaySub.innerHTML = subclicked;
    let resolve = document.createElement("button");
    resolve.className = "resolve";
    resolve.innerHTML = "Resolve";
    resolve.style.backgroundColor = "blue";
    resolve.style.color = "white";
    right.innerHTML = "";
    div1.appendChild(heading);
    div1.appendChild(displaySub);
    div1.appendChild(displayQue);
    div1.appendChild(resolve);
    right.appendChild(div1);
    resolve.addEventListener("click", function () {
        console.log("143");
        let qid = query.id;
        console.log(qid);
        let tot = questions.childNodes.length;
        console.log("tot" + tot);
        let del = document.getElementById(qid);
        for (let i = 0; i < discuss.length; i++) {
            if (discuss[i].id == qid)
                discuss.splice(i, 1);
        }
        localStorage.setItem("Questions", JSON.stringify(discuss));
        console.log(del);
        questions.removeChild(del);
        newForm();
    })
    let div3 = document.createElement("div");
    let heading2 = document.createElement("p");
    heading2.innerHTML = "Add Response !";
    heading2.style.fontSize = "30px";
    heading2.className = "heading2";
    let username = document.createElement("input");
    username.type = "text";
    username.style.minWidth = "700px";
    username.style.margin = "5px";
    username.style.margin = "20px";
    username.placeholder = "Enter your name...";
    let comment = document.createElement("textarea");
    comment.className = "comment";
    comment.style.minHeight = "100px";
    comment.style.margin = "20px";
    comment.style.minWidth = "700px";
    comment.placeholder = "Enter Comment";
    let submit2 = document.createElement("button");
    submit2.classname = "submit2";
    submit2.innerHTML = "Submit";
    submit2.style.marginRight = "0px";
    submit2.style.marginLeft = "670px ";
    submit2.style.backgroundColor = "blue";
    submit2.style.color = "white";
    div3.appendChild(heading2);
    div3.appendChild(username);
    div3.appendChild(comment);
    div3.appendChild(submit2);
    let div2 = document.createElement("div");
    let res = document.createElement("div");
    res.innerHTML = "Response";
    res.style.fontSize = "25px";
    div2.appendChild(res);
    let key;
    for (let i = 0; i < discuss.length; i++) {
        if (discuss[i].id == parentid) {
            key = discuss[i].responses;
        }
    }
    for (let i = 0; i < key.length; i++) {
        let area = document.createElement("div");
        area.id = key[i].id;
        let name = document.createElement("div");
        name.id = key[i].id;
        name.innerHTML = key[i].name;
        console.log(name);
        let response = document.createElement("div");
        response.innerHTML = key[i].comment;
        response.id = key[i].id;
        name.style.fontSize = "25px";
        let hr = document.createElement("hr");
        // area.appendChild(hr);
        area.appendChild(name);
        area.appendChild(response);
        area.appendChild(hr);
        area.style.backgroundColor = "#C0C0C0";
        div2.appendChild(area);
    }
    right.appendChild(div2);
    right.appendChild(div3);
    submit2.addEventListener("click", function (event) {
        console.log(event.target.innerHTML);
        addResponse(username.value, comment.value, div2, parentid);
        username.value = null;
        comment.value = null;
    });
}
function addResponse(username, comment, div2, parentid) {
    let resp = {};
    if (!username.trim() || username == null) {
        alert("Enter name please");
        return;
    }
    else if (!comment.trim() || comment == null) {
        alert("Cann't submit empty comment");

        return;
    }
    let area = document.createElement("div");
    area.id = uid;
    let name = document.createElement("div");
    name.id = uid;
    name.innerHTML = username;
    console.log(username);
    let response = document.createElement("div");
    response.innerHTML = comment;
    response.id = uid;
    name.style.fontSize = "25px";
    resp["id"] = uid;
    resp["name"] = username;
    resp["comment"] = comment;
    for (let i = 0; i < discuss.length; i++) {
        if (discuss[i].id == parentid) {
            discuss[i].responses.push(resp);
        }
    }
    localStorage.setItem("Questions", JSON.stringify(discuss));
    let hr = document.createElement("hr");
    // area.appendChild(hr);
    area.appendChild(name);
    area.appendChild(response);
    area.appendChild(hr);
    area.style.backgroundColor = "#C0C0C0";
    div2.appendChild(area);
    uid++;
}

