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

console.log("The number of routes when going just left or right through a 20x20 lattice to the bottom left from the top left is:",paths_lattice(20));
