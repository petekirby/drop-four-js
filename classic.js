var CLASSIC = [];
CLASSIC.MAGIC_LIMIT_POS = 42;
CLASSIC.MAGIC_LIMIT_QUAD = 70;
CLASSIC.MAGIC_LIMIT_QUADCODE = 30;
CLASSIC.MAGIC_LIMIT_QUAD_PER_POS = 14;

CLASSIC.isGameOver = function() {
    return ( CLASSIC.m_sumStatEval > CLASSIC.mconst_evalPositiveWinMin || CLASSIC.m_sumStatEval < CLASSIC.mconst_evalNegativeWinMin || CLASSIC.m_cMoves == 42 );
};

// this is an error code returned in place of a column number
CLASSIC.mconst_colNil = -1;

// set the default difficulty to level 4, and the max branch factor to 4 moves
CLASSIC.mconst_defaultDifficulty = 4;
CLASSIC.mconst_branchFactorMax   = 4;

// number of positions or squares on board
CLASSIC.mconst_posLim               = CLASSIC.MAGIC_LIMIT_POS;
// actually 69 quads, but 0 isn't used (so 1-69)
CLASSIC.mconst_quadLim              = CLASSIC.MAGIC_LIMIT_QUAD;
// number of 'quad codes'
CLASSIC.mconst_quadcodeLim          = CLASSIC.MAGIC_LIMIT_QUADCODE;
// number of quads affected (max) by a position (square)
CLASSIC.mconst_quadsPerPosLim       = CLASSIC.MAGIC_LIMIT_QUAD_PER_POS;

CLASSIC.mconst_worstEval = -10000; // unattainable numbers
CLASSIC.mconst_bestEval  = 10000;

// points allotted to 0, 1, 2, 3, and 4 squares in a quad
CLASSIC.mconst_dEvalP1 = 1;
CLASSIC.mconst_dEvalP2 = 3;
CLASSIC.mconst_dEvalP3 = 17;
CLASSIC.mconst_dEvalP4 = 2000;
CLASSIC.mconst_dEvalN1 = -1;
CLASSIC.mconst_dEvalN2 = -3;
CLASSIC.mconst_dEvalN3 = -18;
CLASSIC.mconst_dEvalN4 = -2000;

// the minimum number of points one will have if the winner
CLASSIC.mconst_evalPositiveWinMin = 1000;
CLASSIC.mconst_evalNegativeWinMin = -1000;

// posquad holds the quad numbers for each of the 42 squares, ended by a 0
// the data below was generated by a program commented out at the end of
// the file
CLASSIC.mconst_mpPosQuads = [
	[1, 25, 46, 0],
	[1, 2, 28, 47, 0],
	[1, 2, 3, 31, 48, 0],
	[1, 2, 3, 4, 34, 49, 58, 0],
	[2, 3, 4, 37, 59, 0],
	[3, 4, 40, 60, 0],
	[4, 43, 61, 0],
	[5, 25, 26, 50, 0],
	[5, 6, 28, 29, 51, 46, 0],
	[5, 6, 7, 31, 32, 52, 47, 58, 0],
	[5, 6, 7, 8, 34, 35, 53, 48, 62, 59, 0],
	[6, 7, 8, 37, 38, 49, 63, 60, 0],
	[7, 8, 40, 41, 64, 61, 0],
	[8, 43, 44, 65, 0],
	[9, 25, 26, 27, 54, 0],
	[9, 10, 28, 29, 30, 55, 50, 58, 0],
	[9, 10, 11, 31, 32, 33, 56, 51, 46, 62, 59, 0],
	[9, 10, 11, 12, 34, 35, 36, 57, 52, 47, 66, 63, 60, 0],
	[10, 11, 12, 37, 38, 39, 53, 48, 67, 64, 61, 0],
	[11, 12, 40, 41, 42, 49, 68, 65, 0],
	[12, 43, 44, 45, 69, 0],
	[13, 25, 26, 27, 58, 0],
	[13, 14, 28, 29, 30, 54, 62, 59, 0],
	[13, 14, 15, 31, 32, 33, 55, 50, 66, 63, 60, 0],
	[13, 14, 15, 16, 34, 35, 36, 56, 51, 46, 67, 64, 61, 0],
	[14, 15, 16, 37, 38, 39, 57, 52, 47, 68, 65, 0],
	[15, 16, 40, 41, 42, 53, 48, 69, 0],
	[16, 43, 44, 45, 49, 0],
	[17, 26, 27, 62, 0],
	[17, 18, 29, 30, 66, 63, 0],
	[17, 18, 19, 32, 33, 54, 67, 64, 0],
	[17, 18, 19, 20, 35, 36, 55, 50, 68, 65, 0],
	[18, 19, 20, 38, 39, 56, 51, 69, 0],
	[19, 20, 41, 42, 57, 52, 0],
	[20, 44, 45, 53, 0],
	[21, 27, 66, 0],
	[21, 22, 30, 67, 0],
	[21, 22, 23, 33, 68, 0],
	[21, 22, 23, 24, 36, 54, 69, 0],
	[22, 23, 24, 39, 55, 0],
	[23, 24, 42, 56, 0],
	[24, 45, 57, 0]
];

