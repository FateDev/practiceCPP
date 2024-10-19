var displayTree = tree => console.log(JSON.stringify(tree, null, 2));
function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}
function BinarySearchTree() {
  const inorderRet = (fn, root) => fn(root.left, inorderRet)
    .concat([root.value])
    .concat(fn(root.right, inorderRet));
  const preorderRet = (fn, root) => [root.value]
    .concat(fn(root.left, preorderRet))
    .concat(fn(root.right, preorderRet));
  const postorderRet = (fn, root) => fn(root.left, postorderRet)
    .concat(fn(root.right, postorderRet))
    .concat([root.value]);
  const orderHelper = (root, orderFn) => {
      if(!root) return [];
      return orderFn(orderHelper, root);
  }
  const order = (orderFn) => {
    if(!this.root) return null;
    return orderHelper(this.root, orderFn);
  }

  this.root = null;
  // Only change code below this line
  this.inorder = () => order(inorderRet);
  this.preorder = () => order(preorderRet);
  this.postorder = () => order(postorderRet);
  // Only change code above this line
}
