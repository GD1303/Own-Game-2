var ufo, ufoImg;
var bullet, bulletImg;

var virus, virusImg, virusGroup;
var deadVirus, deadVirusImg, deadVirusGroup;

function preload() {
	ufoImg = loadImage("ufo.png");
	bulletImg = loadImage("bullet.png");

	virusImg = loadImage("virus.png");
	deadVirusImg = loadImage("deadVirus.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	ufo = createSprite(150, height/2, 256, 256);
	ufo.addImage(ufoImg);
	ufo.scale = 0.5;

	bulletGroup = createGroup();
	virusGroup = createGroup();
	deadVirusGroup = createGroup();
}


function draw() {
  rectMode(CENTER);
  background(0);

  bullet = createSprite(ufo.x, ufo.y - 50, 50, 50);
  bullet.addImage(bulletImg);
  bullet.scale = 0.01;
  bullet.lifetime = width;
  bullet.visible = false;
  bulletGroup.add(bullet);

  if(keyDown(38) || keyDown(87)) {
	ufo.y = ufo.y - 10;
	bullet.y = bullet.y - 10;

	bulletGroup.destroyEach();
  }

  if(keyDown(40) || keyDown(83)) {
	ufo.y = ufo.y + 10;
	bullet.y = bullet.y + 10;
	
	bulletGroup.destroyEach();
  }

  if(keyDown(32)) {
	bullet.visible = true;
	bullet.velocityX = 30;
  }

  if(bulletGroup.collide(virusGroup)) {
	virusGroup.destroyEach();
	bulletGroup.destroyEach();
  }

  if(ufo.collide(virusGroup)) {
	virusGroup.destroy();
	deadVirusGroup.destroy();
	bulletGroup.destroy();
	ufo.destroy();
  }

  if(ufo.collide(deadVirusGroup)) {
	virusGroup.destroy();
	deadVirusGroup.destroy();
	bulletGroup.destroy();
	ufo.destroy();
  }

  if(bulletGroup.collide(deadVirusGroup)) {
	virusGroup.destroy();
	deadVirusGroup.destroy();
	bulletGroup.destroy();
	ufo.destroy();
  }

  spawnVirus();
  spawnDeadVirus();

  drawSprites();
}

function spawnVirus() {
	if(frameCount % 80 === 0) {
		virus = createSprite(width + 50, random(20, height - 20), 95, 95);
		virus.addImage(virusImg);
		virus.scale = 0.5;
		virus.velocityX = -5;
		virus.lifetime = -50;
		virusGroup.add(virus);
	}
}

function spawnDeadVirus() {
	if(frameCount % 100 === 0) {
		deadVirus = createSprite(width + 50, random(20, height - 20), 95, 95);
		deadVirus.addImage(deadVirusImg);
		deadVirus.scale = 0.5;
		deadVirus.velocityX = -5;
		deadVirus.lifetime = -50;
		deadVirusGroup.add(deadVirus);
	}
}