// the quadcode system tells how many max's and min's are in it with the
// following code
// 0 - 0 max, 0 min    10 - 1 max, 0 min     20 - 2 max, 1 min
// 2 - 0 max, 1 min    12 - 1 max, 1 min     22 - 2 max, 2 min
// 4 - 0 max, 2 min    14 - 1 max, 2 min     24 - 3 max, 0 min
// 6 - 0 max, 3 min    16 - 1 max, 3 min     26 - 3 max, 1 min
// 8 - 0 max, 4 min    18 - 2 max, 0 min     28 - 4 max, 0 min
// the even number if min to be added, add 1 for odd if max to be added

// this will return the next (even) quadcode when a square is added
// -1 is error, already 4 squares for quad
CLASSIC.mconst_rgUpQuadcode = [
    2, 10,  4, 12,  6, 14,  8, 16, -1, -1,
	12, 18, 14, 20, 16, 22, -1, -1, 20, 24,
	22, 26, -1, -1, 26, 28, -1, -1, -1, -1
];

// this will return the previous (even) quadcode when a square is removed
CLASSIC.mconst_rgDownQuadcode = [
	-1, -1,  0, -1,  2, -1,  4, -1,  6, -1,
	-1,  0, 10,  2, 12,  4, 14,  6, -1, 10,
	18, 12, 20, 14, -1, 18, 24, 20, -1, 24
];

// this will return the amount to add to stateval in light of change in quad
CLASSIC.mconst_rgUpEval = [
	CLASSIC.mconst_dEvalN1,
	CLASSIC.mconst_dEvalP1,
	CLASSIC.mconst_dEvalN2 - CLASSIC.mconst_dEvalN1,
	-CLASSIC.mconst_dEvalN1,
	CLASSIC.mconst_dEvalN3 - CLASSIC.mconst_dEvalN2,
	-CLASSIC.mconst_dEvalN2,
	CLASSIC.mconst_dEvalN4 - CLASSIC.mconst_dEvalN3,
	-CLASSIC.mconst_dEvalN3,
	0,
	0,
	-CLASSIC.mconst_dEvalP1,
	CLASSIC.mconst_dEvalP2 - CLASSIC.mconst_dEvalP1,
	0,
	0,
	0,
	0,
	0,
	0,
	-CLASSIC.mconst_dEvalP2,
	CLASSIC.mconst_dEvalP3 - CLASSIC.mconst_dEvalP2,
	0,
	0,
	0,
	0,
	-CLASSIC.mconst_dEvalP3,
	CLASSIC.mconst_dEvalP4 - CLASSIC.mconst_dEvalP3,
	0,
	0,
	0,
	0
];

