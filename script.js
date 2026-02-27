if(annyang){
    var commands = {
        'hello': function() { alert('Hello world!');}
    };

    annyang.addCommands(commands);
    annyang.start();
}