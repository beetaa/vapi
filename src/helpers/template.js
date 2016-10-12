var _ = require('underscore');

import { xrange } from './xfun';

/**
 * 关卡原型
 */
const DIFFICULTIES = ['入门', '初级', '中级', '高级', '精英', '大师', '王者', '求败', '神迹'];
const PER_DIFFICULTY = 12;
const TOTAL = PER_DIFFICULTY * DIFFICULTIES.length;

const PROTO = {
  word: [60, 600],
  phase: [0, 60],
  speed: [30, 450],
  error: 5,
  disturb: {
    capital: [0, 120],
    number: [0, 50],
    symbol: [0, 50]
  }
};

/**
 * 关卡模板
 * {
    difficulty: 入门|初级|中级|高级|精英|大师|王者|求败|神迹
    order_in_difficulty: [1~12]/12 当前关卡在当前难度的位置
    order_in_all: [1~108]/108 当前关卡在所有关卡中的位置
    word: 词汇条目数量
    phase: 短语条目数量
    speed: {
      standard: 基准速度
      one: 1星速度 = 基准速度 * 10%
      two: 2星速度 = 基准速度 * 20%
      three: 3星速度 = 基准速度 * 30%
    }
    error: 允许的最大错误条目数
    bonus: {
      item_xp: 条目基准xp值 = 本关顺序
      diamond_item_xp: 钻石条目xp值 = 基准xp值 * 5
      capital_item_xp: 大写条目xp值 = 基准xp值 * 2
      number_item_xp: 数字条目xp值 = 基准xp值 * 2
      symbol_item_xp: 符号条目xp值 = 基准xp值 * 2
      phase_item_xp: 短语条目xp值 = 基准xp值 * 5
      level_xp: 通关额外奖励xp值 = 条目数 * 条目基准xp
      level_diamond: 通关额外奖励钻石数 = 条目数 * 10%
    }
    disturb: {
      capital: 大写干扰项数量
      number: 数字干扰项数量
      symbol: 符号干扰项数量
      diamond: 钻石数量 = 条目数 * 10%，取整
    }
   }
 */
const generate = () => {
  const words = xrange(PROTO.word[0], PROTO.word[1], TOTAL);
  const phases = xrange(PROTO.phase[0], PROTO.phase[1], TOTAL);
  const speeds = xrange(PROTO.speed[0], PROTO.speed[1], TOTAL);
  const error = PROTO.error;
  const capitals = xrange(PROTO.disturb.capital[0], PROTO.disturb.capital[1], TOTAL);
  const numbers = xrange(PROTO.disturb.number[0], PROTO.disturb.number[1], TOTAL);
  const symbols = xrange(PROTO.disturb.symbol[0], PROTO.disturb.symbol[1], TOTAL);
  
  var templates = [];
  var current = 0;
  
  _.each(DIFFICULTIES, (difficulty) => {
    for (let i=0; i<PER_DIFFICULTY; i++) {
      var BASE_XP = current + 1;
      var ITEM_COUNT = words[current] + phases[current] + numbers[current] + symbols[current];
      templates.push({
        difficulty: difficulty,
        order_in_difficulty: i+1,
        order_in_all: current+1,
        word: words[current],
        phase: phases[current],
        speed: {
          standard: speeds[current],
          one: Math.round(speeds[current] * 1.1),
          two: Math.round(speeds[current] * 1.2),
          three: Math.round(speeds[current] * 1.3)
        },
        error: error,
        bonus: {
          item_xp: BASE_XP,
          diamond_item_xp: BASE_XP * 5,
          capital_item_xp: BASE_XP * 2,
          number_item_xp: BASE_XP * 2,
          symbol_item_xp: BASE_XP * 2,
          phase_item_xp: BASE_XP * 5,
          level_xp: ITEM_COUNT * BASE_XP,
          level_diamond: Math.round(ITEM_COUNT * 0.1)
        },
        disturb: {
          capital: capitals[current],
          number: numbers[current],
          symbol: symbols[current],
          diamond: Math.round(ITEM_COUNT * 0.1)
        }
      });
      current++;
    }
  });
  
  return templates;
}

export default { generate };