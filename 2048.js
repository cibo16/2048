
(function ($) // début du pluggin
{
   $.fn.game2048 = function () //function game2048 du pluggin
   {
var selected=4, zeroctrl,gocount,up,over=0,score=0;
var game_continue=true,win=false;
var table = new Array();
var createCookie = function(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}


for (i=0;i<selected;i++) {
	table[i]=new Array();
	for (j=0;j<selected;j++) {
		table[i][j]="";
	}
}


$(document).ready(function(){
	$("body").append("<div class='menu'></div>");
	$("body").append("<div class='game'></div>");	
	$("div.menu").append("<select id='my-dropdown'><option value='2'>2X2</option><option value='4' selected>4X4</option><option value='8'>8X8</option><option value='16'>16X16</option></select>");
	$("div.menu").append("<button onclick='selectmenu()'>New Game</button>");
	if (getCookie('mytable') && getCookie('myselected') && getCookie('myscore')) {	
		var json_str = getCookie('mytable');
		table = JSON.parse(json_str);
		selected= parseInt(getCookie('myselected'));
		score = parseInt(getCookie('myscore'));	
	}
	newTwo();
	newTwo();
	display(selected);
	design();
	$("body").append("<div class='over'></div>")
});

function selectmenu(){
	$(".over").empty();
	win=false;
	game_continue=true;
    selected=($("#my-dropdown").val());
    for (i=0;i<selected;i++) {
		table[i]=new Array();
		for (j=0;j<selected;j++) {
			table[i][j]="";
		}
	}
	score=0;
	newTwo();
	newTwo();
	display(selected);
	design();
}

function display(selected){
	$( "div.game" ).empty();
	$( ".score" ).empty();
	var pt = $("<table>").attr("id","board");
		for (var x=0; x<selected; x++) {
			var row_table = $("<tr>");
			pt.append(row_table);
			for (var y=0; y<selected; y++) {
			    row_table.append($("<td id="+x+y+">"+table[x][y]+"</td>"));
			}
		}
	$("div.game").append( "<div class='score'>Score: "+score+"</div>" );
	$("div.game").append(pt);	

}

function design(){
	for (var x=0; x<selected; x++) {
		for (var y=0; y<selected; y++) {
		   switch(table[x][y]){
			case 2:
				$( '#'+x+y ).addClass( "design2" );
	 		break;
	 		case 4:
				$( '#'+x+y ).addClass( "design4" );
	 		break;
	 		case 8:
				$( '#'+x+y ).addClass( "design8" );
	 		break;
	 		case 16:
				$( '#'+x+y ).addClass( "design16" );
	 		break;
	 		case 32:
				$( '#'+x+y ).addClass( "design32" );
	 		break;
	 		case 64:
				$( '#'+x+y ).addClass( "design64" );
	 		break;
	 		case 128:
				$( '#'+x+y ).addClass( "design128" );
	 		break;
	 		case 256:
				$( '#'+x+y ).addClass( "design256" );
	 		break;
	 		case 512:
				$( '#'+x+y ).addClass( "design512" );
	 		break;
	 		case 1024:
				$( '#'+x+y ).addClass( "design1024" );
	 		break;
	 		case 2048:
				$( '#'+x+y ).addClass( "design2048" );
	 		break;
			}
		}
	}
}

$(document).keypress(function(event){
	var i,j,k,l,gocount;
	if(game_continue==true){
		switch(event.keyCode){
			case 38: //up
				operationUp();
				newTwo();
				display(selected);
				design();
	 		break;
	 		case 40: //down
				operationDown();
				newTwo();
				display(selected);
				design();
	 		break;
	 		case 39:  //right
				operationRight();
				newTwo();
				display(selected);
				design();
	 		break;
	 		case 37:  //left
		 		operationLeft();
		 		newTwo();
		 		display(selected);
		 		design();
	 		break;
	 	}	
 	}
  	var json_str = JSON.stringify(table);
	createCookie('mytable', json_str);
	createCookie('myselected', selected);
	createCookie('myscore', score);
});

function operationLeft(){
	var i,j,k,l,gocount=0, up=0;
	for(i=0;i<selected;i++){
		for(l=0;l<selected;l++){
			for(j=selected-1;0<j;j--){
				if(table[i][j-1]==""){
					table[i][j-1]=table[i][j];
					table[i][j]="";
					gocount+=1;
					up++;
				}
			}
		}
		for(k=1;k<selected;k++){
			if(table[i][k]==table[i][k-1]){
				table[i][k-1]=table[i][k]*2;
				table[i][k]="";
				gocount+=1;
				score+=table[i][k-1];
			}
		}
		for(l=0;l<selected;l++){
			for(j=selected-1;0<j;j--){
				if(table[i][j-1]==""){
					table[i][j-1]=table[i][j];
					table[i][j]="";
					gocount+=1;
					up++;
				}
			}
		}	
	}
}

function operationRight(){
	var i,j,k,l,gocount=0;
	for(i=0;i<selected;i++){
		for(l=0;l<selected;l++){
			for(j=0;j<selected-1;j++){
				if(table[i][j+1]==""){
					table[i][j+1]=table[i][j];
					table[i][j]="";
					gocount+=1;
				}
			}
		}
		for(k=selected-1;0<k;k--){
			if(table[i][k]==table[i][k-1]){
				table[i][k]=table[i][k-1]*2;
				table[i][k-1]="";
				gocount+=1;
				score+=table[i][k];
			}
		}
		for(l=0;l<selected;l++){
			for(j=0;j<selected-1;j++){
				if(table[i][j+1]==""){
					table[i][j+1]=table[i][j];
					table[i][j]="";
					gocount+=1;
				}
			}
		}	
	}
}
function operationUp(){
	var i,j,k,l,gocount=0;
	for(j=0;j<selected;j++){
		for(l=0;l<selected;l++){
			for(i=selected-1;0<i;i--){
				if(table[i-1][j]==""){
					table[i-1][j]=table[i][j];
					table[i][j]="";
					gocount+=1;
				}
			}
		}
		for(k=1;k<selected;k++){
			if(table[k][j]==table[k-1][j]){
				table[k-1][j]=table[k][j]*2;
				table[k][j]="";
				gocount+=1;
				score+=table[k-1][j];
			}
		}
		for(l=0;l<selected;l++){
			for(i=selected-1;0<i;i--){
				if(table[i-1][j]==""){
					table[i-1][j]=table[i][j];
					table[i][j]="";
					gocount+=1;
				}
			}
		}	
	}
}

function operationDown(){
	var i,j,k,l,gocount=0;
	for(j=0;j<selected;j++){
		for(l=0;l<selected;l++){
			for(i=0;i<selected-1;i++){
				if(table[i+1][j]==""){
					table[i+1][j]=table[i][j];
					table[i][j]="";
					gocount+=1;
				}
			}
		}
		for(k=selected-1;k>0;k--){
			if(table[k][j]==table[k-1][j]){
				table[k][j]=table[k-1][j]*2;
				table[k-1][j]="";
				gocount+=1;
				score+=table[k][j];
			}
		}
		for(l=0;l<selected;l++){
			for(i=0;i<selected-1;i++){
				if(table[i+1][j]==""){
					table[i+1][j]=table[i][j];
					table[i][j]="";
					gocount+=1;
				}
			}
		}	
	}
}
  
function newTwo(){
	var i,j;
	var d = Math.random();
		if (d < 0.9)
			var rnd=2;
		else
			rnd=4;
	ctrlEmpty();
	if(zeroctrl!=0 && gocount!=0){
		while(1){
		 	i=Math.floor((Math.random() * selected));
		 	j=Math.floor((Math.random() * selected));
		 	if(table[i][j]==0){
 				table[i][j]=rnd;
 				break;
			}
		}
	}
	ctrlEmpty();
	game_over_ctrl();	
}

function game_over_ctrl(){
	var over=0;
	for(i=0;i<selected;i++){
		for(j=0;j<selected-1;j++){
			if(table[i][j]==table[i][j+1] || table[j][i]==table[j+1][i] ){
				over++;
			}	
		}
	}
	if (zeroctrl==0 && over==0) {
		$( ".over" ).append( "<p>Game Over!!!</p>" );
		game_continue=false;
	}
	if(win==true){$( ".over" ).append( "<p>You win!!!!</p>" );game_continue=false;}	
}

function ctrlEmpty(){
	var i,j;
	zeroctrl=0;
	for(i=0;i<selected;i++){
		for(j=0;j<selected;j++){
			if(table[i][j]==0){
				zeroctrl++;
			}
			else if (table[i][j]==2048) {win=true;}	
		}
	}
}
}
})(jQuery); // fin du pluggin