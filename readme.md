关卡设计结构：

原始关卡结构：

{
  count: 单词数量，同一屏幕中的单词以不同的字母开头，可以大写、小写、符号、数字等
  disturb: {
    capital: 大写
    number: 数字
    symbol: 符号
    phase: 短语、短句
  }
  speed: 通关的最低速度
    - 星级速度按每星5%的幅度计算
    - 通过速度参数计算出消灭每个单词所能获得的单个 word_xp 值，速度越快，值越高
  error: 允许的错误数，达到或超过这个数量则这一轮失败
}

用户关卡结构：
{
  items: 包含所有干扰项和奖励项的字符串
  speed: 最低通关速度
  error: 最高允许错误
  bonus: {
    diamond_in_word: 在下落单词中包含的钻石数量
    word_xp: 每个单词所获xp值，单词中每包含一个大写、数字、符号则增加50%，短语*3，片段*10，题目*5
    level_xp: 通关所能获取的xp值，= 单词数量*每个单词的基准xp
    level_diamond: 通关所能获取的钻石数量 = 单词数量*20%取整
  }
  star_speed: {
    three:
    two:
    one:
  }
}

用户数据记录
{
  xp:
  print:
  diamond:
  perfect:
  star: {
    five:
    four:
    three:
    two:
    one:
  }
  total: {
    correct: 正确字符总数
    wrong: 错误字符总数
  }
  error: 错误的字符及次数
}

用户关卡记录
{
  id:
  date:
  speed:
  error: 可以判断是否为零错误
  star:
  playback: 记录用户最近一轮的键盘输入回放数据
}

附加说明：

1. 钻石
  - 以气泡的形式出现
  - 出现区域为关卡内容上方
  - 出现时间由程序动态生成，但不要太靠前或靠后
  - 出现的时间点插入到关卡内容中，打到该字符后即出现
  
2. 印刷字符
  - 随机在关卡内容中挑选单词生成
  - 所选单词不能包含其他标签
  - 包裹 <pring></print> 标签
  - 以炫酷的形式显示
  - 整个单词正确才能获得
  - 关卡内容中的印刷字符，无论是否通关，都能积累
  - 每一关通关的

3. 基本关卡中逐关展示特性
  - 收集印刷字符
  - 收集钻石
  - 允许的错误
  - 速度通关

4. 系统记录数据
  - 每一轮的输入字符数，累计，表示努力程度
  - 错误的字符和次数
  - 
  
5. 关卡
  - 点击关卡小图，反转出现详细信息大图和操作
  - 用户登陆马上打开至当前关卡的大图画面
  - 可以向排行一样筛选
  - 所有关卡均以游戏方式进行（丰富游戏子内容）
  - 第一关是打字教程
  - 第二关是特性引导
  - 最开始是字母，短的单词（所以词库要分类分级）
  - 登陆后直接进入选关页面（这里重要，有引导教程）
  - 用户通过更改词库来定制自己的练习内容，如编程、诗词等（系统在选词时要去重复）
  - *每10关会进行一次测试，测试词库由系统指定，不可更改*
  - 用户可以输入自己的词库或通过文章导入词库（系统自动分析、去重，用户可以管理这些词库）
  - 用户可以选择任一已解锁的关卡进行重复游戏，关卡的意义是速度和难度的定义
  - 每完成一次，都可积累奖励和经验值，也可提升自己该关的成绩记录
  - 词库可以是中文、英文、或其他语言（正确判断一致性）
  - 可以包括一些记忆、填空、选择的题目，由词库的特性定义
  - 用户选择词库是在用户主页进行
  - *盲区*也是一个难度参数

6. 挑战
  - 包括个人发来的挑战和系统组织的比赛
  - 可以象排行一样筛选
  
7. 游戏界面要素
  - 返回到选关和用户主页的入口
  - 游戏的进度
  - 速度、错误
  - 收集到的钻石
  - 收集到的文字
  - 暂停按钮（按ESC也可），这是显示返回入口？
  - 游戏完成的显示（这时就是上面一条，中间详情的结构？）
  - 游戏暂停的显示（操作菜单）
  - 奖励只有打印字符一种，出现形式可以丰富多彩，打印字符可以额外兑换经验值
    - 在信息栏上奔跑
    - 气球上升
    - 左右飞越
    - 气泡
    - 不同的样式（第一个实现）
  - 如果是挑战，则在右上角显示各对手的头像和进度
  - 如果是大奖赛，则左上角显示一个大赛详情按钮，右上角显示大赛统计信息
  
8. 排行
  - 世界、全国、学校、班级
  - 综合、速度、正确率、打印字符数、级别
  - 显示额外的图标：级别、捐助层次
  - 一行显示，根据屏幕大小调整显示内容
  - 前三名、前10名特别显示
  - 用户的排名 + 后9位
  - 总共显示100名，缺省30名，通过加载更多的方式
  - 
  
9. 设置
  - 字体
  - 颜色
  - 声音
  - 护眼
  - 防沉迷
  
10. 词库结构
  - 以词为主，以短语和短句片段为辅
  - 短语和短句可以作为干扰项（比较长）
  - 片段也可以作为干扰项（很长）
  - 每个词库包括
     - 以空格分隔的单词字符串
     - 短语短句数组
     - 片段数组
     - 题目
  
11. 