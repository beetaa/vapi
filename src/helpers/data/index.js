/**
 * 词库
 *  - common: 缺省词库，选取高频5000单词和1000词组句型
 *  - programming: 编程，关键字和相关单词，以及常用语句和表达式
 *  - maths
 *  - literal
 */
 
const fs = require('fs');

const common = {
  words: fs.readFileSync(__dirname + 'common/word.txt').toString().split(' '),
  phases: fs.readFileSync(__dirname + 'common/phase.txt').toString().split('\n')
}

export { common };
