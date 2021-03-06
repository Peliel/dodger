function start() {
    canvas.removeEventListener("mousedown", start);
    canvas.addEventListener("mousedown", hide);
    startScreen = false;
    canvas.style.cursor = "none";
    mainloop = setTimeout(draw, 1);
}

function resume() {
    if (!startScreen) {
        mainloop = setTimeout(draw, 1);
    }
}

function stop() {
    clearTimeout(mainloop);
}

function clickListener() {
    if (update && version != latest) {
        if (mouseX > W / 2 - 140 && mouseX < W / 2 + 145 && mouseY > H / 2 + 48 && mouseY < H / 2 + 68) {
            document.location.reload(true);
            window.open("https://peliel.github.io/dodgerserver/", "_blank");
        }
    }
}

function posListener() {
    if (startScreen) {
        if (update && version != latest) {
            if (mouseX > W / 2 - 105 && mouseX < W / 2 + 105 && mouseY > H / 2 - 15 && mouseY < H / 2 + 5) {
                colors.play = "skyblue";
                canvas.style.cursor = "pointer";
                draw();
                write();
            } else {
                colors.play = "white";
                draw();
                write();
            }
        
            if (mouseX > W / 2 - 140 && mouseX < W / 2 + 145 && mouseY > H / 2 + 48 && mouseY < H / 2 + 68) {
                colors.download = "skyblue";
                canvas.style.cursor = "pointer";
                draw();
                write();
            } else {
                colors.download = "white";
                draw();
                write();
            }
        }
    }
}

function rnd(coeff = 1) {
    return Math.random() * coeff;
}

function disableHide() {
    canvas.removeEventListener("mousedown", hide);
}

function hide() {
    player.c = "#555";
    close = setInterval(function() {
        wall.l += 0.5;
        wall.r -= 0.5;
        wall.u += 0.1;
        wall.d += 0.1;
    }, 10);
    unhide = setTimeout(function() {
        player.c = "rgba(153, 51, 255, 1)";
        mouseUp = true;
    }, 2500);
    disableHide();
    mouseUp = false;
}

function show() {
    player.c = "#9933FF";
    clearInterval(close);
    clearTimeout(unhide);
    mouseUp = true;
}

function move(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!startScreen) {
        if (mouseUp) {
            wall.l += (0.5 * val4.value / 100);
            wall.r -= (0.5 * val4.value / 100);
        } else if (!mouseUp) {
            wall.l += 0;
            wall.r -= 0;
        }
    }
    if (startScreen) {
        canvas.style.cursor = "context-menu";
    }
}

function circDir() {
    let circDirs = [-8, -6, -4, -2, 2, 4];
    let choice = circDirs[Math.round(rnd(circDirs.length))];
    return choice;
}

function rectDir() {
    let rectDirs = [-8, -6, -4, -2, 2, 4];
    let choice = rectDirs[Math.round(rnd(rectDirs.length))];
    return choice;
}

function restart() {
    for (let i = 0; i < 5; i++) {
        circs[i] = [];
        rects[i] = [];
    }
    wall.l = 0 - W / 2;
    wall.r = W;
    wall.u = 0 - H / 2;
    wall.d = H;



    for (let col = 0; col < circPoses.length; col++) {
        for (let row = 0; row < circPoses[col].length; row++) {
            circPoses[col][row] = null;
        }
        circPoses[col][0] = rnd(W);
        circPoses[col][1] = rnd(H);
    }

    for (let col = 0; col < rectPoses.length; col++) {
        for (let row = 0; row < rectPoses[col].length; row++) {
            rectPoses[col][row] = null;
        }
        rectPoses[col][0] = rnd(W);
        rectPoses[col][1] = rnd(H);
    }

    mainloop = setTimeout(draw, 1);
    canvas.style.cursor = "none";
    dead = false;
    canvas.removeEventListener("mousedown", restart);
    canvas.addEventListener("mousedown", hide);
    canvas.addEventListener("mouseleave", die);
    time = 0;
}

function die() {
    dead = true;
    clearTimeout(mainloop);
    canvas.style.cursor = "context-menu";
    canvas.removeEventListener("mouseleave", die);
    canvas.addEventListener("mousedown", restart);
    write();
    ctx.textAlign = "center";
    ctx.font = "bold 50px Calibri";
    ctx.fillStyle = colors.header || "white";
    ctx.fillText("Click anywhere to restart the game", W / 2, H / 2);
}