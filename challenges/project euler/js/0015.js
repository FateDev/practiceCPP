function paths_lattice(n){
	const lattice = [];
	for(let i = 0; i <= n; i++){
		lattice[i] = [];
		for(let j = 0; j <= n; j++){
			if(i == 0)
				lattice[i][j] = 1; //edges all have value 1
			else
				lattice[i][j] = 0;
		}
		lattice[i][0] = 1; //edges all have value 1
	}
	lattice[1][1] = 2; //for 1x1 lattice, 2 paths to go through

	function find_value(m, n){
		if(lattice[m][n]) return lattice[m][n];
		//costs an extra function call, not huge performance difference though I think, less code this way
		lattice[m][n-1] = find_value(m,n-1);
		lattice[m-1][n] = find_value(m-1,n);
		return lattice[m][n-1] + lattice[m-1][n];
	}
	
	return find_value(n, n);
}

//Also since you can write the moves to traverse the grid as R and D, and there will always be 40 moves
//so you can arrange in 40! ways, but there are 10! ways to arrange the 20 different Rs that will be there, same for Ds
//so you divide by those: 40!/20!20! -> 40C20

//Or you rotate Pascal's triangle by 45deg and look at the diagonal

console.log("The number of routes when going just left or right through a 20x20 lattice to the bottom left from the top left is:",paths_lattice(20));
