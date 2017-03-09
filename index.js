function Node(key, value) {
    this.value = value;
    this.key = key;
    this.left = null;
    this.right = null;
    this.parent = null;
}

function BinarySearchTree() {
    this._root = null;
}

BinarySearchTree.prototype.isEmpty = function() {
    return !!this._root;
}

BinarySearchTree.prototype.root = function() {
    if (!this.isEmpty()) {
        return;
    }
    else {
        return this._root.value;
    }
}

BinarySearchTree.prototype.insert = function(key, value) {
    var newNode = new Node(key, value);
    if (this._root === null) {
        this._root = newNode;
    }
    else {
        this.appendChild(this._root, newNode);
    } 
    return this;
}


BinarySearchTree.prototype.appendChild = function foo(parentNode, childNode) {    
             
        if (childNode.key < parentNode.key && parentNode.left === null) {
            childNode.parent = parentNode;
            parentNode.left = childNode;
        }
        else if (childNode.key < parentNode.key && parentNode.left !== null) {
            foo(parentNode.left, childNode);
        }
        else if (childNode.key >= parentNode.key && parentNode.right === null) {
            childNode.parent = parentNode;
            parentNode.right = childNode;
        }
        else if (childNode.key >= parentNode.key && parentNode.right !== null) {
            foo(parentNode.right, childNode);
        }
    }


BinarySearchTree.prototype.search = function(key) {
    var nodeValue;
    
    function searchKeyFunc(PreviousNode, key) {
        if (PreviousNode.key === key) {
            return  nodeValue = PreviousNode.value;
        }
        else if (key < PreviousNode.key) {
            if (PreviousNode.left) {
                searchKeyFunc(PreviousNode.left, key)
            }
            else return;
        }
        else if (key > PreviousNode.key) {
            if (PreviousNode.right) {
                searchKeyFunc(PreviousNode.right, key)
            }
            else return;
        }
    }

    if (!this.isEmpty()) {
        return this;
    }
    else {
        searchKeyFunc(this._root, key);
    } 
    return nodeValue;
}


BinarySearchTree.prototype.contains = function(value) {
    if (!this.isEmpty()) {
        return false;
    }
    else {
        return (this.traverse(true).indexOf(value) < 0) ? false : true;
    }
}


BinarySearchTree.prototype.traverse = function(order, key) {
    if (!this.isEmpty()) {
        return this;
    }

    var arr = [];
    var nodeArray;
    
    function extractNode(node) {
        if  (node) {
            if (order) {
                extractNode(node.left);
                arr.push(node);
                extractNode(node.right);
            }
            else {
                extractNode(node.right);
                arr.push(node);
                extractNode(node.left);  
            }
            if (node.key === key) {
                nodeArray = node;
            }
        }
    }
    
    extractNode(this._root);

    return (!key) ? arr.map(item => item.value) :  nodeArray;
}

BinarySearchTree.prototype.verify = function() {
    if (!this.isEmpty()) {
        return this;
    }
    
    var flag = true;
    
    function check(node) {
        if  (node) {
            check(node.left);
            
            if (node.parent !== null       &&
            	node.parent.left === node  &&
            	node.parent.key <= node.key) {
                
                flag = false;
            }

            if (node.parent !== null       &&
            	node.parent.right === node &&
            	node.parent.key > node.key) {
                
                flag = false;
            }
            check(node.right);
        }
    }

    check(this._root);
    
    return flag;
}


BinarySearchTree.prototype.delete = function(key) {
    if (!this.isEmpty()) {
        return this;
    }

    var node = this.traverse(true, key);
    
    if (!node.right) {
        
        if (node.left) {
            node.left.parent = node.parent;
        }  

        if (node.parent && node.parent.left === node) {
            node.parent.left = node.left;
        }

        else if (node.parent && node.parent.right === node) {
            node.parent.right = node.left;
        }

        if (!node.parent) {
            this._root = node.left;
        }
    }
        
    else if (node.right && !node.right.left) {
       
        node.right.parent = node.parent;
        
        if (node.left) {
            node.left.parent = node.right;
            node.right.left = node.left;
        }
        
        if (node.parent && node.parent.left === node) {
            node.parent.left = node.right;
        }
        else if (node.parent && node.parent.right === node) {
            node.parent.right = node.right;
        }

        if (!node.parent) {
            this._root = node.right;
        }
    }

    else if (node.right && node.right.left) {
        
        var leftNode = node.right.left;
        while (leftNode.left) {
            leftNode = leftNode.left;
        }

        if (node.left) {
            node.left.parent = leftNode;
            leftNode.left = node.left; 
        }
       
        if (leftNode.right) {
            leftNode.right.parent = leftNode.parent;
            leftNode.parent.left = leftNode.right;
        }
        
        leftNode.parent = node.parent;

        leftNode.right = node.right;
        node.right.parent = leftNode;

        if (node.parent && node.parent.left === node) {
            node.parent.left = leftNode;
        }
        else if (node.parent && node.parent.right === node) {
            node.parent.right = leftNode;
        }
        if (!leftNode.parent) {
            this._root = leftNode;
        }
    }
    
    return this;
}