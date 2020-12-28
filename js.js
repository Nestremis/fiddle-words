'use strict'
//TWORZENIE NOWEJ PLAKIETKI 
//Nasłuch na nowe wpisywane słowo i wywołanie funkcji przez enter
let $newWord = document.querySelector('input');
$newWord.addEventListener('keyup', function (event) {
    if (event.code === 'Enter') {
        addNewWord();
    }
});

//      Tworzenie nowej plakietki ze słowem pobranym z inputa
let $newNog;
let $currentNogs = []; 
const addNewWord = () => {
    if ($newWord.value !== '') {

        $newNog = document.createElement('div');
        $newNog.className = 'nog';
        document.body.appendChild($newNog);
        //Dodaj napis
        $newNog.innerText = $newWord.value;  
        //Wrzuć do tablicy currentNogs
        $currentNogs.push($newNog.innerText);      
        //Wyczyść input
        $newWord.value = '';
        //Rozrzuć
        randomThrow();
        // Przesuwanie plakietki po ekranie 
        $(function () {
            $('.nog ').draggable({containment: 'window', scroll:false });
        });
    }
};

//                       Rozrzucanie div'ów po ekranie
// uchwyt na divy
let $divs = document.getElementsByClassName('nog');
function randomThrow() {    
    // pobierz szerokość i wysokość okna, (pomniejszone o 200 px, aby nie wychodziły poza okno)
    let winWidth = window.innerWidth - 250;
    let winHeight = window.innerHeight - 250;

    for (let i = 0; i < $divs.length; i++) {

        // the current div in the list
        let thisDiv = $divs[i];

        // get random numbers for each element
        let randomTop = getRandomNumber(0, winHeight);
        let randomLeft = getRandomNumber(0, winWidth);

        // update top and left position
        thisDiv.style.top = randomTop + "px";
        thisDiv.style.left = randomLeft + "px";
    }

    // function that returns a random number between a min and max
    function getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }
};


//      Kasowanie (i zachowanie w drugiej tablicy) plakietki przez podwójne kliknięcie 
let $removedNogs = [];
let disappDiv = $('body').on('dblclick', '.nog', function () {
    $(this).toggle('scale');    
    // Usunietę plakietki zachowaj w tablicy removedNogsdo wykorzystania póżniej  
    $removedNogs.push(this.innerText);
    //Usuń je z tablicy aktualnych (currentNogs) plakietek
    $currentNogs.splice(this, 1);
});

//                             Zwrot plakietki przez kliknięcie na button "BACK"  
const backBtn = document.querySelector('button');
backBtn.addEventListener('click', restoreDiv);
let $backNog;
let $lastNog;

function restoreDiv() {
    if ($removedNogs.length !== 0) { 

        //Stwórz nową plakietkę i wrzuć słowo przechowane w tablicy
        $backNog = document.createElement('div');
        $backNog.className = 'nog';
        document.body.appendChild($backNog);

        //Pobierz ostatnie słowo z tablicy $removedNogs
        $lastNog = $removedNogs[$removedNogs.length - 1];
        $backNog.innerText = $lastNog;
        //$currentNogs.push($lastNog);
        
        //Zmiana kolejności słów tablicy - tak aby ostatnie słowo nie było wciąż takie samo 
        $removedNogs.unshift($removedNogs.pop());
        //Usunięcie z tablicy danego diva
        $removedNogs.splice(this, 1);  
        //Rozrzuć 
        randomThrow();
        // Przesuwanie plakietki 
        $(function () {
            $('.nog ').draggable({containment: 'window', scroll:false });
        });
    }
    
};

//        Funkcjonalność buttona RESET
const resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', function () {
    $removedNogs.length = 0; 
    $currentNogs.length = 0;  
    $('.nog').effect('explode', 1800).remove();     
});

// Usuwanie na trwałe pojedynczego diva
$('#reset').droppable({
    drop: function(event, ui) {
        ui.draggable.effect('explode', 1000 ).remove();
    }
});

