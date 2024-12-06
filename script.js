let canvasEl = document.getElementById('game');
let cxt = canvasEl.getContext('2d');

let ecranLargeur = window.innerWidth;
let ecranHauteur = window.innerHeight;

canvasEl.setAttribute("width", ecranLargeur);
canvasEl.setAttribute("height", ecranHauteur);

cxt.fillStyle = "#000000";
cxt.strokeStyle = "#000000";
cxt.lineWidth = 5;

let oiseauY = ecranHauteur/2;
let oiseauVy = 0;
let oiseauG = 0;

let tuyeau1X = ecranLargeur/2+122;
let tuyeau1H = 50+Math.random()*200;
let tuyeau2H = ecranHauteur/2+216-tuyeau1H-(Math.random()*200-100)-(ecranHauteur/2-216);//-(Math.random()*120-100);
let tuyeauxC = 'rgb('+parseInt(Math.random()*255).toString()+','+parseInt(Math.random()*255).toString()+','+parseInt(Math.random()*255).toString()+')';
let fondC = 'rgb('+parseInt(Math.random()*255).toString()+','+parseInt(Math.random()*255).toString()+','+parseInt(Math.random()*255).toString()+')';
let jeuC = 'rgb('+parseInt(Math.random()*255).toString()+','+parseInt(Math.random()*255).toString()+','+parseInt(Math.random()*255).toString()+')';
let tuyeauSpeed = 0;
//console.log(tuyeau1H, tuyeau2H, parseInt(tuyeau1H+tuyeau2H), 432 - parseInt(tuyeau1H+tuyeau2H));
while(432 - parseInt(tuyeau1H+tuyeau2H) < 100) {
    //console.log(tuyeau2H);
    //tuyeau2H = ecranHauteur/2+216-tuyeau1H+(Math.random()*120-100);
    tuyeau2H = ecranHauteur/2+216-tuyeau1H-(Math.random()*200-100)-(ecranHauteur/2-216);
}
let OISEAUATRAVERSETUYEAU = true;
let score = 0;

function logique() {
    //réinitialise
    cxt.fillStyle = fondC;
    cxt.fillRect(0,0,ecranLargeur,ecranLargeur);
    //cadre
    cxt.fillStyle = "#000000";
    cxt.strokeRect(ecranLargeur/2-122,ecranHauteur/2-216,243,432);
    cxt.fillStyle = jeuC;
    cxt.fillRect(ecranLargeur/2-122,ecranHauteur/2-216,243,432);
    //oiseau
    cxt.fillStyle = fondC;
    cxt.fillRect(ecranLargeur/2-100, oiseauY, 10, 10);
    //tuyeau
    cxt.fillStyle = tuyeauxC;
    cxt.fillRect(tuyeau1X, ecranHauteur/2+216-tuyeau1H, 50, tuyeau1H);
    //cxt.fillRect(tuyeau1X, tuyeau1H, 50, 50);
    cxt.fillRect(tuyeau1X, ecranHauteur/2-216, 50, tuyeau2H);

    //cache tuyeau
    cxt.fillStyle = fondC;
    cxt.fillRect(0,0,ecranLargeur/2-124,ecranHauteur);
    cxt.fillStyle = "#000000";
    cxt.fillText(score.toString(),ecranLargeur/2-122-90,ecranHauteur/2-122-90,100)
    cxt.fillText("LE PIRE CODE DU MON      ",ecranLargeur/2-122-90,100,100);
    //oiseau dépasse haut
    if(oiseauY > ecranHauteur/2+216) {
        audio1.play();
        document.querySelector('img').style.display = 'block';
        return;
    }
    //oiseau dépasse bas
    if(oiseauY < ecranHauteur/2-216) {
        audio1.play();
        document.querySelector('img').style.display = 'block';
        return;
    }
    //oiseau traverse tuyeau
    if(ecranLargeur/2-90 > tuyeau1X && ecranLargeur/2-100 < tuyeau1X+50) {
        OISEAUATRAVERSETUYEAU = false;
        cxt.fillStyle = "#FF0000";
        //oiseau percute tuyeau
        if(oiseauY+10 > ecranHauteur/2+216-tuyeau1H) {
            audio2.play();
            document.querySelector('img').style.display = 'block';
            return;
        }
        if(oiseauY < ecranHauteur/2-216+tuyeau2H) {//ecranHauteur/2-216+tuyeau2H) {//-432+tuyeau2H+ecranHauteur
            audio2.play();
            document.querySelector('img').style.display = 'block';
            return;
        }
        //cxt.fillRect(10,0,20,20);
    }
    if(ecranLargeur/2-100 > tuyeau1X+50 && !OISEAUATRAVERSETUYEAU) {
        score += 1;
        OISEAUATRAVERSETUYEAU = true;
    }
    if(tuyeau1X < ecranLargeur/2-172) {
        tuyeau1X = ecranLargeur/2+122;
        tuyeau1H = 50+Math.random()*200;
        tuyeau2H = ecranHauteur/2+216-tuyeau1H-(Math.random()*200000000-199999900)-(ecranHauteur/2-216);
        //console.log(tuyeau1H, tuyeau2H, parseInt(tuyeau1H+tuyeau2H), 432 - parseInt(tuyeau1H+tuyeau2H));
        let i = 0;
        while(432 - parseInt(tuyeau1H+tuyeau2H) < 100 && i < 1000000000) {
            //tuyeau2H = ecranHauteur/2+216-tuyeau1H+(Math.random()*120-100);
            //console.log(tuyeau1H, tuyeau2H);
            i++;
            tuyeau2H = ecranHauteur/2+216-tuyeau1H-(Math.random()*200000000-199999900)-(ecranHauteur/2-216);
        }
        tuyeauxC = 'rgb('+parseInt(Math.random()*255).toString()+','+parseInt(Math.random()*255).toString()+','+parseInt(Math.random()*255).toString()+')';
        fondC = 'rgb('+parseInt(Math.random()*255).toString()+','+parseInt(Math.random()*255).toString()+','+parseInt(Math.random()*255).toString()+')';
        jeuC = 'rgb('+parseInt(Math.random()*255).toString()+','+parseInt(Math.random()*255).toString()+','+parseInt(Math.random()*255).toString()+')';
        console.log(i, 'essais pour une distance entre tuyaux de ', 432 - parseInt(tuyeau1H+tuyeau2H));
        tuyeauSpeed = parseInt(1+Math.random()*7);
        oiseauG = parseInt(3+Math.random()*3);
    }
    oiseauY += oiseauVy;
    oiseauVy += oiseauG;
    tuyeau1X -= tuyeauSpeed;
}

setInterval(logique, 50);
var audio1 = new Audio('data/scream.mp3');
var audio2 = new Audio('data/metal.mp3');

document.addEventListener('keydown', function(e) {
    cxt.fillRect(0,0,10,10);
    oiseauVy = -15;
    /*if(parseInt(Math.random()*10) == 0) {
        oiseauVy *= -1;
    }*/
    if(oiseauG == 0) {
        tuyeauSpeed = 3;
        oiseauG = 3;
    }
});