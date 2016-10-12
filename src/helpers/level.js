var _ = require('underscore');

import { common as COMMON } from './data';
import { disturb } from './_disturb_';

/**
 * 最终关卡 Add two attributes
 * {
    items:
      - 数组，经计算后的所有单词/词组项，包含格式标签
      - 获取单词数组
      - 处理大写化，标签：<capital></capital>
      - 增加短语条目，标签：<phase></phase>
      - 增加数字条目，标签：<number></number>
      - 增加符号条目，标签：<symbol></symbol>
      - 随机选择条目包含钻石标签，标签：<diamond></diamond>
    total: 加上干扰项的条目数
   }
 *
 * 返回用户的关卡数据应该是最基本的
 * 用于计算的数据在留在服务器
 */
const generate = (template) => {
  //todo: 如果词库数量不够，在通用词库补
  var items = _.sample(COMMON.words, template.word).concat(_.sample(COMMON.phases, template.phase));
  items = _.map(items, (item) => {return {str: item, tag: null};});
  template.items = _.shuffle(disturb(_.shuffle(items), template.disturb));
  template.total = template.items.length;
  return template;
}

export default { generate };