var list = []
var parentList = [[],[]]
function gameStart(size){
    for(i=0;i<parentList.length;i++){
        for(j=0;j<size;j++){
            parentList[i][j] = Math.floor(Math.random()*2)
        }
    }
    chartMaker(size)
}
function chartMaker(size){
    for(i=0;i<size;i++){
        list.length += 1
        list[i]=[]
        for(j=0;j<size;j++){
            list[i].length+=1
            list[i][j] = document.createElement("INPUT");
            list[i][j].setAttribute('type','text')
            document.body.appendChild(list[i][j])
        }
    }
}