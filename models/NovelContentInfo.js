
//小说章节信息
// var NovelContentInfo = {
//     chapterId:'', //章节id
//     novelId:'', //小说id
//     chapterName:'', //章节名称
//     chapterContent:'', //章节内容
//     chapterUpdateDate:'',//最后更新时间
//     lastCrawlerDate:'',//最后爬取时时间
//     delFlg:''//删除标志位(0：未删除，1：删除)
// }

function NovelContentInfo() {
    this.chapterId = '';
    this.novelId = '';
    this.chapterName = '';
    this.chapterContent = '';
    this.chapterUpdateDate = '';
    this.lastCrawlerDate = '';
    this.delFlg = '0';
}

module.exports = NovelContentInfo;