/**
 * Created by BrentB on 4/22/2016.
 */
function LoadContent()
{
    engine = new BABYLON.Engine(canvas, false);
    scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.1, 0.3, 0.5);

    camera = new BABYLON.TargetCamera("camera1", new BABYLON.Vector3(0, 0, -23), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, false);

    light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    BABYLON.SceneLoader.ImportMesh("", "assets/", "starship.babylon", scene, function (newMeshes) {
        // import the ship mesh
        /*newMeshes[0].scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
        newMeshes[0].rotation.y = 3.14;
        newMeshes[0].rotation.x = 5.94;
        newMeshes[0].position.z = -10;
        newMeshes[0].position.y = -4.5;
        playerShip = newMeshes[0];*/

        newMeshes[0].scaling = new BABYLON.Vector3(0.003, 0.003, 0.003);
        newMeshes[0].rotation.y = 3.14;
        newMeshes[0].rotation.x = 11.94;
        newMeshes[0].rotation.z = 36.14;
        newMeshes[0].position.z = -10;
        newMeshes[0].position.y = -4.5;
        playerShip = newMeshes[0];

        // create and import background geometry and materials
        var backMaterial = new BABYLON.StandardMaterial("texture1", scene);
        backMaterial.diffuseTexture = new BABYLON.Texture("images/starb.png", scene);

        background = new BABYLON.Mesh.CreatePlane("background", 3000, scene);
        background.material = backMaterial;//new BABYLON.StandardMaterial("backgroundmat", scene);
        background.position.y = 1000;
        background.position.z = 800;

        // create bounding boxs for lasers and asteroids

        // create laser projectile mesh
        laser = BABYLON.Mesh.CreateCylinder("laserMesh", 0.4, 0.05, 0.05, 24, 24, scene);
        laser.isVisible = false;

        var laserMaterial = new BABYLON.StandardMaterial("laserTexture", scene);
        laserMaterial.diffuseColor = new BABYLON.Color3(0.1, 1.0, 0.3);

        laser.material = laserMaterial;

        // create asteroid mesh and material
        var rockMaterial = new BABYLON.StandardMaterial("rockMaterial", scene);
        rockMaterial.diffuseTexture = new BABYLON.Texture("images/marble.jpg", scene);
        rockMaterial.bumpTexture = new BABYLON.Texture("images/Rocknormal.jpg", scene);
        rockMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        rockMaterial.diffuseTexture.uScale = .5;
        rockMaterial.diffuseTexture.vScale = .5;


        // create bounding boxs for lasers and asteroids
        var matBB = new BABYLON.StandardMaterial("matBB", scene);
        matBB.emissiveColor = new BABYLON.Color3(1, 1, 1);
        matBB.wireframe = true;

        laserBox = new BABYLON.Mesh.CreateBox("laserBox", 0.5, scene);
        laserBox.scaling  = new BABYLON.Vector3(0.3, 1, 1);
        laserBox.isVisible = false;

        asteroidBox = new BABYLON.Mesh.CreateBox("asteroidBox", 1.2, scene);
        asteroidBox.isVisible = false;

        laserBox.material = matBB;
        asteroidBox.material = matBB;

        // 2d text for score
        outputplane = BABYLON.Mesh.CreatePlane("outputplane", 25, scene, false);
        outputplane.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
        outputplane.material = new BABYLON.StandardMaterial("outputplane", scene);
        outputplane.position = new BABYLON.Vector3(0, 9, 0);
        outputplane.scaling = new BABYLON.Vector3(0.09, 0.04, 0.09);

        outputplaneTexture = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
        outputplane.material.diffuseTexture = outputplaneTexture;
        outputplane.material.specularColor = new BABYLON.Color3(0, 0, 0);
        outputplane.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
        outputplane.material.backFaceCulling = false;

        outputplaneTexture.drawText("score", null, 140, "bold 140px verdana", "white", "#0000AA");

        context2D = outputplaneTexture.getContext();

        laserSound = new BABYLON.Sound("laser", "sounds/laser.mp3", scene, null, { volume: 0.2 });
        explosionSound = new BABYLON.Sound("explosion", "sounds/explosion.wav", scene, null, { volume: 0.2 });
        
        BABYLON.SceneLoader.ImportMesh("", "", "assets/a6.babylon", scene, function (rockMesh) {
            rock = rockMesh[0];
            rock.position.x = playerShip.position.x;
            rock.position.y = playerShip.position.y + 15;
            rock.position.z = playerShip.position.z;
            rock.isVisible = true;
            rock.material = rockMaterial;

            var music = new BABYLON.Sound("bgmusic", "sounds/terran3.mp3", scene, function () {
                contentLoaded = true;
            }, { loop: true, autoplay: true, volume: 0.1 }

            );
        });
    });
    console.log("Done loading!");
}

