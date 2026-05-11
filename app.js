const slides = [
  {
    section: "开场",
    kicker: "01 / 标题页",
    title: "IPNet: 面向时序链接预测的交互模式感知神经网络",
    subtitle: "论文汇报 / CIKM 2025",
    bullets: [
      "Paper: IPNet: An Interaction Pattern-aware Neural Network for Temporal Link Prediction",
      "Authors: Qingyang Zhang, Yitong Wang, Xinjie Lin, Fudan University",
      "Presenter: [苏宁]"
    ],
    visual: "cover"
  },
  {
    section: "问题背景",
    kicker: "02 / 研究背景",
    title: "真实在线关系不是静态边，而是持续演化的事件流",
    subtitle: "传统链接预测问“有没有边”，时序链接预测还要问“边什么时候发生”。",
    bullets: [
      "静态图：把所有关系压成一张拓扑图，时间顺序被抹平。",
      "动态图：边带有时间戳，关系强度、兴趣与角色会随时间改变。",
      "典型场景包括社交网络、邮件网络、用户互动网络和推荐系统。",
      "核心挑战是从历史交互中捕获未来关系的动态规律。"
    ],
    visual: "compare"
  },
  {
    section: "任务定义",
    kicker: "03 / Temporal Link Prediction",
    title: "任务目标：用过去的带时间戳交互预测未来连边",
    subtitle: "输入是连续事件流 (u, v, t)，输出是未来节点对产生交互的概率。",
    bullets: [
      "事件流：每条记录表示节点 u 与 v 在时间 t 发生一次交互。",
      "Transductive：训练和测试节点已知，预测它们未来是否连边。",
      "Inductive：测试包含未见新节点，更考验泛化能力。",
      "关键不只是建模拓扑，还要保留交互先后顺序。"
    ],
    visual: "timeline"
  },
  {
    section: "相关工作",
    kicker: "04 / 方法不足",
    title: "已有方法常能建模结构或时间，却弱化了节点自身行为角色",
    subtitle: "IPNet 的切入点是：节点如何行动，本身就是可预测信号。",
    bullets: [
      "Static graph methods：GCN、GAT 等忽略时间，只学习静态拓扑。",
      "Snapshot-based methods：DySAT、EvolveGCN 将动态图离散成快照，损失细粒度时间。",
      "Event-based methods：TGAT、CAW-N、DyGFormer、FreeDyG 处理事件流，但仍偏重事件共现。",
      "共同短板：节点级行为模式与上下文结构演化建模不足。"
    ],
    visual: "methods"
  },
  {
    section: "核心动机",
    kicker: "05 / 节点行为模式",
    title: "公司邮件网络中，角色差异会体现在交互序列里",
    subtitle: "未来连边不仅取决于“和谁相连”，还取决于“过去如何行动”。",
    bullets: [
      "高层节点可能跨部门、低频但影响范围广。",
      "中层节点常连接上下游，承担信息中转角色。",
      "基层节点交互更局部、更高频、更受任务驱动。",
      "行为相似的节点更可能在未来产生相关互动。"
    ],
    visual: "roles"
  },
  {
    section: "模型框架",
    kicker: "06 / IPNet 总体框架",
    title: "IPNet 用双分支同时学习个体行为与邻域环境",
    subtitle: "Interaction Patterns Learning 关注节点自身，Temporal Context Modeling 关注节点周围。",
    bullets: [
      "输入：动态交互事件流，保留连续时间和交互顺序。",
      "分支 A：学习节点历史 interaction sequence 中的行为模式。",
      "分支 B：通过 contextual window 学习高阶邻域演化。",
      "拼接最终节点表示后，用于 temporal link prediction。"
    ],
    visual: "framework"
  },
  {
    section: "方法细节",
    kicker: "07 / 3.1 符号定义",
    title: "IPNet 直接处理连续时间事件流，而不是离散快照",
    subtitle: "动态图被表示为时间区间内节点与带时间戳交互事件的集合。",
    bullets: [
      "G={V(T),E(T)}，T=[t0,tn] 表示观察时间范围。",
      "V(T)：在时间区间 T 内出现过的所有节点。",
      "E(T)：带时间戳的边，也就是连续交互事件流。",
      "e_ij(t)：节点 i 与 j 在时间 t 的一次交互。"
    ],
    visual: "symbols"
  },
  {
    section: "方法细节",
    kicker: "08 / 3.2 Interaction Patterns Learning",
    title: "交互模式学习：把节点历史行为转成可泛化的序列表示",
    subtitle: "该模块回答“节点自己过去怎么互动”。",
    bullets: [
      "Interaction sequence extraction：为节点 u 抽取历史交互序列 IS_u。",
      "Sequence-based anonymization：用相对位置和出现频率刻画角色，而不是死记节点 ID。",
      "Neural encoding：匿名表示经 MLP，时间间隔经 Time2Vec，再送入序列编码器。",
      "可选编码器包括 RNN、GRU、LSTM 或 attention encoder。"
    ],
    visual: "interaction"
  },
  {
    section: "方法细节",
    kicker: "09 / 3.3 Temporal Context Modeling",
    title: "上下文建模：节点未来行为还受邻域环境影响",
    subtitle: "该模块回答“节点周围环境怎么变化”。",
    bullets: [
      "围绕目标节点进行 node-centric biased random walk。",
      "抽取 contextual window，形成目标节点的上下文路径集合。",
      "Structural Connection Intensity：结合互动频率与共同邻居。",
      "Influence Factor：结合节点度数与邻居平均度数。"
    ],
    visual: "context"
  },
  {
    section: "训练目标",
    kicker: "10 / 表示与 Loss",
    title: "最终表示由行为模式与上下文窗口拼接得到",
    subtitle: "训练目标是拉近上下文相关节点，推远负采样节点。",
    bullets: [
      "节点表示：y_u = Concat(enc(AIS_u), agg(ACWs_u))。",
      "链接概率：p_uv = sigmoid(MLP([y_u,y_v]))。",
      "正样本来自 random walk 中共现节点，负样本来自负采样。",
      "整体是无监督/自监督式动态图表示学习。"
    ],
    visual: "loss"
  },
  {
    section: "实验",
    kicker: "11 / 实验设置",
    title: "实验覆盖短期通信、社交互动和推荐场景",
    subtitle: "用 AUC 衡量 transductive 与 inductive 两类任务。",
    bullets: [
      "数据集：IA、IA09、Enron、UCI、FB、ML-10M、ZhiHu。",
      "Transductive：已知节点预测未来边。",
      "Inductive：mask 10% 节点，测试新节点泛化。",
      "模型变体：IPNet-mean、IPNet-att、IPNet-w2v。"
    ],
    visual: "datasets"
  },
  {
    section: "实验",
    kicker: "12 / 结果对比",
    title: "IPNet 在两类任务上整体优于基线，尤其强化了泛化能力",
    subtitle: "不展示满表，只保留最能说明问题的结论和代表性 AUC。",
    bullets: [
      "Transductive 中 IPNet-w2v 表现突出，说明结构共现和上下文路径有效。",
      "Inductive 中 IPNet-mean / IPNet-att 更稳，匿名化有助于新节点泛化。",
      "相比只看结构或事件共现的方法，IPNet 能利用节点行为角色。",
      "结论：行为模式 + 上下文演化比单一信号更可靠。"
    ],
    visual: "results"
  },
  {
    section: "分析",
    kicker: "13 / 效率与消融",
    title: "效率与消融：模块互补，缺一都会变弱",
    subtitle: "短序列、短窗口和有偏采样提高路径质量；IP、CC、Anoy 分别贡献不同信号。",
    bullets: [
      "小数据集上 random walk 会带来额外采样开销。",
      "大数据集上 IPNet 收敛较快，通常较早达到较优性能。",
      "w/o IP：丢掉节点自身行为模式，预测信号变弱。",
      "w/o CC / Anoy：分别削弱结构演化建模和 inductive 泛化。"
    ],
    visual: "ablation"
  },
  {
    section: "总结",
    kicker: "14 / 总结与展望",
    title: "从结构预测走向动态节点行为画像",
    subtitle: "IPNet 的启发不止在当前任务，也指向更可解释、更实时、更可扩展的动态图学习。",
    bullets: [
      "Interaction sequence 捕捉节点自身动态行为。",
      "Contextual window 捕捉高阶邻域结构演化。",
      "匿名化表示增强 inductive 泛化能力，不再死记节点 ID。",
      "未来可继续加强实时更新、可解释性和大规模动态图部署。"
    ],
    visual: "summary"
  },
  {
    section: "致谢",
    kicker: "15 / Thanks",
    title: "感谢聆听",
    subtitle: "欢迎老师和同学批评指正",
    bullets: [
      "Q&A",
      "Temporal Link Prediction",
      "Interaction Pattern-aware Neural Network"
    ],
    visual: "thanks"
  }
];

