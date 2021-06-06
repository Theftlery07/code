var words=[]
var wordSize=[]
var activeWord=[]
var numbers = []
var bottomer = 0
var toping = 0
var spacing = 0
var positionList = []
var counter = 0
var speed = 0
function startUp(){
    speed = Number(document.getElementsByTagName('title')[0].id)
    spacer()
    lister()
    wordStartUp()
    wordChooser()
    createWord()
}
function lister(){
    positionList.length=0
    positionList.length=Math.floor(((document.body.scrollWidth-15)/spacing))
    for(var i=0;i<positionList.length;i++){
        positionList[i]=Math.floor(Math.random()*((document.body.scrollWidth-15)/spacing))
        clear=false
        while(clear==false){
            copy=false
            for(var j=0;j<positionList.length;j++){
                if(positionList[i]==positionList[j] && j!=i){
                    copy=true
                }
            }
            if(copy==true){
                positionList[i]=Math.floor(Math.random()*((document.body.scrollWidth-15)/spacing))
            }
            else{
                clear=true
            }
        }
    }
}
function spacer(){
    window.scrollTo(0,-9000)
    spacing = Math.floor(visualViewport.width/60)
    bottomer = Math.floor(document.getElementsByTagName('footer')[0].getBoundingClientRect().top)-spacing
    toping = Math.abs(Math.floor(document.getElementsByTagName('header')[0].getBoundingClientRect().bottom))
}
function remove(){
    for(var i = 0 ;i<activeWord.length;i++){
        for(var j=0;j<activeWord[i][0].length;j++){
            document.body.removeChild(activeWord[i][0][j])
        }
    }
    activeWord.length=0
    spacer()
}
function wordStartUp(){
    var nav=document.getElementById('topics')
    var topics=nav.getElementsByTagName("a")
    var max=0
    for(var i=0;i<topics.length;i++){
        if(topics[i].innerHTML.length>max){
            max=topics[i].innerHTML.length
        }
        if(Boolean(topics[i].href)==false){
            topics[i].id='off'
        }
    }
    for(var i=0;i<topics.length;i++){
        words.length+=1
        wordSize.length+=1
        words[i]=topics[i].innerHTML
        wordSize[i]=words[i].length
        while(words[i].length<max){
            words[i]+='~'
        }

    }
}
function wordChooser(){
    activeWord.length+=1
    activeWord[activeWord.length-1]=[[],[],[],[]]
    var ran = Math.floor(Math.random()*words.length)
    activeWord[activeWord.length-1][1]=words[ran]
    activeWord[activeWord.length-1][3]=wordSize[ran]
    activeWord[activeWord.length-1][2]=positionList[counter]*spacing
    counter+=1
    if(counter==positionList.length){
        counter=0
    }
    setTimeout(function(){wordChooser()},speed)
}
function createWord(){
    for(var i=0;i<activeWord.length;i++){
        if(activeWord[i][0].length<activeWord[i][1].length){
            var passable=false
            if(activeWord[i][0].length>0){
                if(activeWord[i][0][0].innerHTML==activeWord[i][1].split('')[0]){
                    passable = true
                }
            }
            else{
                passable = true
            }
            if(passable == true){
                activeWord[i][0].length+=1
                var holder = activeWord[i][1].split('')
                var h = document.createElement("H1")
                var t = document.createTextNode(holder[activeWord[i][0].length-1])
                h.appendChild(t)
                h.style.position='absolute'
                h.style.left = activeWord[i][2]+'px'
                h.style.top = toping-spacing+'px'
                h.style.opacity=0
                h.style.zIndex=1
                if(holder[activeWord[i][0].length-1]!='~'){
                    h.style.opacity = 1-(activeWord[i][0].length/activeWord[i][3])+0.2
                }
                activeWord[i][0][activeWord[i][0].length-1]=h
                document.body.appendChild(activeWord[i][0][activeWord[i][0].length-1])
            } 
        }
        activeWord[i][0][0].style.color='white' 
    }
    moveWord()
}
function moveWord(){
    for(var i = 0 ;i<activeWord.length;i++){
        for(var j=0;j<activeWord[i][0].length;j++){
            var topNum = parseInt(activeWord[i][0][j].style.top)
            if(topNum>=bottomer){
                document.body.removeChild(activeWord[i][0][j])
                for(var k=0;k<activeWord[i][0].length-1;k++){
                    activeWord[i][0][k]=activeWord[i][0][k+1]
                }
                activeWord[i][0].length-=1
                if(j==activeWord[i][0].length){
                    for(var k=0;k<activeWord.length-1;k++){
                        activeWord[k]=activeWord[k+1]
                    }
                    activeWord.length-=1
                    break
                }
            }
            else{
                activeWord[i][0][j].style.top=(topNum+(spacing))+'px'
            }
        }
    }
    setTimeout(function(){createWord()},100)
}