import { useState } from "react";

const C = {
  bg: "#FEFCF8",
  card: "#FFF8EE",
  border: "#C4B59A",
  accent: "#E8734A",
  accent2: "#4A90D9",
  accent3: "#6BAF6B",
  accent4: "#D4A843",
  text: "#3A3226",
  textLight: "#7A7062",
  codeBg: "#F5F0E8",
  line: "#BFB5A0",
  highlight: "#FFF3D6",
  pink: "#E8839A",
  purple: "#9B7EC8",
};

const F = {
  title: "'Segoe Print', 'Comic Sans MS', 'Patrick Hand', cursive",
  body: "'Segoe Print', 'Comic Sans MS', cursive",
  code: "'Courier New', 'Consolas', monospace",
};

// Wobbly rect path
function wr(x, y, w, h, r = 3) {
  const d = r;
  return `M${x + d},${y + 1} C${x + w * 0.3},${y - 1} ${x + w * 0.7},${y + 2} ${x + w - d},${y}
  C${x + w + 1},${y + h * 0.3} ${x + w - 1},${y + h * 0.7} ${x + w},${y + h - d}
  C${x + w * 0.7},${y + h + 1} ${x + w * 0.3},${y + h - 1} ${x + d},${y + h}
  C${x - 1},${y + h * 0.7} ${x + 1},${y + h * 0.3} ${x},${y + d} Z`;
}

// Wobbly line
function wl(x1, y1, x2, y2) {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  return `M${x1},${y1} Q${mx + 2},${my - 3} ${x2},${y2}`;
}

// Hand-drawn arrow
function Arrow({ x1, y1, x2, y2, color = C.accent, sw = 2.5 }) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const hl = 10, ha = 0.5;
  return (
    <g>
      <path d={wl(x1, y1, x2, y2)} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" />
      <path d={`M${x2},${y2} L${x2 - hl * Math.cos(angle - ha)},${y2 - hl * Math.sin(angle - ha)} M${x2},${y2} L${x2 - hl * Math.cos(angle + ha)},${y2 - hl * Math.sin(angle + ha)}`}
        fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" />
    </g>
  );
}

// Card component
function Card({ x, y, w, h, fill = C.card, stroke = C.border, sw = 2, children, opacity = 1 }) {
  return (
    <g opacity={opacity}>
      <path d={wr(x, y, w, h)} fill={fill} stroke={stroke} strokeWidth={sw} />
      {children}
    </g>
  );
}

// Code block
function Code({ x, y, lines, fontSize = 14, lineH = 17, maxW = 400 }) {
  return (
    <g>
      {lines.map((l, i) => (
        <text key={i} x={x} y={y + i * lineH} fontFamily={F.code} fontSize={fontSize} fill={C.text}>
          {l}
        </text>
      ))}
    </g>
  );
}

// Badge
function Badge({ x, y, text, color = C.accent }) {
  const w = text.length * 8.5 + 16;
  return (
    <g>
      <rect x={x} y={y - 13} width={w} height={20} rx={10} fill={color} opacity={0.15} />
      <text x={x + w / 2} y={y + 1} textAnchor="middle" fontFamily={F.body} fontSize={12} fill={color} fontWeight="bold">{text}</text>
    </g>
  );
}

