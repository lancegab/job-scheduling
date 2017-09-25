var canvas = document.getElementById("viewport");
var context = canvas.getContext("2d");

function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0];

    if (f) {
        var r = new FileReader();
        r.onload = function(e) {
        var contents = e.target.result;
        // alert( "Got the file.n"
        //       +"name: " + f.name + "n"
        //       +"type: " + f.type + "n"
        //       +"size: " + f.size + " bytesn"
        //       + "starts with: " + contents.substr(1, contents.indexOf("n"))
        // );
        console.log(contents);
        }
        r.readAsText(f);
    } else {
        alert("Failed to load file");
    }
}
document.getElementById('fileinput').addEventListener('change', readSingleFile, false);


function Job(id, arrival, burstTime, priority){
    this.id = id;
    this.arrival = arrival;
    this.burstTime = bustTime;
    this.priority = priority;

    this.waitingTime = 0;
    this.computingTime = 0;
}

//Array initialization for jobs
var jobs = [];

function FCFS(){
    var waitingTime = 0;
    for(var job of jobs){
        job.waitingTime = waitingTime;
        job.computingTime = job.waitingTime + job.burstTime;

        waitingTime += job.burstTime;
    }
}

function main(){
}

function renderUI(){
    //function to render user interface to canvas
    context.fillStyle = "#000";
    context.fillRect(0,0,1500,760);
    context.fillStyle = "#FFF";
    context.font = "30px Arial";
    context.fillText("Jobs - " + jobs.length, 10, 40);

    context.font = "15px Arial";
    for(p = 0; p < jobs.length; p++){

        context.fillStyle = "#00AAFF";

        context.fillText("Job " + jobs[p].id, 10, 80+(p*20));
    }
}

setInterval(main,1000);
