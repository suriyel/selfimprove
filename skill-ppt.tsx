import { useState } from "react";

const C = {
  bg: "#FFFFFF",
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
  title: "'Microsoft YaHei', '微软雅黑', sans-serif",
  body: "'Microsoft YaHei', '微软雅黑', sans-serif",
  code: "'Consolas', 'Microsoft YaHei', monospace",
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
function Code({ x, y, lines, fontSize = 17, lineH = 20, maxW = 400 }) {
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
  const w = text.length * 10 + 18;
  return (
    <g>
      <rect x={x} y={y - 15} width={w} height={22} rx={11} fill={color} opacity={0.15} />
      <text x={x + w / 2} y={y + 2} textAnchor="middle" fontFamily={F.body} fontSize={16} fill={color} fontWeight="bold">{text}</text>
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
      <text x={960} y={58} textAnchor="middle" fontFamily={F.title} fontSize={40} fill={C.text} fontWeight="bold">
        OpenClaw Skill 结构解析
      </text>
      <text x={960} y={88} textAnchor="middle" fontFamily={F.body} fontSize={19} fill={C.textLight}>
        以 Self-Improvement Skill 为例 — 一个 SKILL.md 文件是如何组成的
      </text>
      <line x1={300} y1={100} x2={1620} y2={100} stroke={C.border} strokeWidth={1.5} strokeDasharray="6,4" />

      {/* ===== Central Document ===== */}
      <Card x={62} y={118} w={400} h={920} fill="#FFFDF7" stroke={C.border} sw={2.5}>
        {/* Paper shadow */}
        <rect x={68} y={124} width={388} height={908} rx={2} fill="none" stroke={C.border} strokeWidth={0.5} opacity={0.3} />
        {/* File tab */}
        <path d={wr(72, 126, 160, 28)} fill={C.accent} stroke="none" opacity={0.9} />
        <text x={152} y={146} textAnchor="middle" fontFamily={F.code} fontSize={18} fill="#fff" fontWeight="bold">SKILL.md</text>

        {/* Section markers on the document */}
        {/* 1. YAML */}
        <rect x={78} y={165} width={370} height={72} rx={3} fill={C.highlight} stroke={C.accent4} strokeWidth={1.5} strokeDasharray="4,3" />
        <text x={88} y={185} fontFamily={F.code} fontSize={18} fill={C.textLight}>---</text>
        <text x={88} y={202} fontFamily={F.code} fontSize={18} fill={C.accent}>name: self-improvement</text>
        <text x={88} y={219} fontFamily={F.code} fontSize={18} fill={C.accent}>description: "Captures..."</text>
        <text x={88} y={234} fontFamily={F.code} fontSize={18} fill={C.textLight}>---</text>
        <circle cx={460} cy={200} r={12} fill={C.accent4} opacity={0.2} />
        <text x={460} y={205} textAnchor="middle" fontFamily={F.title} fontSize={16} fill={C.accent4} fontWeight="bold">①</text>

        {/* 2. Quick Ref */}
        <rect x={78} y={248} width={370} height={95} rx={3} fill="#EEF6FF" stroke={C.accent2} strokeWidth={1.5} strokeDasharray="4,3" />
        <text x={88} y={268} fontFamily={F.code} fontSize={18} fill={C.accent2} fontWeight="bold">## Quick Reference</text>
        <text x={88} y={288} fontFamily={F.code} fontSize={18} fill={C.text}>| 命令失败      | → ERRORS.md   |</text>
        <text x={88} y={306} fontFamily={F.code} fontSize={18} fill={C.text}>| 用户纠正      | → LEARNINGS.md|</text>
        <text x={88} y={324} fontFamily={F.code} fontSize={18} fill={C.text}>| 功能缺失      | → FEATURE_REQ |</text>
        <circle cx={460} cy={292} r={12} fill={C.accent2} opacity={0.2} />
        <text x={460} y={297} textAnchor="middle" fontFamily={F.title} fontSize={16} fill={C.accent2} fontWeight="bold">②</text>

        {/* 3. Logging Format */}
        <rect x={78} y={354} width={370} height={235} rx={3} fill="#EEFBEE" stroke={C.accent3} strokeWidth={1.5} strokeDasharray="4,3" />
        <text x={88} y={376} fontFamily={F.code} fontSize={18} fill={C.accent3} fontWeight="bold">## Logging Format</text>
        <text x={88} y={398} fontFamily={F.code} fontSize={18} fill={C.text}>## [LRN-20250115-001] correction</text>
        <text x={88} y={416} fontFamily={F.code} fontSize={18} fill={C.textLight}>**Logged**: 2025-01-15T10:30:00Z</text>
        <text x={88} y={434} fontFamily={F.code} fontSize={18} fill={C.textLight}>**Priority**: high</text>
        <text x={88} y={452} fontFamily={F.code} fontSize={18} fill={C.textLight}>**Status**: pending</text>
        <text x={88} y={470} fontFamily={F.code} fontSize={18} fill={C.textLight}>**Area**: tests</text>
        <text x={88} y={492} fontFamily={F.code} fontSize={18} fill={C.text}>### Summary</text>
        <text x={88} y={510} fontFamily={F.code} fontSize={18} fill={C.text}>### Details</text>
        <text x={88} y={528} fontFamily={F.code} fontSize={18} fill={C.text}>### Suggested Action</text>
        <text x={88} y={546} fontFamily={F.code} fontSize={18} fill={C.text}>### Metadata</text>
        <text x={88} y={564} fontFamily={F.code} fontSize={18} fill={C.textLight}>  - Source / Tags / See Also</text>
        <text x={88} y={582} fontFamily={F.code} fontSize={18} fill={C.textLight}>  - Pattern-Key / Recurrence</text>
        <circle cx={460} cy={470} r={12} fill={C.accent3} opacity={0.2} />
        <text x={460} y={475} textAnchor="middle" fontFamily={F.title} fontSize={16} fill={C.accent3} fontWeight="bold">③</text>

        {/* 4. Detection Triggers */}
        <rect x={78} y={600} width={370} height={115} rx={3} fill="#FFF0F3" stroke={C.pink} strokeWidth={1.5} strokeDasharray="4,3" />
        <text x={88} y={622} fontFamily={F.code} fontSize={18} fill={C.pink} fontWeight="bold">## Detection Triggers</text>
        <text x={88} y={642} fontFamily={F.code} fontSize={18} fill={C.text}>• "No, that's wrong..."→ correction</text>
        <text x={88} y={660} fontFamily={F.code} fontSize={18} fill={C.text}>• Command exit code≠0 → error</text>
        <text x={88} y={678} fontFamily={F.code} fontSize={18} fill={C.text}>• "Can you also..."  → feat_req</text>
        <text x={88} y={696} fontFamily={F.code} fontSize={18} fill={C.text}>• API differs from docs→ gap</text>
        <circle cx={460} cy={655} r={12} fill={C.pink} opacity={0.2} />
        <text x={460} y={660} textAnchor="middle" fontFamily={F.title} fontSize={16} fill={C.pink} fontWeight="bold">④</text>

        {/* 5. Promotion */}
        <rect x={78} y={728} width={370} height={88} rx={3} fill="#F3EEFF" stroke={C.purple} strokeWidth={1.5} strokeDasharray="4,3" />
        <text x={88} y={750} fontFamily={F.code} fontSize={18} fill={C.purple} fontWeight="bold">## Promoting to Project Memory</text>
        <text x={88} y={770} fontFamily={F.code} fontSize={18} fill={C.text}>跨文件/特性适用 → CLAUDE.md</text>
        <text x={88} y={788} fontFamily={F.code} fontSize={18} fill={C.text}>工作流模式     → AGENTS.md</text>
        <text x={88} y={806} fontFamily={F.code} fontSize={18} fill={C.text}>行为准则       → SOUL.md</text>
        <circle cx={460} cy={770} r={12} fill={C.purple} opacity={0.2} />
        <text x={460} y={775} textAnchor="middle" fontFamily={F.title} fontSize={16} fill={C.purple} fontWeight="bold">⑤</text>

        {/* 6. Hook */}
        <rect x={78} y={828} width={370} height={92} rx={3} fill="#FFF5EE" stroke={C.accent} strokeWidth={1.5} strokeDasharray="4,3" />
        <text x={88} y={850} fontFamily={F.code} fontSize={18} fill={C.accent} fontWeight="bold">## Hook Integration</text>
        <text x={88} y={870} fontFamily={F.code} fontSize={18} fill={C.text}>activator.sh → 每次提交提醒</text>
        <text x={88} y={888} fontFamily={F.code} fontSize={18} fill={C.text}>error-detector.sh → 错误自动检测</text>
        <text x={88} y={906} fontFamily={F.code} fontSize={18} fill={C.text}>extract-skill.sh → 技能提取脚手架</text>
        <circle cx={460} cy={872} r={12} fill={C.accent} opacity={0.2} />
        <text x={460} y={877} textAnchor="middle" fontFamily={F.title} fontSize={16} fill={C.accent} fontWeight="bold">⑥</text>

        {/* 7. Skill Extract */}
        <rect x={78} y={932} width={370} height={70} rx={3} fill="#FFFBEE" stroke={C.accent4} strokeWidth={1.5} strokeDasharray="4,3" />
        <text x={88} y={954} fontFamily={F.code} fontSize={18} fill={C.accent4} fontWeight="bold">## Automatic Skill Extraction</text>
        <text x={88} y={974} fontFamily={F.code} fontSize={18} fill={C.text}>反复出现+已验证 → 提取为独立Skill</text>
        <text x={88} y={992} fontFamily={F.code} fontSize={18} fill={C.text}>Status → promoted_to_skill</text>
        <circle cx={460} cy={965} r={12} fill={C.accent4} opacity={0.2} />
        <text x={460} y={970} textAnchor="middle" fontFamily={F.title} fontSize={16} fill={C.accent4} fontWeight="bold">⑦</text>
      </Card>

      {/* ===== Right Detail Callouts ===== */}

      {/* ① YAML Frontmatter */}
      <Arrow x1={475} y1={200} x2={512} y2={160} color={C.accent4} />
      <Card x={516} y={118} w={560} h={168} fill="#FFFDF2" stroke={C.accent4}>
        <text x={538} y={146} fontFamily={F.title} fontSize={22} fill={C.accent4} fontWeight="bold">① YAML Frontmatter — Skill 元信息</text>
        <line x1={538} y1={154} x2={1055} y2={154} stroke={C.accent4} strokeWidth={1} opacity={0.4} />
        <text x={538} y={178} fontFamily={F.body} fontSize={17} fill={C.text}>每个 Skill 的 "身份证"，决定何时被加载：</text>
        <rect x={538} y={188} width={518} height={78} rx={4} fill={C.codeBg} />
        <Code x={550} y={207} fontSize={17} lineH={19} lines={[
          `name: self-improvement`,
          `description: "Captures learnings, errors,`,
          `  and corrections to enable continuous`,
          `  improvement. Use when: (1) A command fails..."`,
        ]} />
      </Card>

      {/* ② Quick Reference */}
      <Arrow x1={475} y1={292} x2={512} y2={325} color={C.accent2} />
      <Card x={516} y={300} w={560} h={168} fill="#F5FAFF" stroke={C.accent2}>
        <text x={538} y={328} fontFamily={F.title} fontSize={22} fill={C.accent2} fontWeight="bold">② Quick Reference — 速查决策表</text>
        <line x1={538} y1={336} x2={1055} y2={336} stroke={C.accent2} strokeWidth={1} opacity={0.4} />
        <text x={538} y={358} fontFamily={F.body} fontSize={17} fill={C.text}>Agent 遇到情况时的"第一反应"路由表：</text>
        <rect x={538} y={370} width={518} height={80} rx={4} fill={C.codeBg} />
        <Code x={550} y={389} fontSize={16} lineH={19} lines={[
          `命令/操作失败         → .learnings/ERRORS.md`,
          `用户纠正 "不对,应该是" → .learnings/LEARNINGS.md`,
          `用户要求缺失功能      → .learnings/FEATURE_REQUESTS.md`,
          `发现更好的方法        → LEARNINGS.md (best_practice)`,
        ]} />
      </Card>

      {/* ③ Logging Format — this is the big one */}
      <Arrow x1={475} y1={470} x2={512} y2={500} color={C.accent3} />
      <Card x={516} y={480} w={620} h={298} fill="#F2FBF2" stroke={C.accent3}>
        <text x={538} y={508} fontFamily={F.title} fontSize={22} fill={C.accent3} fontWeight="bold">③ Logging Format — 结构化知识条目</text>
        <line x1={538} y1={516} x2={1115} y2={516} stroke={C.accent3} strokeWidth={1} opacity={0.4} />
        <text x={538} y={538} fontFamily={F.body} fontSize={16} fill={C.text}>三种条目类型：LRN（学习）/ ERR（错误）/ FEAT（功能请求）</text>
        <rect x={538} y={550} width={580} height={215} rx={4} fill={C.codeBg} />
        <Code x={550} y={568} fontSize={15.5} lineH={18} lines={[
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
      <Arrow x1={475} y1={655} x2={590} y2={812} color={C.pink} />
      <Card x={594} y={794} w={560} h={168} fill="#FFF5F8" stroke={C.pink}>
        <text x={614} y={822} fontFamily={F.title} fontSize={22} fill={C.pink} fontWeight="bold">④ Detection Triggers — 自动嗅探</text>
        <line x1={614} y1={830} x2={1133} y2={830} stroke={C.pink} strokeWidth={1} opacity={0.4} />
        <text x={614} y={852} fontFamily={F.body} fontSize={16} fill={C.text}>Agent 识别到以下模式时自动触发记录：</text>
        <rect x={614} y={864} width={520} height={82} rx={4} fill={C.codeBg} />
        <Code x={626} y={883} fontSize={16} lineH={19} lines={[
          `"No, that's wrong" / "Actually..."  → correction`,
          `exit code ≠ 0 / Exception / Traceback → error`,
          `"Can you also..." / "I wish..."     → feature_req`,
          `API行为≠文档描述 / 信息已过时        → knowledge_gap`,
        ]} />
      </Card>

      {/* ⑤ Promotion System */}
      <Arrow x1={475} y1={770} x2={1168} y2={160} color={C.purple} />
      <Card x={1172} y={118} w={700} h={210} fill="#F8F3FF" stroke={C.purple}>
        <text x={1194} y={146} fontFamily={F.title} fontSize={22} fill={C.purple} fontWeight="bold">⑤ Promotion — 记忆升级机制</text>
        <line x1={1194} y1={154} x2={1850} y2={154} stroke={C.purple} strokeWidth={1} opacity={0.4} />
        <text x={1194} y={178} fontFamily={F.body} fontSize={16} fill={C.text}>从临时笔记 → 永久项目记忆的晋升条件：</text>
        <rect x={1194} y={190} width={660} height={62} rx={4} fill={C.codeBg} />
        <Code x={1206} y={209} fontSize={16} lineH={19} lines={[
          `Recurrence-Count ≥ 3  （出现≥3次）`,
          `跨 ≥ 2 个不同任务     （非偶发）`,
          `30天窗口内出现         （近期相关）`,
        ]} />
        <text x={1194} y={275} fontFamily={F.body} fontSize={14} fill={C.text}>升级目标：</text>
        <Badge x={1194} y={298} text="CLAUDE.md → 项目事实" color={C.accent} />
        <Badge x={1406} y={298} text="AGENTS.md → 工作流" color={C.accent2} />
        <Badge x={1618} y={298} text="SOUL.md → 行为" color={C.purple} />
      </Card>

      {/* ⑥ Hook Integration */}
      <Arrow x1={475} y1={872} x2={1168} y2={380} color={C.accent} />
      <Card x={1172} y={350} w={700} h={230} fill="#FFF8F2" stroke={C.accent}>
        <text x={1194} y={378} fontFamily={F.title} fontSize={22} fill={C.accent} fontWeight="bold">⑥ Hook — 自动化触发脚本</text>
        <line x1={1194} y1={386} x2={1850} y2={386} stroke={C.accent} strokeWidth={1} opacity={0.4} />
        <text x={1194} y={410} fontFamily={F.body} fontSize={16} fill={C.text}>三个脚本钩子，无需手动记得记录：</text>
        <rect x={1194} y={422} width={660} height={146} rx={4} fill={C.codeBg} />
        <Code x={1206} y={441} fontSize={15.5} lineH={17} lines={[
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
      <Arrow x1={475} y1={965} x2={1168} y2={628} color={C.accent4} />
      <Card x={1172} y={600} w={700} h={192} fill="#FFFDF2" stroke={C.accent4}>
        <text x={1194} y={628} fontFamily={F.title} fontSize={22} fill={C.accent4} fontWeight="bold">⑦ Skill Extraction — 知识结晶</text>
        <line x1={1194} y1={636} x2={1850} y2={636} stroke={C.accent4} strokeWidth={1} opacity={0.4} />
        <text x={1194} y={660} fontFamily={F.body} fontSize={16} fill={C.text}>当 Learning 足够成熟，提取为独立可复用 Skill：</text>
        <rect x={1194} y={672} width={660} height={108} rx={4} fill={C.codeBg} />
        <Code x={1206} y={691} fontSize={16} lineH={18} lines={[
          `提取条件:`,
          `  • See Also ≥ 2 个关联条目 (反复出现)`,
          `  • Status: resolved (已验证)`,
          `  • 非项目特定，跨代码库可用`,
          `结果: skills/<name>/SKILL.md  ← 新的独立Skill`,
          `原条目: Status → promoted_to_skill`,
        ]} />
      </Card>

      {/* Bottom: lifecycle flow */}
      <Card x={1172} y={812} w={700} h={115} fill={C.highlight} stroke={C.accent4} sw={2}>
        <text x={1194} y={838} fontFamily={F.title} fontSize={20} fill={C.accent4} fontWeight="bold">Skill 生命周期总览</text>
        <text x={1194} y={864} fontFamily={F.body} fontSize={17} fill={C.text}>
          触发检测 → 结构化记录 → 关联去重 → 满足条件升级 → 提取为新 Skill
        </text>
        <text x={1194} y={888} fontFamily={F.body} fontSize={16} fill={C.textLight}>
          每个 SKILL.md 就是上述7大区块的组合，定义了"什么时候做什么、怎么记、怎么升级"
        </text>
        <text x={1194} y={912} fontFamily={F.body} fontSize={16} fill={C.textLight}>
          Agent 加载 Skill 后，相当于获得了一套"自我进化"的行为指令集
        </text>
      </Card>

      {/* Page indicator */}
      <text x={960} y={1065} textAnchor="middle" fontFamily={F.body} fontSize={16} fill={C.textLight}>1 / 2</text>
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
      <text x={58} y={132} fontFamily={F.title} fontSize={24} fill={C.pink} fontWeight="bold">Level 1 · 触发场景</text>
      <text x={58} y={156} fontFamily={F.body} fontSize={16} fill={C.textLight}>Agent 在对话中自动嗅探到以下信号</text>

      {/* Trigger cards */}
      <Card x={58} y={168} w={330} h={138} fill="#FFF5F8" stroke={C.pink}>
        <Badge x={74} y={192} text="correction" color={C.pink} />
        <text x={74} y={216} fontFamily={F.body} fontSize={17} fill={C.text} fontWeight="bold">用户纠正错误</text>
        <rect x={74} y={226} width={300} height={66} rx={3} fill={C.codeBg} />
        <text x={86} y={246} fontFamily={F.code} fontSize={15} fill={C.text}>"不对，这个项目用 pnpm 不是 npm"</text>
        <text x={86} y={265} fontFamily={F.code} fontSize={15} fill={C.text}>"Actually, fixtures 是 module-scoped"</text>
        <text x={86} y={284} fontFamily={F.code} fontSize={15} fill={C.text}>"你说的已经过时了..."</text>
      </Card>

      <Card x={58} y={318} w={330} h={138} fill="#FFF5F8" stroke={C.pink}>
        <Badge x={74} y={342} text="error" color={C.accent} />
        <text x={74} y={366} fontFamily={F.body} fontSize={17} fill={C.text} fontWeight="bold">命令/操作失败</text>
        <rect x={74} y={376} width={300} height={66} rx={3} fill={C.codeBg} />
        <text x={86} y={396} fontFamily={F.code} fontSize={15} fill={C.text}>$ docker build → platform mismatch</text>
        <text x={86} y={415} fontFamily={F.code} fontSize={15} fill={C.text}>$ npm install → ERR! pnpm-lock.yaml</text>
        <text x={86} y={434} fontFamily={F.code} fontSize={15} fill={C.text}>TimeoutError: payments API 30000ms</text>
      </Card>

      <Card x={58} y={468} w={330} h={128} fill="#FFF5F8" stroke={C.pink}>
        <Badge x={74} y={492} text="feature_request" color={C.accent2} />
        <text x={74} y={516} fontFamily={F.body} fontSize={17} fill={C.text} fontWeight="bold">用户请求缺失功能</text>
        <rect x={74} y={526} width={300} height={54} rx={3} fill={C.codeBg} />
        <text x={86} y={546} fontFamily={F.code} fontSize={15} fill={C.text}>"能不能导出成 CSV？"</text>
        <text x={86} y={565} fontFamily={F.code} fontSize={15} fill={C.text}>"要是有暗黑模式就好了"</text>
      </Card>

      <Card x={58} y={608} w={330} h={128} fill="#FFF5F8" stroke={C.pink}>
        <Badge x={74} y={632} text="knowledge_gap" color={C.purple} />
        <text x={74} y={656} fontFamily={F.body} fontSize={17} fill={C.text} fontWeight="bold">知识过时/错误</text>
        <rect x={74} y={666} width={300} height={54} rx={3} fill={C.codeBg} />
        <text x={86} y={686} fontFamily={F.code} fontSize={15} fill={C.text}>API 实际行为 ≠ 我的理解</text>
        <text x={86} y={705} fontFamily={F.code} fontSize={15} fill={C.text}>文档已更新但我引用了旧版</text>
      </Card>

      <Card x={58} y={748} w={330} h={118} fill="#FFF5F8" stroke={C.pink}>
        <Badge x={74} y={772} text="best_practice" color={C.accent3} />
        <text x={74} y={796} fontFamily={F.body} fontSize={17} fill={C.text} fontWeight="bold">发现更优方案</text>
        <rect x={74} y={806} width={300} height={44} rx={3} fill={C.codeBg} />
        <text x={86} y={826} fontFamily={F.code} fontSize={15} fill={C.text}>原用 setTimeout, 改用 retry+backoff</text>
        <text x={86} y={843} fontFamily={F.code} fontSize={15} fill={C.text}>发现 API 变更后需重新生成 TS 客户端</text>
      </Card>

      {/* ===== Arrows L1→L2 ===== */}
      <Arrow x1={395} y1={238} x2={448} y2={238} color={C.pink} sw={2} />
      <Arrow x1={395} y1={388} x2={448} y2={388} color={C.pink} sw={2} />
      <Arrow x1={395} y1={535} x2={448} y2={535} color={C.pink} sw={2} />
      <Arrow x1={395} y1={675} x2={448} y2={590} color={C.pink} sw={2} />
      <Arrow x1={395} y1={810} x2={448} y2={680} color={C.pink} sw={2} />

      {/* ===== LEVEL 2: .learnings/ ===== */}
      <rect x={450} y={108} width={4} height={940} rx={2} fill={C.accent3} opacity={0.6} />
      <text x={466} y={132} fontFamily={F.title} fontSize={24} fill={C.accent3} fontWeight="bold">Level 2 · 写入 .learnings/</text>
      <text x={466} y={156} fontFamily={F.body} fontSize={16} fill={C.textLight}>结构化记录，带完整上下文和元数据</text>

      {/* L2 Card: LEARNINGS.md */}
      <Card x={466} y={168} w={440} h={318} fill="#F2FBF2" stroke={C.accent3}>
        <text x={488} y={196} fontFamily={F.title} fontSize={20} fill={C.accent3} fontWeight="bold">📝 LEARNINGS.md 写入示例</text>
        <rect x={488} y={208} width={400} height={262} rx={4} fill={C.codeBg} />
        <Code x={500} y={227} fontSize={17} lineH={16} lines={[
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
      <Card x={466} y={500} w={440} h={240} fill="#F2FBF2" stroke={C.accent3}>
        <text x={488} y={528} fontFamily={F.title} fontSize={20} fill={C.accent3} fontWeight="bold">🔴 ERRORS.md 写入示例</text>
        <rect x={488} y={540} width={400} height={186} rx={4} fill={C.codeBg} />
        <Code x={500} y={558} fontSize={17} lineH={16} lines={[
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
      <Card x={466} y={754} w={440} h={160} fill="#F2FBF2" stroke={C.accent3}>
        <text x={488} y={782} fontFamily={F.title} fontSize={20} fill={C.accent3} fontWeight="bold">💡 FEATURE_REQUESTS.md 写入示例</text>
        <rect x={488} y={794} width={400} height={106} rx={4} fill={C.codeBg} />
        <Code x={500} y={813} fontSize={17} lineH={16} lines={[
          `## [FEAT-20250115-001] export_to_csv`,
          `**Priority**: medium`,
          `### Requested Capability`,
          `导出分析结果为 CSV 格式`,
          `### Complexity Estimate`,
          `simple — 扩展已有 --output json 模式`,
        ]} />
      </Card>

      {/* ===== Arrows L2→L3 ===== */}
      <Arrow x1={915} y1={330} x2={972} y2={330} color={C.accent3} sw={2.5} />
      <Arrow x1={915} y1={610} x2={972} y2={500} color={C.accent3} sw={2.5} />
      <Arrow x1={915} y1={830} x2={972} y2={660} color={C.accent3} sw={2.5} />

      {/* Promotion condition badge */}
      <g transform="translate(922, 400)">
        <rect x={0} y={0} width={50} height={64} rx={8} fill={C.accent4} opacity={0.15} />
        <text x={25} y={24} textAnchor="middle" fontFamily={F.body} fontSize={15} fill={C.accent4} fontWeight="bold">满足</text>
        <text x={25} y={40} textAnchor="middle" fontFamily={F.body} fontSize={15} fill={C.accent4} fontWeight="bold">升级</text>
        <text x={25} y={56} textAnchor="middle" fontFamily={F.body} fontSize={15} fill={C.accent4} fontWeight="bold">条件</text>
      </g>

      {/* ===== LEVEL 3: Project Memory ===== */}
      <rect x={974} y={108} width={4} height={940} rx={2} fill={C.purple} opacity={0.6} />
      <text x={990} y={132} fontFamily={F.title} fontSize={24} fill={C.purple} fontWeight="bold">Level 3 · 升级为项目记忆</text>
      <text x={990} y={156} fontFamily={F.body} fontSize={16} fill={C.textLight}>反复出现的学习被提炼为永久规则，写入项目级配置</text>

      {/* Promotion conditions */}
      <Card x={990} y={168} w={360} h={115} fill="#FFF8EE" stroke={C.accent4}>
        <text x={1012} y={195} fontFamily={F.title} fontSize={19} fill={C.accent4} fontWeight="bold">🔑 升级触发条件</text>
        <rect x={1012} y={207} width={318} height={58} rx={3} fill={C.codeBg} />
        <Code x={1024} y={224} fontSize={15.5} lineH={18} lines={[
          `✓ Recurrence-Count ≥ 3`,
          `✓ 跨 ≥ 2 个不同任务出现`,
          `✓ 30 天窗口内发生`,
        ]} />
      </Card>

      {/* CLAUDE.md */}
      <Card x={990} y={298} w={360} h={200} fill="#FFF0EE" stroke={C.accent}>
        <text x={1012} y={325} fontFamily={F.title} fontSize={20} fill={C.accent} fontWeight="bold">📘 → CLAUDE.md</text>
        <text x={1012} y={345} fontFamily={F.body} fontSize={15} fill={C.textLight}>项目事实、约定、陷阱（所有 Agent 通用）</text>
        <rect x={1012} y={357} width={318} height={50} rx={3} fill={C.codeBg} />
        <text x={1024} y={374} fontFamily={F.body} fontSize={15} fill={C.text} fontStyle="italic">原始学习（冗长）：</text>
        <text x={1024} y={393} fontFamily={F.code} fontSize={14} fill={C.textLight}>项目使用pnpm workspace, npm install失败...</text>
        <text x={1012} y={425} fontFamily={F.body} fontSize={15} fill={C.accent} fontWeight="bold">提炼后写入 CLAUDE.md：</text>
        <rect x={1012} y={435} width={318} height={50} rx={3} fill="#FFE8E2" />
        <Code x={1024} y={452} fontSize={15.5} lineH={16} lines={[
          `## Build & Dependencies`,
          `- 包管理器: pnpm (非npm) - 用 pnpm install`,
        ]} />
      </Card>

      {/* AGENTS.md */}
      <Card x={990} y={512} w={360} h={200} fill="#EEF6FF" stroke={C.accent2}>
        <text x={1012} y={539} fontFamily={F.title} fontSize={20} fill={C.accent2} fontWeight="bold">📗 → AGENTS.md</text>
        <text x={1012} y={559} fontFamily={F.body} fontSize={15} fill={C.textLight}>Agent 工作流、自动化规则</text>
        <rect x={1012} y={571} width={318} height={46} rx={3} fill={C.codeBg} />
        <text x={1024} y={588} fontFamily={F.body} fontSize={15} fill={C.text} fontStyle="italic">原始学习：</text>
        <text x={1024} y={606} fontFamily={F.code} fontSize={14} fill={C.textLight}>修改API后忘记重新生成TS客户端导致运行时错误</text>
        <text x={1012} y={633} fontFamily={F.body} fontSize={15} fill={C.accent2} fontWeight="bold">提炼后写入 AGENTS.md：</text>
        <rect x={1012} y={643} width={318} height={56} rx={3} fill="#E2EEFF" />
        <Code x={1024} y={660} fontSize={15.5} lineH={16} lines={[
          `## After API Changes`,
          `1. pnpm run generate:api`,
          `2. pnpm tsc --noEmit`,
        ]} />
      </Card>

      {/* SOUL.md / TOOLS.md */}
      <Card x={990} y={726} w={360} h={148} fill="#F3EEFF" stroke={C.purple}>
        <text x={1012} y={752} fontFamily={F.title} fontSize={20} fill={C.purple} fontWeight="bold">📙 → SOUL.md / TOOLS.md</text>
        <text x={1012} y={772} fontFamily={F.body} fontSize={15} fill={C.textLight}>行为准则 / 工具陷阱（OpenClaw 专用）</text>
        <rect x={1012} y={784} width={318} height={74} rx={3} fill={C.codeBg} />
        <Code x={1024} y={803} fontSize={15.5} lineH={17} lines={[
          `SOUL: "简洁回答，避免无谓免责声明"`,
          `TOOLS: "Git push 前先确认 auth"`,
          `TOOLS: "用 gh auth status 检查认证"`,
          `SOUL: "错误时立即承认并修正"`,
        ]} />
      </Card>

      {/* ===== LEVEL 4: Skill Extraction ===== */}
      <Arrow x1={1356} y1={400} x2={1402} y2={400} color={C.accent4} sw={3} />
      <rect x={1404} y={108} width={4} height={940} rx={2} fill={C.accent4} opacity={0.6} />
      <text x={1420} y={132} fontFamily={F.title} fontSize={24} fill={C.accent4} fontWeight="bold">Level 4 · 提取为独立 Skill</text>
      <text x={1420} y={156} fontFamily={F.body} fontSize={16} fill={C.textLight}>高价值学习结晶为可复用的新 Skill，供其他项目/Agent 加载</text>

      <Card x={1420} y={168} w={400} h={120} fill="#FFFDF2" stroke={C.accent4}>
        <text x={1442} y={196} fontFamily={F.title} fontSize={19} fill={C.accent4} fontWeight="bold">🎯 提取条件</text>
        <rect x={1442} y={208} width={358} height={62} rx={3} fill={C.codeBg} />
        <Code x={1454} y={226} fontSize={15.5} lineH={18} lines={[
          `✓ See Also ≥ 2 (反复出现)`,
          `✓ Status: resolved (已验证可行)`,
          `✓ 跨代码库通用 (非项目特定)`,
        ]} />
      </Card>

      <Card x={1420} y={302} w={400} h={295} fill="#FFFDF2" stroke={C.accent4}>
        <text x={1442} y={330} fontFamily={F.title} fontSize={19} fill={C.accent4} fontWeight="bold">📦 提取结果示例</text>
        <text x={1442} y={352} fontFamily={F.body} fontSize={15} fill={C.textLight}>skills/docker-m1-fixes/SKILL.md</text>
        <rect x={1442} y={364} width={358} height={218} rx={4} fill={C.codeBg} />
        <Code x={1454} y={382} fontSize={17} lineH={16} lines={[
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

      <Card x={1420} y={612} w={400} h={98} fill="#FFFDF2" stroke={C.accent4}>
        <text x={1442} y={640} fontFamily={F.title} fontSize={19} fill={C.accent4} fontWeight="bold">🔄 原条目状态更新</text>
        <rect x={1442} y={652} width={358} height={44} rx={3} fill={C.codeBg} />
        <Code x={1454} y={669} fontSize={15.5} lineH={17} lines={[
          `**Status**: promoted_to_skill`,
          `**Skill-Path**: skills/docker-m1-fixes`,
        ]} />
      </Card>

      {/* ===== Bottom: Progressive Summary ===== */}
      <Card x={1420} y={730} w={460} h={180} fill={C.highlight} stroke={C.accent4} sw={2.5}>
        <text x={1442} y={760} fontFamily={F.title} fontSize={22} fill={C.accent4} fontWeight="bold">🧠 递进关系总结</text>
        <line x1={1442} y1={770} x2={1860} y2={770} stroke={C.accent4} strokeWidth={1} opacity={0.4} />

        {/* Flow boxes — adjusted to stay within 1920px */}
        <rect x={1454} y={784} width={100} height={44} rx={6} fill={C.pink} opacity={0.2} />
        <text x={1504} y={811} textAnchor="middle" fontFamily={F.body} fontSize={15} fill={C.pink} fontWeight="bold">触发感知</text>
        <Arrow x1={1557} y1={806} x2={1588} y2={806} color={C.border} sw={2} />

        <rect x={1592} y={784} width={108} height={44} rx={6} fill={C.accent3} opacity={0.2} />
        <text x={1646} y={811} textAnchor="middle" fontFamily={F.body} fontSize={15} fill={C.accent3} fontWeight="bold">结构化记录</text>
        <Arrow x1={1703} y1={806} x2={1734} y2={806} color={C.border} sw={2} />

        <rect x={1738} y={784} width={100} height={44} rx={6} fill={C.purple} opacity={0.2} />
        <text x={1788} y={811} textAnchor="middle" fontFamily={F.body} fontSize={15} fill={C.purple} fontWeight="bold">升级记忆</text>

        <text x={1454} y={856} fontFamily={F.body} fontSize={16} fill={C.text}>
          临时笔记 → 项目记忆 → 可复用技能
        </text>
        <text x={1454} y={878} fontFamily={F.body} fontSize={14} fill={C.textLight}>
          (.learnings/) → (CLAUDE/AGENTS.md) → (新 SKILL.md)
        </text>
        <text x={1454} y={900} fontFamily={F.body} fontSize={15} fill={C.accent} fontWeight="bold">
          越用越聪明：触发→记录→升级→提取
        </text>
      </Card>

      {/* Cross-session note — moved to bottom, spanning most of width */}
      <Card x={50} y={922} w={1830} h={100} fill="#F8F9FA" stroke={C.border}>
        <text x={74} y={948} fontFamily={F.title} fontSize={18} fill={C.text} fontWeight="bold">🔗 跨会话传播</text>
        <text x={220} y={948} fontFamily={F.body} fontSize={15} fill={C.textLight}>OpenClaw 特有：知识跨 Agent 共享</text>
        <rect x={74} y={958} width={1786} height={52} rx={3} fill={C.codeBg} />
        <Code x={88} y={974} fontSize={16} lineH={17} lines={[
          `sessions_list()  → 查看活跃会话`,
          `sessions_send(sessionKey="other-session", message="Learning...")  → 向其他 Agent 发送学习`,
          `sessions_spawn(task="研究 X 并反馈", label="research")  → 派生子 Agent 做后台研究`,
        ]} />
      </Card>

      {/* Page indicator */}
      <text x={960} y={1065} textAnchor="middle" fontFamily={F.body} fontSize={16} fill={C.textLight}>2 / 2</text>
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
        <span style={{ fontSize: 16, color: C.textLight }}>{slide + 1} / 2</span>
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