CLASSIC.Board = function()
{
    var iPosition;
    
    CLASSIC.m_rgPosition = [];
    CLASSIC.m_rgHistory = [];
    CLASSIC.m_rgQuad = [];
    
	for (iPosition = 0; iPosition < CLASSIC.mconst_posLim; iPosition++)
	{
		CLASSIC.m_rgPosition[ iPosition ] = 0;
	}

    var iQuad;
	for (iQuad = 0; iQuad < CLASSIC.mconst_quadLim; iQuad++)
		CLASSIC.m_rgQuad[ iQuad ] = 0;

	CLASSIC.m_sumStatEval = 0;
	CLASSIC.m_cMoves = 0;

	// it is human's turn by default, and a given difficulty by default
	CLASSIC.m_fIsComputerTurn = 0;
	CLASSIC.setDifficulty( CLASSIC.mconst_defaultDifficulty );
};

// returns 1 if computer won (max), 0 otherwise
CLASSIC.isComputerWin = function()
{
	return ( ( CLASSIC.m_sumStatEval > CLASSIC.mconst_evalPositiveWinMin ) ? 1 : 0 );
};

// returns 1 if human won (min), 0 otherwise
CLASSIC.isHumanWin = function()
{
	return ( ( CLASSIC.m_sumStatEval < CLASSIC.mconst_evalNegativeWinMin ) ? 1 : 0 );
};

CLASSIC.isComputerTurn = function()
{
	return CLASSIC.m_fIsComputerTurn;
};

// if passed correctly, set the difficulty
// if not passed correctly, set to default difficulty
CLASSIC.setDifficulty = function( difficulty )
{
	if (difficulty < 0 || difficulty > 9)
	{
		difficulty = CLASSIC.mconst_defaultDifficulty;
	}

    CLASSIC.m_difficulty = difficulty;

    switch ( CLASSIC.m_difficulty )
	{
	case 0:
	case 1:
	case 2:
	case 3:
	case 4:
		CLASSIC.m_depthMax = CLASSIC.m_difficulty + 1;
		CLASSIC.m_chancePickBest = 0.1 * (CLASSIC.m_difficulty + 1);
		CLASSIC.m_chancePickSecondBest = CLASSIC.m_chancePickBest;
		break;
	case 5:
	case 6:
	case 7:
		CLASSIC.m_depthMax = 5 + 2 * ( CLASSIC.m_difficulty - 4 );
		CLASSIC.m_chancePickBest = 0.1 * (CLASSIC.m_difficulty + 1);
		CLASSIC.m_chancePickSecondBest = 1.0 - CLASSIC.m_chancePickBest;
		break;
	case 8:
	case 9:
		CLASSIC.m_depthMax = 12;
		CLASSIC.m_chancePickBest = 0.1 * (CLASSIC.m_difficulty + 1);
		CLASSIC.m_chancePickSecondBest = 1.0 - CLASSIC.m_chancePickBest;
		break;
	}
};

CLASSIC.getDifficulty = function() {
    return CLASSIC.m_difficulty;
};

CLASSIC.setHumanFirst = function()
{
	CLASSIC.m_fIsComputerTurn = 0;
};

CLASSIC.setComputerFirst = function()
{
	CLASSIC.m_fIsComputerTurn = 1;
};

CLASSIC.getBoardState = function()
{
    var rgPosition = [];
    var iPosition;
    
	for (iPosition = 0; iPosition < CLASSIC.mconst_posLim; iPosition++ )
	{
		rgPosition[ iPosition ] = CLASSIC.m_rgPosition[ iPosition ];
	}
    
    return rgPosition;
};

