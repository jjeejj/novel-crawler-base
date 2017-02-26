// 小说基本信息字段

// var NovelBaseInfo = {
//     novelId:'',
//     novelIdPre:'',
//     novelName:'',
//     novelPic:'',
//     novelAuthor:'',
//     novelDesc:'',
//     newestChapter:'',
//     newestChapterId:'',
//     lastUpdateDate:null,
//     lastCrawlerDate:null,
//     delFlg:'0'
// }

function NovelBaseInfo() {
    this.novelId = '';
    this.novelIdPre = '';
    this.novelName = '';
    this.novelPic = '';
    this.novelWordCount = '';
    this.novelAuthor = '';
    this.novelDesc = '';
    this.newestChapter = '';
    this.newestChapterId = '';
    this.lastUpdateDate = '';
    this.lastCrawlerDate = '';
    this.delFlg = '0';
}


module.exports = NovelBaseInfo;