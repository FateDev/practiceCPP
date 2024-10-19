function rotations(str) {
  const originalLen = str.length;
  str = (str+str).split("")
  const out = []
  for(let i = 0; i < originalLen; i++) {
    out.push(str.slice(i, i+originalLen).join(""))
  }
  return out;
}

function permAlone(str) {
  const str_dict = {};
  function permSubstrings(firstLetter, subStr) {
		if(subStr.length == 1) {
      let retPerms = 0;
      if(firstLetter != subStr) {
        retPerms = 1;
      }
      str_dict[firstLetter + subStr] = retPerms
      return retPerms;
    }

    let validPerms = 0;
		const rots = rotations(subStr);
    for(const rot of rots) {
      if(rot[0] == firstLetter) {
        continue;
      }
      
      if(str_dict[rot] !== undefined) {
        validPerms += str_dict[rot];
        continue;
      }
      
      const perms = permSubstrings(rot[0], rot.slice(1))
      validPerms += perms;
      
      str_dict[rot] = perms;
    }
    
    return validPerms;
  }
  
  return permSubstrings("", str);
}

permAlone('abcdefa');