// returns mconst_colNil on error, the column where move was made on success
CLASSIC.takeHumanTurn = function( colMove )
{
	if ( CLASSIC.isGameOver() || colMove < 0 || colMove > 6 || CLASSIC.m_rgPosition[ colMove ] !== 0 )
    {
		colMove = CLASSIC.mconst_colNil;
	}
	else
	{
		CLASSIC.move( colMove );
	}

	return colMove;
};

CLASSIC.takeComputerTurn = function()
{
	var colMove;

	if (CLASSIC.isGameOver())
	{
		colMove = CLASSIC.mconst_colNil;
	}
	else
	{
		if ( CLASSIC.m_fIsComputerTurn )
        {
			colMove = CLASSIC.calcMaxMove();
		}
		else
		{
			colMove = CLASSIC.calcMinMove();
		}
		
		CLASSIC.move( colMove );
	}
	
	return colMove;
};

// returns the column the piece was taken from
CLASSIC.takeBackMove = function()
{
	var colMove;

	if ( CLASSIC.m_cMoves > 0 )
	{
		CLASSIC.remove();
		colMove = CLASSIC.m_rgHistory[ CLASSIC.m_cMoves ];
	}
	else
	{
		colMove = CLASSIC.mconst_colNil;
	}
	
	return colMove;
};

CLASSIC.move = function( colMove )
{
    var square;
    
	// add the latest move to history
	CLASSIC.m_rgHistory[ CLASSIC.m_cMoves ] = colMove;
    CLASSIC.m_cMoves++;

	// find the lowest blank in column, thus setting the row
    if ( CLASSIC.m_rgPosition[ 35 + colMove ] === 0 ) {
        square = 35 + colMove;
    } else if ( CLASSIC.m_rgPosition[ 28 + colMove ] === 0 ) {
        square = 28 + colMove;
    } else if ( CLASSIC.m_rgPosition[ 21 + colMove ] === 0 ) {
        square = 21 + colMove;
    } else if ( CLASSIC.m_rgPosition[ 14 + colMove ] === 0 ) {
        square = 14 + colMove;
    } else if ( CLASSIC.m_rgPosition[ 7 + colMove ] === 0 ) {
        square = 7 + colMove;
    } else if ( CLASSIC.m_rgPosition[ colMove ] === 0 ) {
        square = colMove;
    } else {
        console.log("fell through in move!!");
    }

	// set this position's value to -1 for human, 1 for computer
	// (whoever's turn it is)
	CLASSIC.m_rgPosition[ square ] = ( CLASSIC.m_fIsComputerTurn ? 1 : -1 );

	// update the quads for this position
    var i;
    var testing = CLASSIC.mconst_mpPosQuads;
    if (square < 0 || square >= 42) {
        console.log("wtf square " + square + " with row " + row + " and col " + colMove + " on move " + CLASSIC.m_cMoves);
    }
    for ( i = 0; testing[ square ][ i ]; i++ ) {
        CLASSIC.updateQuad( testing[ square ][ i ] );
    }

	// give the other guy a turn
	CLASSIC.m_fIsComputerTurn = !CLASSIC.m_fIsComputerTurn;
};

// The least significant bit has a 0 for human's turn, 1 for computer's.
// the next four bits hold a code 0-14 (i.e. 15 possibilities) for the
// number of max and min's squares.
// The quadcode is elaborated a bit more above, where the data arrays
// are declared. This function will update the quadcode and the stateval
// based on the addition of max (odd, i.e. +1) or min (even, i.e., +0)
CLASSIC.updateQuad = function( iQuad )
{
	var quadcode = CLASSIC.m_rgQuad[ iQuad ] + CLASSIC.m_fIsComputerTurn;
	CLASSIC.m_rgQuad[ iQuad ] = CLASSIC.mconst_rgUpQuadcode[ quadcode ];
	CLASSIC.m_sumStatEval += CLASSIC.mconst_rgUpEval[ quadcode ];
};

