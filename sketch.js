const Engine = Matter.Engine;//Módulo responsáveis pelas leis físicas que rejem o mundo
const World = Matter.Composite;/* Modulo responsável pela coleção de Matter.Body, Matter.Constraint e outros objetos Matter.Composite. 
                                    UM COMPOSITE PODE CONTER DESDE UM ÚNICO CORPO ATÉ UM MUNDO INTEIRO 
                                    */
const Bodies = Matter.Bodies;/* O módulo Matter.Bodies contém métodos para criar corpos rígidos com configurações*/
const Constraint = Matter.Constraint;

var engine, world;
var solo, box1, box2, box3, box4;
var pig1, pig2;
var log1, log2, log3, log4;
var bird, fundoImg, plataforma, porrete, ligacao;


function preload(){
    fundoImg = loadImage("sprites/bg.png");

}


function setup() {
    var canvas = createCanvas(1200, 400);
    engine = Engine.create();
    world = engine.world;
    rectMode(CENTER);


    //angleMode(RADIANS); unidade padrão!
    //angleMode(DEGREES); unidade alternativa, porém aproximada
    solo = new Solo(width / 2, height, width, 20);
    plataforma = new Solo(150, 305, 300, 170);

    box1 = new Caixas(700, 320, 70, 70);
    box2 = new Caixas(920, 320, 70, 70);
    pig1 = new Porcos(810, 350);
    log1 = new Troncos(810, 260, 300, PI / 2);

    box3 = new Caixas(700, 240, 70, 70);
    box4 = new Caixas(920, 240, 70, 70);
    log2 = new Troncos(810, 180, 300, PI / 2);
    pig2 = new Porcos(810, 220);

    box5 = new Caixas(810, 160, 70, 70);
    log3 = new Troncos(760, 120, 150, PI / 7);
    log4 = new Troncos(870, 120, 150, -PI / 7);

    bird = new Passaros(100, 100);
    porrete = new Troncos(230, 180, 80, PI / 2);

ligacao = new Ligacao(
    bird.body,
    porrete.body
)
    



}

function draw() {
    background(fundoImg);
    Engine.update(engine);
    //console.log(box2.body.position.x);
    //console.log(box2.body.position.y);
    //console.log(box2.body.angle);
    solo.display();
    plataforma.display();
    box1.display();
    box2.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    log2.display();
    pig2.display();

    box5.display();
    log3.display();
    log4.display();

    bird.display();
    porrete.display();
    ligacao.display();
    



}

class BaseClass {
    constructor(x, y, lar, alt, angulo) {
        this.x = x;
        this.y = y;
        this.lar = lar;
        this.alt = alt;
        var options = {};
        this.body = Bodies.rectangle(this.x, this.y, this.lar, this.alt, options);
        this.imagem = loadImage("sprites/base.png");
        World.add(world, this.body);


    }

    display() {

        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);
        imageMode(CENTER);
        image(this.imagem, 0, 0, this.lar, this.alt);
        pop();

    }
}

class Passaros extends BaseClass {
    constructor(x, y) {
        super(x, y, 50, 50);
        this.imagem = loadImage("sprites/bird.png");
        this.body.restitution = 0.8;
        this.body.friction = 1.0;
        this.body.density = 1.0;


    }
    display() {

        this.body.position.x = mouseX;
        this.body.position.y = mouseY;

        super.display();
    }


}
class Caixas extends BaseClass {
    constructor(x, y, largura, altura) {
        super(x, y, largura, altura);

        this.restitution = 0.8;
        this.friction = 1.0;
        this.density = 1.0;

        this.imagem = loadImage("sprites/wood1.png");
    }
    display() {
        super.display();
    }
}

class Solo extends BaseClass {
    constructor(x, y, largura, altura) {
        super(x, y, largura, altura);

        this.body.isStatic = true;

        //this.imagem = loadImage("sprites/ground.png");
    }
    display() {

        super.display();
    }
}

class Porcos extends BaseClass {
    constructor(x, y) {
        super(x, y, 50, 50);

        this.restitution = 0.8;
        this.friction = 0.3;
        this.density = 1.0;

        this.imagem = loadImage("sprites/enemy.png");

    }
    display() {

        super.display();
    }
}
class Ligacao {
    constructor(bodyA, bodyB){
         this.bodyA=bodyA;
        this.bodyB=bodyB;
         var options ={
            bodyA: this.bodyA,
            bodyB: this.bodyB
        }


        this.ligacao = Constraint.create(options);
        World.add(world, this.ligacao);

    }
    display(){
        stroke("brown");
        strokeWeight(4);
    
        line(this.bodyA.position.x, this.bodyA.position.y, this.bodyB.position.x,this.bodyB.position.y);
    }
}

class Troncos extends BaseClass {
    constructor(x, y, altura, angulo) {
        super(x, y, 20, altura, angulo);

        this.restitution = 0.8;
        this.friction = 1.0;
        this.density = 1.0;

        Matter.Body.setAngle(this.body, angulo);

        this.imagem = loadImage("sprites/wood2.png");

    }
    display() {

        super.display();
    }
};