const canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

let totalBranches = 0;

class Branch {
    constructor(x, y, width, height, parent, branchess) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.parent = parent;
        this.branchess = branchess;
        this.direction = this.setDirection();
    }

    setDirection() {
        const d = Math.random();
        if (d < 0.5) {
            return "left"
        }
        if (d > 0.5) {
            return "right"
        }
    }
}

class Tree {
    constructor(x, y, width, height, totalBranches) {
        this.x = x;
        this.y = y;
        this.root = null;
        this.parent = null;
        this.width = width;
        this.height = height;
        this.branchess = [];
        this.totalBranches = totalBranches;
    }

    creat() {
        this.addBranchess(this, 3);
    }

    drawTree = (tree) => {
        if (!tree.branchess) { console.log("kjhg"); }
        if (!tree) {
            console.log("no tree");
            return
        };

        // if (tree.branchess) {
        for (let i = 0; i < tree.branchess.length; i++) {
            const branch = tree.branchess[i];
            const color = this.setColor();
            ctx.beginPath();
            ctx.fillStyle = `rgb(${color.r},${color.g},${color.b})`;
            if (!tree.parent) {
                ctx.lineWidth = 10;
                // ctx.moveTo(branch.x + tree.width, branch.y - tree.height);
                // ctx.quadraticCurveTo(branch.x - 30, branch.y, branch.x + branch.width, branch.y - branch.height);
            }
            else {
                ctx.lineWidth = 3
            };
            const rightOrLeft = branch.direction === "left" ? branch.x - branch.width : branch.x + branch.width;
            ctx.moveTo(branch.x, branch.y);
            ctx.lineTo(rightOrLeft, branch.y - branch.height);
            // ctx.quadraticCurveTo(branch.x - 30, branch.y, rightOrLeft, branch.y - branch.height);
            ctx.strokeStyle = `rgb(${color.r},${color.g},${color.b})`;
            ctx.stroke();
            // if (i === tree.branchess.length - 1) {
            //     for (let i = 0; i < 5; i++) {
            //         ctx.beginPath();
            //         ctx.arc(rightOrLeft, tree.y - tree.height, 10, 0, Math.PI * 2);
            //         ctx.stroke();
            //     }
            // }
            this.drawTree(branch);
        }
    }

    setColor() {
        const r = Math.random() * 255;
        const g = Math.random() * 255;
        const b = Math.random() * 255;
        return { r, g, b };
    }

    addBranchess = (tree, n) => {
        if (totalBranches >= 15) return;

        for (let i = 0; i < n; i++) {
            const width = Math.floor(Math.random() * 100) + 10;
            const height = Math.floor(Math.random() * 100) + 10;
            const randomChild = Math.floor(Math.random() * 5);
            const rightOrLeft = tree.direction === "left" ? tree.x - tree.width : tree.x + tree.width;
            // x=100, width= 30 => rightOrLeft = 70
            const branch = new Branch(rightOrLeft, tree.y - tree.height, width, height, tree, []);
            tree.branchess.push(branch);
            totalBranches += 1;
            this.addBranchess(branch, randomChild);
        }
    }

    draw() {
        this.drawTree(this);
    }
}

const tree = new Tree(canvas.width / 2, canvas.height, 50, 50);
tree.creat();
tree.draw();