// This function cannot be called if m_cMoves is 0. It does not check for
// that case, because it is a private member function optimized for speed.
CLASSIC.remove = function()
{
	// decrement movenum, retrieve last move
    CLASSIC.m_cMoves--;
	var colMove = CLASSIC.m_rgHistory[ CLASSIC.m_cMoves ];
    var square;

	// find the highest occupied square
    if ( CLASSIC.m_rgPosition[ colMove ] !== 0 ) {
        square = colMove;
    } else if ( CLASSIC.m_rgPosition[ 7 + colMove ] !== 0 ) {
        square = 7 + colMove;
    } else if ( CLASSIC.m_rgPosition[ 14 + colMove ] !== 0 ) {
        square = 14 + colMove;
    } else if ( CLASSIC.m_rgPosition[ 21 + colMove ] !== 0 ) {
        square = 21 + colMove;
    } else if ( CLASSIC.m_rgPosition[ 28 + colMove ] !== 0 ) {
        square = 28 + colMove;
    } else if ( CLASSIC.m_rgPosition[ 35 + colMove ] !== 0 ) {
        square = 35 + colMove;
    } else {
        console.log("fell through in remove !!");
    }

	// if removing comp, now comp's turn; else human's if removing human
	CLASSIC.m_fIsComputerTurn = !CLASSIC.m_fIsComputerTurn;

	// set this position's value back to 0
	CLASSIC.m_rgPosition[ square ] = 0;
    
	// update the quads for this position
    var i;
    for ( i = 0; CLASSIC.mconst_mpPosQuads[ square ][ i ]; i++ ) {
        CLASSIC.downdateQuad( CLASSIC.mconst_mpPosQuads[ square ][ i ] );
    }
};

CLASSIC.downdateQuad = function( iQuad )
{
	CLASSIC.m_rgQuad[ iQuad ] = CLASSIC.mconst_rgDownQuadcode[ CLASSIC.m_rgQuad[ iQuad ] + CLASSIC.m_fIsComputerTurn ];
	CLASSIC.m_sumStatEval -= CLASSIC.mconst_rgUpEval[ CLASSIC.m_rgQuad[ iQuad ] + CLASSIC.m_fIsComputerTurn ];
};

CLASSIC.calcMaxMove = function()
{
	// the root node is max, and so has an alpha value.
	var iMoves;
	var temp;
	var alpha = CLASSIC.mconst_worstEval;
	var best = CLASSIC.mconst_worstEval - 1;
	var bestmove;
	var secondbestmove;
	var randomchance;

	// the list of valid moves, 'best' move first (descending static value)
	var rgMoves = [3, 2, 4, 1, 5, 0, 6];
	var movesLim = 7;
	var descended = CLASSIC.descendMoves( rgMoves, movesLim );
    rgMoves = descended[ 0 ];
    movesLim = descended[ 1 ];

	bestmove = secondbestmove = rgMoves[ 0 ];

    if ( movesLim != 0 )
    {
        for(iMoves = 0; iMoves < movesLim; iMoves++)
        {
		  CLASSIC.move( rgMoves[ iMoves ] );
            temp = CLASSIC.isGameOver() ? CLASSIC.m_sumStatEval : CLASSIC.calcMinEval( CLASSIC.m_depthMax, alpha, CLASSIC.mconst_bestEval );
            CLASSIC.remove();

            if (best < temp)
            {
                alpha = temp;
                best = temp;
                secondbestmove = bestmove;
                bestmove = rgMoves[ iMoves ];
            }
        }
    }

	randomchance = Math.random();
	if ( randomchance < CLASSIC.m_chancePickBest )
	{
		return bestmove;
	}
	else if ( randomchance < CLASSIC.m_chancePickBest + CLASSIC.m_chancePickSecondBest )
	{
		return secondbestmove;
	}
	else
	{
		return rgMoves[ Math.floor(Math.random()*movesLim) ];
	}
};

