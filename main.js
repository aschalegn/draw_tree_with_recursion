const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight
canvas.width = window.innerWidth
let lastX = canvas.width / 2;
let lastY = 0;
let totalBranches = 0;
class Branch {
    constructor(x, y, width, height, parent, branchess) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.parent = parent;
        this.branchess = branchess
    }
}

class Tree {
    constructor(x, y, width, height, branchess) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.parent = null;
        this.branchess = branchess
    }

    creat() {
        this.addBranchess(this, 3);
    }

    drawTree = (tree) => {
        if (!tree) return;

        if (tree.branchess) {
            for (let i = 0; i < tree.branchess.length; i++) {
                {
                    ctx.fillStyle = "orange";
                    ctx.beginPath();
                    if (!tree.parent) {
                        ctx.lineWidth = 15
                    }
                    else { ctx.lineWidth = 5 };
                    ctx.moveTo(tree.x, tree.y);
                    ctx.lineTo(tree.x + tree.width, tree.y - tree.height);
                    ctx.quadraticCurveTo(tree.x, tree.y, tree.x + tree.width, tree.y - tree.height);
                    ctx.strokeStyle = "orange";
                    ctx.stroke();
                    const branch = tree.branchess[i];
                    if (!branch) {
                        for (let i = 0; i < 5; i++) {
                            ctx.beginPath();
                            ctx.arc(tree.x + tree.width, tree.y - tree.height, 50, 0, Math.PI * 2);
                            ctx.stroke();
                        }
                    }
                    this.drawTree(branch);
                }
            }
        }
    }

    addBranchess = (tree, n) => {
        if (!tree || totalBranches >= 10) return;

        for (let i = 0; i < n; i++) {
            const width = Math.floor(Math.random() * 50);
            const height = Math.floor(Math.random() * 50);
            
            const randomChild = Math.floor(Math.random() * 5);
            console.log(randomChild);
            const branch = new Branch(tree.x + tree.width, tree.y - tree.height, width, height, tree, []);
            tree.branchess.push(branch);
            totalBranches += 1;

            this.addBranchess(branch, randomChild);
        }
    }

    // countBranchess = (tree, sum) => {
    //     for (let i = 0; i < tree.branchess.length; i++) {
    //         const branch = tree.branchess[i];
    //         sum += 1;
    //         this.countBranchess(branch, sum);
    //     }
    //     return sum;
    // }

    draw() {
        this.drawTree(this);
    }
}

const tree1 = new Tree(0, canvas.height - 100, 50, 50, []);
tree1.creat();
tree1.draw();

