// Branch Sums

// Write a function that takes in a Binary Tree and returns a list of its branch sums ordered from leftmost branch sum to rightmost branch sum.

// A branch sum is the sum of all values in a binary tree branch. a binary tree branch is a path of nodes in a tree that starts at the root node and ends at any leaf node.

// Each binary tree node has an integer value, a left child node, and a right child node. Children nodes can either by Binary Tree nodes themselves or NONE/null.

// Sample Input:
/*
Tree =        1
           /    \
          2      3
        /  \   /  \
      4    5  6    7 
    /  \  /
   8   9 10
  
   sample output = [15, 16, 18, 10, 11]
   */

class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function branchSums(root, sum = [], output = []) {
  // Write your code here.
  //if leaf push the sum to output array
  if (root.left === null && root.right === null) {
    //sum everything in sum array and push to output
    sum.push(root)
    output.push(sum.reduce((acc, curr) => acc + curr))
    // sum.pop()
  }
  //if has a left child, branchSums(left node)
  if (root.left !== null) {
    sum.push(root.value)
    branchSums(root.left, sum, output)
  }
  //if has a right child, branchSums(right node)
  if (root.right !== null) {
    sum.push(root.value)
    branchSums(root.right, sum, output)
  }
  sum.pop()
  return output
}

BinaryTree.prototype.insert = (val) => {
  if (!this.left) {
    this.left = new BinaryTree(val)
  }
  else if (!this.right) {
    this.right = new BinaryTree(val)
  }

}

const tree = new BinaryTree(1);
console.log(tree)
tree.insert(2)
console.log(tree)
tree.insert(3)
console.log(tree)
