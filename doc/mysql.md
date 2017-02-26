mysql 数据库设计文档

http://www.biquge.com/43_43399/

小说的基本型信息：

小说id: novel_id
小说id前缀: novel_id_pre
小说名称：novel_name
小说封皮：novel_pic
小说作者：novel_author
最后更新时间：last_update_date
小说描述：novel_desc
最新章节: newest_chapter
最新章节id: newest_chapter_id
最后爬取时间： last_crawler_base
删除标志位:del_flg


DROP TABLE IF EXISTS  novel_base_info;
create table novel_base_info(
    novel_id varchar(64) not null comment '小说id',
    novel_id_pre varchar(64)  comment '小说id前缀',
    novel_name varchar(64) not null comment '小说名称',
    novel_pic varchar(64) not null comment '小说封皮',
    novel_author varchar(64) not null comment '小说作者',
    novel_desc varchar(1000) comment '小说描述',
    newest_chapter varchar(64) not null comment '最新章节',
    newest_chapter_id varchar(64) not null comment '最新章节id',
    last_update_date varchar(64) not null comment '最后更新时间',
    last_crawler_date varchar(64) not null comment '最后爬取时时间',
    del_flg char(1) default '0' not null comment '删除标志位(0：未删除，1：删除)',
    primary key(novel_id)

) COMMENT = '小说基本信息表';


小说的章节内容信息

归属小说id:novel_id
章节id:chapter_id
章节名称：chapter_name
章节内容：chapter_content
章节更新时间：chapter_update_date
最后爬取时间： last_crawler_base
删除标志位:del_flg

DROP TABLE IF EXISTS novel_content_info;
create table novel_content_info(
    chapter_id varchar(64) not null comment '章节id',
    novel_id varchar(64) not null comment '小说id',
    chapter_name varchar(64) not null comment '章节名称',
    chapter_content text not null comment '章节内容',
    chapter_update_date varchar(64)  comment '最后更新时间',
    last_crawler_date varchar(64) not null comment '最后爬取时时间',
    del_flg char(1) default '0' not null comment '删除标志位(0：未删除，1：删除)',
    primary key(chapter_id)
) COMMENT = '小说章节信息'