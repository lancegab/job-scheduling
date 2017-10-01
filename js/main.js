var canvas = document.getElementById("viewport");
var context = canvas.getContext("2d");

//Array initialization for jobs
var jobs = [];

function readByLine(arr){
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
// document.getElementById('SJF').addEventListener('click', SJF, false);
// document.getElementById('SRPT').addEventListener('click', SRPT, false);
// document.getElementById('PRIORITY').addEventListener('click', PRIORITY, false);
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
    var waitingTime = 0;

    for(j = 0; j < jobs.length; j++){
        jobs[j].waitingTime = waitingTime;
        jobs[j].computingTime = jobs[j].waitingTime + jobs[j].burstTime;
        waitingTime += jobs[j].burstTime;
    }

    renderUI();
}

function renderUI(){
    //function to render user interface to canvas
    context.fillStyle = "#000";
    context.fillRect(0,0,1500,760);
    context.fillStyle = "#FFF";
    context.font = "30px Arial";
    context.fillText("Jobs - " + jobs.length, 10, 40);

    context.font = "15px Arial";

    context.fillText("JOB", 10, 80);
    context.fillText("WAITING TIME", 160, 80);
    context.fillText("COMPUTING TIME", 310, 80);


    for(p = 0; p < jobs.length; p++){

        context.fillStyle = "#00AAFF";

        context.fillText("Job " + jobs[p].id, 10, 100+(p*20));
        context.fillText(jobs[p].waitingTime, 160, 100+(p*20));
        context.fillText(jobs[p].computingTime, 310, 100+(p*20));
    }
}
