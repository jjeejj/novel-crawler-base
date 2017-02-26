
/**
 * 插入一条书籍基本信息记录
 * @param  {Object} novel 小说基本信息
 * @return {sql}     返回拼接完成的sql语句
 */
exports.insert = function (novel) {

    var insertNovelBaseInfo = `
                                insert into novel_base_info(
                                    novel_id,
                                    novel_id_pre,
                                    novel_name,
                                    novel_pic,
                                    novel_word_count,
                                    novel_author,
                                    novel_desc,
                                    newest_chapter,
                                    newest_chapter_id,
                                    last_update_date,
                                    last_crawler_date,
                                    del_flg
                                )values(
                                    '${novel.novelId}',
                                    '${novel.novelIdPre}',
                                    '${novel.novelName}',
                                    '${novel.novelPic}',
                                    '${novel.novelWordCount}',
                                    '${novel.novelAuthor}',
                                    '${novel.novelDesc}',
                                    '${novel.newestChapter}',
                                    '${novel.newestChapterId}',
                                    '${novel.lastUpdateDate}',
                                    '${novel.lastCrawlerDate}',
                                    '${novel.delFlg}'
                                )`;

    // console.log('insertNovelBaseInfo',insertNovelBaseInfo);

    return insertNovelBaseInfo;
}

/**
 * 根据说id更新小说
 * @param  {[type]} novel 小说对象
 * @param  {[type]} id    小说id
 * @return {[type]}       [description]
 */
exports.update = function (novel,id) {
    
}

/**
 * 根据小说ID 获取小说信息
 * @param  {String} id 小说id
 * @return {NovelBaseInfo}    小说信息
 */
exports.get = function (id) {
    
}