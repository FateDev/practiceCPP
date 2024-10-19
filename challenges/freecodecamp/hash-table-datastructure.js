var called = 0;
var hash = string => {
  called++;
  var hashed = 0;
  for (var i = 0; i < string.length; i++) {
    hashed += string.charCodeAt(i);
  }
  return hashed;
};
var HashTable = function() {
  this.collection = {};
  // Only change code below this line
  this.add = (key, value) => {
    const k = hash(key);
    if(!this.collection[k])
      this.collection[k] = [];
    this.collection[k].push([key, value]);
  }

  this.lookup = (key) => {
    const k = hash(key);
    if(!this.collection[k])
      return null;
    const bucket = this.collection[k];
    for([table_k, table_v] of bucket) {
      if(k == table_k)
        return table_v;
    }
    return null;
  }

  this.remove = (key) => {
    delete this.collection[hash(key)];
  }

  this.add = (key, value) => {
    const hashed = hash(key);
    if(this.lookup(key) == null) {
      if(this.collection[hashed] == undefined) {
        this.collection[hashed] = [];
      }
    } else {
      for(let i = 0; i < this.collection[hashed].length; i++) {
        const [k, v] = this.collection[hashed][i];
        if(k == key) {
          this.collection[hashed][i] = [key, value];
          return; // updated the value, so return
        }
      }
    }
    // add new value
    this.collection[hashed].push([key, value]);
  }

  this.remove = (key) => {
    const hashed = hash(key);

    if(this.lookup(key) == null)
      return;
    
    for(let i = 0; i < this.collection[hashed].length; i++) {
      const [k, v] = this.collection[hashed][i];
      if(k == key) {
        this.collection[hashed].splice(i, 1)
      }
    }

    if(this.collection[hashed].length == 0) {
      delete this.collection[hashed];
    }
  }

  this.lookup = (key) => {
    const hashed = hash(key);
    if(this.collection[hashed] == undefined)
      return null;

    for(const [k, v] of this.collection[hashed]) {
      if(k == key) {
        return v;
      }
    }
  }
  // Only change code above this line
};