CLASSIC.calcMinMove = function()
{
	// the root is min, and therefore has a beta value
	var iMoves;
	var temp;
	var beta = CLASSIC.mconst_bestEval;
	var best = CLASSIC.mconst_bestEval + 1;
	var bestmove;
	var secondbestmove;
	var randomchance;

	// the list of valid moves, 'best' move first (descending static value)
	var rgMoves = [3, 2, 4, 1, 5, 0, 6];
	var movesLim = 7;
	var ascended = CLASSIC.ascendMoves( rgMoves, movesLim );
    rgMoves = ascended[ 0 ];
    movesLim = ascended[ 1 ];

	bestmove = secondbestmove = rgMoves[ 0 ];
    
    if ( movesLim != 0 )
    {
        for(iMoves = 0; iMoves < movesLim; iMoves++)
        {
		  CLASSIC.move( rgMoves[ iMoves ] );
            temp = CLASSIC.isGameOver() ? CLASSIC.m_sumStatEval : CLASSIC.calcMaxEval( CLASSIC.m_depthMax, CLASSIC.mconst_worstEval, beta );
            CLASSIC.remove();

            if (best > temp)
            {
                beta = temp;
                best = temp;
                secondbestmove = bestmove;
                bestmove = rgMoves[ iMoves ];
            }
        }
    }

	randomchance = Math.random();
	if ( randomchance < CLASSIC.m_chancePickBest )
	{
		return bestmove;
	}
	else if ( randomchance < CLASSIC.m_chancePickBest + CLASSIC.m_chancePickSecondBest )
	{
		return secondbestmove;
	}
	else
	{
		return rgMoves[ Math.floor(Math.random()*movesLim) ];
	}
};

CLASSIC.calcMaxEval = function( depth, alpha, beta )
{
	var iMoves;
	var temp;
	var best = CLASSIC.mconst_worstEval;

	// the list of valid moves, 'best' move first (descending static value)
	var rgMoves = [3, 2, 4, 1, 5, 0, 6];
	var movesLim = 7;

	// if this is the end of the tree (depth now 0)
	if (! (--depth))
	{                 
		for (iMoves = 0; iMoves < movesLim; iMoves++)

		if (CLASSIC.m_rgPosition[ iMoves ] === 0)
		{
			CLASSIC.move( iMoves );
			
			if (CLASSIC.m_sumStatEval > best)
			{
				best = CLASSIC.m_sumStatEval;
            }

			CLASSIC.remove();
		}
	}
	else
	{
		var descended = CLASSIC.descendMoves(rgMoves, movesLim);
        rgMoves = descended[ 0 ];
        movesLim = descended[ 1 ];

		// cut branching factor to mconst_branchFactorMax
		movesLim = (movesLim > CLASSIC.mconst_branchFactorMax) ? CLASSIC.mconst_branchFactorMax : movesLim;

		// for every daughter
        if ( movesLim === 0 ) {
            return 0;
        }
        
        for(iMoves = 0; iMoves < movesLim; iMoves++)
		{
			CLASSIC.move( rgMoves[ iMoves ]);
			temp = CLASSIC.isGameOver() ? CLASSIC.m_sumStatEval : CLASSIC.calcMinEval( depth, best, beta );
            CLASSIC.remove();

			if (best < temp)
			{
				best = temp;
				
				// Check for an alphabeta "prune" of the tree. Early exit
				// because max has a position here that is better than another
				// position which min could choose, so min would never allow.
				if (temp >= beta)
				{
					break;
				}
			}
        }
    }

	return best;
};

