// 队列构造函数

function Queue() {
    var items = [];

    this.enqueue = function (task) { //向队列中添加任务
        items.push(task)
    };

    this.dequeue = function () { //移除队列中第一个任务，病返回这个任务
        return items.shift()
    }

    this.front = function () { //返回队列第一个元素，只返回，不删除
        return items[0];
    }

    this.isEmpty = function () { //判断队列是否为空，如果为空返回 true ，否者返回false
        return items.length === 0;
    }

    this.clear = function () { //清空队列
        items = [];
    }

    this.size = function () {//返回队列任务的长度
        return items.length;
    }
}

module.exports = Queue;