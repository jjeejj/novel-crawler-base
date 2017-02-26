const requestPromise = require('request-promise');
const cheerio = require('cheerio');

const log4js = require('log4js');//日志

const request = require('superagent');
const charset = require('superagent-charset');
charset(request);

 // const Iconv = require('iconv').Iconv;

// var iconv = new Iconv('GBK', 'UTF-8');

const moment = require('moment');
const execSQl = require('./utils/mysqlUtils'); //数据库连接

var novelBaseInfoSql = require('./sql/novelBaseInfo'); //小说基本信息sql模板
var novelContentInfoSql = require('./sql/novelContentInfo'); //小说内容基本信息sql模板

var NovelBaseInfo = require('./models/NovelBaseInfo');//小说基本信息字段
var NovelContentInfo = require('./models/NovelContentInfo');//小说内容基本信息字段

var Queue = require('./queue'); //任务队列构造函数

// var baseUrl = 'http://www.biquge.com/0_?';
var baseUrl = 'http://www.biqiuge.com/book/?';

var getErrNum = 0 ; //获取的错误次数


//请求地址获取html页面方便解析
function getNovelInfo(url,novelId) {
    if(getErrNum == 20){ //连续错误20退出
        return ;
    }
    // requestPromise({url:url,encoding: null}).then(function (htmlString) {
    request.get(url).charset('gbk').end(function (err, res) {
        // body...
    // })
        var htmlString = res.text;
        // console.log(res);
        console.log('开始获取小说的id 为 %s',novelId);
        var $ = cheerio.load(htmlString);

        // console.log(htmlString)
        // console.log($('.block>.blocktitle'));
        // console.log('错误内容',$('.block').find('.blocktitle').eq(0).text().trim());
        

        //判断失败的条件
        if($('.block') && $('.block').find('.blocktitle').eq(0).text().trim() == '出现错误！'){
            getErrNum++;
            console.log('id为 %s 的小说不存在',novelId);
            //小说id 加一
            novelPath(++novelId);
        }else{
            //成功把错误次数改为0
            getErrNum = 0;
            saveNovelBaseInfo($,novelId,url);

            // mysqlPool.getConnection(function (err,connect) {
            //     connect.query(novelBaseInfoSql.insert(novelBaseInfo), function(err, results, fields) {
            //         if (err) throw err;
            //         console.log('查询结果为: ', results);
            //     });
            //     //释放连接
            //     connect.release();
            // })

           
            // console.log('chapterList',chapterList)

           
            

        }

    })
}

/**
 * 保存小说基本信息
 * @param  {[type]} $       cheerio处理过的网页信息
 * @param  {[type]} url       小说基础URL
 * @param  {Number} novelId 小说id
 * @return {[type]}        
 */
function saveNovelBaseInfo($,novelId,url) {
     var novelBaseInfo = new NovelBaseInfo();

    novelBaseInfo.novelName = $('#maininfo').find('#info h1').text(); //小说名字
    novelBaseInfo.novelId = novelId; //小说id
    novelBaseInfo.novelIdPre = '';
    novelBaseInfo.novelPic = $('#maininfo').find('#fmimg>img').attr('src'); //封皮
    novelBaseInfo.novelAuthor = $('#maininfo').find('#info p').eq(0).text().trim().split('：')[1]; //作者
    novelBaseInfo.novelDesc = $('#maininfo').find('#intro').text().trim();//简介
    novelBaseInfo.newestChapter = $('#maininfo').find('#info p').eq(3).find('a').eq(0).text(); //最新章节
    // console.log('novelBaseInfo',novelBaseInfo)
    novelBaseInfo.newestChapterId = $('#maininfo').find('#info p').eq(3).find('a').eq(0).attr('href').split('.')[0]; //最新章节id
    // console.log('-----------------');
    novelBaseInfo.lastUpdateDate = $('#maininfo').find('#info p').eq(2).text().trim().split('：')[1].split(/[\[\]]/)[0].trim();
    // console.log('-----------=======------');
    novelBaseInfo.novelWordCount = $('#maininfo').find('#info p').eq(2).text().trim().split('：')[1].split(/[\[\]]/)[1].trim();
    novelBaseInfo.lastCrawlerDate = moment().format('YYYY-MM-DD H:mm:ss');

    console.log('书籍信息：','id:',novelId,'内容：',novelBaseInfo);

    execSQl(novelBaseInfoSql.insert(novelBaseInfo)); //插入信息

     //小说文章列表
    var chapterList = [];
    Array.prototype.forEach.call($('#list').find('dd a'),function (chapter,index) {
        // if($('#list').find('dd').eq(index).find('a') && $('#list').find('dd').eq(index).find('a').attr('href')){
        //     chapterList.push($('#list').find('dd').eq(index).find('a').attr('href'))
        // }
        chapterList.push($('#list').find('dd').eq(index).find('a').attr('href'))
    });

    saveNovelContentInfo(url,chapterList,novelId);
}

