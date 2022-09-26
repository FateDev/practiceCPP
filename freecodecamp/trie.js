var displayTree = tree => console.log(JSON.stringify(tree, null, 2));
var Node = function() {
  this.keys = new Map();
  this.end = false;
  this.setEnd = function() {
    this.end = true;
  };
  this.isEnd = function() {
    return this.end;
  };
};
var Trie = function() {
  // Only change code below this line
  this.root = new Node();

  this.add = (word) => {
    function addLetter(wordIdx, root) {
      const letter = word[wordIdx];
      if(!root.keys.has(letter)) {
        root.keys.set(letter, new Node());
      }
      if(wordIdx == word.length - 1) {
        root.keys.get(letter).setEnd();
      } else {
        addLetter(wordIdx+1, root.keys.get(letter));
      }
    }
    addLetter(0, this.root);
  }

  this.isWord = (word) => {
    function letterPresent(wordIdx, root) {
      const letter = word[wordIdx];
      if(!root.keys.has(letter))
        return false;

      if(wordIdx == word.length - 1) {
        return root.keys.get(letter).isEnd();
      }

      return letterPresent(wordIdx+1, root.keys.get(letter));
    }

    return letterPresent(0, this.root);
  }

  this.print = () => {
    function returnLetters(root) {
      let words = [];
      
      if(root.isEnd())
        words.push("")
      
      root.keys.forEach((v, k) => {
        words = words.concat(returnLetters(v).map(w => k + w));
      })
      return words;
    }

    return returnLetters(this.root);
  }
  // Only change code above this line
};
