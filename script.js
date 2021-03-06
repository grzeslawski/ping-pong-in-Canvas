   // pobieranie elementu canvas
   const canvas = document.querySelector('canvas');
   // przypisanie kontekstu graficznego - nowe właściwości i metody do których dowołamy się za pomocą obiektu ctx
   const ctx = canvas.getContext('2d');
   // nadajemy canvas wysokość i szerokość (domyślnie 300x150)
   canvas.width = 1000;
   canvas.height = 500;
   // szerokość i wysokośc przypisujemy do zmiennych
   const cw = canvas.width;
   const ch = canvas.height;

   const ballSize = 20; // wielkośc piłki
   // położenie piłki
   let ballX = cw / 2 - ballSize / 2
   let ballY = ch / 2 - ballSize / 2
   // rakietki
   const paddleHeight = 100;
   const paddleWidth = 20;

   const playerX = 70;
   const aiX = 910;

   let playerY = 200;
   let aiY = 200;

   const lineWidth = 6;
   const lineHeight = 16;

   let ballSpeedX = -5;
   let ballSpeedY = -5;

   const button = document.querySelector('button');
   const result1 = document.querySelector('.result1');
   const result2 = document.querySelector('.result2');
   let index1 = 0;
   let index2 = 0;


   function player() {
       ctx.fillStyle = "#7FFF00";
       ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight)
   }

   function ai() {
       ctx.fillStyle = "yellow";
       ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight)
   }

   function ball() {
       ctx.fillStyle = "white";
       ctx.fillRect(ballX, ballY, ballSize, ballSize)

       ballX += ballSpeedX;
       ballY += ballSpeedY;
       if (ballY <= 0 || ballY + ballSize >= ch) {
           ballSpeedY = -ballSpeedY
           speedUp()
       }

       if (ballX <= playerX) {
           clearInterval(gameRender);
           result1.textContent = ++index1;
           // alert('Przegrałeś :(')

       } else if (ballX + ballSize >= cw) {
           clearInterval(gameRender);
           result2.textContent = ++index2;
           // alert('Wygrałeś!!!')
       }

       if (ballX <= playerX + paddleWidth && ballY + ballSize / 2 <= playerY + paddleHeight && ballY + ballSize /
           2 >= playerY) {
           ballX += 5;
           ballSpeedX = -ballSpeedX
           // speedUp()
       }
       if (ballX + ballSize >= aiX && ballY + ballSize / 2 <= aiY + paddleHeight && ballY + ballSize /
           2 >= aiY) {
           ballSpeedX = -ballSpeedX
           // speedUp()
       }

   }

   function table() {
       // stół
       // ustawiamy kolor rysowania na czarny i rysujemy czarny prostokąt o wymiarach canvas
       // ten kolor będzie aktywny dopóki nie zostanie nadpisany kolejnym ctx.fillStyle
       ctx.fillStyle = "black";
       // metoda fillRect wymaga podania 4 argumentów, 2 pierwsze to początek, 2 ostanie to współrzedne konca prostokątu
       ctx.fillRect(0, 0, cw, ch)
       // linie na środku
       for (let linePosition = 20; linePosition < ch; linePosition += 30) {
           ctx.fillStyle = "gray"
           ctx.fillRect(cw / 2 - lineWidth / 2, linePosition, lineWidth, lineHeight)
       }
   }

   topCanvas = canvas.offsetTop;

   function playerPosition(e) {
       // console.log("pozycja myszy to " + (e.clientY - topCanvas));
       playerY = e.clientY - topCanvas - paddleHeight / 2;

       // gdy rakietka wyjeżdza na dole poza canvas

       if (playerY >= ch - paddleHeight) {
           playerY = ch - paddleHeight;
       }

       if (playerY <= 0) {
           playerY = 0;
       }

       // aiY = playerY;
   }

   function speedUp() {
       // console.log(ballSpeedX);
       // prędkość X
       if (ballSpeedX > 0 && ballSpeedX < 16) {
           ballSpeedX += .4
       } else if (ballSpeedX < 0 && ballSpeedX > -16) {
           ballSpeedX -= .4
       }
       // prędkość Y
       // console.log(ballSpeedY);
       if (ballSpeedY > 0 && ballSpeedY < 16) {
           ballSpeedX += .2
       } else if (ballSpeedY < 0 && ballSpeedY > -16) {
           ballSpeedY -= .2
       }
   }

   // SZTUCZNA INTELIGENCJA 

   function aiPosition() {
       const middlePaddle = aiY + paddleHeight / 2;
       const middleBall = ballY + ballSize / 2;

       if (ballX > 500) {
           if (middlePaddle - middleBall > 200) {
               aiY -= 25;
           } else if (middlePaddle - middleBall > 50) {
               aiY -= 15;
           } else if (middlePaddle - middleBall < -200) {
               aiY += 25;
           } else if (middlePaddle - middleBall < -50) {
               aiY += 15;
           }

       } else if (ballX <= 500 && ballX > 150) {
           if (middlePaddle - middleBall > 100) {
               aiY -= 10;
           } else if (middlePaddle - middleBall < -100) {
               aiY += 10;
           }
       }
   }

   canvas.addEventListener('mousemove', playerPosition)

   // wywołujemy funkcje
   function game() {
       table()
       ball()
       player()
       ai()
       aiPosition()
   }

   const gameRender = setInterval(game, 1000 / 60);
   // gameRender();

   function startGame() {
       setInterval(game, 1000 / 60);
       // let ballX = cw / 2 - ballSize / 2
       // let ballY = ch / 2 - ballSize / 2
       // let ballSpeedX = -5;
       // let ballSpeedY = -5;
       ballSpeedX = -ballSpeedX
       ballSpeedY = -ballSpeedY
       console.log('ok');
   }
   button.addEventListener('click', startGame)