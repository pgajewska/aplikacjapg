var app = {
    
    initialize: function() {
        this.bindEvents();
    },


    bindEvents: function() 
	{
        document.addEventListener('deviceready', this.onDeviceReady, false);

    },
 
    onDeviceReady: function() 
	{
        app.receivedEvent('deviceready');
		connect();
	


    },
    // Zaktualizuj DOM na otrzymanym wydarzeniu
    receivedEvent: function(id) 
	{
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }

	

};
	const api_url = 'https://raw.githubusercontent.com/pgajewska/mobilne/main/filmy.json';
	async function wczytajJson()
	{
		const response = await fetch(api_url);
		const data = await response.json();
		var x = data.filmy[0].obsada[0].znanyZ;
		var y = data.filmy[1].obsada[1];
		var z = data.filmy[2].obsada[1];
		console.log(x[0]);
	
		var liczbaFilmow = data.filmy.length;
		var plakaty = new Array(liczbaFilmow);
		var tytuly = new Array(liczbaFilmow);
		var rezyserzy = new Array(liczbaFilmow);
		for(i = 0; i< liczbaFilmow; i ++)
		{
			plakaty[i]= data.filmy[i].plakat;
			tytuly[i]=data.filmy[i].tytul;
			rezyserzy[i]=data.filmy[i].rezyser;
		}
		var polecenie1 = "";
		for(i = 0; i< liczbaFilmow; i ++)
		{
			polecenie1 = polecenie1 + '<div class="film_container"> <div class="plakat"><img src="'+plakaty[i]+'" ></div><div class="tytul">'+tytuly[i]+'</div><div class="rez">reż. '+rezyserzy[i]+'</div> </div>';
		}
		
		
		document.getElementById("listaFilmow").innerHTML=polecenie1;
		
	}
	function connect()
	{
		MongoClient.connect('mongodb+srv://uzytkownik:GYry8RAhRLWFPmIM@cluster0.owagd.mongodb.net/Cluster0?retryWrites=true&w=majority',function (err,db) {
    if(err) 
        console.log("Unable to connect DB. Error: " + err)
    else 
        console.log('Connected to DB');

    db.close();
});
	}