function Slide1() {
  return (
    <svg viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <rect width="1920" height="1080" fill={C.bg} />
      {/* Subtle grid dots */}
      {Array.from({ length: 48 }).map((_, i) =>
        Array.from({ length: 27 }).map((_, j) =>
          <circle key={`${i}-${j}`} cx={i * 40 + 20} cy={j * 40 + 20} r={0.8} fill={C.line} opacity={0.25} />
        )
      )}

      {/* Title */}
      <text x={960} y={58} textAnchor="middle" fontFamily={F.title} fontSize={38} fill={C.text} fontWeight="bold">
        OpenClaw Skill 结构解析
      </text>
      <text x={960} y={88} textAnchor="middle" fontFamily={F.body} fontSize={19} fill={C.textLight}>
        以 Self-Improvement Skill 为例 — 一个 SKILL.md 文件是如何组成的
      </text>
      <line x1={300} y1={100} x2={1620} y2={100} stroke={C.border} strokeWidth={1.5} strokeDasharray="6,4" />

      {/* ===== Central Document ===== */}
      <Card x={62} y={118} w={370} h={920} fill="#FFFDF7" stroke={C.border} sw={2.5}>
        {/* Paper shadow */}
        <rect x={68} y={124} width={358} height={908} rx={2} fill="none" stroke={C.border} strokeWidth={0.5} opacity={0.3} />
        {/* File tab */}
        <path d={wr(72, 126, 160, 28)} fill={C.accent} stroke="none" opacity={0.9} />
        <text x={152} y={146} textAnchor="middle" fontFamily={F.code} fontSize={14} fill="#fff" fontWeight="bold">SKILL.md</text>

        {/* Section markers on the document */}
        {/* 1. YAML */}
        <rect x={78} y={165} width={340} height={62} rx={3} fill={C.highlight} stroke={C.accent4} strokeWidth={1.5} strokeDasharray="4,3" />
        <text x={88} y={183} fontFamily={F.code} fontSize={14} fill={C.textLight}>---</text>
        <text x={88} y={198} fontFamily={F.code} fontSize={14} fill={C.accent}>name: self-improvement</text>
        <text x={88} y={213} fontFamily={F.code} fontSize={14} fill={C.accent}>description: "Captures..."</text>
        <text x={88} y={226} fontFamily={F.code} fontSize={14} fill={C.textLight}>---</text>
        <circle cx={430} cy={195} r={12} fill={C.accent4} opacity={0.2} />
        <text x={430} y={200} textAnchor="middle" fontFamily={F.title} fontSize={15} fill={C.accent4} fontWeight="bold">①</text>

        {/* 2. Quick Ref */}
        <rect x={78} y={240} width={340} height={82} rx={3} fill="#EEF6FF" stroke={C.accent2} strokeWidth={1.5} strokeDasharray="4,3" />
        <text x={88} y={258} fontFamily={F.code} fontSize={14} fill={C.accent2} fontWeight="bold">## Quick Reference</text>
        <text x={88} y={275} fontFamily={F.code} fontSize={14} fill={C.text}>| 命令失败      | → ERRORS.md   |</text>
        <text x={88} y={290} fontFamily={F.code} fontSize={14} fill={C.text}>| 用户纠正      | → LEARNINGS.md|</text>
        <text x={88} y={305} fontFamily={F.code} fontSize={14} fill={C.text}>| 功能缺失      | → FEATURE_REQ |</text>
        <circle cx={430} cy={275} r={12} fill={C.accent2} opacity={0.2} />
        <text x={430} y={280} textAnchor="middle" fontFamily={F.title} fontSize={15} fill={C.accent2} fontWeight="bold">②</text>

        {/* 3. Logging Format */}
        <rect x={78} y={335} width={340} height={200} rx={3} fill="#EEFBEE" stroke={C.accent3} strokeWidth={1.5} strokeDasharray="4,3" />
        <text x={88} y={355} fontFamily={F.code} fontSize={14} fill={C.accent3} fontWeight="bold">## Logging Format</text>
        <text x={88} y={375} fontFamily={F.code} fontSize={14} fill={C.text}>## [LRN-20250115-001] correction</text>
        <text x={88} y={390} fontFamily={F.code} fontSize={14} fill={C.textLight}>**Logged**: 2025-01-15T10:30:00Z</text>
        <text x={88} y={405} fontFamily={F.code} fontSize={14} fill={C.textLight}>**Priority**: high</text>
        <text x={88} y={420} fontFamily={F.code} fontSize={14} fill={C.textLight}>**Status**: pending</text>
        <text x={88} y={435} fontFamily={F.code} fontSize={14} fill={C.textLight}>**Area**: tests</text>
        <text x={88} y={455} fontFamily={F.code} fontSize={14} fill={C.text}>### Summary</text>
        <text x={88} y={470} fontFamily={F.code} fontSize={14} fill={C.text}>### Details</text>
        <text x={88} y={485} fontFamily={F.code} fontSize={14} fill={C.text}>### Suggested Action</text>
        <text x={88} y={500} fontFamily={F.code} fontSize={14} fill={C.text}>### Metadata</text>
        <text x={88} y={515} fontFamily={F.code} fontSize={14} fill={C.textLight}>  - Source / Tags / See Also</text>
        <text x={88} y={530} fontFamily={F.code} fontSize={14} fill={C.textLight}>  - Pattern-Key / Recurrence</text>
        <circle cx={430} cy={435} r={12} fill={C.accent3} opacity={0.2} />
        <text x={430} y={440} textAnchor="middle" fontFamily={F.title} fontSize={15} fill={C.accent3} fontWeight="bold">③</text>

        {/* 4. Detection Triggers */}
        <rect x={78} y={548} width={340} height={100} rx={3} fill="#FFF0F3" stroke={C.pink} strokeWidth={1.5} strokeDasharray="4,3" />
        <text x={88} y={568} fontFamily={F.code} fontSize={14} fill={C.pink} fontWeight="bold">## Detection Triggers</text>
        <text x={88} y={586} fontFamily={F.code} fontSize={14} fill={C.text}>• "No, that's wrong..."→ correction</text>
        <text x={88} y={601} fontFamily={F.code} fontSize={14} fill={C.text}>• Command exit code≠0 → error</text>
        <text x={88} y={616} fontFamily={F.code} fontSize={14} fill={C.text}>• "Can you also..."  → feat_req</text>
        <text x={88} y={631} fontFamily={F.code} fontSize={14} fill={C.text}>• API differs from docs→ gap</text>
        <circle cx={430} cy={595} r={12} fill={C.pink} opacity={0.2} />
        <text x={430} y={600} textAnchor="middle" fontFamily={F.title} fontSize={15} fill={C.pink} fontWeight="bold">④</text>

        {/* 5. Promotion */}
        <rect x={78} y={660} width={340} height={80} rx={3} fill="#F3EEFF" stroke={C.purple} strokeWidth={1.5} strokeDasharray="4,3" />
        <text x={88} y={680} fontFamily={F.code} fontSize={14} fill={C.purple} fontWeight="bold">## Promoting to Project Memory</text>
        <text x={88} y={698} fontFamily={F.code} fontSize={14} fill={C.text}>跨文件/特性适用 → CLAUDE.md</text>
        <text x={88} y={713} fontFamily={F.code} fontSize={14} fill={C.text}>工作流模式     → AGENTS.md</text>
        <text x={88} y={728} fontFamily={F.code} fontSize={14} fill={C.text}>行为准则       → SOUL.md</text>
        <circle cx={430} cy={700} r={12} fill={C.purple} opacity={0.2} />
        <text x={430} y={705} textAnchor="middle" fontFamily={F.title} fontSize={15} fill={C.purple} fontWeight="bold">⑤</text>

        {/* 6. Hook */}
        <rect x={78} y={752} width={340} height={82} rx={3} fill="#FFF5EE" stroke={C.accent} strokeWidth={1.5} strokeDasharray="4,3" />
        <text x={88} y={772} fontFamily={F.code} fontSize={14} fill={C.accent} fontWeight="bold">## Hook Integration</text>
        <text x={88} y={790} fontFamily={F.code} fontSize={14} fill={C.text}>activator.sh → 每次提交提醒</text>
        <text x={88} y={805} fontFamily={F.code} fontSize={14} fill={C.text}>error-detector.sh → 错误自动检测</text>
        <text x={88} y={820} fontFamily={F.code} fontSize={14} fill={C.text}>extract-skill.sh → 技能提取脚手架</text>
        <circle cx={430} cy={790} r={12} fill={C.accent} opacity={0.2} />
        <text x={430} y={795} textAnchor="middle" fontFamily={F.title} fontSize={15} fill={C.accent} fontWeight="bold">⑥</text>

        {/* 7. Skill Extract */}
        <rect x={78} y={846} width={340} height={62} rx={3} fill="#FFFBEE" stroke={C.accent4} strokeWidth={1.5} strokeDasharray="4,3" />
        <text x={88} y={866} fontFamily={F.code} fontSize={14} fill={C.accent4} fontWeight="bold">## Automatic Skill Extraction</text>
        <text x={88} y={884} fontFamily={F.code} fontSize={14} fill={C.text}>反复出现+已验证 → 提取为独立Skill</text>
        <text x={88} y={899} fontFamily={F.code} fontSize={14} fill={C.text}>Status → promoted_to_skill</text>
        <circle cx={430} cy={875} r={12} fill={C.accent4} opacity={0.2} />
        <text x={430} y={880} textAnchor="middle" fontFamily={F.title} fontSize={15} fill={C.accent4} fontWeight="bold">⑦</text>
      </Card>

      {/* ===== Right Detail Callouts ===== */}

      {/* ① YAML Frontmatter */}
      <Arrow x1={443} y1={195} x2={478} y2={155} color={C.accent4} />
      <Card x={482} y={118} w={440} h={145} fill="#FFFDF2" stroke={C.accent4}>
        <text x={502} y={142} fontFamily={F.title} fontSize={18} fill={C.accent4} fontWeight="bold">① YAML Frontmatter — Skill 元信息</text>
        <line x1={502} y1={148} x2={895} y2={148} stroke={C.accent4} strokeWidth={1} opacity={0.4} />
        <text x={502} y={168} fontFamily={F.body} fontSize={14} fill={C.text}>每个 Skill 的 "身份证"，决定何时被加载：</text>
        <rect x={502} y={178} width={400} height={68} rx={4} fill={C.codeBg} />
        <Code x={512} y={195} fontSize={12.5} lineH={16} lines={[
          `name: self-improvement`,
          `description: "Captures learnings, errors,`,
          `  and corrections to enable continuous`,
          `  improvement. Use when: (1) A command fails..."`,
        ]} />
      </Card>

      {/* ② Quick Reference */}
      <Arrow x1={443} y1={275} x2={478} y2={295} color={C.accent2} />
      <Card x={482} y={272} w={440} h={145} fill="#F5FAFF" stroke={C.accent2}>
        <text x={502} y={296} fontFamily={F.title} fontSize={18} fill={C.accent2} fontWeight="bold">② Quick Reference — 速查决策表</text>
        <line x1={502} y1={302} x2={895} y2={302} stroke={C.accent2} strokeWidth={1} opacity={0.4} />
        <text x={502} y={322} fontFamily={F.body} fontSize={14} fill={C.text}>Agent 遇到情况时的"第一反应"路由表：</text>
        <rect x={502} y={332} width={400} height={72} rx={4} fill={C.codeBg} />
        <Code x={512} y={349} fontSize={12} lineH={16} lines={[
          `命令/操作失败         → .learnings/ERRORS.md`,
          `用户纠正 "不对,应该是" → .learnings/LEARNINGS.md`,
          `用户要求缺失功能      → .learnings/FEATURE_REQUESTS.md`,
          `发现更好的方法        → LEARNINGS.md (best_practice)`,
        ]} />
      </Card>

      {/* ③ Logging Format — this is the big one */}
      <Arrow x1={443} y1={435} x2={478} y2={458} color={C.accent3} />
      <Card x={482} y={426} w={500} h={268} fill="#F2FBF2" stroke={C.accent3}>
        <text x={502} y={450} fontFamily={F.title} fontSize={18} fill={C.accent3} fontWeight="bold">③ Logging Format — 结构化知识条目</text>
        <line x1={502} y1={456} x2={960} y2={456} stroke={C.accent3} strokeWidth={1} opacity={0.4} />
        <text x={502} y={476} fontFamily={F.body} fontSize={13} fill={C.text}>三种条目类型：LRN（学习）/ ERR（错误）/ FEAT（功能请求）</text>
        <rect x={502} y={486} width={462} height={195} rx={4} fill={C.codeBg} />
        <Code x={512} y={503} fontSize={11.5} lineH={15} lines={[
          `## [LRN-20250115-001] correction    ← 类型-日期-序号`,
          `**Logged**: 2025-01-15T10:30:00Z     ← ISO时间戳`,
          `**Priority**: high                   ← critical/high/medium/low`,
          `**Status**: pending                  ← 生命周期状态`,
          `**Area**: tests                      ← 代码区域标签`,
          `### Summary   ← 一句话总结`,
          `### Details   ← 完整上下文：发生了什么、错在哪`,
          `### Suggested Action  ← 具体修复建议`,
          `### Metadata`,
          `  - Source: user_feedback | error | conversation`,
          `  - Tags: pytest, testing   - See Also: LRN-xxx`,
          `  - Pattern-Key: simplify.dead_code  ← 去重键`,
          `  - Recurrence-Count: 3  ← 自动升级指标`,
        ]} />
      </Card>

      {/* ④ Detection Triggers */}
      <Arrow x1={443} y1={598} x2={542} y2={718} color={C.pink} />
      <Card x={546} y={700} w={430} h={148} fill="#FFF5F8" stroke={C.pink}>
        <text x={566} y={724} fontFamily={F.title} fontSize={18} fill={C.pink} fontWeight="bold">④ Detection Triggers — 自动嗅探</text>
        <line x1={566} y1={730} x2={955} y2={730} stroke={C.pink} strokeWidth={1} opacity={0.4} />
        <text x={566} y={750} fontFamily={F.body} fontSize={13} fill={C.text}>Agent 识别到以下模式时自动触发记录：</text>
        <rect x={566} y={760} width={390} height={76} rx={4} fill={C.codeBg} />
        <Code x={576} y={776} fontSize={12} lineH={17} lines={[
          `"No, that's wrong" / "Actually..."  → correction`,
          `exit code ≠ 0 / Exception / Traceback → error`,
          `"Can you also..." / "I wish..."     → feature_req`,
          `API行为≠文档描述 / 信息已过时        → knowledge_gap`,
        ]} />
      </Card>

      {/* ⑤ Promotion System */}
      <Arrow x1={443} y1={700} x2={998} y2={148} color={C.purple} />
      <Card x={1000} y={118} w={460} h={190} fill="#F8F3FF" stroke={C.purple}>
        <text x={1020} y={142} fontFamily={F.title} fontSize={18} fill={C.purple} fontWeight="bold">⑤ Promotion — 记忆升级机制</text>
        <line x1={1020} y1={148} x2={1438} y2={148} stroke={C.purple} strokeWidth={1} opacity={0.4} />
        <text x={1020} y={170} fontFamily={F.body} fontSize={13} fill={C.text}>从临时笔记 → 永久项目记忆的晋升条件：</text>
        <rect x={1020} y={180} width={420} height={58} rx={4} fill={C.codeBg} />
        <Code x={1030} y={197} fontSize={12} lineH={17} lines={[
          `Recurrence-Count ≥ 3  （出现≥3次）`,
          `跨 ≥ 2 个不同任务     （非偶发）`,
          `30天窗口内出现         （近期相关）`,
        ]} />
        <text x={1020} y={258} fontFamily={F.body} fontSize={13} fill={C.text}>升级目标：</text>
        <Badge x={1020} y={278} text="CLAUDE.md → 项目事实" color={C.accent} />
        <Badge x={1210} y={278} text="AGENTS.md → 工作流" color={C.accent2} />
        <Badge x={1380} y={278} text="SOUL.md → 行为" color={C.purple} />
      </Card>

      {/* ⑥ Hook Integration */}
      <Arrow x1={443} y1={790} x2={998} y2={350} color={C.accent} />
      <Card x={1000} y={320} w={460} h={210} fill="#FFF8F2" stroke={C.accent}>
        <text x={1020} y={344} fontFamily={F.title} fontSize={18} fill={C.accent} fontWeight="bold">⑥ Hook — 自动化触发脚本</text>
        <line x1={1020} y1={350} x2={1438} y2={350} stroke={C.accent} strokeWidth={1} opacity={0.4} />
        <text x={1020} y={372} fontFamily={F.body} fontSize={13} fill={C.text}>三个脚本钩子，无需手动记得记录：</text>
        <rect x={1020} y={382} width={420} height={136} rx={4} fill={C.codeBg} />
        <Code x={1030} y={399} fontSize={11.5} lineH={15} lines={[
          `▸ activator.sh (UserPromptSubmit)`,
          `  每次提交后注入 <self-improvement-reminder>`,
          `  提醒 Agent：这次任务有可提取的知识吗？`,
          ``,
          `▸ error-detector.sh (PostToolUse:Bash)`,
          `  检测 CLAUDE_TOOL_OUTPUT 中的错误模式`,
          `  匹配: "Error:" / "Traceback" / "FAILED"...`,
          ``,
          `▸ extract-skill.sh`,
          `  从 Learning 自动生成 Skill 脚手架`,
        ]} />
      </Card>

      {/* ⑦ Skill Extraction */}
      <Arrow x1={443} y1={875} x2={998} y2={568} color={C.accent4} />
      <Card x={1000} y={542} w={460} h={175} fill="#FFFDF2" stroke={C.accent4}>
        <text x={1020} y={566} fontFamily={F.title} fontSize={18} fill={C.accent4} fontWeight="bold">⑦ Skill Extraction — 知识结晶</text>
        <line x1={1020} y1={572} x2={1438} y2={572} stroke={C.accent4} strokeWidth={1} opacity={0.4} />
        <text x={1020} y={594} fontFamily={F.body} fontSize={13} fill={C.text}>当 Learning 足够成熟，提取为独立可复用 Skill：</text>
        <rect x={1020} y={604} width={420} height={100} rx={4} fill={C.codeBg} />
        <Code x={1030} y={621} fontSize={12} lineH={16} lines={[
          `提取条件:`,
          `  • See Also ≥ 2 个关联条目 (反复出现)`,
          `  • Status: resolved (已验证)`,
          `  • 非项目特定，跨代码库可用`,
          `结果: skills/<name>/SKILL.md  ← 新的独立Skill`,
          `原条目: Status → promoted_to_skill`,
        ]} />
      </Card>

      {/* Bottom: lifecycle flow */}
      <Card x={1000} y={738} w={520} h={110} fill={C.highlight} stroke={C.accent4} sw={2}>
        <text x={1020} y={762} fontFamily={F.title} fontSize={16} fill={C.accent4} fontWeight="bold">Skill 生命周期总览</text>
        <text x={1020} y={786} fontFamily={F.body} fontSize={14} fill={C.text}>
          触发检测 → 结构化记录 → 关联去重 → 满足条件升级 → 提取为新 Skill
        </text>
        <text x={1020} y={808} fontFamily={F.body} fontSize={13} fill={C.textLight}>
          每个 SKILL.md 就是上述7大区块的组合，定义了"什么时候做什么、怎么记、怎么升级"
        </text>
        <text x={1020} y={830} fontFamily={F.body} fontSize={13} fill={C.textLight}>
          Agent 加载 Skill 后，相当于获得了一套"自我进化"的行为指令集
        </text>
      </Card>

      {/* Page indicator */}
      <text x={960} y={1065} textAnchor="middle" fontFamily={F.body} fontSize={14} fill={C.textLight}>1 / 2</text>
    </svg>
  );
}

