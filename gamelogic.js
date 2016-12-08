/**
 * Created by BrentB on 4/24/2016.
 */

function checkCollisions()
{
    for (i = 0; i < asteroids.length; i++){
        for (j = 0;j < projectiles.length; j++){
            if (asteroids[i].intersectsMesh(projectiles[j], false)){
                explosionSound.play();
                var spriteManager = new BABYLON.SpriteManager("playerManagr", "images/explosion-sprite.png", 1, 150, scene);
                var fire = new BABYLON.Sprite("player", spriteManager);
                fire.disposeWhenFinishedAnimating = true;
                fire.size = 5;

                fire.position.x = asteroids[i].position.x;
                fire.position.y = asteroids[i].position.y;
                fire.position.z = asteroids[i].position.z;
                fire.playAnimation(0, 10, false, 70);
                asteroids[i].isVisible = false;
                asteroids.splice(i, 1);
                asteroidBounds[i].isVisible = false;
                asteroidBounds.splice(i, 1);
                projectiles[j].isVisible = false;
                projectiles.splice(j, 1);
                projectileBounds[j].isVisible = false;
                projectileBounds.splice(j, 1);

                score += 10;
            }
        }
    }
}

function updateScore(data) {
    context2D.clearRect(0, 200, 512, 512);
    outputplaneTexture.drawText(data, null, 380, "140px arial", "green", null);
}


function shootLaser()
{
    var d = new Date();
    var lastShot = previousShot;
    var gameTime = d.getTime();
    var timeToFire = 300;   // 300 milliseconds between shot

    if ((gameTime - previousShot) > timeToFire){
        var newLaser = laser.clone("laser");
        var x = playerShip.position.x;
        var y = playerShip.position.y;
        var z = playerShip.position.z;
        newLaser.isVisible = true;
        newLaser.position.x = x + 0.03;
        newLaser.position.y = y + 0.9;
        newLaser.position.z = z;
        projectiles.push(newLaser);
        previousShot = d.getTime();
        laserSound.play();

        //generate bounding box for new shot
        var newLaserBox = laserBox.clone("laserBox");
        newLaserBox.position.x = newLaser.position.x;
        newLaserBox.position.y = newLaser.position.y;
        newLaserBox.position.z = newLaser.position.z;
        projectileBounds.push(newLaserBox);
    }
}

function updateProjectiles()
{
    var projectiles2 = projectiles;
    for (i = 0; i < projectiles.length; i++){
        projectiles2[i].position.y += 0.06;
        projectileBounds[i].position.y += 0.06;

        if (projectiles[i].position.y > 4)
        {
            projectiles[i].isVisible = false;
            projectiles.splice(i, 1);

            projectileBounds[i].isVisible = false;
            projectileBounds.splice(i, 1);

        }
    }
}


function spawnAsteroid()
{
    var d = new Date();
    var lastAsteroid = previousAsteroid;
    var gameTime = d.getTime();
    var timeToSpawn = 2000;   // 1000 milliseconds between spawns
    var tester = gameTime - lastAsteroid;

    if ((gameTime - lastAsteroid) > timeToSpawn)
    {
        var newAsteroid = rock.clone("rock");
        var xPos = Math.floor((Math.random() * 10) - 5);
        newAsteroid.position.x = xPos;
        newAsteroid.position.y = playerShip.position.y + 15;
        newAsteroid.position.z = playerShip.position.z;
        newAsteroid.isVisible = true;
        var rotate = Math.floor (Math.random() * 3);
        newAsteroid.rotation.x = rotate;
        newAsteroid.rotation.y = rotate;
        asteroids.push(newAsteroid);
        previousAsteroid = d.getTime();

        var newAsteroidBox = asteroidBox.clone("asteroidBox");
        newAsteroidBox.position.x = newAsteroid.position.x;
        newAsteroidBox.position.y = newAsteroid.position.y;
        newAsteroidBox.position.z = newAsteroid.position.z;
        asteroidBounds.push(newAsteroidBox);
    }
}

function updateAsteroid()
{
    var asteroids2 = asteroids;
    for (i = 0; i < asteroids.length; i++){
        asteroids[i].position.y -= 0.02;
        asteroids[i].rotation.x -= 0.02;
        asteroids[i].rotation.y -= 0.001;

        asteroidBounds[i].position.y -= 0.02;

        if (asteroids[i].position.y < -7)
        {
            asteroids[i].isVisible = false;
            asteroids.splice(i, 1);

            asteroidBounds.splice(i, 1);
        }
    }
}