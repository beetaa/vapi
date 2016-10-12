var _ = require('underscore');

/**
 * xrange(start, end, count) - 计算两个整数之间的等差数列
 * - start, end: 需要计算的两个整数，不分大小
 * - count: 分布数列的大小
 * - return: 元素个数为count的数组，元素按四舍五入取整，最后一个元素为end的值
 * 
 * 使用范例:
 * - xrange(1, 5, 9) => [ 1, 1, 2, 2, 3, 3, 4, 4, 5 ]
 * - xrange(5, 1, 7) => [ 5, 4, 4, 3, 3, 2, 1 ]
 * - xrange(5, 5, 6) => [ 5, 5, 5, 5, 5, 5 ]
 * - xrange(5, 8, 0) => false
 * - xrange('5', 8, 8) => false
 */
const xrange = (start, end, count) => {
  if (count <= 0) return false;
  if (!(_.isNumber(start) && _.isNumber(end) && _.isNumber(count))) return false;
  start = Math.ceil(start);
  end = Math.ceil(end);
  count = Math.ceil(count);
  if (start == end) {
    return _.map(_.range(count), function(e) {return start;});
  } else {
    var step_size = (end - start) / count;
    var series = _.map(_.range(start, end, step_size), function(e) {return Math.round(e);});
    if (_.last(series) != end) {
      series.pop();
      series.push(end);
    }
    return series;
  }
}

/**
 * xspread(total, count) - 计算随机分布数列
 * - total: 可以进行分配的总数
 * - count: 要分配的对象数量
 * - return: 元素个数为count的数组，每个元素代表分配到的数量
 * 
 * 使用范例:
 * - xspread(5, 4) => [ 0, 1, 0, 4 ]
 * - xspread(2, 9) => [ 0, 0, 1, 1, 0, 0, 0, 0, 0 ]
 * - xspread(10, 0) => false
 * - xspread('10', 5) => false
 */
const xspread = (total, count) => {
  if (count <= 0 || total <= 0) return false;
  if (!_.isNumber(total) || !_.isNumber(count)) return false;
  total = Math.ceil(total);
  count = Math.ceil(count);
  var series = new Array(count);
  series = _.map(series, function(e) {return 0;});
  for (var i=0; i<total; i++) {
    var pos = _.random(count-1);
    series[pos] +=1;
  }
  return series;
}

/**
 * xsurround(source, tag, count) - 在源字符串中随机抽取若干单词被指定标签包裹
 * - source: 要处理的源字符串
 * - tag: 标签，实际生成 <tag></tag> 形式
 * - count: 要包裹的单词数量
 * - return: 返回经处理的字符串
 * 
 * 使用范例:
 * - xsurround('You are awesome.', 'red', 2) => 'You <red>are</red> <red>awesome</red>'
 * 
 * 增强:
 * - 避免一个单词同时被多个标签包裹
 */
const xsurround = (source, tag, count) => {
  var words = source.split(' ');
  if (count > words.length) count = words.length;
  while (1) {
    if (count <= 0) return words.join(' ');
    var pos = _.random(words.length - 1);
    var word = words[pos];
    if (!_is_surrounded_(word, tag)) {
      words[pos] = _surround_(word, tag);
      count--;
    }
  }
}

var _surround_ = (word, tag) => {
  return '<' + tag + '>' + word + '</' + tag + '>';
}
var _is_surrounded_ = (word, tag) => {
  return word.indexOf('<' + tag) > -1;
}

/**
 * xinsert(source, whats, count) - 在源字符串中随机插入若干指定字符/字符串
 * - source: 要处理的字符串
 * - whats: 要插入的字符(串)列表
 *    - 如果是字符串，则随机挑选其中字符
 *    - 如果是字符串数组，则随机挑选数组元素
 * - count: 插入数量
 * - return: 返回经处理的字符串
 * 
 * 使用范例:
 * - xinsert('You are awesome!', '1234', 2) => You 4are3 awesome!
 * - xinsert('You are awesome!', ['123', '456'], 2) => You a456re a123wesome!
 */
const xinsert = (source, whats, count) => {
  for (let i=0; i<count; i++) {
    source = _insert_(source, _.sample(whats));
  }
  return source;
}

var _insert_ = (source, what) => {
  var pos = _.random(source.length - 1);
  return source.slice(0, pos) + what + source.slice(pos);
}

export { xrange, xspread, xsurround, xinsert };