function Slide2() {
  return (
    <svg viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <rect width="1920" height="1080" fill={C.bg} />
      {Array.from({ length: 48 }).map((_, i) =>
        Array.from({ length: 27 }).map((_, j) =>
          <circle key={`${i}-${j}`} cx={i * 40 + 20} cy={j * 40 + 20} r={0.8} fill={C.line} opacity={0.25} />
        )
      )}

      {/* Title */}
      <text x={960} y={55} textAnchor="middle" fontFamily={F.title} fontSize={36} fill={C.text} fontWeight="bold">
        Self-Improvement 如何让 Agent 越用越聪明
      </text>
      <text x={960} y={84} textAnchor="middle" fontFamily={F.body} fontSize={18} fill={C.textLight}>
        触发场景 → 记录到 .learnings/ → 升级到项目记忆 — 三级递进机制
      </text>
      <line x1={200} y1={96} x2={1720} y2={96} stroke={C.border} strokeWidth={1.5} strokeDasharray="6,4" />

      {/* ===== LEVEL 1: Triggers ===== */}
      <rect x={42} y={108} width={4} height={940} rx={2} fill={C.pink} opacity={0.6} />
      <text x={58} y={132} fontFamily={F.title} fontSize={22} fill={C.pink} fontWeight="bold">Level 1 · 触发场景</text>
      <text x={58} y={154} fontFamily={F.body} fontSize={13} fill={C.textLight}>Agent 在对话中自动嗅探到以下信号</text>

      {/* Trigger cards */}
      <Card x={58} y={168} w={285} h={120} fill="#FFF5F8" stroke={C.pink}>
        <Badge x={72} y={188} text="correction" color={C.pink} />
        <text x={72} y={210} fontFamily={F.body} fontSize={13} fill={C.text} fontWeight="bold">用户纠正错误</text>
        <rect x={72} y={218} width={255} height={56} rx={3} fill={C.codeBg} />
        <text x={82} y={235} fontFamily={F.code} fontSize={11.5} fill={C.text}>"不对，这个项目用 pnpm 不是 npm"</text>
        <text x={82} y={252} fontFamily={F.code} fontSize={11.5} fill={C.text}>"Actually, fixtures 是 module-scoped"</text>
        <text x={82} y={269} fontFamily={F.code} fontSize={11.5} fill={C.text}>"你说的已经过时了..."</text>
      </Card>

      <Card x={58} y={298} w={285} h={120} fill="#FFF5F8" stroke={C.pink}>
        <Badge x={72} y={318} text="error" color={C.accent} />
        <text x={72} y={340} fontFamily={F.body} fontSize={13} fill={C.text} fontWeight="bold">命令/操作失败</text>
        <rect x={72} y={348} width={255} height={56} rx={3} fill={C.codeBg} />
        <text x={82} y={365} fontFamily={F.code} fontSize={11.5} fill={C.text}>$ docker build → platform mismatch</text>
        <text x={82} y={382} fontFamily={F.code} fontSize={11.5} fill={C.text}>$ npm install → ERR! pnpm-lock.yaml</text>
        <text x={82} y={399} fontFamily={F.code} fontSize={11.5} fill={C.text}>TimeoutError: payments API 30000ms</text>
      </Card>

      <Card x={58} y={428} w={285} h={110} fill="#FFF5F8" stroke={C.pink}>
        <Badge x={72} y={448} text="feature_request" color={C.accent2} />
        <text x={72} y={470} fontFamily={F.body} fontSize={13} fill={C.text} fontWeight="bold">用户请求缺失功能</text>
        <rect x={72} y={478} width={255} height={46} rx={3} fill={C.codeBg} />
        <text x={82} y={495} fontFamily={F.code} fontSize={11.5} fill={C.text}>"能不能导出成 CSV？"</text>
        <text x={82} y={512} fontFamily={F.code} fontSize={11.5} fill={C.text}>"要是有暗黑模式就好了"</text>
      </Card>

      <Card x={58} y={548} w={285} h={110} fill="#FFF5F8" stroke={C.pink}>
        <Badge x={72} y={568} text="knowledge_gap" color={C.purple} />
        <text x={72} y={590} fontFamily={F.body} fontSize={13} fill={C.text} fontWeight="bold">知识过时/错误</text>
        <rect x={72} y={598} width={255} height={46} rx={3} fill={C.codeBg} />
        <text x={82} y={615} fontFamily={F.code} fontSize={11.5} fill={C.text}>API 实际行为 ≠ 我的理解</text>
        <text x={82} y={632} fontFamily={F.code} fontSize={11.5} fill={C.text}>文档已更新但我引用了旧版</text>
      </Card>

      <Card x={58} y={668} w={285} h={100} fill="#FFF5F8" stroke={C.pink}>
        <Badge x={72} y={688} text="best_practice" color={C.accent3} />
        <text x={72} y={710} fontFamily={F.body} fontSize={13} fill={C.text} fontWeight="bold">发现更优方案</text>
        <rect x={72} y={718} width={255} height={36} rx={3} fill={C.codeBg} />
        <text x={82} y={735} fontFamily={F.code} fontSize={11.5} fill={C.text}>原用 setTimeout, 改用 retry+backoff</text>
        <text x={82} y={750} fontFamily={F.code} fontSize={11.5} fill={C.text}>发现 API 变更后需重新生成 TS 客户端</text>
      </Card>

      {/* ===== Arrows L1→L2 ===== */}
      <Arrow x1={350} y1={230} x2={398} y2={230} color={C.pink} sw={2} />
      <Arrow x1={350} y1={360} x2={398} y2={360} color={C.pink} sw={2} />
      <Arrow x1={350} y1={490} x2={398} y2={490} color={C.pink} sw={2} />
      <Arrow x1={350} y1={605} x2={398} y2={530} color={C.pink} sw={2} />
      <Arrow x1={350} y1={720} x2={398} y2={600} color={C.pink} sw={2} />

      {/* ===== LEVEL 2: .learnings/ ===== */}
      <rect x={400} y={108} width={4} height={940} rx={2} fill={C.accent3} opacity={0.6} />
      <text x={416} y={132} fontFamily={F.title} fontSize={22} fill={C.accent3} fontWeight="bold">Level 2 · 写入 .learnings/</text>
      <text x={416} y={154} fontFamily={F.body} fontSize={13} fill={C.textLight}>结构化记录，带完整上下文和元数据</text>

      {/* L2 Card: LEARNINGS.md */}
      <Card x={416} y={168} w={380} h={280} fill="#F2FBF2" stroke={C.accent3}>
        <text x={436} y={192} fontFamily={F.title} fontSize={16} fill={C.accent3} fontWeight="bold">📝 LEARNINGS.md 写入示例</text>
        <rect x={436} y={202} width={340} height={232} rx={4} fill={C.codeBg} />
        <Code x={446} y={219} fontSize={14} lineH={14.5} lines={[
          `## [LRN-20250115-002] knowledge_gap`,
          `**Logged**: 2025-01-15T14:22:00Z`,
          `**Priority**: medium`,
          `**Status**: pending`,
          `**Area**: config`,
          ``,
          `### Summary`,
          `项目使用 pnpm 而非 npm 做包管理`,
          ``,
          `### Details`,
          `执行 npm install 失败，项目实际使用 pnpm`,
          `workspace，锁文件为 pnpm-lock.yaml`,
          ``,
          `### Suggested Action`,
          `执行前检查 pnpm-lock.yaml 是否存在`,
          ``,
          `### Metadata`,
          `- Source: error`,
          `- Tags: package-manager, pnpm`,
        ]} />
      </Card>

      {/* L2 Card: ERRORS.md */}
      <Card x={416} y={460} w={380} h={210} fill="#F2FBF2" stroke={C.accent3}>
        <text x={436} y={484} fontFamily={F.title} fontSize={16} fill={C.accent3} fontWeight="bold">🔴 ERRORS.md 写入示例</text>
        <rect x={436} y={494} width={340} height={162} rx={4} fill={C.codeBg} />
        <Code x={446} y={511} fontSize={14} lineH={14.5} lines={[
          `## [ERR-20250115-A3F] docker_build`,
          `**Priority**: high  **Status**: pending`,
          `**Area**: infra`,
          ``,
          `### Error`,
          `python:3.11-slim: no match for`,
          `platform linux/arm64`,
          ``,
          `### Suggested Fix`,
          `docker build --platform linux/amd64`,
          ``,
          `### Metadata`,
          `- Reproducible: yes`,
        ]} />
      </Card>

      {/* L2 Card: FEATURE_REQUESTS.md */}
      <Card x={416} y={682} w={380} h={140} fill="#F2FBF2" stroke={C.accent3}>
        <text x={436} y={706} fontFamily={F.title} fontSize={16} fill={C.accent3} fontWeight="bold">💡 FEATURE_REQUESTS.md 写入示例</text>
        <rect x={436} y={716} width={340} height={92} rx={4} fill={C.codeBg} />
        <Code x={446} y={733} fontSize={14} lineH={14.5} lines={[
          `## [FEAT-20250115-001] export_to_csv`,
          `**Priority**: medium`,
          `### Requested Capability`,
          `导出分析结果为 CSV 格式`,
          `### Complexity Estimate`,
          `simple — 扩展已有 --output json 模式`,
        ]} />
      </Card>

      {/* ===== Arrows L2→L3 ===== */}
      <Arrow x1={805} y1={310} x2={855} y2={310} color={C.accent3} sw={2.5} />
      <Arrow x1={805} y1={560} x2={855} y2={460} color={C.accent3} sw={2.5} />
      <Arrow x1={805} y1={750} x2={855} y2={600} color={C.accent3} sw={2.5} />

      {/* Promotion condition badge */}
      <g transform="translate(810, 370)">
        <rect x={0} y={0} width={48} height={60} rx={8} fill={C.accent4} opacity={0.15} />
        <text x={24} y={22} textAnchor="middle" fontFamily={F.body} fontSize={14} fill={C.accent4} fontWeight="bold">满足</text>
        <text x={24} y={36} textAnchor="middle" fontFamily={F.body} fontSize={14} fill={C.accent4} fontWeight="bold">升级</text>
        <text x={24} y={50} textAnchor="middle" fontFamily={F.body} fontSize={14} fill={C.accent4} fontWeight="bold">条件</text>
      </g>

      {/* ===== LEVEL 3: Project Memory ===== */}
      <rect x={858} y={108} width={4} height={940} rx={2} fill={C.purple} opacity={0.6} />
      <text x={874} y={132} fontFamily={F.title} fontSize={22} fill={C.purple} fontWeight="bold">Level 3 · 升级为项目记忆</text>
      <text x={874} y={154} fontFamily={F.body} fontSize={13} fill={C.textLight}>反复出现的学习被提炼为永久规则，写入项目级配置</text>

      {/* Promotion conditions */}
      <Card x={874} y={168} w={305} h={100} fill="#FFF8EE" stroke={C.accent4}>
        <text x={894} y={192} fontFamily={F.title} fontSize={15} fill={C.accent4} fontWeight="bold">🔑 升级触发条件</text>
        <rect x={894} y={202} width={265} height={52} rx={3} fill={C.codeBg} />
        <Code x={904} y={217} fontSize={11.5} lineH={16} lines={[
          `✓ Recurrence-Count ≥ 3`,
          `✓ 跨 ≥ 2 个不同任务出现`,
          `✓ 30 天窗口内发生`,
        ]} />
      </Card>

      {/* CLAUDE.md */}
      <Card x={874} y={280} w={305} h={178} fill="#FFF0EE" stroke={C.accent}>
        <text x={894} y={304} fontFamily={F.title} fontSize={16} fill={C.accent} fontWeight="bold">📘 → CLAUDE.md</text>
        <text x={894} y={322} fontFamily={F.body} fontSize={12} fill={C.textLight}>项目事实、约定、陷阱（所有 Agent 通用）</text>
        <rect x={894} y={332} width={265} height={44} rx={3} fill={C.codeBg} />
        <text x={904} y={347} fontFamily={F.body} fontSize={12} fill={C.text} fontStyle="italic">原始学习（冗长）：</text>
        <text x={904} y={363} fontFamily={F.code} fontSize={10.5} fill={C.textLight}>项目使用pnpm workspace, npm install失败...</text>
        <text x={894} y={392} fontFamily={F.body} fontSize={12} fill={C.accent} fontWeight="bold">提炼后写入 CLAUDE.md：</text>
        <rect x={894} y={400} width={265} height={44} rx={3} fill="#FFE8E2" />
        <Code x={904} y={416} fontSize={14} lineH={14} lines={[
          `## Build & Dependencies`,
          `- 包管理器: pnpm (非npm) - 用 pnpm install`,
        ]} />
      </Card>

      {/* AGENTS.md */}
      <Card x={874} y={470} w={305} h={178} fill="#EEF6FF" stroke={C.accent2}>
        <text x={894} y={494} fontFamily={F.title} fontSize={16} fill={C.accent2} fontWeight="bold">📗 → AGENTS.md</text>
        <text x={894} y={512} fontFamily={F.body} fontSize={12} fill={C.textLight}>Agent 工作流、自动化规则</text>
        <rect x={894} y={522} width={265} height={40} rx={3} fill={C.codeBg} />
        <text x={904} y={537} fontFamily={F.body} fontSize={12} fill={C.text} fontStyle="italic">原始学习：</text>
        <text x={904} y={553} fontFamily={F.code} fontSize={10.5} fill={C.textLight}>修改API后忘记重新生成TS客户端导致运行时错误</text>
        <text x={894} y={577} fontFamily={F.body} fontSize={12} fill={C.accent2} fontWeight="bold">提炼后写入 AGENTS.md：</text>
        <rect x={894} y={585} width={265} height={50} rx={3} fill="#E2EEFF" />
        <Code x={904} y={601} fontSize={14} lineH={14} lines={[
          `## After API Changes`,
          `1. pnpm run generate:api`,
          `2. pnpm tsc --noEmit`,
        ]} />
      </Card>

      {/* SOUL.md / TOOLS.md */}
      <Card x={874} y={660} w={305} h={130} fill="#F3EEFF" stroke={C.purple}>
        <text x={894} y={684} fontFamily={F.title} fontSize={16} fill={C.purple} fontWeight="bold">📙 → SOUL.md / TOOLS.md</text>
        <text x={894} y={702} fontFamily={F.body} fontSize={12} fill={C.textLight}>行为准则 / 工具陷阱（OpenClaw 专用）</text>
        <rect x={894} y={712} width={265} height={64} rx={3} fill={C.codeBg} />
        <Code x={904} y={729} fontSize={14} lineH={15} lines={[
          `SOUL: "简洁回答，避免无谓免责声明"`,
          `TOOLS: "Git push 前先确认 auth"`,
          `TOOLS: "用 gh auth status 检查认证"`,
          `SOUL: "错误时立即承认并修正"`,
        ]} />
      </Card>

      {/* ===== LEVEL 4: Skill Extraction ===== */}
      <Arrow x1={1185} y1={400} x2={1225} y2={400} color={C.accent4} sw={3} />
      <rect x={1228} y={108} width={4} height={940} rx={2} fill={C.accent4} opacity={0.6} />
      <text x={1244} y={132} fontFamily={F.title} fontSize={22} fill={C.accent4} fontWeight="bold">Level 4 · 提取为独立 Skill</text>
      <text x={1244} y={154} fontFamily={F.body} fontSize={13} fill={C.textLight}>高价值学习结晶为可复用的新 Skill，供其他项目/Agent 加载</text>

      <Card x={1244} y={168} w={340} h={105} fill="#FFFDF2" stroke={C.accent4}>
        <text x={1264} y={192} fontFamily={F.title} fontSize={15} fill={C.accent4} fontWeight="bold">🎯 提取条件</text>
        <rect x={1264} y={202} width={300} height={56} rx={3} fill={C.codeBg} />
        <Code x={1274} y={218} fontSize={11.5} lineH={16} lines={[
          `✓ See Also ≥ 2 (反复出现)`,
          `✓ Status: resolved (已验证可行)`,
          `✓ 跨代码库通用 (非项目特定)`,
        ]} />
      </Card>

      <Card x={1244} y={285} w={340} h={260} fill="#FFFDF2" stroke={C.accent4}>
        <text x={1264} y={309} fontFamily={F.title} fontSize={15} fill={C.accent4} fontWeight="bold">📦 提取结果示例</text>
        <text x={1264} y={328} fontFamily={F.body} fontSize={12} fill={C.textLight}>skills/docker-m1-fixes/SKILL.md</text>
        <rect x={1264} y={338} width={300} height={192} rx={4} fill={C.codeBg} />
        <Code x={1274} y={355} fontSize={14} lineH={14} lines={[
          `---`,
          `name: docker-m1-fixes`,
          `description: "Fixes Docker build`,
          `  failures on Apple Silicon"`,
          `---`,
          `# Docker M1 Fixes`,
          `## Quick Reference`,
          `| platform mismatch |`,
          `|  → --platform linux/amd64 |`,
          `## Solutions`,
          `### Option 1: Build Flag`,
          `docker build --platform ...`,
          `### Option 2: Dockerfile`,
          `FROM --platform=linux/amd64 ...`,
        ]} />
      </Card>

      <Card x={1244} y={557} w={340} h={86} fill="#FFFDF2" stroke={C.accent4}>
        <text x={1264} y={581} fontFamily={F.title} fontSize={15} fill={C.accent4} fontWeight="bold">🔄 原条目状态更新</text>
        <rect x={1264} y={591} width={300} height={38} rx={3} fill={C.codeBg} />
        <Code x={1274} y={607} fontSize={11.5} lineH={15} lines={[
          `**Status**: promoted_to_skill`,
          `**Skill-Path**: skills/docker-m1-fixes`,
        ]} />
      </Card>

      {/* ===== Bottom: Progressive Summary ===== */}
      <Card x={1244} y={670} w={636} h={170} fill={C.highlight} stroke={C.accent4} sw={2.5}>
        <text x={1264} y={698} fontFamily={F.title} fontSize={20} fill={C.accent4} fontWeight="bold">🧠 递进关系总结</text>
        <line x1={1264} y1={706} x2={1858} y2={706} stroke={C.accent4} strokeWidth={1} opacity={0.4} />

        {/* Flow boxes */}
        <rect x={1274} y={720} width={105} height={40} rx={6} fill={C.pink} opacity={0.2} />
        <text x={1326} y={745} textAnchor="middle" fontFamily={F.body} fontSize={13} fill={C.pink} fontWeight="bold">触发感知</text>
        <Arrow x1={1382} y1={740} x2={1410} y2={740} color={C.border} sw={2} />

        <rect x={1414} y={720} width={110} height={40} rx={6} fill={C.accent3} opacity={0.2} />
        <text x={1469} y={745} textAnchor="middle" fontFamily={F.body} fontSize={13} fill={C.accent3} fontWeight="bold">结构化记录</text>
        <Arrow x1={1527} y1={740} x2={1555} y2={740} color={C.border} sw={2} />

        <rect x={1559} y={720} width={105} height={40} rx={6} fill={C.purple} opacity={0.2} />
        <text x={1611} y={745} textAnchor="middle" fontFamily={F.body} fontSize={13} fill={C.purple} fontWeight="bold">升级记忆</text>
        <Arrow x1={1667} y1={740} x2={1695} y2={740} color={C.border} sw={2} />

        <rect x={1699} y={720} width={110} height={40} rx={6} fill={C.accent4} opacity={0.2} />
        <text x={1754} y={745} textAnchor="middle" fontFamily={F.body} fontSize={13} fill={C.accent4} fontWeight="bold">结晶为 Skill</text>

        <text x={1274} y={786} fontFamily={F.body} fontSize={13} fill={C.text}>
          临时笔记 (.learnings/) → 项目记忆 (CLAUDE/AGENTS.md) → 可复用技能 (新 SKILL.md)
        </text>
        <text x={1274} y={808} fontFamily={F.body} fontSize={13} fill={C.textLight}>
          每一层的知识密度更高、适用范围更广、表达更精炼
        </text>
        <text x={1274} y={828} fontFamily={F.body} fontSize={13} fill={C.accent} fontWeight="bold">
          Agent 每次交互都在积累，最终实现"越用越聪明"的自我进化循环
        </text>
      </Card>

      {/* Cross-session note */}
      <Card x={1596} y={168} w={284} h={270} fill="#F8F9FA" stroke={C.border}>
        <text x={1616} y={192} fontFamily={F.title} fontSize={15} fill={C.text} fontWeight="bold">🔗 跨会话传播</text>
        <text x={1616} y={212} fontFamily={F.body} fontSize={12} fill={C.textLight}>OpenClaw 特有：知识跨 Agent 共享</text>
        <rect x={1616} y={222} width={244} height={200} rx={3} fill={C.codeBg} />
        <Code x={1626} y={239} fontSize={14} lineH={14.5} lines={[
          `sessions_list()`,
          `  → 查看活跃会话`,
          ``,
          `sessions_send(`,
          `  sessionKey="other-session",`,
          `  message="Learning: API需要`,
          `    X-Custom-Header"`,
          `)`,
          `  → 向其他 Agent 发送学习`,
          ``,
          `sessions_spawn(`,
          `  task="研究 X 并反馈",`,
          `  label="research"`,
          `)`,
          `  → 派生子 Agent 做后台研究`,
        ]} />
      </Card>

      {/* Page indicator */}
      <text x={960} y={1065} textAnchor="middle" fontFamily={F.body} fontSize={14} fill={C.textLight}>2 / 2</text>
    </svg>
  );
}

