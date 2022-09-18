function rotations(str) {
  const original_len = str.length;
  str = (str+str).split("")
  const out = []
  for(let i = 0; i < original_len; i++) {
    out.push(str.slice(i, i+original_len).join(""))
  }
  return out;
}

function permAlone(str) {
  const str_dict = {};
  function permSubstrings(sub_str) {
		if(sub_str.length == 1) {
      return sub_str;
    }

    const outs = [];
		const rots = rotations(sub_str);
    for(const rot of rots) {
      const perms = permSubstrings(rot.slice(1))
      for(const p of perms) {
        if(p[0] != rot[0])
        	outs.push(rot[0] + p);
      }
    }
    
    return outs;
  }
  
  return permSubstrings(str).length;
}

permAlone('aabb');
