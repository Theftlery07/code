class Card{
    constructor(name){
        this.name = name
    }
    draw(){
        var x = document.createElement('h1')
        var t = document.createTextNode("it works");
        x.appendChild(t);
        document.body.appendChild(x);
    }
}
function create(){
    let g = new Card('happy')
    g.draw()
}