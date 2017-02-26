/**
 * 插入某一章节的信息
 * @param  {Object} novel 小说基本信息
 * @return {sql}     返回拼接完成的sql语句
 */
exports.insert = function (novelContent) {

    var insertNovelContentInfo = `
                                insert into novel_content_info(
                                    chapter_id,
                                    novel_id,
                                    chapter_name,
                                    chapter_content,
                                    chapter_update_date,
                                    last_crawler_date,
                                    del_flg
                                )values(
                                    '${novelContent.chapterId}',
                                    '${novelContent.novelId}',
                                    '${novelContent.chapterName}',
                                    '${novelContent.chapterContent}',
                                    '${novelContent.chapterUpdateDate}',
                                    '${novelContent.lastCrawlerDate}',
                                    '${novelContent.delFlg}'
                                )`;

    // console.log('insertNovelContentInfo',insertNovelContentInfo);

    return insertNovelContentInfo;
}