export default function App() {
  const [slide, setSlide] = useState(0);
  const slides = [Slide1, Slide2];
  const Comp = slides[slide];

  return (
    <div style={{ width: "100%", maxWidth: 1920, margin: "0 auto", position: "relative", fontFamily: F.body }}>
      <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", borderRadius: 8, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <Comp />
      </div>
      <div style={{
        display: "flex", justifyContent: "center", alignItems: "center", gap: 16,
        marginTop: 16, padding: "8px 0"
      }}>
        <button
          onClick={() => setSlide(0)}
          disabled={slide === 0}
          style={{
            padding: "8px 24px", border: `2px solid ${C.border}`, borderRadius: 20,
            background: slide === 0 ? C.codeBg : "#fff", cursor: slide === 0 ? "default" : "pointer",
            fontFamily: F.body, fontSize: 15, color: C.text, opacity: slide === 0 ? 0.5 : 1,
          }}
        >
          ← 上一页：Skill 结构
        </button>
        <span style={{ fontSize: 14, color: C.textLight }}>{slide + 1} / 2</span>
        <button
          onClick={() => setSlide(1)}
          disabled={slide === 1}
          style={{
            padding: "8px 24px", border: `2px solid ${C.border}`, borderRadius: 20,
            background: slide === 1 ? C.codeBg : "#fff", cursor: slide === 1 ? "default" : "pointer",
            fontFamily: F.body, fontSize: 15, color: C.text, opacity: slide === 1 ? 0.5 : 1,
          }}
        >
          下一页：递进机制 →
        </button>
      </div>
    </div>
  );
}