CLASSIC.calcMinEval = function( depth, alpha, beta )
{
	// start off assuming the worst for min
	var iMoves;
	var temp;
	var best = CLASSIC.mconst_bestEval;
	
	// the list of valid moves, 'best' move first (descending static value)
	var rgMoves = [3, 2, 4, 1, 5, 0, 6];
	var movesLim = 7;

	// if this is the end of the tree (depth now 0)
	if (! (--depth))
	{                 
		for (iMoves = 0; iMoves < movesLim; iMoves++)
		{
			if (CLASSIC.m_rgPosition[ iMoves ] === 0)
			{
				CLASSIC.move( iMoves );

				if (CLASSIC.m_sumStatEval < best)
				{
					best = CLASSIC.m_sumStatEval;
                }

                CLASSIC.remove();
			}
		}
	}
	else
	{
		ascended = CLASSIC.ascendMoves( rgMoves, movesLim );
        rgMoves = ascended[ 0 ];
        movesLim = ascended[ 1 ];

		// cut branching factor to mconst_branchFactorMax
		movesLim = (movesLim > CLASSIC.mconst_branchFactorMax) ? CLASSIC.mconst_branchFactorMax : movesLim;

		// for every daughter
        if ( movesLim === 0 ) {
            return 0;
        }
        
		for(iMoves = 0; iMoves < movesLim; iMoves++)
		{
			CLASSIC.move( rgMoves[ iMoves ] );
			temp = CLASSIC.isGameOver() ? CLASSIC.m_sumStatEval : CLASSIC.calcMaxEval( depth, alpha, best );
            CLASSIC.remove();

            if (best > temp)
			{
				best = temp;
				
				// Check for an alphabeta "prune" of the tree. Early exit
				// because max has a position here that is better than another
				// position which min could choose, so min would never allow.
				if (temp <= alpha)
				{
					break;
				}
			}
		}
	}

	return best;
};

CLASSIC.descendMoves = function( moves, movesLim )
{
	var i = 0;
	var j;
	var temp;
	var statvals = [];
	var bigval;
    var bigindex;

	while (i < movesLim)
	{
		// if the column of move i is full, take it off the list
		// by reducing size and copying the last element into its place
		if (CLASSIC.m_rgPosition[ moves[ i ] ] != 0)  
		{
			moves[ i ] = moves[ movesLim - 1 ];
			movesLim--;
		}
		else
		{
			CLASSIC.move( moves[ i ] );
			statvals[ moves[ i ] ] = CLASSIC.m_sumStatEval;
			CLASSIC.remove();
			i++;
		}
	}

	// sorting algorithm
	for (i = 0; i < movesLim - 1; i++)
	{
		bigval = statvals[ moves[ i ] ];
		bigindex = 0;

		for (j = i + 1; j < movesLim; j++)
		if (statvals[ moves[ j ] ] > bigval)
		{
			bigval = statvals[ moves[ j ] ];
			bigindex = j;
		}

		if (bigindex)
		{
			temp = moves[ i ];
			moves[ i ] = moves[ bigindex ];
			moves[ bigindex ] = temp;
		}
	}
    
    return [ moves, movesLim ];
};

CLASSIC.ascendMoves = function( moves, movesLim )
{
	var i = 0;
	var j;
	var temp;
	var statvals = [];
	var smallval;
    var smallindex;

	while (i < movesLim)
	{
		// if the column of move i is full, take it off the list
		// by reducing size and copying the last element into its place
		if (CLASSIC.m_rgPosition[ moves[ i ] ] != 0)
		{
			moves[ i ] = moves[ movesLim - 1 ];
			movesLim--;
		}
		else
		{
			CLASSIC.move( moves[ i ] );
			statvals[ moves[ i++ ] ] = CLASSIC.m_sumStatEval;
			CLASSIC.remove();
		}
	}

	// sorting algorithm
	for (i = 0; i < movesLim - 1; i++)
	{
		smallval = statvals[ moves[ i ] ];
		smallindex = 0;

		for (j = i + 1; j < movesLim; ++j)
		if (statvals[ moves[ j ] ] < smallval)
		{
			smallval = statvals[ moves[ j ] ];
			smallindex = j;
		}

		if (smallindex)
		{
			temp = moves[ i ];
			moves[ i ] = moves[ smallindex ];
			moves[ smallindex ] = temp;
		}
	}
    
    return [ moves, movesLim ];
};