/**
 * 爬取小说的具体文章内容
 * @param  {String} url 小说基础URL
 * @param  {Array} chapterList 文章列表
 * @param  {Number} novelId 小说id
 * @return {[type]}             [description]
 */
function saveNovelContentInfo(url,chapterList,novelId) {
    // var eachNum = 0;
    var taskQueue = new Queue();
    chapterList.forEach(function (value,index) {
        // eachNum++;
        

        if(value){
            var contentURL = url + '/'+  value;
            taskQueue.enqueue(contentURL);
        }
        

        // request.get(contentURL).charset('gbk').end(function (err, res) {
        //     if(err){
        //         console.log('获取 contentURL',contentURL,err);

        //         // novelPath(++novelId);
        //     }
        //     var contentString = res.text;
        //     var contentId = value.split('.')[0];
        //     // console.log(res);
        //     console.log('开始获取的内容地址为 ： %s',contentURL);
        //     console.log('开始获取小说内容的的id 为 %s',contentId);
        //     var $ = cheerio.load(contentString);

        //     var novelContentInfo = new NovelContentInfo();

        //     novelContentInfo.chapterId = contentId;
        //     novelContentInfo.novelId = novelId;
        //     novelContentInfo.chapterName = $('.bookname').find('h1').text();
        //     novelContentInfo.chapterContent = $('#content').text().replace('一秒记住【笔♂趣→阁 WWW.BiQiuGe.Com】，精彩小说无弹窗免费阅读！','');
        //     novelContentInfo.chapterUpdateDate = moment().format('YYYY-MM-DD H:mm:ss');
        //     novelContentInfo.lastCrawlerDate = moment().format('YYYY-MM-DD H:mm:ss');

        //     // console.log('novelContentInfo内容',novelContentInfo);

        //     execSQl(novelContentInfoSql.insert(novelContentInfo)); //插入信息
        //     // novelContentInfo()
        // })
    });

    reequestContent(taskQueue,novelId);

    // if(eachNum == chapterList.length){
    //     //下一个小说
    //     novelPath(++novelId);
    // }
}

/**
 * 请求地址并获取内容信息
 * http://www.biqiuge.com/book/1/12233.html
 * 'http://www.biqiuge.com/book/1/12233.html'.split(/\//)
    ["http:", "", "www.biqiuge.com", "book", "1", "12233.html"]
 * @param  {[type]} taskQueue 地址对列
 * @return {[type]}       
 */
function reequestContent(taskQueue,novelId) {
    // console.log('获取的内容小说的id 为 ',novelId)
    if(!taskQueue.isEmpty()){
        var contentURL = taskQueue.dequeue();
        request.get(contentURL).charset('gbk').end(function (err, res) {
            if(err){
                console.log('获取 contentURL',contentURL,err);
                // novelPath(++novelId);
            }
            var contentString = res.text;
            var contentId = contentURL.split(/\//)[5].split('.')[0];
            // console.log(res);
            console.log('开始获取的内容地址为 ： %s',contentURL);
            console.log('开始获取小说内容的的id 为 %s',contentId);
            var $ = cheerio.load(contentString);

            var novelContentInfo = new NovelContentInfo();

            novelContentInfo.chapterId = contentId;
            novelContentInfo.novelId = novelId;
            novelContentInfo.chapterName = $('.bookname').find('h1').text();
            novelContentInfo.chapterContent = $('#content').text().replace('一秒记住【笔♂趣→阁 WWW.BiQiuGe.Com】，精彩小说无弹窗免费阅读！','');
            novelContentInfo.chapterUpdateDate = moment().format('YYYY-MM-DD H:mm:ss');
            novelContentInfo.lastCrawlerDate = moment().format('YYYY-MM-DD H:mm:ss');

            // console.log('novelContentInfo内容',novelContentInfo);
            execSQl(novelContentInfoSql.insert(novelContentInfo)); //插入信息
            // novelContentInfo()
            reequestContent(taskQueue,novelId);
        })  
    }else{
        //下一个小说
        novelPath(++novelId);
    }
}



//变换枚举小说章节路径信息
//http://www.biquge.com/0_1 说明：第一个0：不知道什么意思。第二个：为小说的编号 
function novelPath(novelId) {
    // var novelId = ++novelId;
    var url = baseUrl.replace(/\?/,novelId);
    getNovelInfo(url,novelId);
}

//执行
novelPath(0);

exports = module.exports = novelPath;

