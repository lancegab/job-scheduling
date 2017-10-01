var canvas = document.getElementById("viewport");
var context = canvas.getContext("2d");

//Array initialization for jobs
var jobs = [];

function readByLine(arr){
    //Read input by line and create new Job object
    jobs = [];
    for(i = 1; i < arr.length; i++){
        line = arr[i].split(/\t\t\t|\t\t|\t/);
        if(line.length < 4)
            continue;
        else
            jobs.push(new Job(parseInt(line[0]), parseInt(line[1]), parseInt(line[2]), parseInt(line[3])));
    }
}

function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0];

    if (f) {
        var r = new FileReader();
        r.onload = function(e) {
            var contents = e.target.result;
            var arr = contents.split("\n");
            readByLine(arr);
        }
        r.readAsText(f);
    } else {
        alert("Failed to load file");
    }
}

document.getElementById('fileinput').addEventListener('change', readSingleFile, false);
document.getElementById('FCFS').addEventListener('click', FCFS, false);
document.getElementById('SJF').addEventListener('click', SJF, false);
// document.getElementById('SRPT').addEventListener('click', SRPT, false);
document.getElementById('PRIORITY').addEventListener('click', PRIORITY, false);
// document.getElementById('ROUND-ROBIN').addEventListener('click', ROUNDROBIN, false);

function Job(id, arrival, burstTime, priority){
    console.log("JOB: ", id, arrival, burstTime, priority);
    this.id = id;
    this.arrival = arrival;
    this.burstTime = burstTime;
    this.priority = priority;

    this.waitingTime = 0;
    this.computingTime = 0;
}


function FCFS(){
    console.log("FCFS");
    var type = "FCFS";
    var tempJobs = jobs.slice();
    var waitingTime = 0;

    for(j = 0; j < tempJobs.length; j++){
        tempJobs[j].waitingTime = waitingTime;
        tempJobs[j].computingTime = tempJobs[j].waitingTime + tempJobs[j].burstTime;
        waitingTime += tempJobs[j].burstTime;
    }

    renderUI(tempJobs, type);
}

function SJF(){
    console.log("SJF");
    var type = "SJF";
    var tempJobs = jobs.slice();
    var waitingTime = 0;

    tempJobs.sort(function(a, b) {
        return a.burstTime - b.burstTime;
    });

    for(j = 0; j < tempJobs.length; j++){
        tempJobs[j].waitingTime = waitingTime;
        tempJobs[j].computingTime = tempJobs[j].waitingTime + tempJobs[j].burstTime;
        waitingTime += tempJobs[j].burstTime;
    }

    renderUI(tempJobs, type);
}

function PRIORITY(){
    console.log("PRIORITY");
    var type = "PRIORITY";
    var tempJobs = jobs.slice();
    var waitingTime = 0;

    tempJobs.sort(function(a, b) {
        if(a.priority == b.priority)
            return a.burstTime - b.burstTime;
        else
            return a.priority - b.priority;
    });

    for(j = 0; j < tempJobs.length; j++){
        tempJobs[j].waitingTime = waitingTime;
        tempJobs[j].computingTime = tempJobs[j].waitingTime + tempJobs[j].burstTime;
        waitingTime += tempJobs[j].burstTime;
    }

    renderUI(tempJobs, type);

}

function renderUI(tempJobs, type){
    //function to render user interface to canvas
    context.fillStyle = "#000";
    context.fillRect(0,0,1500,760);
    context.fillStyle = "#FFF";
    context.font = "30px Arial";
    context.fillText("Jobs - " + tempJobs.length, 10, 40);

    context.font = "15px Arial";

    context.fillText("JOB", 10, 80);
    context.fillText("WAITING TIME", 160, 80);
    context.fillText("COMPUTING TIME", 310, 80);

    if(type=="PRIORITY"){
        context.fillText("BURST TIME", 460, 80);
        context.fillText("PRIORITY", 610, 80);
    }

    for(p = 0; p < tempJobs.length; p++){

        context.fillStyle = "#00AAFF";

        context.fillText("Job " + tempJobs[p].id, 10, 100+(p*20));
        context.fillText(tempJobs[p].waitingTime, 160, 100+(p*20));
        context.fillText(tempJobs[p].computingTime, 310, 100+(p*20));
        if(type=="PRIORITY"){
            context.fillText(tempJobs[p].burstTime, 460, 100+(p*20));
            context.fillText(tempJobs[p].priority, 610, 100+(p*20));
        }
    }
}
