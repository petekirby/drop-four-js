var game = new Phaser.Game(298, 298, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var DOUBLEDROPOUT = {};
DOUBLEDROPOUT.PLAYER_COLOR = 'bluepiece';
DOUBLEDROPOUT.OPPONENT_COLOR = 'redpiece';
DOUBLEDROPOUT.pieces = {};

function preload () {
	game.load.image('board', 'res/board.png');
    game.load.image('buffer', 'res/buffer.png');
    game.load.image(DOUBLEDROPOUT.PLAYER_COLOR, 'res/bluepiece.png');
    game.load.image(DOUBLEDROPOUT.OPPONENT_COLOR, 'res/redpiece.png');
    game.load.image('draw', 'res/draw.png');
    game.load.image('youwin', 'res/youwin.png');
    game.load.image('tryagain', 'res/tryagain.png');
    game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL; //resize your window to see the stage resize too
    game.stage.scale.setShowAll();
    game.stage.scale.refresh();
}

function create () {
    DOUBLEDROPOUT.inputTimer = game.time.time; // milliseconds
    DOUBLEDROPOUT.computerTimer = game.time.time;
    
    initBoard();
    
    DOUBLEDROPOUT.inputPiece = game.add.sprite(149, 23, DOUBLEDROPOUT.PLAYER_COLOR);
    DOUBLEDROPOUT.inputPiece.anchor.setTo(0.5, 0.5);
    
    DOUBLEDROPOUT.inputColumn = 3;
    DOUBLEDROPOUT.cursors = game.input.keyboard.createCursorKeys();
    DOUBLEDROPOUT.cursors.left.onUp.add(onCursorLeft, this);
    DOUBLEDROPOUT.cursors.right.onUp.add(onCursorRight, this);
    DOUBLEDROPOUT.cursors.up.onUp.add(onCursorUp, this);
    DOUBLEDROPOUT.cursors.down.onUp.add(onCursorDown, this);
    game.input.onUp.add(onInputClick, this);
    
    CLASSIC.Board();
    // CLASSIC.setHumanFirst();
    // CLASSIC.setDifficulty(3);
    // DOUBLEDROPOUT.difficulty = 3;
    
    DOUBLEDROPOUT.isHumanTurn = true;
    DOUBLEDROPOUT.isEnd = false;
    DOUBLEDROPOUT.canTakeback = false;
}

function initBoard() {
    DOUBLEDROPOUT.pieceLayer = game.add.group();
    DOUBLEDROPOUT.pieceLayer.z = 1;
    DOUBLEDROPOUT.boardLayer = game.add.group();
    DOUBLEDROPOUT.boardLayer.z = 2;
    
    DOUBLEDROPOUT.board = game.add.sprite(game.world.centerX, game.world.centerY, 'board');
    DOUBLEDROPOUT.board.anchor.setTo(0.5, 0.417);
    DOUBLEDROPOUT.boardLayer.add ( DOUBLEDROPOUT.board );
    
    DOUBLEDROPOUT.buffer = game.add.sprite(0, 297, 'buffer');
    DOUBLEDROPOUT.buffer.body.immovable = true;
    DOUBLEDROPOUT.pieceLayer.add ( DOUBLEDROPOUT.buffer );
}

function update() {
    checkGameOver();
    checkMovement();
    if ( DOUBLEDROPOUT.isHumanTurn === false ) {
        if ( game.time.time > DOUBLEDROPOUT.computerTimer + 200 ) {
            makeComputerMove();
        }
    }
    game.physics.collide(DOUBLEDROPOUT.pieceLayer, DOUBLEDROPOUT.pieceLayer, collisionHandler, null, this);
}

function makeMove(col, player) {
    if ( CLASSIC.takeHumanTurn( col ) == CLASSIC.mconst_colNil ) {
        console.log("derp can't move in column " + col + ", silly human");
        return;
    }
    console.log("making move in column " + col + " for player " + player);
    DOUBLEDROPOUT.pewpew = game.add.sprite( colToX( col ), rowToY( 0 ), player );
    DOUBLEDROPOUT.pewpew.anchor.setTo(0.5, 0.5);
    var _destination = [];
    _destination.x = colToX( col );
    _destination.y = rowToY( 6 );
    game.physics.accelerateToObject( DOUBLEDROPOUT.pewpew, _destination, 800, 0, 800 );
    DOUBLEDROPOUT.pieceLayer.add( DOUBLEDROPOUT.pewpew );
    DOUBLEDROPOUT.computerTimer = game.time.time;
    DOUBLEDROPOUT.pewpew.body.velocity.y = 400;
    DOUBLEDROPOUT.isHumanTurn = false;
    DOUBLEDROPOUT.canTakeback = true;
}

function makeComputerMove() {
    var computermove = CLASSIC.takeComputerTurn();
    console.log("making move in column " + computermove + " for player " + "redpiece");
    DOUBLEDROPOUT.bangbang = game.add.sprite( colToX( computermove ), rowToY( 0 ), "redpiece" );
    DOUBLEDROPOUT.bangbang.anchor.setTo(0.5, 0.5);
    var _compdestination = [];
    _compdestination.x = colToX( computermove );
    _compdestination.y = rowToY( 6 );
    game.physics.accelerateToObject( DOUBLEDROPOUT.bangbang, _compdestination, 800, 0, 800 );
    DOUBLEDROPOUT.pieceLayer.add( DOUBLEDROPOUT.bangbang );
    DOUBLEDROPOUT.bangbang.body.velocity.y = 400;
    DOUBLEDROPOUT.isHumanTurn = true;
}

function checkGameOver() {
    if ( CLASSIC.isGameOver() && !DOUBLEDROPOUT.isEnd ) {
        DOUBLEDROPOUT.isEnd = true;
        DOUBLEDROPOUT.isEndMsg = false;
        DOUBLEDROPOUT.endTimer = game.time.time;
        DOUBLEDROPOUT.isWin = CLASSIC.isHumanWin();
        DOUBLEDROPOUT.isLoss = CLASSIC.isComputerWin();
        DOUBLEDROPOUT.oldDifficulty = CLASSIC.getDifficulty();
    }
    
    if ( DOUBLEDROPOUT.isEnd ) {
        if ( game.time.time > DOUBLEDROPOUT.endTimer + 500 ) {
            if ( DOUBLEDROPOUT.isEndMsg === false ) {
                DOUBLEDROPOUT.isEndMsg = true;
                displayEndMessage();
            }
        }
        
        if ( game.time.time > DOUBLEDROPOUT.endTimer + 1500 ) {
            console.log("entered the thing for refresh");
            DOUBLEDROPOUT.isEnd = false;
            DOUBLEDROPOUT.msg.destroy();
            DOUBLEDROPOUT.pieceLayer.destroy();
            initBoard();
            CLASSIC.Board();
            adjustDifficulty( DOUBLEDROPOUT.isWin,DOUBLEDROPOUT.isLoss );
        }
    }            
}
    
function displayEndMessage() {
    if ( CLASSIC.isHumanWin() ) {
        DOUBLEDROPOUT.msg = game.add.sprite(game.world.centerX, game.world.centerY, 'youwin');
        DOUBLEDROPOUT.msg.anchor.setTo(0.5, 0.5);
    } else if ( CLASSIC.isComputerWin() ) {
        DOUBLEDROPOUT.msg = game.add.sprite(game.world.centerX, game.world.centerY, 'tryagain');
        DOUBLEDROPOUT.msg.anchor.setTo(0.5, 0.5);
    } else {
        DOUBLEDROPOUT.msg = game.add.sprite(game.world.centerX, game.world.centerY, 'draw');
        DOUBLEDROPOUT.msg.anchor.setTo(0.5, 0.5);
    }
}

function adjustDifficulty( isWin, isLoss ) {
    if ( isWin ) {
        console.log( "because it is a win");
        CLASSIC.setDifficulty( DOUBLEDROPOUT.oldDifficulty + 1 );
    } else if ( isLoss ) {
        console.log ("because it is a loss");
        CLASSIC.setDifficulty( DOUBLEDROPOUT.oldDifficulty - 1 );
    }
    
    console.log("adjusting difficulty to " + CLASSIC.getDifficulty() );
}

// weird bug locking on square in touch mode
function checkMovement() {
    var _inputColumn;
    if ( game.input.activePointer.duration > 150 && game.input.activePointer.duration < 6000 ) {
        _inputColumn = Math.floor( game.input.activePointer.x / 42 );
        if ( _inputColumn >= 0 && _inputColumn <= 6 ) {
            DOUBLEDROPOUT.inputColumn = _inputColumn;
        }
    } else if ( game.device.desktop ) {
        _inputColumn = Math.floor( game.input.mousePointer.x / 42 );
        if ( _inputColumn >= 0 && _inputColumn <= 6 ) {
            DOUBLEDROPOUT.inputColumn = _inputColumn;
        }
    }
    
    DOUBLEDROPOUT.inputPiece.x = colToX( DOUBLEDROPOUT.inputColumn );   
}

function trySwitchSides() {
    if ( CLASSIC.m_cMoves == 0 ) {
        CLASSIC.setComputerFirst();
        DOUBLEDROPOUT.isHumanTurn = false;
        DOUBLEDROPOUT.canTakeback = false;
    }
}

function tryTakeback() {
    if ( DOUBLEDROPOUT.canTakeback && DOUBLEDROPOUT.isHumanTurn ) {
        DOUBLEDROPOUT.pewpew.destroy();
        DOUBLEDROPOUT.bangbang.destroy();
        CLASSIC.takeBackMove();
        CLASSIC.takeBackMove();
        DOUBLEDROPOUT.canTakeback = false;
    }
}

function onCursorLeft(evt)
{
    console.log( "on cursor left" );
    if ( DOUBLEDROPOUT.inputColumn > 0 ) {
        DOUBLEDROPOUT.inputColumn--;
    }
}

function onCursorRight(evt)
{
    console.log( "on cursor right" );
    if( DOUBLEDROPOUT.inputColumn < 6 ) {
        DOUBLEDROPOUT.inputColumn++;
    }
}

function onCursorUp(evt)
{
    trySwitchSides();
    tryTakeback();
}

function onCursorDown(evt)
{
    makeMove( DOUBLEDROPOUT.inputColumn, DOUBLEDROPOUT.PLAYER_COLOR );
}

function onInputClick(evt)
{
    var milliseconds = game.time.time;
    
    //must be a short tap or any click
    if ( ( game.input.activePointer.duration > 20 && game.input.activePointer.duration < 150 ) || game.input.mousePointer.isDown ) {
        // minimum 300 milliseconds between inputs
        if ( milliseconds > DOUBLEDROPOUT.inputTimer + 300 ) {
            if (DOUBLEDROPOUT.isHumanTurn === true ) {
                DOUBLEDROPOUT.inputTimer = milliseconds;
                makeMove( DOUBLEDROPOUT.inputColumn, DOUBLEDROPOUT.PLAYER_COLOR );
            }
        }
    }
    
    if( game.input.activePointer.positionDown.y - game.input.activePointer.position.y > 100 && game.input.activePointer.duration > 100 && game.input.activePointer.duration < 600) {
        // minimum 300 milliseconds between inputs
        if ( milliseconds > DOUBLEDROPOUT.inputTimer + 300 ) {
            if (DOUBLEDROPOUT.isHumanTurn === true ) {
                DOUBLEDROPOUT.inputTimer = milliseconds;
                onCursorUp();
            }
        }
    }
}

function colToX( col ) {
    return 42 * col + 23;
}
    
function rowToY( row ) {
    return 42 * row + 23;
}

function collisionHandler( obj1, obj2 ) {
    obj1.body.acceleration.y = 0;
    obj2.body.acceleration.y = 0;
    obj2.body.velocity.y = 0;
    obj2.body.velocity.y = 0;
}