/**
 * 条目修改函数
 *  - 大写
 *  - 数字
 *  - 符号
 *  - 短语
 *  - 钻石
 */
var _ = require('underscore');

/**
 * 用标签包含条目
 */
const __tag__ = (item, tag) => {
  item.tag = tag;
  return item;
}

/**
 * 判断条目是否已被标签包含
 */
const __is_taged__ = (item) => {
  return item.tag;
}

/**
 * 大写
 *  - 因为没有顺序要求，所以顺序处理，再打乱即可
 */
const __capiptalize__ = (items=[], count=0) => {
  var handled = 0;
  _.each(items, (item, index) => {
    if (handled >= count) return items;
    if (!__is_taged__(item)) {
      item.str = Math.random() < 0.1 ? item.str.toUpperCase() : item.str.slice(0, 1).toUpperCase() + item.str.slice(1);
      items[index] = __tag__(item, 'capital');
      handled++;
    }
  });
  return items;
}

/**
 * 数字
 *
 */
const __numberize__ = (items=[], count=0) => {
  const nums = [];
  for (let i=0; i<count; i++) {
    nums.push({
      str: _.sample('0123456789', _.random(1, 4)).join(''),
      tag: 'number'
    });
  }
  return items.concat(nums);
}

/**
 * 符号
 *
 */
const __symbolize__ = (items=[], count=0) => {
  const syms = [];
  for (let i=0; i<count; i++) {
    syms.push({
      str: _.sample('~!@#$%^&*()_+`-=[]{}|:;",.?/', _.random(1, 4)).join(''),
      tag: 'symbol'
    });
  }
  return items.concat(syms);
}

/**
 * 钻石
 */
const __diamondize__ = (items=[], count=0) => {
  var handled = 0;
  _.each(items, (item, index) => {
    if (handled >= count) return items;
    if (!__is_taged__(item)) {
      items[index] = __tag__(item, 'diamond');
      handled++;
    }
  });
  return items;
}

/**
 * 
 * items: 混合了单词和短语的所有源条目
 * option: {
    capital:
    number:
    symbol:
    diamond:
   }
 */
const disturb = (items=[], option={}) => {
  items = __capiptalize__(items, option.capital);
  items = __numberize__(items, option.number);
  items = __symbolize__(items, option.symbol);
  items = __diamondize__(items, option.diamond);
  return items;
}

export { disturb };