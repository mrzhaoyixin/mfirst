console.show();
cwd = engines.myEngine().cwd()
engines.all().forEach(engine => {
    log(engine.getSource().toString());
    if(engine.getSource().toString().equals(cwd+'/dy_autojs.js')){
        engine.forceStop()
        back()
        back()
        back()
        back()
        back()
    }
});

//engines.execScriptFile("dy_autojs.js");