const slideRoot = document.querySelector("#slides");
const thumbRoot = document.querySelector("#thumbs");
const progress = document.querySelector("#progress");
const counter = document.querySelector("#counter");
const sectionLabel = document.querySelector("#sectionLabel");
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");

let active = 0;

function escapeText(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function shortTitle(value) {
  const text = String(value);
  return text.length > 26 ? `${text.slice(0, 26)}...` : text;
}

function networkVisual() {
  return `<div class="panel network" aria-label="动态图节点连边背景">
    <span class="edge e1"></span><span class="edge e2"></span><span class="edge e3"></span><span class="edge e4"></span>
    <span class="node n1">u</span><span class="node n2">v</span><span class="node n3">t</span>
    <span class="node small n4">ctx</span><span class="node small n5">IP</span>
  </div>`;
}

function compareVisual() {
  return `<div class="panel split-compare">
    <div class="compare-side">
      <h3>静态链接预测</h3>
      <div class="static-pair">
        <span class="dot a"></span><span class="dot b"></span><span class="link"></span>
      </div>
      <p class="caption">只回答节点对之间是否存在边，时间顺序被压缩。</p>
    </div>
    <div class="compare-side">
      <h3>时序链接预测</h3>
      <div class="dynamic-pair">
        <span class="dot a"></span><span class="dot b"></span><span class="dot c"></span>
        <span class="link pulse-link"></span>
      </div>
      <p class="caption">边是随时间出现的事件，需要建模发生时刻和演化趋势。</p>
    </div>
  </div>`;
}

function timelineVisual() {
  const events = [
    ["12%", "(u1,v1,t1)"],
    ["32%", "(u2,v2,t2)"],
    ["53%", "(u3,v1,t3)"],
    ["75%", "预测 p(u,v,t*)"]
  ];
  return `<div class="panel timeline">
    <div class="timeline-track">
      ${events.map(([left, label], index) => `<span class="event ${index === 3 ? "future" : ""}" style="left:${left}"><span>${label}</span></span>`).join("")}
    </div>
    <p class="caption">模型在历史窗口中观察事件流，并在未来时刻判断目标节点对是否产生边。</p>
  </div>`;
}

function methodsVisual() {
  const rows = [
    {
      cls: "static",
      name: "Static Graph",
      model: "GCN / GAT",
      signal: "结构",
      loss: "时间被压平",
      note: "把所有历史交互合成一张图，只知道有没有边。"
    },
    {
      cls: "snapshot",
      name: "Snapshot",
      model: "DySAT / EvolveGCN",
      signal: "快照",
      loss: "细粒度事件顺序丢失",
      note: "按时间片切分，片内先后关系被弱化。"
    },
    {
      cls: "eventstream",
      name: "Event Stream",
      model: "TGAT / CAW-N / DyGFormer",
      signal: "事件",
      loss: "节点行为角色仍不显式",
      note: "能看见事件流，但不一定回答节点过去如何行动。"
    }
  ];

  return `<div class="method-visual panel">
    <div class="method-scan" aria-hidden="true"></div>
    ${rows.map((row, index) => `<section class="method-lane ${row.cls}" style="--lane:${index}">
      <div class="method-meta">
        <strong>${row.name}</strong>
        <span>${row.model}</span>
      </div>
      <div class="method-demo">
        <div class="method-graph">
          <span class="m-node n-a"></span><span class="m-node n-b"></span><span class="m-node n-c"></span><span class="m-node n-d"></span>
          <span class="m-edge e-a"></span><span class="m-edge e-b"></span><span class="m-edge e-c"></span>
          <span class="m-event ev-1"></span><span class="m-event ev-2"></span><span class="m-event ev-3"></span>
        </div>
        <div class="method-time">
          <i></i><i></i><i></i><i></i><i></i>
        </div>
      </div>
      <div class="method-gap">
        <b>${row.signal}</b>
        <span>${row.loss}</span>
      </div>
      <p>${row.note}</p>
    </section>`).join("")}
    <div class="ipnet-gap">
      <b>IPNet 的补位</b>
      <span>节点行为模式 + 上下文演化</span>
    </div>
  </div>`;
}

function rolesVisual() {
  return `<div class="panel role-flow">
    <div class="role-layer exec">
      <div class="role-label"><strong>高层节点</strong><span>跨部门 / 低频 / 影响广</span></div>
      <div class="person executive">CEO</div>
    </div>

    <div class="role-layer manager">
      <div class="role-label"><strong>中层节点</strong><span>承上启下 / 信息中转</span></div>
      <div class="person lead l1">M1</div>
      <div class="person lead l2">M2</div>
    </div>

    <div class="role-layer staff">
      <div class="role-label"><strong>基层节点</strong><span>局部高频 / 任务驱动</span></div>
      <div class="person worker w1">S1</div>
      <div class="person worker w2">S2</div>
      <div class="person worker w3">S3</div>
      <div class="person worker w4">S4</div>
    </div>

    <svg class="mail-lines" viewBox="0 0 640 420" aria-hidden="true">
      <defs>
        <marker id="mailArrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
          <path d="M0,0 L9,4.5 L0,9 Z" fill="#1c5d99"/>
        </marker>
        <marker id="downArrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
          <path d="M0,0 L9,4.5 L0,9 Z" fill="#d95d5d"/>
        </marker>
      </defs>
      <path class="mail-up up1" d="M235 322 L258 236" marker-end="url(#mailArrow)"/>
      <path class="mail-up up2" d="M315 322 L304 236" marker-end="url(#mailArrow)"/>
      <path class="mail-up up3" d="M410 322 L356 236" marker-end="url(#mailArrow)"/>
      <path class="mail-up up4" d="M505 322 L408 236" marker-end="url(#mailArrow)"/>
      <path class="mail-up up5" d="M286 178 L306 96" marker-end="url(#mailArrow)"/>
      <path class="mail-up up6" d="M354 178 L334 96" marker-end="url(#mailArrow)"/>

      <path class="mail-down down1" d="M292 104 C250 132, 230 156, 220 192" marker-end="url(#downArrow)"/>
      <path class="mail-down down2" d="M348 104 C404 132, 430 156, 450 192" marker-end="url(#downArrow)"/>
      <path class="mail-down down3" d="M234 238 C230 270, 224 294, 218 324" marker-end="url(#downArrow)"/>
      <path class="mail-down down4" d="M422 238 C468 268, 500 294, 532 324" marker-end="url(#downArrow)"/>
    </svg>

    <div class="flow-legend">
      <span><i class="up"></i> 汇报/协作信息向上汇聚</span>
      <span><i class="down"></i> 决策/任务信息向下扩散</span>
    </div>
  </div>`;
}

function frameworkVisual() {
  const seq = (x, y) => Array.from({ length: 4 }, (_, row) => {
    const cy = y + row * 24;
    const nodes = Array.from({ length: 6 }, (_, col) => {
      const cx = x + col * 34;
      const colors = ["#ffd21f", "#7cc36a", "#ef2d1a", "#7cc36a"];
      return `<circle cx="${cx}" cy="${cy}" r="7" fill="${colors[(row + col) % colors.length]}" stroke="#315b36" stroke-width="1.5"/>`;
    }).join("");
    const links = Array.from({ length: 5 }, (_, col) => `<line x1="${x + col * 34 + 8}" y1="${cy}" x2="${x + (col + 1) * 34 - 8}" y2="${cy}" stroke="#1f2937" stroke-width="2"/>`).join("");
    return `${links}${nodes}<text x="${x + 205}" y="${cy + 5}" font-size="14" fill="#66758c">...</text>`;
  }).join("");

  const bars = (x, y) => Array.from({ length: 10 }, (_, i) => {
    const colors = ["#f21818", "#ffd84a", "#d9dfc8", "#71bd59", "#ef8b35"];
    return `<rect x="${x + i * 14}" y="${y}" width="14" height="22" fill="${colors[i % colors.length]}" stroke="#111827" stroke-width=".5"/>`;
  }).join("");

  return `<div class="framework-clean panel">
    <svg class="framework-svg" viewBox="0 20 1160 520" role="img" aria-label="IPNet 简化总体框架图">
      <defs>
        <marker id="arrowHead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#1f2937"/>
        </marker>
      </defs>

      <rect x="18" y="198" width="118" height="156" rx="18" fill="#edf2f7"/>
      <text x="77" y="384" text-anchor="middle" font-size="24" font-weight="800" fill="#111827">G</text>
      <line x1="48" y1="273" x2="106" y2="229" stroke="#111827" stroke-width="3"/>
      <line x1="48" y1="273" x2="78" y2="326" stroke="#111827" stroke-width="3"/>
      <line x1="78" y1="326" x2="112" y2="312" stroke="#111827" stroke-width="3"/>
      <circle cx="48" cy="273" r="8" fill="#ffd21f" stroke="#b98500" stroke-width="2"/>
      <circle cx="106" cy="229" r="8" fill="#7cc36a" stroke="#4b9b41" stroke-width="2"/>
      <circle cx="78" cy="326" r="8" fill="#7cc36a" stroke="#4b9b41" stroke-width="2"/>
      <circle cx="112" cy="312" r="8" fill="#ef2d1a" stroke="#b62115" stroke-width="2"/>

      <path d="M140 256 C165 205, 175 170, 206 150" fill="none" stroke="#1f2937" stroke-width="3" marker-end="url(#arrowHead)"/>
      <path d="M140 296 C165 350, 175 390, 206 414" fill="none" stroke="#1f2937" stroke-width="3" marker-end="url(#arrowHead)"/>

      <rect x="210" y="36" width="690" height="220" rx="38" fill="#eaf4fc" stroke="#d0dfef"/>
      <text x="245" y="76" font-size="26" font-weight="900" fill="#111827">A. Interaction Patterns Learning</text>
      <text x="245" y="112" font-size="17" font-weight="800" fill="#24364f">Interaction Sequences</text>
      <text x="245" y="134" font-size="17" font-weight="800" fill="#24364f">Extraction &amp; Anonymization</text>
      ${seq(250, 166)}

      <rect x="585" y="92" width="270" height="130" rx="28" fill="#dde0f1"/>
      <text x="720" y="124" text-anchor="middle" font-size="22" font-weight="900" fill="#111827">Sequential Encoder</text>
      <text x="635" y="156" text-anchor="middle" font-size="18" fill="#111827">x₁</text>
      <text x="685" y="156" text-anchor="middle" font-size="18" fill="#111827">Δt₁</text>
      <text x="735" y="156" text-anchor="middle" font-size="18" fill="#111827">x₂</text>
      <text x="785" y="156" text-anchor="middle" font-size="18" fill="#111827">...</text>
      <text x="830" y="156" text-anchor="middle" font-size="18" fill="#111827">xₛ</text>
      <rect x="620" y="178" width="62" height="30" rx="5" fill="#d1d5db" stroke="#1f2937" stroke-width="2"/>
      <rect x="700" y="178" width="62" height="30" rx="5" fill="#d1d5db" stroke="#1f2937" stroke-width="2"/>
      <rect x="780" y="178" width="62" height="30" rx="5" fill="#2c7fb8" stroke="#1c5d99" stroke-width="2"/>
      <text x="651" y="199" text-anchor="middle" font-size="16">MLP</text>
      <text x="731" y="199" text-anchor="middle" font-size="16">t2v</text>
      <text x="811" y="199" text-anchor="middle" font-size="16" fill="#fff">RNN</text>

      <rect x="210" y="292" width="690" height="220" rx="38" fill="#e8f7ee" stroke="#cce6d7"/>
      <text x="245" y="332" font-size="26" font-weight="900" fill="#111827">B. Temporal Context Modeling</text>
      <text x="245" y="370" font-size="17" font-weight="800" fill="#24364f">Contextual Windows</text>
      <text x="245" y="392" font-size="17" font-weight="800" fill="#24364f">Extraction &amp; Anonymization</text>
      ${seq(250, 426)}
      <rect x="585" y="386" width="160" height="42" rx="7" fill="#7b3fb3"/>
      <rect x="585" y="440" width="160" height="42" rx="7" fill="#7b3fb3"/>
      <text x="665" y="412" text-anchor="middle" font-size="17" font-weight="800" fill="#fff">Sequential Encoder</text>
      <text x="665" y="466" text-anchor="middle" font-size="17" font-weight="800" fill="#fff">Sequential Encoder</text>
      <rect x="770" y="386" width="46" height="96" rx="8" fill="#3869b1"/>
      <text x="800" y="434" text-anchor="middle" transform="rotate(90 800 434)" font-size="15" font-weight="800" fill="#fff">Self-Attn</text>
      <rect x="828" y="386" width="46" height="96" rx="8" fill="#3869b1"/>
      <text x="858" y="434" text-anchor="middle" transform="rotate(90 858 434)" font-size="15" font-weight="800" fill="#fff">Pooling</text>

      <line x1="900" y1="178" x2="940" y2="240" stroke="#1f2937" stroke-width="3" marker-end="url(#arrowHead)"/>
      <line x1="900" y1="434" x2="940" y2="316" stroke="#1f2937" stroke-width="3" marker-end="url(#arrowHead)"/>
      <text x="904" y="214" font-size="15" fill="#111827">enc(AIS)</text>
      <text x="872" y="358" font-size="15" fill="#111827">enc(ACWs)</text>
      <circle cx="965" cy="280" r="20" fill="#fff" stroke="#111827" stroke-width="3"/>
      <text x="965" y="288" text-anchor="middle" font-size="30" fill="#111827">⊕</text>
      ${bars(930, 365)}
      <line x1="985" y1="280" x2="1010" y2="280" stroke="#1f2937" stroke-width="3" marker-end="url(#arrowHead)"/>

      <rect x="1000" y="60" width="146" height="452" rx="34" fill="#f8f0d6"/>
      <text x="1073" y="100" text-anchor="middle" font-size="26" font-weight="900" fill="#111827">C.</text>
      <text x="1073" y="130" text-anchor="middle" font-size="23" font-weight="900" fill="#111827">Downstream</text>
      <text x="1073" y="158" text-anchor="middle" font-size="23" font-weight="900" fill="#111827">Tasks</text>
      <rect x="1026" y="190" width="96" height="86" rx="12" fill="#e6ddc2"/>
      <line x1="1055" y1="235" x2="1098" y2="211" stroke="#111827" stroke-width="3"/>
      <line x1="1060" y1="242" x2="1100" y2="260" stroke="#111827" stroke-width="3" stroke-dasharray="5 5"/>
      <circle cx="1055" cy="235" r="7" fill="#ffd21f" stroke="#b98500" stroke-width="2"/>
      <circle cx="1098" cy="211" r="7" fill="#7cc36a" stroke="#4b9b41" stroke-width="2"/>
      <circle cx="1100" cy="260" r="7" fill="#ef2d1a" stroke="#b62115" stroke-width="2"/>
      <rect x="1018" y="310" width="110" height="45" rx="5" fill="#1c5d99"/>
      <text x="1073" y="337" text-anchor="middle" font-size="15" font-weight="900" fill="#fff">Link Prediction</text>
      <text x="1073" y="385" text-anchor="middle" font-size="24" font-family="Cambria Math">p̂</text>
      ${bars(1004, 410)}
      <text x="1073" y="456" text-anchor="middle" font-size="12" fill="#6b5f37">final representations</text>
    </svg>
  </div>`;
}

function frameworkVisualClean() {
  const seqRows = (x, y) => Array.from({ length: 3 }, (_, row) => {
    const cy = y + row * 22;
    const colors = ["#ffd21f", "#79bd68", "#ef2d1a", "#79bd68", "#ffd21f"];
    const nodes = colors.map((color, col) => {
      const cx = x + col * 30;
      return `<circle cx="${cx}" cy="${cy}" r="7" fill="${color}" stroke="#315b36" stroke-width="1.4"/>`;
    }).join("");
    const links = Array.from({ length: 4 }, (_, col) => {
      const x1 = x + col * 30 + 8;
      const x2 = x + (col + 1) * 30 - 8;
      return `<line x1="${x1}" y1="${cy}" x2="${x2}" y2="${cy}" stroke="#24364f" stroke-width="2"/>`;
    }).join("");
    return `${links}${nodes}<text x="${x + 158}" y="${cy + 5}" font-size="13" fill="#66758c">...</text>`;
  }).join("");

  const repBar = (x, y, scale = 1) => {
    const colors = ["#f21818", "#ffd84a", "#d9dfc8", "#79bd68", "#ef8b35", "#f21818", "#ffd84a", "#79bd68"];
    return colors.map((color, i) => {
      const w = 16 * scale;
      return `<rect x="${x + i * w}" y="${y}" width="${w}" height="${22 * scale}" fill="${color}" stroke="#111827" stroke-width=".6"/>`;
    }).join("");
  };

  return `<div class="framework-clean panel">
    <svg class="framework-svg" viewBox="0 0 1180 520" role="img" aria-label="IPNet simplified framework">
      <defs>
        <marker id="fwArrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
          <path d="M0,0 L9,4.5 L0,9 Z" fill="#1f2937"/>
        </marker>
        <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#0f1b2d" flood-opacity=".10"/>
        </filter>
      </defs>

      <rect x="18" y="178" width="150" height="164" rx="18" fill="#edf2f7" filter="url(#softShadow)"/>
      <text x="93" y="213" text-anchor="middle" font-size="18" font-weight="900" fill="#24364f">Input</text>
      <line x1="55" y1="262" x2="112" y2="222" stroke="#111827" stroke-width="3"/>
      <line x1="55" y1="262" x2="84" y2="309" stroke="#111827" stroke-width="3"/>
      <line x1="84" y1="309" x2="128" y2="292" stroke="#111827" stroke-width="3"/>
      <circle cx="55" cy="262" r="10" fill="#ffd21f" stroke="#b98500" stroke-width="2"/>
      <circle cx="112" cy="222" r="10" fill="#79bd68" stroke="#4b9b41" stroke-width="2"/>
      <circle cx="84" cy="309" r="10" fill="#79bd68" stroke="#4b9b41" stroke-width="2"/>
      <circle cx="128" cy="292" r="10" fill="#ef2d1a" stroke="#b62115" stroke-width="2"/>
      <text x="93" y="370" text-anchor="middle" font-size="22" font-weight="900" fill="#111827">G</text>

      <path d="M176 244 C207 194, 214 139, 245 117" fill="none" stroke="#1f2937" stroke-width="3.5" marker-end="url(#fwArrow)"/>
      <path d="M176 276 C207 326, 214 384, 245 404" fill="none" stroke="#1f2937" stroke-width="3.5" marker-end="url(#fwArrow)"/>

      <rect x="250" y="42" width="565" height="170" rx="24" fill="#eaf4fc" stroke="#cbdced" stroke-width="1.2"/>
      <text x="282" y="80" font-size="25" font-weight="900" fill="#111827">A. Interaction Patterns Learning</text>
      <text x="282" y="112" font-size="15" font-weight="800" fill="#24364f">interaction sequences + anonymization</text>
      ${seqRows(290, 146)}
      <rect x="610" y="112" width="165" height="64" rx="14" fill="#dde0f1"/>
      <text x="692" y="139" text-anchor="middle" font-size="17" font-weight="900" fill="#111827">Sequential</text>
      <text x="692" y="163" text-anchor="middle" font-size="17" font-weight="900" fill="#111827">Encoder</text>
      <line x1="470" y1="168" x2="594" y2="144" stroke="#1f2937" stroke-width="2.5" marker-end="url(#fwArrow)"/>
      <text x="708" y="198" text-anchor="middle" font-size="14" fill="#24364f">enc(AIS)</text>

      <rect x="250" y="306" width="565" height="170" rx="24" fill="#e8f7ee" stroke="#c8e3d4" stroke-width="1.2"/>
      <text x="282" y="344" font-size="25" font-weight="900" fill="#111827">B. Temporal Context Modeling</text>
      <text x="282" y="376" font-size="15" font-weight="800" fill="#24364f">contextual windows + biased random walk</text>
      ${seqRows(290, 410)}
      <rect x="590" y="382" width="118" height="44" rx="10" fill="#7b3fb3"/>
      <text x="649" y="410" text-anchor="middle" font-size="15" font-weight="900" fill="#fff">Seq Encoder</text>
      <rect x="725" y="382" width="58" height="44" rx="10" fill="#3869b1"/>
      <text x="754" y="410" text-anchor="middle" font-size="15" font-weight="900" fill="#fff">Agg</text>
      <line x1="470" y1="432" x2="575" y2="404" stroke="#1f2937" stroke-width="2.5" marker-end="url(#fwArrow)"/>
      <text x="708" y="462" text-anchor="middle" font-size="14" fill="#24364f">enc(ACWs)</text>

      <path d="M815 151 C852 171, 867 211, 880 244" fill="none" stroke="#1f2937" stroke-width="3.5" marker-end="url(#fwArrow)"/>
      <path d="M815 405 C852 382, 867 319, 880 276" fill="none" stroke="#1f2937" stroke-width="3.5" marker-end="url(#fwArrow)"/>
      <circle cx="906" cy="260" r="26" fill="#fff" stroke="#111827" stroke-width="3"/>
      <text x="906" y="270" text-anchor="middle" font-size="32" fill="#111827">+</text>
      <text x="906" y="306" text-anchor="middle" font-size="14" font-weight="800" fill="#24364f">Concat</text>
      ${repBar(862, 326, .82)}
      <text x="916" y="362" text-anchor="middle" font-size="16" font-weight="900" fill="#24364f">y_u</text>
      <line x1="932" y1="260" x2="990" y2="260" stroke="#1f2937" stroke-width="3.5" marker-end="url(#fwArrow)"/>

      <rect x="1000" y="112" width="150" height="296" rx="28" fill="#f8f0d6" stroke="#eadfaa"/>
      <text x="1075" y="154" text-anchor="middle" font-size="24" font-weight="900" fill="#111827">C. Downstream</text>
      <text x="1075" y="184" text-anchor="middle" font-size="24" font-weight="900" fill="#111827">Tasks</text>
      <rect x="1030" y="212" width="90" height="66" rx="12" fill="#e6ddc2"/>
      <line x1="1052" y1="247" x2="1094" y2="224" stroke="#111827" stroke-width="3"/>
      <line x1="1052" y1="247" x2="1094" y2="262" stroke="#111827" stroke-width="3" stroke-dasharray="6 6"/>
      <circle cx="1052" cy="247" r="8" fill="#ffd21f" stroke="#b98500" stroke-width="2"/>
      <circle cx="1094" cy="224" r="8" fill="#79bd68" stroke="#4b9b41" stroke-width="2"/>
      <circle cx="1094" cy="262" r="8" fill="#ef2d1a" stroke="#b62115" stroke-width="2"/>
      <rect x="1014" y="314" width="122" height="42" rx="6" fill="#1c5d99"/>
      <text x="1075" y="340" text-anchor="middle" font-size="15" font-weight="900" fill="#fff">Link Prediction</text>
      <text x="1075" y="386" text-anchor="middle" font-size="24" font-family="Cambria Math">p</text>
    </svg>
  </div>`;
}

function symbolsVisual() {
  const items = [
    ["G={V(T),E(T)}", "动态网络由时间区间内的节点集合和事件集合组成。"],
    ["T=[t0,tn]", "观察窗口是连续时间范围，不是固定快照编号。"],
    ["V(T)", "在 T 内出现过的所有节点。"],
    ["e_ij(t)", "节点 i 与 j 在时刻 t 的一次交互事件。"]
  ];
  return `<div class="symbol-grid">
    ${items.map(item => `<div class="panel symbol"><code>${item[0]}</code><p>${item[1]}</p></div>`).join("")}
  </div>`;
}

function interactionVisual() {
  const rawSeq = ["u", "a", "b", "a", "c", "b"].map((label, index) => (
    `<span class="ip-token raw r${index}">${label}</span>`
  )).join("<i></i>");
  const anonSeq = ["0", "1", "2", "1", "3", "2"].map((label, index) => (
    `<span class="ip-token anon a${index}">${label}</span>`
  )).join("<i></i>");
  const timeSeq = ["Δt₁", "Δt₂", "Δt₃", "Δt₄", "Δt₅"].map((label, index) => (
    `<span class="time-chip tc${index}">${label}</span>`
  )).join("");

  return `<div class="ip-learning panel">
    <div class="ip-stage raw-stage">
      <h3>1. 抽取节点 u 的历史交互序列</h3>
      <div class="ip-sequence">${rawSeq}</div>
      <p>保留“交互对象出现顺序”与重复访问模式。</p>
    </div>

    <div class="ip-arrow">→</div>

    <div class="ip-stage anon-stage">
      <h3>2. 匿名化为行为角色序列</h3>
      <div class="ip-sequence">${anonSeq}</div>
      <p>不记具体 ID，改用相对位置 / 出现频率描述角色。</p>
    </div>

    <div class="ip-arrow">→</div>

    <div class="ip-stage encode-stage">
      <h3>3. 融合时间间隔并编码</h3>
      <div class="time-row">${timeSeq}</div>
      <div class="encoder-flow">
        <span>MLP</span>
        <span>Time2Vec</span>
        <span>GRU / Attn</span>
      </div>
      <p>把匿名角色和时间节奏输入序列编码器。</p>
    </div>

    <div class="ip-output">
      <strong>enc(AISᵤ)</strong>
      <span>节点行为模式表示</span>
      <div class="embedding-bar">
        <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
      </div>
    </div>
  </div>`;
}

function contextVisual() {
  return `<div class="context-learning panel">
    <div class="context-graph">
      <svg viewBox="0 0 430 330" aria-label="node-centric biased random walk">
        <defs>
          <marker id="ctxArrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
            <path d="M0,0 L9,4.5 L0,9 Z" fill="#1c5d99"/>
          </marker>
        </defs>
        <line class="ctx-edge strong" x1="210" y1="165" x2="118" y2="96"/>
        <line class="ctx-edge strong" x1="210" y1="165" x2="312" y2="102"/>
        <line class="ctx-edge weak" x1="210" y1="165" x2="116" y2="238"/>
        <line class="ctx-edge weak" x1="210" y1="165" x2="318" y2="236"/>
        <line class="ctx-edge strong" x1="118" y1="96" x2="312" y2="102"/>
        <line class="ctx-edge weak" x1="116" y1="238" x2="318" y2="236"/>
        <path class="ctx-walk" d="M210 165 L118 96 L312 102 L318 236" marker-end="url(#ctxArrow)"/>
        <circle class="ctx-node target" cx="210" cy="165" r="30"/>
        <circle class="ctx-node" cx="118" cy="96" r="22"/>
        <circle class="ctx-node" cx="312" cy="102" r="22"/>
        <circle class="ctx-node" cx="116" cy="238" r="22"/>
        <circle class="ctx-node" cx="318" cy="236" r="22"/>
        <text x="210" y="172" text-anchor="middle" fill="#fff" font-size="15" font-weight="900">u</text>
        <text x="118" y="101" text-anchor="middle" fill="#fff" font-size="13" font-weight="900">v1</text>
        <text x="312" y="107" text-anchor="middle" fill="#fff" font-size="13" font-weight="900">v2</text>
        <text x="116" y="243" text-anchor="middle" fill="#fff" font-size="13" font-weight="900">v3</text>
        <text x="318" y="241" text-anchor="middle" fill="#fff" font-size="13" font-weight="900">v4</text>
      </svg>
      <div class="context-note">
        <strong>node-centric biased random walk</strong>
        <span>从目标节点出发，优先访问结构更强、影响更大的邻居。</span>
      </div>
    </div>

    <div class="context-factors">
      <div class="factor-card">
        <b>Structural Connection Intensity</b>
        <span>互动频率 + 共同邻居</span>
        <div class="factor-meter"><i style="--w:78%"></i></div>
      </div>
      <div class="factor-card">
        <b>Influence Factor</b>
        <span>节点度数 + 邻居平均度数</span>
        <div class="factor-meter"><i style="--w:64%"></i></div>
      </div>
    </div>

    <div class="context-window">
      <h3>Contextual Window</h3>
      <div class="window-seq">
        <span>u</span><i></i><span>v1</span><i></i><span>v2</span><i></i><span>v4</span>
      </div>
      <div class="context-encoder">
        <span>Seq Encoder</span>
        <span>Self-Attn</span>
        <span>Pooling</span>
      </div>
      <div class="context-output">
        <strong>enc(ACWsᵤ)</strong>
        <em>上下文环境表示</em>
      </div>
    </div>
  </div>`;
}

function lossVisual() {
  const formulas = [
    ["y_u = Concat(enc(AIS_u), agg(ACWs_u))", "将节点自身交互模式与上下文窗口聚合结果拼接。"],
    ["p_uv = sigmoid(MLP([y_u,y_v]))", "用两个节点表示预测未来连边概率。"],
    ["positive / negative sampling", "共现节点作为正样本，随机负采样节点作为负样本。"]
  ];
  return `<div class="formula-stack">
    ${formulas.map(item => `<div class="panel formula"><code>${item[0]}</code><p>${item[1]}</p></div>`).join("")}
  </div>`;
}

function datasetsVisual() {
  const rows = [
    ["IA / IA09", "密集通信", "短时段联系网络", "Transductive"],
    ["Enron", "企业邮件", "组织通信网络", "Transductive / Inductive"],
    ["UCI / FB", "社交互动", "在线平台行为", "Transductive / Inductive"],
    ["ML-10M", "推荐系统", "电影评分网络", "Inductive"],
    ["ZhiHu", "知识社区", "中文问答互动", "Inductive"]
  ];
  return `<div class="experiment-board panel">
    <div class="experiment-table">
      <div class="exp-row exp-head"><span>数据集</span><span>类型</span><span>场景</span><span>任务</span></div>
      ${rows.map(row => `<div class="exp-row"><strong>${row[0]}</strong><span>${row[1]}</span><span>${row[2]}</span><em>${row[3]}</em></div>`).join("")}
    </div>
    <aside class="experiment-side">
      <div class="exp-card metric">
        <b>AUC</b>
        <span>统一评价指标</span>
      </div>
      <div class="exp-card">
        <b>任务划分</b>
        <span>Transductive: 已知节点未来边</span>
        <span>Inductive: mask 10% 节点测试泛化</span>
      </div>
      <div class="exp-card variants">
        <b>IPNet 变体</b>
        <i>mean</i><i>att</i><i>w2v</i>
      </div>
    </aside>
  </div>`;
}

function resultsVisual() {
  const transductive = [
    ["UCI", 88.37, 82.45],
    ["FB", 87.90, 84.12],
    ["Enron", 88.47, 86.52]
  ];
  const inductive = [
    ["ML-10M", 86.95, 81.19],
    ["ZhiHu", 72.56, 70.41],
    ["UCI", 84.56, 77.92]
  ];

  const group = (title, subtitle, rows) => `<section class="result-group">
    <div class="result-title">
      <h3>${title}</h3>
      <span>${subtitle}</span>
    </div>
    <div class="paired-bars">
      ${rows.map(([name, ipnet, baseline]) => {
        const gain = (ipnet - baseline).toFixed(2);
        return `<div class="paired-row">
          <strong>${name}</strong>
          <div class="pair-track">
            <span class="base-bar" style="--v:${baseline}%"><b>${baseline}</b></span>
            <span class="ipnet-bar" style="--v:${ipnet}%"><b>${ipnet}</b></span>
          </div>
          <em>+${gain}</em>
        </div>`;
      }).join("")}
    </div>
  </section>`;

  return `<div class="results-board panel">
    <div class="result-legend">
      <span><i class="ip"></i> IPNet</span>
      <span><i class="base"></i> Best Baseline</span>
      <b>AUC ↑</b>
    </div>
    <div class="result-grid">
      ${group("Transductive", "已知节点未来边预测", transductive)}
      ${group("Inductive", "mask 10% 节点，新节点泛化", inductive)}
    </div>
    <div class="result-callout">
      <strong>关键观察</strong>
      <span>Transductive 中 w2v 路径共现有效；Inductive 中匿名化行为模式提升新节点泛化。</span>
    </div>
  </div>`;
}

function ablationVisual() {
  const drops = [
    ["Full IPNet", "完整模型", 100, "full"],
    ["w/o IP", "去掉节点自身行为模式", 86, "drop"],
    ["w/o CC", "去掉上下文结构演化", 89, "drop"],
    ["w/o Anoy", "去掉匿名化角色表示", 91, "drop"]
  ];

  return `<div class="effab-board panel">
    <section class="eff-card">
      <div class="eff-card-head">
        <span>Efficiency Analysis</span>
        <b>采样开销 vs 收敛速度</b>
      </div>
      <div class="eff-plot" aria-label="efficiency trend chart">
        <svg viewBox="0 0 520 250" role="img">
          <defs>
            <linearGradient id="effGrad" x1="0" x2="1">
              <stop offset="0" stop-color="#1f5f9f" />
              <stop offset="1" stop-color="#2cb9c5" />
            </linearGradient>
          </defs>
          <line x1="54" y1="208" x2="488" y2="208" class="axis" />
          <line x1="54" y1="34" x2="54" y2="208" class="axis" />
          <text x="50" y="230">训练规模 / 数据集规模</text>
          <text x="14" y="42">耗时</text>
          <path d="M70 176 C145 152, 230 122, 330 92 S438 62, 480 54" class="curve base-curve" />
          <path d="M70 188 C148 170, 224 124, 326 88 S428 54, 480 42" class="curve ip-curve" />
          <circle cx="116" cy="160" r="8" class="mark warm" />
          <circle cx="420" cy="62" r="8" class="mark cool" />
          <text x="132" y="166" class="plot-note">小数据集：random walk 有额外开销</text>
          <text x="286" y="38" class="plot-note">大数据集：短序列 + 有偏采样更快收敛</text>
        </svg>
        <div class="plot-legend">
          <span><i class="line-ip"></i>IPNet</span>
          <span><i class="line-base"></i>普通事件模型</span>
        </div>
      </div>
      <div class="eff-notes">
        <div><strong>短 interaction sequence</strong><span>减少长历史噪声</span></div>
        <div><strong>短 contextual window</strong><span>保留高质量邻域路径</span></div>
        <div><strong>node-centric biased walk</strong><span>优先采样更相关的上下文</span></div>
      </div>
    </section>

    <section class="ablate-card">
      <div class="eff-card-head">
        <span>Ablation Study</span>
        <b>去掉任一模块，AUC 都会下降</b>
      </div>
      <div class="module-strip">
        <div class="module ip">IP<br><small>个体行为</small></div>
        <div class="module cc">CC<br><small>上下文演化</small></div>
        <div class="module anoy">Anoy<br><small>匿名角色</small></div>
        <div class="module arrow">=</div>
        <div class="module full">IPNet</div>
      </div>
      <div class="drop-chart">
        ${drops.map((item, index) => `<div class="drop-row ${item[3]}" style="--v:${item[2]}%;--i:${index}">
          <div>
            <strong>${item[0]}</strong>
            <span>${item[1]}</span>
          </div>
          <div class="drop-track"><i></i></div>
          <em>${item[2]}</em>
        </div>`).join("")}
      </div>
      <div class="ablate-conclusion">
        <strong>结论</strong>
        <span>IP 学行为，CC 学环境，Anoy 支撑 inductive 泛化；三者不是替代关系，而是互补关系。</span>
      </div>
    </section>
  </div>`;
}

function summaryVisual() {
  const takeaways = [
    ["行为模式", "Interaction sequence 捕捉节点过去如何行动"],
    ["上下文演化", "Contextual window 建模邻域环境如何变化"],
    ["新节点泛化", "匿名化表示避免死记节点 ID"]
  ];
  const futures = [
    ["实时化", "面向在线事件流做增量更新"],
    ["可解释", "解释某次预测来自哪类行为模式"],
    ["大规模", "降低随机游走与编码的部署成本"]
  ];

  return `<div class="summary-board panel">
    <section class="summary-core">
      <div class="summary-column">
        <div class="summary-label">核心总结</div>
        ${takeaways.map((item, index) => `<div class="summary-chip" style="--i:${index}">
          <strong>${item[0]}</strong><span>${item[1]}</span>
        </div>`).join("")}
      </div>
      <div class="summary-center">
        <div class="summary-ring"></div>
        <div class="summary-node main">IPNet</div>
        <span>动态节点行为画像</span>
      </div>
      <div class="summary-column">
        <div class="summary-label right-label">未来改进方向</div>
        ${futures.map((item, index) => `<div class="summary-chip future" style="--i:${index + 3}">
          <strong>${item[0]}</strong><span>${item[1]}</span>
        </div>`).join("")}
      </div>
    </section>
    <section class="summary-bottom">
      <div><b>个人理解</b><span>IPNet 可以看作动态图中的动态节点行为画像模型。</span></div>
      <div><b>应用启发</b><span>推荐系统、社交网络分析、邮件网络预测、异常检测。</span></div>
    </section>
  </div>`;
}

function thanksVisual() {
  const nodes = [
    [12, 24, 0], [26, 62, 1], [38, 34, 2], [54, 72, 3], [68, 30, 4], [82, 58, 5],
    [18, 78, 6], [46, 18, 7], [74, 78, 8], [88, 24, 9]
  ];
  const lines = [
    [0, 2], [2, 4], [4, 5], [1, 3], [3, 8], [6, 3], [7, 2], [5, 9], [1, 0], [8, 5]
  ];

  return `<div class="thanks-board">
    <svg class="thanks-network" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      ${lines.map((line, index) => {
        const a = nodes[line[0]];
        const b = nodes[line[1]];
        return `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" style="--i:${index}" />`;
      }).join("")}
    </svg>
    ${nodes.map(node => `<i class="thanks-dot" style="left:${node[0]}%;top:${node[1]}%;--i:${node[2]}"></i>`).join("")}
    <section class="thanks-content">
      <div class="kicker">15 / Thanks</div>
      <h1>感谢聆听</h1>
      <p>欢迎老师和同学批评指正</p>
      <div class="qa-pill">Q&A</div>
      <span>Temporal Link Prediction · Dynamic Graph Learning · IPNet</span>
    </section>
  </div>`;
}

function renderVisual(type) {
  const visuals = {
    cover: networkVisual,
    compare: compareVisual,
    timeline: timelineVisual,
    methods: methodsVisual,
    roles: rolesVisual,
    framework: frameworkVisualClean,
    symbols: symbolsVisual,
    interaction: interactionVisual,
    context: contextVisual,
    loss: lossVisual,
    datasets: datasetsVisual,
    results: resultsVisual,
    ablation: ablationVisual,
    summary: summaryVisual,
    thanks: thanksVisual
  };
  return (visuals[type] || networkVisual)();
}

function render() {
  slideRoot.innerHTML = slides.map((slide, index) => {
    const bullets = slide.bullets.map((item, bulletIndex) => (
      `<li style="--i:${bulletIndex}">${escapeText(item)}</li>`
    )).join("");

    const layoutClass = slide.visual === "framework" ? "framework-slide" : slide.visual === "methods" ? "method-slide" : slide.visual === "interaction" ? "interaction-slide" : slide.visual === "context" ? "context-slide" : slide.visual === "datasets" ? "dataset-slide" : slide.visual === "results" ? "results-slide" : slide.visual === "ablation" ? "ablation-slide" : slide.visual === "summary" ? "summary-slide" : slide.visual === "thanks" ? "thanks-slide" : "";
    if (slide.visual === "thanks") {
      return `<article class="slide ${layoutClass} ${index === 0 ? "active" : ""}" data-index="${index}">
        ${renderVisual(slide.visual)}
      </article>`;
    }

    if (slide.visual === "summary") {
      return `<article class="slide ${layoutClass} ${index === 0 ? "active" : ""}" data-index="${index}">
        <section class="summary-header">
          <div>
            <div class="kicker">${escapeText(slide.kicker)}</div>
            <h1>${escapeText(slide.title)}</h1>
          </div>
          <p>${escapeText(slide.subtitle)}</p>
        </section>
        <section class="visual">${renderVisual(slide.visual)}</section>
      </article>`;
    }

    if (slide.visual === "ablation") {
      return `<article class="slide ${layoutClass} ${index === 0 ? "active" : ""}" data-index="${index}">
        <section class="ablation-header">
          <div>
            <div class="kicker">${escapeText(slide.kicker)}</div>
            <h1>${escapeText(slide.title)}</h1>
          </div>
          <p>${escapeText(slide.subtitle)}</p>
        </section>
        <section class="visual">${renderVisual(slide.visual)}</section>
      </article>`;
    }

    if (slide.visual === "results") {
      return `<article class="slide ${layoutClass} ${index === 0 ? "active" : ""}" data-index="${index}">
        <section class="results-header">
          <div>
            <div class="kicker">${escapeText(slide.kicker)}</div>
            <h1>${escapeText(slide.title)}</h1>
          </div>
          <p>${escapeText(slide.subtitle)}</p>
        </section>
        <section class="visual">${renderVisual(slide.visual)}</section>
      </article>`;
    }

    if (slide.visual === "datasets") {
      return `<article class="slide ${layoutClass} ${index === 0 ? "active" : ""}" data-index="${index}">
        <section class="dataset-header">
          <div>
            <div class="kicker">${escapeText(slide.kicker)}</div>
            <h1>${escapeText(slide.title)}</h1>
          </div>
          <p>${escapeText(slide.subtitle)}</p>
        </section>
        <section class="visual">${renderVisual(slide.visual)}</section>
      </article>`;
    }

    if (slide.visual === "context") {
      return `<article class="slide ${layoutClass} ${index === 0 ? "active" : ""}" data-index="${index}">
        <section class="context-header">
          <div>
            <div class="kicker">${escapeText(slide.kicker)}</div>
            <h1>${escapeText(slide.title)}</h1>
          </div>
          <p>${escapeText(slide.subtitle)}</p>
        </section>
        <section class="visual">${renderVisual(slide.visual)}</section>
      </article>`;
    }

    if (slide.visual === "interaction") {
      return `<article class="slide ${layoutClass} ${index === 0 ? "active" : ""}" data-index="${index}">
        <section class="interaction-header">
          <div>
            <div class="kicker">${escapeText(slide.kicker)}</div>
            <h1>${escapeText(slide.title)}</h1>
          </div>
          <p>${escapeText(slide.subtitle)}</p>
        </section>
        <section class="visual">${renderVisual(slide.visual)}</section>
      </article>`;
    }

    if (slide.visual === "methods") {
      return `<article class="slide ${layoutClass} ${index === 0 ? "active" : ""}" data-index="${index}">
        <section class="method-header">
          <div>
            <div class="kicker">${escapeText(slide.kicker)}</div>
            <h1>${escapeText(slide.title)}</h1>
          </div>
          <p>${escapeText(slide.subtitle)}</p>
        </section>
        <section class="visual">${renderVisual(slide.visual)}</section>
      </article>`;
    }

    if (slide.visual === "framework") {
      return `<article class="slide ${layoutClass} ${index === 0 ? "active" : ""}" data-index="${index}">
        <section class="framework-header">
          <div>
            <div class="kicker">${escapeText(slide.kicker)}</div>
            <h1>${escapeText(slide.title)}</h1>
          </div>
          <p>${escapeText(slide.subtitle)}</p>
        </section>
        <section class="visual">${renderVisual(slide.visual)}</section>
      </article>`;
    }

    return `<article class="slide ${layoutClass} ${index === 0 ? "active" : ""}" data-index="${index}">
      <section class="content">
        <div class="kicker">${escapeText(slide.kicker)}</div>
        <h1>${escapeText(slide.title)}</h1>
        <p class="subtitle">${escapeText(slide.subtitle)}</p>
        <ul class="bullets">${bullets}</ul>
      </section>
      <section class="visual">${renderVisual(slide.visual)}</section>
    </article>`;
  }).join("");

  thumbRoot.innerHTML = slides.map((slide, index) => (
    `<button class="thumb ${index === 0 ? "active" : ""}" type="button" data-index="${index}">
      <small>${String(index + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}</small>
      <span>${escapeText(shortTitle(slide.title))}</span>
    </button>`
  )).join("");
}

function setActive(nextIndex) {
  active = Math.max(0, Math.min(slides.length - 1, nextIndex));

  document.querySelectorAll(".slide").forEach((slide, index) => {
    slide.classList.toggle("active", index === active);
    slide.classList.toggle("exit-left", index < active);
  });

  document.querySelectorAll(".thumb").forEach((thumb, index) => {
    thumb.classList.toggle("active", index === active);
  });

  progress.style.width = `${((active + 1) / slides.length) * 100}%`;
  counter.textContent = `${String(active + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
  sectionLabel.textContent = slides[active].section;
  document.querySelector(`.thumb[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
}

render();
setActive(0);

prevButton.addEventListener("click", () => setActive(active - 1));
nextButton.addEventListener("click", () => setActive(active + 1));
thumbRoot.addEventListener("click", (event) => {
  const button = event.target.closest(".thumb");
  if (button) setActive(Number(button.dataset.index));
});

window.addEventListener("keydown", (event) => {
  if (["ArrowRight", "PageDown", " "].includes(event.key)) {
    event.preventDefault();
    setActive(active + 1);
  }
  if (["ArrowLeft", "PageUp"].includes(event.key)) {
    event.preventDefault();
    setActive(active - 1);
  }
  if (event.key === "Home") setActive(0);
  if (event.key === "End") setActive(slides.length - 1);
});
