//inputs
var burstTime = document.querySelectorAll('div');
var processArray = [];
var handleChange = () =>{
    for(let i=0;i<burstTime.length;i++){
    processArray.push({
        name   : burstTime[i].childNodes[1].value,
        arrTime : burstTime[i].childNodes[3].value,
        servTime : burstTime[i].childNodes[5].value,
        visited  : false
        })

    }
    //sort based on arrival time
    processArray.sort(function(a,b){
        return a.arrTime-b.arrTime
    })
    // shortest process next
    var ganttDetails = [];
    var queue  = [];
    var finishBuffTime = 0;
    var minServTime =999 ;
    // gantt chart starts with the first process which arrives 
    queue.push(processArray[0]);
    processArray[0].visited = true;
    minServTime = parseInt(processArray[0].servTime);
    while(queue.length!=0){
        minServTime=999
        queue.forEach((task)=>{
            if(parseInt(task.servTime)< minServTime){
                minServTime = parseInt(task.servTime);
            } 
        })
        let temp = queue.filter((task)=> (parseInt(task.servTime) == minServTime));    // min service time element element
        console.log(temp[0].name);
        
        let indexOfminServ = queue.findIndex((task)=> (parseInt(task.servTime) == minServTime))
        queue.splice(indexOfminServ,1);
        

        let tempFinTime = finishBuffTime + parseInt(temp[0].servTime); 
        console.log("tempFinTime" + tempFinTime)
        ganttDetails.push({
            name : temp[0].name,
            startTime : finishBuffTime,
            finTime :tempFinTime
        })
        finishBuffTime+= parseInt(temp[0].servTime);
        for(let j = 0;j<processArray.length;j++){
            if(processArray[j].visited == false && parseInt(processArray[j].arrTime) >= parseInt(temp[0].arrTime) && parseInt(processArray[j].arrTime) <= parseInt(finishBuffTime) ){
                processArray[j].visited = true;
                queue.push(processArray[j]);  
            }

        }
        if(queue.length == 0){
            for(let j = 0;j<processArray.length;j++){
                    if(processArray[j].visited == false){
                        processArray[j].visited = true;
                        queue.push(processArray[j]);
                        break;
                    }

            }
        }
        console.log(queue)
        
    }

    // creating gantt chart
    var gantt = document.querySelector('ul');
    for(let i=0;i<ganttDetails.length;i++){
      
        setTimeout(function() {
            var li = document.createElement('li');
            var para = document.createElement('p');
            li.innerText = ganttDetails[i].name
            para.innerText = ganttDetails[i].finTime;
    
            gantt.appendChild(li); 
            gantt.appendChild(para);
            //your code to be executed after 1 second
          }, (i*300)+(200));
    }
     
    console.log(ganttDetails)

}