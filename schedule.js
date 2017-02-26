const schedule = require('node-schedule');

var index = require('./index');

// console.log('index',index);

const num = 0 ;//开始枚举小说id

var rule = new schedule.RecurrenceRule();

rule.minute = 0;
rule.hour = 17;
rule.dayOfWeek = [0,new schedule.Range(1, 6)]

var job = schedule.scheduleJob(rule,function () {
    index(num);
});